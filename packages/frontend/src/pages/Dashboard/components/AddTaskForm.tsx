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
		setValues({ ...values, [e.target.name]: e.target.value });
	};
	const onSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		console.log(values.labels.split(','));
		await fetch('/api/task', {
			body: JSON.stringify({ name: values.name, description: values.description, labels: values.labels.split(',') }),
			headers: { 'Content-Type': 'application/json' },
			method: 'POST',
		});
		afterSubmit();
	};

	return (
		<>
			<form onSubmit={onSubmitForm} data-testid="add-task-form">
				<Input name="name" type="text" label="Name" onChange={fieldDidChange} required={true} />
				<Input name="description" type="text" label="Description" onChange={fieldDidChange} required={true} />
				<Input name="labels" type="text" label="Input Label Id" onChange={fieldDidChange} />
				<Button type="submit">Add new Task</Button>
			</form>
		</>
	);
};
