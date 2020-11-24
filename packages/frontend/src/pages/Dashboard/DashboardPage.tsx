import React, { useEffect, useState } from "react";
import styled from "styled-components/macro";
import { Task, TaskList, TaskItem } from "./components/TaskList";
import { AddButton } from "./components/AddButton";
import { AddTaskForm } from "./components/AddTaskForm";
import { Modal } from "../../components/Modal.";
import { Layout } from "../../components/Layout";
import { SelectInput } from "../../components/SelectInput";
import { DeleteButton } from "./components/DeleteButton";
import { TaskPage } from "../Task/TaskPage"
import {
  useHistory,
} from "react-router-dom";

export const DashboardPage = () => {
  let history = useHistory();
  const [tasks, setTask] = useState<Task[]>([]);
  const [addTaskVisible, setAddTaskVisible] = useState(false);

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

  return (
    <Layout>
        <div
          css={`
            display: flex;
            flex-direction: row;
            width: 100%;
          `}
        >
          <div>
            <p
              css={`
                font-size: 36px;
                margin: 0;
              `}
            >
              Tasks
            </p>
          </div>
          <div
            css={`
              flex: 1;
              justify-content: flex-end;
              display: flex;
              align-items: top;
            `}
          >
            <AddButton
              onClick={() => {
                setAddTaskVisible(true);
              }}
            />
          </div>
        </div>
        {addTaskVisible && (
          <Modal
            title="Add Task"
            onCancel={() => {
              setAddTaskVisible(false);
            }}
          >
            <AddTaskForm
              afterSubmit={() => {
                setAddTaskVisible(false);
                fetchTask();
              }}
            />
          </Modal>
        )}
        <TaskList>
          {tasks.map((task) => (
            <TaskItem onClick = {() =>  {history.push(`/taskpage/${task.taskid}`) }} key={task.taskid} task={task}></TaskItem>
          ))}
        </TaskList>
    </Layout>
  );
};
