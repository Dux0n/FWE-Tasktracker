import MaterialTable, {Icons} from "material-table";
import React, { forwardRef, useEffect, useState } from "react";
import styled from "styled-components/macro";
import { Label, Task } from "./TaskList";

import AddBox from '@material-ui/icons/AddBox';
import Edit from '@material-ui/icons/Edit';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import SaveAlt from '@material-ui/icons/SaveAlt';

const tableIcons: Icons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  };

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
        render: (rowData: any ) => (<LabelList>{rowData.labels.map((label: Label) => (
             <li key={label.id}>{label.name}</li>))}
          </LabelList>),
    },
    {
      title: "Total tracked Time",
      field: "timetracked",
    },
  ];

  return (
    <MaterialTable
      icons={tableIcons}
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

//  {rowData.labels.map((label: Label) =>
// (rowData: { labels: any[]; }) => rowData.labels ? rowData.labels.join() : "nooo"
/*
tasks => (tasks.forEach((task: Task) => {
            task.labels.forEach((label: Label) => {
                <div key={label.id}>{label.name}</div>;
            });
        })),          
        */