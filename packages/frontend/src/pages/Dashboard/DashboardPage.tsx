import React, { useEffect, useState } from "react";
import styled from "styled-components/macro";
import { Task, TaskList, TaskItem } from "./components/TaskList";
import { AddButton } from "./components/AddButton";
import { AddTaskForm } from "./components/AddTaskForm";

export const DashboardPage = () => {
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
    <div>
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
        <AddTaskForm
          afterSubmit={() => {
            setAddTaskVisible(false);
            fetchTask();
          }}
        />
      )}
      <TaskList>
        {tasks.map((task) => (
          <TaskItem key={task.taskid} task={task}></TaskItem>
        ))}
      </TaskList>
    </div>
  );
};
