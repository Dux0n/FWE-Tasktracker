import React, { ChangeEvent, useState } from "react";
import { Button } from "../../../components/Button";
import { Input } from "../../../components/Input";
import { Task } from "../../Dashboard/components/TaskList";

export const EditTaskForm: React.FC<{
  afterSubmit: () => void;
  task: Task;
}> = ({ afterSubmit, task }) => {
  console.log("init state ", task);
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
      body: JSON.stringify({"name":values.name,"description":values.description,"labels": values.labels.toString().split(',')}),
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
          value={values.name}
          onChange={fieldDidChange}
          required
        />
        <Input
          name="description"
          type="text"
          label="Description"
          value={values.description}
          onChange={fieldDidChange}
          required
        />

        <Input
          name="labels"
          type="text"
          label="Label"
          onChange={fieldDidChange}
        />

        <Button type="submit">Edit Task</Button>
      </form>
    </>
  );
};
