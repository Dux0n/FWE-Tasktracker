import React from "react";
import styled from "styled-components";
import { TaskPage } from "../../Task/TaskPage";
import { AddButton } from "./AddButton";
import {
  BrowserRouter,
  Switch,
  Route,
  Redirect,
  RouteProps,
} from "react-router-dom";


export type Label = {
  id: number;
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

const TaskFlex = styled.div`
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
  padding: 0.7rem 2rem;
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
};

export const TaskItem: React.FC<TaskItemProps> = ({
  task,
  onClick = () => {return (<Redirect to="/taskpage" />);},
}) => {
  const { name, description, createdAt, updatedAt, labels } = task;
  return (
    <TaskItemStyle >
      <TaskHighlight />
      <TaskFlex onClick ={ () => {
      //console.log(task);
      onClick(task); 
    }}>
        <div>
          <TaskTitle>{name}</TaskTitle>
          <TaskDescription>{description}</TaskDescription>
          <TaskDate>{createdAt && createdAt.toLocaleString()}</TaskDate>
        </div>
        <LabelList>
          {labels &&
            labels.map((label: Label) => {
              return <li key={label.id}>{label.name}</li>;
            })}
        </LabelList>
      </TaskFlex>
      <AddButton
              
            />
    </TaskItemStyle>
  );
};
