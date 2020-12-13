import React, { ChangeEvent, useState } from 'react';
import { Button } from '../../../components/Button';
import { Input } from '../../../components/Input/Input';
import { Task } from '../../Dashboard/components/TaskList';

export const DeleteLabelFromTaskForm: React.FC<{
	afterSubmit: () => void;
	task: Task;
}> = ({ afterSubmit, task }) => {
	console.log('init state ', task);

	const [values, setValues] = useState(task);

	const fieldDidChange = (e: ChangeEvent<HTMLInputElement>) => {
		e.target.value = e.target.value.replace(/[^a-zA-Z0-9 ]/g, "");
		setValues({ ...values, [e.target.name]: e.target.value });
	};
	const onSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

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
			await fetch(`/api/task/${values.taskid}/label`, {
				body: JSON.stringify({ labels: labelstosend }),
				headers: { 'Content-Type': 'application/json' },
				method: 'DELETE',
			});

			afterSubmit();
			return;
		}
		afterSubmit();
	};

	return (
		<>
			<form onSubmit={onSubmitForm}>
				<Input name="labels" type="text" label="Labels" onChange={fieldDidChange} required={true} />
				<Button type="submit">Delete the labels</Button>
			</form>
		</>
	);
};
