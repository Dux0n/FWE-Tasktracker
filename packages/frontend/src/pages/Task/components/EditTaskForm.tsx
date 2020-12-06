import React, { ChangeEvent, useState } from 'react';
import { Button } from '../../../components/Button';
import { Input } from '../../../components/Input/Input';
import { Task } from '../../Dashboard/components/TaskList';

export const EditTaskForm: React.FC<{
	afterSubmit: () => void;
	task: Task;
}> = ({ afterSubmit, task }) => {
	console.log('init state ', task);
	const [values, setValues] = useState(task);

	const fieldDidChange = (e: ChangeEvent<HTMLInputElement>) => {
		setValues({ ...values, [e.target.name]: e.target.value });
	};
	const onSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		console.log(values);

		const labelRequest = await fetch('/api/label', {
			headers: { 'content-type': 'application/json' },
			method: 'GET',
		});
		console.log(labelRequest);
		if (labelRequest.status === 200) {
			const labelJSON = await labelRequest.json();
			const labelnames = values.labels.toString().split(',');
			let labelstosend: string[] = [];
			for (let index = 0; index < Object.keys(labelJSON.data).length; index += 1) {
				for (let index2 = 0; index2 < labelnames.length; index2 += 1) {
					if (labelnames[index2] === labelJSON.data[index].name) {
						labelstosend.push(labelJSON.data[index].labelid);
					}
				}
			}
			console.log(labelstosend);
			await fetch(`/api/task/${values.taskid}/label`, {
				body: JSON.stringify({
					name: values.name,
					// tslint:disable-next-line: object-literal-sort-keys
					description: values.description,
					labels: labelstosend,
				}),
				headers: { 'Content-Type': 'application/json' },
				method: 'POST',
			});
			afterSubmit();
			return;
		}
		afterSubmit();
	};

	return (
		<>
			<form onSubmit={onSubmitForm}>
				<Input name="name" type="text" label="Name" value={values.name} onChange={fieldDidChange} required={true} />
				<Input
					name="description"
					type="text"
					label="Description"
					value={values.description}
					onChange={fieldDidChange}
					required={true}
				/>

				<Input name="labels" type="text" label="Label" onChange={fieldDidChange} />

				<Button type="submit">Edit the task</Button>
			</form>
		</>
	);
};
