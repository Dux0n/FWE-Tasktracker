import React, { ChangeEvent, useState } from 'react';
import { Button } from '../../../components/Button';
import { Input } from '../../../components/Input/Input';

export const TimeTrackingForm: React.FC<{
	afterSubmit: () => void;
	timeStart: Date;
	timeEnd: Date;
	trackerTaskID: any;
	time: any;
	setTrackerTaskID: any;
}> = ({ afterSubmit, timeStart, timeEnd, trackerTaskID, time, setTrackerTaskID }) => {
	const [values, setValues] = useState({
		description: '',
	});
	const fieldDidChange = (e: ChangeEvent<HTMLInputElement>) => {
		e.target.value = e.target.value.replace(/[^a-zA-Z0-9 ]/g, "");
		setValues({ ...values, [e.target.name]: e.target.value });
	};
	const newTimeEnd = new Date(timeEnd.getTime() + 1000 * time);
	const onSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		await fetch('/api/tracking', {
			body: JSON.stringify({
				description: values.description,
				taskId: trackerTaskID,
				timestart: timeStart,
				// tslint:disable-next-line: object-literal-sort-keys
				timeend: newTimeEnd,
			}),
			headers: { 'Content-Type': 'application/json' },
			method: 'POST',
		});
		setTrackerTaskID(0);
		afterSubmit();
	};

	return (
		<>
			<form onSubmit={onSubmitForm}>
				<Input name="description" type="text" label="What did you do?" onChange={fieldDidChange} required={true} />
				<Button type="submit">Save Tracking</Button>
			</form>
		</>
	);
};
