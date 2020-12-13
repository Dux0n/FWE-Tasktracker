import React, { ChangeEvent, useState } from 'react';
import { Button } from '../../../components/Button';
import { Input } from '../../../components/Input/Input';

export const FilterForm: React.FC<{ afterSubmit: () => void; filter: any; setFilter: any }> = ({
	afterSubmit,
	filter,
	setFilter,
}) => {
	const [values, setValues] = useState({
		labelname: '',
		taskdescription: '',
		taskname: '',
	});
	const fieldDidChange = (e: ChangeEvent<HTMLInputElement>) => {
		e.target.value = e.target.value.replace(/[^a-zA-Z0-9 ]/g, "");
		setValues({ ...values, [e.target.name]: e.target.value });
	};

	const onSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		console.log(values);
		setFilter(values);
		afterSubmit();
	};

	return (
		<>
			<form onSubmit={onSubmitForm}>
				<Input name="taskname" type="text" label="Name" onChange={fieldDidChange} />
				<Input name="taskdescription" type="text" label="Description" onChange={fieldDidChange} />
				<Input name="labelname" type="text" label="Label" onChange={fieldDidChange} />
				<Button type="submit">Use current filter</Button>
			</form>
		</>
	);
};
