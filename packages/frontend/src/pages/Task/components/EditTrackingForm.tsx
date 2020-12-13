import React, { ChangeEvent, useState } from 'react';
import { Button } from '../../../components/Button';
import { Input } from '../../../components/Input/Input';
import { Tracking } from './TrackingList';

export const EditTrackingForm: React.FC<{
	afterSubmit: () => void;
	tracking: Tracking;
}> = ({ afterSubmit, tracking }) => {
	console.log('init state ', tracking);
	const [values, setValues] = useState(tracking);

	const fieldDidChange = (e: ChangeEvent<HTMLInputElement>) => {
		e.target.value = e.target.value.replace(/[^a-zA-Z0-9 ]/g, "");
		setValues({ ...values, [e.target.name]: e.target.value });
	};
	const onSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		console.log(values);
		await fetch(`/api/tracking/${values.trackingid}`, {
			body: JSON.stringify(values),
			headers: { 'Content-Type': 'application/json' },
			method: 'PATCH',
		});
		afterSubmit();
	};

	return (
		<>
			<form onSubmit={onSubmitForm}>
				<Input
					name="description"
					type="text"
					label="Description"
					value={values.description}
					onChange={fieldDidChange}
					required={true}
				/>

				<Input
					name="timestart"
					type="text"
					label="Start Time"
					value={values.timestart.toString()}
					onChange={fieldDidChange}
					required={true}
				/>

				<Input
					name="timeend"
					type="text"
					label="End Time"
					value={values.timeend.toString()}
					onChange={fieldDidChange}
					required={true}
				/>

				<Button type="submit">Edit Tracking</Button>
			</form>
		</>
	);
};
