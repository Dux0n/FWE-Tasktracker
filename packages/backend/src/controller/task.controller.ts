import { getRepository } from "typeorm";
import { Label } from "../entity/Label";
import { Task } from "../entity/Task";

export const getAllTasks = async (req, res) => {
  
   const { taskfilter, labelfilter, descriptionfilter } = req.query;
  
  const lfilter = String(labelfilter).toString().split(",")  as string[];
  const tfilter = String(taskfilter).toString().split(",") as string[];
  const dfilter = String(descriptionfilter).toString().split(",") as string[];
  
  const taskRepository = await getRepository(Task);
  const tasks = await taskRepository.find({
    relations: ["labels"],
  });
  let results = [...tasks];

  

  if(taskfilter){
    results = results.filter(r => tfilter.includes(r.name));
  }
  if(labelfilter){
    results = results.filter(r => r.labels.some(l =>  lfilter.includes(l.name)));
    console.log(results);
  }
  if(descriptionfilter){
    results = results.filter(r => dfilter.includes(r.description));
  }
  res.send({ data: results });
};

export const getTaskById = async (req, res) => {
  const taskId = req.params.taskId;
  const taskRepository = await getRepository(Task);

  try {
    const task = await taskRepository.findOneOrFail({
      where: { taskid: taskId },
      relations: ["labels","trackings"],
    });
    res.send({
      data: task,
    });
    return;
  } catch (error) {
    res.status(404).send({
      status: "not_found" +error,
    });
  }
};

export const deleteTaskById = async (req, res) => {
  const taskId = req.params.taskId;
  const taskRepository = await getRepository(Task);
  if (!taskId) {
    res.status(400).send({
      status: "Invalid Syntax",
    });
    return;
  }
  try {
    const task = await taskRepository.findOneOrFail({
      where: { taskid: taskId },
      relations: ["trackings"],
    });
    await taskRepository.remove(task);
    res.send({});
  } catch (error) {
    res.status(404).send({
      status: "not_found" + error,
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
      where: { taskid: taskId },
      relations: ["labels"],
    });
    task.name = name;
    task.description = description;
    
    if(labels !== null){
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
      status: "not_found" + error,
    });
  }
};

export const createTask = async (req, res) => {
  const { name, description, labels } = req.body;
  if (!name) {
    res.status(400).send({
      status: "Invalid Syntax",
    });
    return;
  }
  const task = new Task();
  task.name = name;
  task.description = description;
  task.labels = [];
  const labelRepository = await getRepository(Label);

  if(labels !== null){
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

    //relations ist used to get the labels loaded in to the array
    //if it's not used then the array is undefined
    let task = await taskRepository.findOneOrFail({
      where: { taskid: taskId },
      relations: ["labels"],
    });
    // iterate through Label IDs that we want to add to a task
    for (let index = 0; index < Object.keys(labels).length; index += 1) {
      const element = labels[index];

      await addLabelToTaksIfExists(labelRepository, element, task, res);
    }
    task = await taskRepository.save(task);

    res.send({
      data: task,
    });
  } catch (error) {
    res.status(404).send({
      status: "not_found2" + error,
    });
  }
};

export const deleteLabel = async (req, res) => {
  const taskId = req.params.taskId;
  const { labels } = req.body;
  
  if (parameterCheck(taskId, labels)) {
    res.status(400).send({
      status: "Invalid Syntax",
    });
  }
  try {
    const taskRepository = await getRepository(Task);
    const labelRepository = await getRepository(Label);

    let task = await taskRepository.findOneOrFail({
      where: { taskid: taskId },
      relations: ["labels"],
    });
    //iterate through Label IDs that we want to delete
    for (let index = 0; index < Object.keys(labels).length; index += 1) {
      const element = labels[index];

      await SearchForLabelToDelete(labelRepository, element, task, res);
    }
    task = await taskRepository.save(task);

    res.send({
      data: task,
    });
  } catch (error) {
    res.status(404).send({
      status: "not_found2" + error,
    });
  }
};

export const getAllLabelsOfTask = async (req, res) => {
  const { taskId } = req.params;
  const taskRepository = await getRepository(Task);
  try {
    const task = await taskRepository.findOneOrFail({
      where: { taskid: taskId },
      relations: ["labels"],
    });
    const labels = task.labels;
    res.send({
      data: labels,
    });
  } catch (error) {
    res.status(404).send({
      status: "not_found" + error,
    });
  }
};

export const getAllTrackingsOfTask = async (req, res) => {
  const { taskId } = req.params;
  const taskRepository = await getRepository(Task);
  try {
    const task = await taskRepository.findOneOrFail({
      where: { taskid: taskId },
      relations: ["trackings"],
    });
    const trackings = task.trackings;
    res.send({
      data: trackings,
    });
  } catch (error) {
    res.status(404).send({
      status: "not_found" + error,
    });
  }
};

//Refactor of deleteLabel
function parameterCheck(taskId: any, labels: any) {
  return !taskId || !labels;
}

//Try to find the label with wanted id
// If found then add it else throw an error
async function addLabelToTaksIfExists(
  labelRepository,
  element: any,
  task: Task,
  res: any
) {
  try {
    const label = await labelRepository.findOneOrFail(element);
    task.labels.push(label);
  } catch (error) {
    res.status(404).send({
      status: "not_found" + error,
    });
  }
}

// Rafactor of deleteLabel
// Try to find the label that we want to delete
// if not found, send an error
async function SearchForLabelToDelete(
  labelRepository,
  element: any,
  task: Task,
  res: any
) {
  try {
    const label = await labelRepository.findOneOrFail(element);
    deleteLabelIfFound(task, label);
  } catch (error) {
    res.status(404).send({
      status: "not_found" + error,
    });
  }
}
//Refactor of SearchForLabelToDelete
// if the Label was found we iterate through labels of a task
// to see if it has the Label that we want to delete
// if label exists then delete it
function deleteLabelIfFound(task: Task, label: any) {
  for (let index2 = 0; index2 < task.labels.length; index2 += 1) {
    if (task.labels[index2].labelid === label.labelid) {
      task.labels.splice(index2, 1);
    }
  }
}
