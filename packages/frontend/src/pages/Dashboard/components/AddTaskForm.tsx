import React, { ChangeEvent, useState } from 'react';
import { Button } from '../../../components/Button';
import { Input } from '../../../components/Input/Input';

export const AddTaskForm: React.FC<{ afterSubmit: () => void }> = ({ afterSubmit }) => {
	const [values, setValues] = useState({
		description: '',
		labels: '',
		name: '',
	});
	const fieldDidChange = (e: ChangeEvent<HTMLInputElement>) => {
		e.target.value = e.target.value.replace(/[^a-zA-Z0-9 ]/g, "");
		setValues({ ...values, [e.target.name]: e.target.value});
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
			const labelstosend: string[] = [];
			for (let index = 0; index < Object.keys(labelJSON.data).length; index += 1) {
				for (let index2 = 0; index2 < labelnames.length; index2 += 1) {
					if (labelnames[index2] === labelJSON.data[index].name) {
						labelstosend.push(labelJSON.data[index].labelid);
					}
				}
			}
			console.log(values.labels.split(','));
			await fetch('/api/task', {
				body: JSON.stringify({ name: values.name, description: values.description, labels: labelstosend }),
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
			<form onSubmit={onSubmitForm} data-testid="add-task-form">
				<Input name="name" type="text" label="Name" onChange={fieldDidChange} required={true} />
				<Input name="description" type="text" label="Description" onChange={fieldDidChange} required={true} />
				<Input name="labels" type="text" label="Input label" onChange={fieldDidChange} />
				<Button type="submit">Add new Task</Button>
			</form>
		</>
	);
};
