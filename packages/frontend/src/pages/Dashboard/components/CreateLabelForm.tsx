import React, { ChangeEvent, useState } from 'react';
import { Button } from '../../../components/Button';
import { Input } from '../../../components/Input';

export const CreateLabelForm: React.FC<{ afterSubmit: () => void }> = ({ afterSubmit }) => {
	const [values, setValues] = useState({
		name: '',
	});
	const fieldDidChange = (e: ChangeEvent<HTMLInputElement>) => {
		setValues({ ...values, [e.target.name]: e.target.value });
	};
	const onSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		await fetch('/api/label', {
			body: JSON.stringify({ name: values.name }),
			headers: { 'Content-Type': 'application/json' },
			method: 'POST',
		});
		afterSubmit();
	};

	return (
		<>
			<form onSubmit={onSubmitForm}>
				<Input name="name" type="text" label="Name" onChange={fieldDidChange} required={true} />
				<Button type="submit">Create Label</Button>
			</form>
		</>
	);
};
