import MaterialTable from "material-table";
import React, { useEffect, useState } from "react";
import styled from "styled-components/macro";
import { Label, Task } from "./TaskList";


const LabelList = styled.ul`
  list-style: none;
  flex-grow: 1;
  font-size: 0.8rem;

  align-self: flex-end;
  display: flex;
  & > li {
    margin-right: 0.5rem;
    padding: 0.125rem;
    border-radius: 0.25rem;
    background-color: ${(props) => props.theme.colors.primary};
    display: block;
    color: #333;
  }
`;
export const TaskTable = () => {
  const [tasks, setTask] = useState<Task[]>([]);

  const fetchTask = async function () {
    const transactionRequest = await fetch("/api/task", {
      headers: { "content-type": "application/json" },
    });
    console.log(transactionRequest);
    if (transactionRequest.status === 200) {
      const taskJSON = await transactionRequest.json();
      setTask(taskJSON.data);
    }
  };

  useEffect(() => {
    fetchTask();
  }, []);

  const columns = [
    {
      title: "Name",
      field: "name",
    },
    {
      title: "Description",
      field: "description",
    },
    {
        title: "Labels",
        field: "labels[]",
        render: tasks => (tasks.forEach((task: Task) => {
            task.labels.forEach((label: Label) => {
                <div key={label.id}>{label.name}</div>;
            });
        })),          
      },
    {
      title: "Total tracked Time",
      field: "timetracked",
    },
  ];

  return (
    <MaterialTable
      data={tasks}
      columns={columns}
      options={{
        search: false,
        paging: false,
        filtering: false,
        exportButton: true,
      }}
    />
  );
};
