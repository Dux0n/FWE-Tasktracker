import React, { ChangeEvent, useContext, useState } from "react";
import { Button } from "../../../components/Button";
import { Input } from "../../../components/Input";
import { Task } from "../../Dashboard/components/TaskList";

export const EditTaskForm: React.FC<{
  afterSubmit: () => void;
  task: Task;
}> = ({ afterSubmit, task }) => {
  console.log("init state ", task)
  const [values, setValues] = useState(task);

  const fieldDidChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const onSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(values);
    await fetch(`/api/task/${values.taskid}`, {
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
          name="name"
          type="text"
          label="Name"
          onChange={fieldDidChange}
          required
        />
        <Input
          name="description"
          type="text"
          label="Description"
          onChange={fieldDidChange}
          required
        />
        
        <Button type="submit">Edit Task</Button>
      </form>
    </>
  );
};


/*
<Input
          name="labels"
          type="text"
          label="Labels"
          onChange={fieldDidChange}
          required
        />
        */