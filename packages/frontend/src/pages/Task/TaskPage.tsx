import React, { useEffect, useState } from "react";
import styled, { ThemeProvider } from "styled-components";
import { GlobalStyle } from "../../components/GlobalStyle";
import { Layout } from "../../components/Layout";
import { theme } from "../../theme";
import {
  Task,
  TaskDate,
  TaskDescription,
  TaskHighlight,
  TaskItemStyle,
  TaskTitle,
} from "../Dashboard/components/TaskList";

let task: Task;

export const testfunc = (gettask: Task) => {
  console.log(gettask);
  task = gettask;
};

const TaskFlex = styled.div`
  display: flex;
  align-items: center;
`;

export const TaskPage = () => {
  const { name, description, createdAt, updatedAt, labels } = task;

  return (
    <Layout>
      <TaskItemStyle>
        <TaskHighlight />
        <TaskFlex>
          <div>
            <TaskTitle>{name}</TaskTitle>
            <TaskDescription>{description}</TaskDescription>
            <TaskDate>{createdAt && createdAt.toLocaleString()}</TaskDate>
          </div>
        </TaskFlex>
      </TaskItemStyle>
    </Layout>
  );
};
