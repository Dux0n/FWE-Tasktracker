import React, { useEffect, useState } from "react";
import styled from "styled-components/macro";
import { TaskPage } from "../../Task/TaskPage";
import { AddButton } from "../../../components/AddButton";
import { Redirect } from "react-router-dom";
import { Tracking } from "../../Task/components/TrackingList";
import { DeleteButton } from "../../../components/DeleteButton";
import { NormalButton } from "../../../components/NormalButton";
import { StyledTop, StyledTopButton } from "../DashboardPage";

export type Label = {
  labelid: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  tasks: Task[];
};

export type Task = {
  taskid: number;
  name: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  labels: Label[];
  trackings: Tracking[];
};

export const LabelList = styled.ul`
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

export const TaskFlex = styled.div`
  display: flex;
  align-items: center;
`;

export const TaskHighlight = styled.span`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  display: none;
  width: 4px;
  background-color: ${(props) => props.theme.colors.primary};
`;

export const TaskItemStyle = styled.div`
  margin: 0;
  min-height: 3rem;
  position: relative;
  padding: 0.7rem 0.7rem;
  &:hover {
    ${TaskHighlight} {
      display: block;
    }
  }
`;
export const TaskList = styled.ul`
  list-style: none;
  box-shadow: 0 0.125em 0.25em 0 ${(props) => props.theme.colors.shadowColor};
  width: 100%;
  padding: 0;
  border-radius: 0.5rem;
  background-color: ${(props) => props.theme.colors.listBackgroundColor};
  ${TaskItemStyle} {
    border-bottom: 1px ${(props) => props.theme.colors.shadowColor} solid;
    &:last-of-type {
      border-bottom: 0;
    }
  }
`;

export const TaskTitle = styled.p`
  font-size: 1.1rem;
  font-weight: 500;
  margin: 0;
`;

export const TaskDescription = styled.p`
  font-size: 0.8rem;
  margin: 0;
`;
export const TaskDate = styled.p`
  margin: 0;
  font-size: 0.8rem;
  color: ${(props) => props.theme.colors.secondaryFontColor};
`;
export const TaskValue = styled.span`
  white-space: nowrap;
`;
export type TaskItemProps = {
  task: Task;
  onClick?: (task: Task) => void;
  fetchTask: () => void;
  showTracker: any;
  setShowTracker: any;
  setTrackerTask: any;
  timeTrackerState: any;
  setTimeTrackerState: any;
  time: any;
  setTime: any;
  setTimeStart: any;
  setTimeEnd: any;
  onPauseResumeState:any;
  setOnPauseResumeState: any;
};

export const TaskItem: React.FC<TaskItemProps> = ({
  task,
  onClick = () => {
    return <Redirect to="/taskpage" />;
  },
  fetchTask,
  showTracker,
  setShowTracker,
  setTrackerTask,
  timeTrackerState,
  setTimeTrackerState,
  time,
  setTime,
  setTimeStart,
  setTimeEnd,
  onPauseResumeState,
  setOnPauseResumeState,
}) => {
  const { name, description, createdAt, updatedAt, labels } = task;

  const deleteTask = async function (task: Task) {
    await fetch(`/api/task/${task.taskid}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });
    fetchTask();
  };

  const [state, setState] = useState<string>("Start Timer");
  let buttonText: string = "Start Timer";
  const onStartHandle = () => {
    buttonText = state === "Start Timer" ? "Stop Timer" : "Start Timer";
    setState(buttonText);
    setTrackerTask(task.name);
    
    if (timeTrackerState == false && onPauseResumeState === "Pause") {
      setTimeTrackerState(true);
      setTime(0);
      console.log(timeTrackerState,1);
    } else if(timeTrackerState == false && onPauseResumeState === "Resume"){
      setTimeTrackerState(false);
      setTime(0);
      setOnPauseResumeState("Pause");
      console.log(timeTrackerState, 2);
    } else if(timeTrackerState == true && onPauseResumeState === "Pause"){
      setTimeTrackerState(false);
      setTime(0);
      setOnPauseResumeState("Pause");
      console.log(timeTrackerState, 3);
    }
    showTracker == false ? setShowTracker(true) : setShowTracker(false);
  };

  useEffect(() => {
    if (timeTrackerState) {
      const timer = setTimeout(() => {
        console.log(time);
        setTime(time + 1);
        //console.log(time);
      }, 1000);
    }
  });

  return (
    <TaskList>
      <TaskItemStyle>
        <TaskHighlight />
        <TaskFlex
          onClick={() => {
            onClick(task);
          }}
        >
          <div>
            <TaskTitle>{name}</TaskTitle>
            <TaskDescription>{description}</TaskDescription>
            <TaskDate>{createdAt && createdAt.toLocaleString()}</TaskDate>
          </div>
          <LabelList>
            {labels &&
              labels.map((label: Label) => {
                return <li key={label.labelid}>{label.name}</li>;
              })}
          </LabelList>
        </TaskFlex>
        <StyledTop>
          <NormalButton
            onClick={() => {
              onStartHandle();
              setTimeStart(new Date());
              setTimeEnd(new Date());
            }}
          >
            {state}
          </NormalButton>
          <StyledTopButton>
            <DeleteButton
              onClick={() => {
                deleteTask(task);
              }}
            />
          </StyledTopButton>
        </StyledTop>
      </TaskItemStyle>
    </TaskList>
  );
};
