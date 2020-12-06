import React, { ChangeEvent, useState } from 'react';
import { Button } from '../../../components/Button';
import { Input } from '../../../components/Input/Input';

export const DeleteLabelForm: React.FC<{ afterSubmit: () => void }> = ({ afterSubmit }) => {
	const [values, setValues] = useState({
		labelname: '',
	});
	const fieldDidChange = (e: ChangeEvent<HTMLInputElement>) => {
		setValues({ ...values, [e.target.name]: e.target.value });
	};
	const onSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const taskRequest = await fetch('/api/label', {
			headers: { 'content-type': 'application/json' },
			method: 'GET',
		});
		console.log(taskRequest);
		if (taskRequest.status === 200) {
			const taskJSON = await taskRequest.json();

			for (let index = 0; index < Object.keys(taskJSON.data).length; index += 1) {
				if (taskJSON.data[index].name === values.labelname) {
					console.log(taskJSON.data[index].labelid);
					await fetch(`/api/label/${taskJSON.data[index].labelid}`, {
						headers: { 'Content-Type': 'application/json' },
						method: 'DELETE',
					});
					afterSubmit();
					return;
				}
			}
		}
		afterSubmit();
	};
	return (
		<>
			<form onSubmit={onSubmitForm}>
				<Input name="labelname" type="text" label="Label Name" onChange={fieldDidChange} required={true} />
				<Button type="submit">Delete a label</Button>
			</form>
		</>
	);
};
