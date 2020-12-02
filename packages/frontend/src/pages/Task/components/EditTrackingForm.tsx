import React, { ChangeEvent, useState } from "react";
import { Button } from "../../../components/Button";
import { Input } from "../../../components/Input";
import { Tracking } from "./TrackingList";

export const EditTrackingForm: React.FC<{
  afterSubmit: () => void;
  tracking: Tracking;
}> = ({ afterSubmit, tracking }) => {
  console.log("init state ", tracking);
  const [values, setValues] = useState(tracking);

  const fieldDidChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const onSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(values);
    await fetch(`/api/tracking/${values.trackingid}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
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
          required
        />

        <Input
          name="timestart"
          type="text"
          label="Start Time"
          value={values.timestart.toString()}
          onChange={fieldDidChange}
          required
        />

        <Input
          name="timeend"
          type="text"
          label="End Time"
          value={values.timeend.toString()}
          onChange={fieldDidChange}
          required
        />

        <Button type="submit">Edit Tracking</Button>
      </form>
    </>
  );
};
