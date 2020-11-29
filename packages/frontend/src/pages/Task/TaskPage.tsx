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
import { EditTaskForm } from "./components/EditTaskForm";
import { AddButton } from "../../components/AddButton";
import { AddTrackingForm } from "./components/AddTrackingForm";
import { NormalButton } from "../../components/NormalButton";
import { DeleteLabelForm } from "../Task/components/DeleteLabelsFromTaskForm";
import { StyledP, StyledTop, StyledTopButton } from "../Dashboard/DashboardPage";

export const TaskPage = () => {
  let { id }: any = useParams();
  const [task, setTask] = useState<Task>();
  const [labels, setLabels] = useState<Label[]>([]);
  const [editTaskVisible, setEditTaskVisible] = useState(false);
  const [editTask, setEditTask] = useState<Task | null>(null);
  const [addTrackingVisible, setAddTrackingVisible] = useState(false);
  const [deleteLabelFromTask, setDeleteLabelFromTask] = useState<Task | null>(null);
  const [showLabels, setShowLabels] = useState(false);
  const [deleteLabelFromTaskVisible, setDeleteLabelFromTaskVisible] = useState(
    false
  );
  const fetchTask = async function () {
    const taskRequest = await fetch(`/api/task/${id}`, {
      headers: { "content-type": "application/json" },
    });
    console.log(taskRequest);
    if (taskRequest.status === 200) {
      const taskJSON = await taskRequest.json();
      setTask(taskJSON.data);
    }
  };

  const fetchLabels = async function () {
    const labelRequest = await fetch(`/api/label`,{
    headers: { "content-type": "application/json" },
  });
  console.log(labelRequest);
  if (labelRequest.status === 200) {
    const taskJSON = await labelRequest.json();
    setLabels(taskJSON.data);
  }
  }

  const totalTime = () => {
    let total: number = 0;
    task?.trackings.forEach(element => {
      total += Date.parse(element.timeend.toString()) - Date.parse(element.timestart.toString());

    });
    const seconds = `0${total/1000 % 60}`.slice(-2);
    const minutes = `${Math.floor(total/1000 / 60)}`;
    let getMinutes = `0${parseInt(minutes) % 60}`.slice(-2);
    const hours = `0${Math.floor(total/1000 / 3600)}`.slice(-2);
      
      
      return `${hours}:${getMinutes}:${seconds}`
  }

  useEffect(() => {
    fetchTask();
    fetchLabels();
  }, []);
  
  //{task?.createdAt && task?.createdAt.toLocaleString()}
  return (
    <Layout>
      <StyledTop>
        <StyledTopButton>
          <EditButton
            onClick={() => {
              setEditTaskVisible(true);
              setEditTask(task!);
              fetchTask();
            }}
          />
          <NormalButton
            onClick={() => {
              {
                showLabels == false
                  ? setShowLabels(true)
                  : setShowLabels(false);
              }
            }}
          >
            Show Labels
          </NormalButton>
        </StyledTopButton>
      </StyledTop>
      <div>
        {showLabels ? (
          <LabelList>
          {labels &&
            labels.map((label: Label) => {
              return <li key={label.labelid}>{label.name}</li>;
            })}
        </LabelList>
        ) : null}
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
            <TaskDate>{totalTime()}</TaskDate>
          </div>
          <LabelList>
            {task?.labels &&
              task?.labels.map((label: Label) => {
                return <li key={label.labelid}>{label.name}</li>;
              })}
          </LabelList>

          <NormalButton
            onClick={() => {
              setDeleteLabelFromTaskVisible(true);
              setDeleteLabelFromTask(task!);
              fetchTask();
            }}
          >
            Delete Labels
          </NormalButton>
          {deleteLabelFromTaskVisible && (
            <Modal
              title="Delete Label"
              onCancel={() => {
                setDeleteLabelFromTaskVisible(false);
              }}
            >
              <DeleteLabelForm
                afterSubmit={() => {
                  setDeleteLabelFromTaskVisible(false);
                  fetchTask();
                }}
                task={deleteLabelFromTask!}
              />
            </Modal>
          )}
        </TaskFlex>
      </TaskItemStyle>
      <StyledTopButton>
        <div>
          <StyledP>
            Tracking
          </StyledP>
        </div>
        <StyledTopButton>
          <AddButton
            onClick={() => {
              setAddTrackingVisible(true);
            }}
          />
        </StyledTopButton>
      </StyledTopButton>
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
