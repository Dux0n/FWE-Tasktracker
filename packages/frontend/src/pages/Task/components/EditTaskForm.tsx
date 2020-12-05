import React, { ChangeEvent, useState } from 'react';
import { Button } from '../../../components/Button';
import { Input } from '../../../components/Input';
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
		await fetch(`/api/task/${values.taskid}`, {
			body: JSON.stringify({
				name: values.name,
				// tslint:disable-next-line: object-literal-sort-keys
				description: values.description,
				labels: values.labels.toString().split(','),
			}),
			headers: { 'Content-Type': 'application/json' },
			method: 'PATCH',
		});

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

				<Button type="submit">Edit Task</Button>
			</form>
		</>
	);
};
