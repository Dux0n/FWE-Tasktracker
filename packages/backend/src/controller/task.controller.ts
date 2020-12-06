import { getRepository } from 'typeorm';
import { Label } from '../entity/Label';
import { Task } from '../entity/Task';

export const getAllTasks = async (req, res) => {
	const { taskfilter, labelfilter, descriptionfilter } = req.query;

	const lfilter = String(labelfilter).toString().split(',') as string[];
	const tfilter = String(taskfilter).toString().split(',') as string[];
	const dfilter = String(descriptionfilter).toString().split(',') as string[];

	const taskRepository = await getRepository(Task);
	const tasks = await taskRepository.find({
		relations: ['labels', 'trackings'],
	});
	let results = [...tasks];
	let endresults: Task[] = [];

	if (taskfilter) {
		endresults = results.filter((r) => tfilter.includes(r.name));
	}
	if (labelfilter) {
		endresults = endresults.concat(results.filter((r) => r.labels.some((l) => lfilter.includes(l.name))));
	}
	if (descriptionfilter) {
		endresults = endresults.concat(results.filter((r) => dfilter.includes(r.description)));
	}
	if (endresults.length !== 0) {
		results = endresults;
	}

	res.send({ data: results });
};

export const getTaskById = async (req, res) => {
	const taskId = req.params.taskId;
	const taskRepository = await getRepository(Task);

	try {
		const task = await taskRepository.findOneOrFail({
			relations: ['labels', 'trackings'],
			where: { taskid: taskId },
		});
		res.send({
			data: task,
		});
		return;
	} catch (error) {
		res.status(404).send({
			status: 'not_found',
		});
	}
};

export const deleteTaskById = async (req, res) => {
	const taskId = req.params.taskId;
	const taskRepository = await getRepository(Task);

	try {
		const task = await taskRepository.findOneOrFail({
			relations: ['trackings'],
			where: { taskid: taskId },
		});
		await taskRepository.remove(task);
		res.send({});
	} catch (error) {
		res.status(404).send({
			status: 'not_found',
		});
	}
};

export const updateTaskById = async (req, res) => {
	const taskId = req.params.taskId;
	const { name, description, labels } = req.body;
	const taskRepository = await getRepository(Task);
	const labelRepository = await getRepository(Label);

	try {
		let task = await taskRepository.findOneOrFail({
			relations: ['labels'],
			where: { taskid: taskId },
		});
		task.name = name;
		task.description = description;

		if (labels.length !== 0) {
			for (let index = 0; index < Object.keys(labels).length; index += 1) {
				const element = labels[index];

				await addLabelToTaksIfExists(labelRepository, element, task, res);
			}
		}
		task = await taskRepository.save(task);

		res.send({
			data: task,
		});
	} catch (error) {
		res.status(404).send({
			status: 'not_found',
		});
	}
};

export const createTask = async (req, res) => {
	const { name, description, labels } = req.body;
	if (!name) {
		res.status(400).send({
			status: 'Invalid Syntax',
		});
		return;
	}
	const task = new Task();
	task.name = name;
	task.description = description;
	task.labels = [];
	const labelRepository = await getRepository(Label);

	if (labels.length !== 0) {
		for (let index = 0; index < Object.keys(labels).length; index += 1) {
			const element = labels[index];

			await addLabelToTaksIfExists(labelRepository, element, task, res);
		}
	}

	const taskRepository = await getRepository(Task);
	const createdTask = await taskRepository.save(task);

	res.send({
		data: createdTask,
	});
};

export const addLabel = async (req, res) => {
	const taskId = req.params.taskId;
	const { labels } = req.body;
	try {
		const taskRepository = await getRepository(Task);
		const labelRepository = await getRepository(Label);

		/**
		 *  relations ist used to get the labels loaded in to the array
		 *  if it's not used then the array is undefined
		 */
		let task = await taskRepository.findOneOrFail({
			relations: ['labels'],
			where: { taskid: taskId },
		});
		// iterate through Label IDs that we want to add to a task
		for (let index = 0; index < Object.keys(labels).length; index += 1) {
			const element = labels[index];

			if (!(await addLabelToTaksIfExists(labelRepository, element, task, res))) {
				return;
			}
		}
		task = await taskRepository.save(task);

		res.send({
			data: task,
		});
	} catch (error) {
		res.status(404).send({
			status: 'not_found',
		});
	}
};

export const deleteLabel = async (req, res) => {
	const taskId = req.params.taskId;
	const { labels } = req.body;

	if (!labels) {
		res.status(400).send({
			status: 'Invalid Syntax',
		});
		return;
	}
	try {
		const taskRepository = await getRepository(Task);
		const labelRepository = await getRepository(Label);

		let task = await taskRepository.findOneOrFail({
			relations: ['labels'],
			where: { taskid: taskId },
		});

		/**
		 * iterate through Label IDs that we want to delete
		 */
		for (let index = 0; index < Object.keys(labels).length; index += 1) {
			const element = labels[index];

			if (!(await searchForLabelToDelete(labelRepository, element, task, res))) {
				return;
			}
		}
		task = await taskRepository.save(task);

		res.send({
			data: task,
		});
	} catch (error) {
		res.status(404).send({
			status: 'not_found',
		});
	}
};

export const getAllLabelsOfTask = async (req, res) => {
	const { taskId } = req.params;
	const taskRepository = await getRepository(Task);
	try {
		const task = await taskRepository.findOneOrFail({
			relations: ['labels'],
			where: { taskid: taskId },
		});
		const labels = task.labels;
		res.send({
			data: labels,
		});
		return;
	} catch (error) {
		res.status(404).send({
			status: 'not_found',
		});
	}
};

export const getAllTrackingsOfTask = async (req, res) => {
	const { taskId } = req.params;
	const taskRepository = await getRepository(Task);
	try {
		const task = await taskRepository.findOneOrFail({
			relations: ['trackings'],
			where: { taskid: taskId },
		});
		const trackings = task.trackings;
		res.send({
			data: trackings,
		});
		return;
	} catch (error) {
		res.status(404).send({
			status: 'not_found',
		});
	}
};

/**
 * Try to find the label with wanted id
 * If found then add it else throw an error
 */
async function addLabelToTaksIfExists(labelRepository, element: any, task: Task, res: any) {
	try {
		const label = await labelRepository.findOneOrFail(element);
		task.labels.push(label);
		return true;
	} catch (error) {
		res.status(404).send({
			status: 'not_found',
		});
		return false;
	}
}

/**
 * Refactor of deleteLabel
 * Try to find the label that we want to delete
 * if not found, send an error
 */

async function searchForLabelToDelete(labelRepository, element: any, task: Task, res: any) {
	try {
		const label = await labelRepository.findOneOrFail(element);
		deleteLabelIfFound(task, label);
		return true;
	} catch (error) {
		res.status(404).send({
			status: 'not_found',
		});
		return false;
	}
}

/**
 * Refactor of SearchForLabelToDelete
 * if the Label was found we iterate through labels of a task
 * to see if it has the Label that we want to delete
 * if label exists then delete it
 */
function deleteLabelIfFound(task: Task, label: any) {
	for (let index2 = 0; index2 < task.labels.length; index2 += 1) {
		if (task.labels[index2].labelid === label.labelid) {
			task.labels.splice(index2, 1);
		}
	}
}
