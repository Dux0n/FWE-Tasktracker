import React, { useEffect, useState } from "react";
import styled, { ThemeProvider } from "styled-components/macro";
import { GlobalStyle } from "../../components/GlobalStyle";
import { Layout } from "../../components/Layout";
import { theme } from "../../theme";
import {
  Task,
  TaskDate,
  TaskDescription,
  TaskItemStyle,
  TaskTitle,
  TaskFlex,
  LabelList,
  Label,
} from "../Dashboard/components/TaskList";
import { EditButton } from "../../components/EditButton";
import { useParams } from "react-router-dom";
import {
  TrackingList,
  TrackingItem,
  Tracking,
} from "./components/TrackingList";
import { Modal } from "../../components/Modal";
import { EditTaskForm } from "./components/EditTaskFrom";
import { AddButton } from "../../components/AddButton";
import { AddTrackingForm } from "./components/AddTrackingForm";

export const TaskPage = () => {
  let { id }: any = useParams();
  const [task, setTask] = useState<Task>();
  const [editTaskVisible, setEditTaskVisible] = useState(false);
  const [editTask, setEditTask] = useState<Task | null>(null);
  const [addTrackingVisible, setAddTrackingVisible] = useState(false);
  const fetchTask = async function () {
    const transactionRequest = await fetch(`/api/task/${id}`, {
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
  let createdAt = task?.createdAt as Date;
  let updatedAt = task?.updatedAt as Date;
  var msDiff = new Date(updatedAt).getTime() - new Date(createdAt).getTime(); //Future date - current date
  var trackedtime = Math.floor(msDiff / (1000 * 60 * 60));
  //{task?.createdAt && task?.createdAt.toLocaleString()}
  return (
    <Layout>
      <div
        css={`
          display: flex;
          flex-direction: row;
          width: 100%;
        `}
      >
        <div
          css={`
            flex: 1;
            justify-content: flex-end;
            display: flex;
            align-items: top;
          `}
        >
          <EditButton
            onClick={() => {
              setEditTaskVisible(true);
              setEditTask(task!);
              fetchTask();
            }}
          />
        </div>
      </div>
      {editTaskVisible && (
        <Modal
          title="Edit Task"
          onCancel={() => {
            setEditTaskVisible(false);
          }}
        >
          <EditTaskForm
            afterSubmit={() => {
              setEditTaskVisible(false);
              fetchTask();
            }}
            task={editTask!}
          />
        </Modal>
      )}
      <TaskItemStyle>
        <TaskFlex>
          <div>
            <TaskTitle>{task?.name}</TaskTitle>
            <TaskDescription>{task?.description}</TaskDescription>
            <TaskDate>{createdAt && createdAt.toLocaleString()}</TaskDate>
          </div>
          <LabelList>
            {task?.labels &&
              task?.labels.map((label: Label) => {
                return <li key={label.id}>{label.name}</li>;
              })}
          </LabelList>
        </TaskFlex>
      </TaskItemStyle>
      <div
        css={`
          display: flex;
          flex-direction: row;
          width: 100%;
          padding-top: 3rem;
        `}
      >
        <div>
          <p
            css={`
              font-size: 24px;
              margin: 0;
            `}
          >
            Tracking
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
              setAddTrackingVisible(true);
            }}
          />
        </div>
      </div>
      {addTrackingVisible && (
        <Modal
          title="Add Tracking"
          onCancel={() => {
            setAddTrackingVisible(false);
          }}
        >
          <AddTrackingForm
            afterSubmit={() => {
              setAddTrackingVisible(false);
              fetchTask();
            }}
            task={task!}
          />
        </Modal>
      )}
      <TrackingList>
        {task?.trackings.map((tracking) => (
          <TrackingItem
            key={tracking.trackingid}
            tracking={tracking}
            fetchTask={fetchTask}
          ></TrackingItem>
        ))}
      </TrackingList>
    </Layout>
  );
};
