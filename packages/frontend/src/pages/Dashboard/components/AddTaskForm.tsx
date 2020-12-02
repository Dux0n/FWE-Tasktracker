import React, { ChangeEvent, useState } from "react";
import { Button } from "../../../components/Button";
import { Input } from "../../../components/Input";

export const AddTaskForm: React.FC<{afterSubmit:() => void}> = ({afterSubmit}) => {
  const [values, setValues] = useState({
    name: "",
    description: "",
    labels: "",
  });
  const fieldDidChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const onSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(values.labels.split(","));
    await fetch("/api/task", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({"name":values.name, "description":values.description, "labels":values.labels.split(",")}),
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
        <Input
          name="labels"
          type="text"
          label="Input Label Id"
          onChange={fieldDidChange}
          required
        />
        <Button type="submit">Add Task</Button>
      </form>
    </>
  );
};
