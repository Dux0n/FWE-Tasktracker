import React, { ChangeEvent, useState } from 'react';
import { Button } from '../../../components/Button';
import { Input } from '../../../components/Input/Input';

export const DeleteLabelForm: React.FC<{ afterSubmit: () => void }> = ({ afterSubmit }) => {
	const [values, setValues] = useState({
		labelid: '',
	});
	const fieldDidChange = (e: ChangeEvent<HTMLInputElement>) => {
		setValues({ ...values, [e.target.name]: e.target.value });
	};
	const onSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		await fetch(`/api/label/${values.labelid}`, {
			body: JSON.stringify({ labelid: values.labelid }),
			headers: { 'Content-Type': 'application/json' },
			method: 'DELETE',
		});
		afterSubmit();
	};

	return (
		<>
			<form onSubmit={onSubmitForm}>
				<Input name="labelid" type="text" label="Label ID" onChange={fieldDidChange} required={true} />
				<Button type="submit">Create Label</Button>
			</form>
		</>
	);
};
