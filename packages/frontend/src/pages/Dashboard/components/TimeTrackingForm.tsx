import React, { ChangeEvent, useState } from "react";
import { Button } from "../../../components/Button";
import { InputTracking } from "../../../components/InputTracking";


export const TimeTrackingForm: React.FC<{
  afterSubmit: () => void;
  timeStart: Date;
  timeEnd: Date;
  trackerTaskID: any;
  time: any;
}> = ({ afterSubmit, timeStart, timeEnd, trackerTaskID, time }) => {
  const [values, setValues] = useState({
    description: "",
  });
  const fieldDidChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  timeEnd = new Date(timeEnd.getTime() + 1000 * time);
  const onSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await fetch("/api/tracking", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        description: values.description,
        taskId: trackerTaskID,
        timestart: timeStart,
        timeend: timeEnd,
      }),
    });
    afterSubmit();
  };

  return (
    <>
      <form onSubmit={onSubmitForm}>
        <InputTracking
          name="description"
          type="text"
          label="What did you do?"
          onChange={fieldDidChange}
          required
        />

        <Button type="submit">Save Tracking</Button>
      </form>
    </>
  );
};
