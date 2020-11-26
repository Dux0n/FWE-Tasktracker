import React, { ChangeEvent, useContext, useState } from "react";
import { Button } from "../../../components/Button";
import { Input } from "../../../components/Input";
import { SelectInput, Option } from "../../../components/SelectInput";
import { Label, Task } from "../../Dashboard/components/TaskList";

export const DeleteLabelForm: React.FC<{
  afterSubmit: () => void;
  task: Task;
}> = ({ afterSubmit, task }) => {
  console.log("init state ", task);
  
  
  const [values, setValues] = useState(task);
  
  //
  //console.log(ids);
  
  const fieldDidChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const onSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(values.taskid);
    console.log(JSON.stringify({ labels: values.labels.toString().split(",") }));
    await fetch(`/api/task/${values.taskid}/deletelabel`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ "labels": values.labels.toString().split(",") }),
    });

    afterSubmit();
  };
  
  return (
    <>
      <form onSubmit={onSubmitForm}>
        <Input
          name="labels"
          type="text"
          label="Labels" 
          onChange={fieldDidChange}
          required
        />
        <Button type="submit">Delete Label</Button>
      </form>
    </>
  );
};
