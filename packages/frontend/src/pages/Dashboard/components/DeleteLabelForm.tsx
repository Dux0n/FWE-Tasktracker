import React, { ChangeEvent, useState } from 'react';
import { Button } from '../../../components/Button';
import { Input } from '../../../components/Input/Input';

export const DeleteLabelForm: React.FC<{ afterSubmit: () => void }> = ({ afterSubmit }) => {
	const [values, setValues] = useState({
		labelname: '',
	});
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
			const taskJSON = await labelRequest.json();

			for (let index = 0; index < Object.keys(taskJSON.data).length; index += 1) {
				if (taskJSON.data[index].name === values.labelname) {
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
