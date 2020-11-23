import React, { useEffect, useState } from "react";
import { ThemeProvider } from "styled-components";
import { GlobalStyle } from "../../components/GlobalStyle";
import { theme } from "../../theme";
import { Task, TaskDate, TaskDescription, TaskHighlight, TaskItemStyle, TaskTitle } from "../Dashboard/components/TaskList";

let task: Task;

export const testfunc = (gettask: Task) => {
  console.log(gettask);
  task=gettask;
  
}


export const TaskPage = () => {

  const { name, description, createdAt, updatedAt, labels } = task;
  
    return (
      <TaskItemStyle >
      <TaskHighlight />
      <TaskFlex >
        <div>
          <TaskTitle>{name}</TaskTitle>
          <TaskDescription>{description}</TaskDescription>
          <TaskDate>{createdAt && createdAt.toLocaleString()}</TaskDate>
        </div>
      </TaskFlex>
      <AddButton
              
            />
    </TaskItemStyle>
    );
  };