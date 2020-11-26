import React, { useEffect, useState } from "react";
import styled from "styled-components/macro";
import {
  Task,
  TaskList,
  TaskItem,
  LabelList,
  Label,
} from "./components/TaskList";
import { AddButton } from "../../components/AddButton";
import { AddTaskForm } from "./components/AddTaskForm";
import { Modal } from "../../components/Modal";
import { Layout } from "../../components/Layout";
import { SelectInput } from "../../components/SelectInput";
import { DeleteButton } from "../../components/DeleteButton";
import { TaskPage } from "../Task/TaskPage";
import { useHistory } from "react-router-dom";
import { NormalButton } from "../../components/NormalButton";
import { CreateLabelForm } from "./components/CreateLabelForm";
import { DeleteLabelForm } from "./components/DeleteLabelForm"
import { FilterForm } from "./components/FilterForm";
const StyledTimer = styled.div``;

const StyledLabels = styled.div``;

export const StyledTop = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
`;

export const StyledTopButton = styled.div`
  flex: 1;
  justify-content: flex-end;
  display: flex;
  align-items: top;
`;

export const StyledP = styled.p`
  font-size: 36px;
  margin: 0;
`;

export const DashboardPage = () => {
  let history = useHistory();
  const [tasks, setTask] = useState<Task[]>([]);
  const [addTaskVisible, setAddTaskVisible] = useState(false);
  const [createLabelVisible, setCreateLabelVisible] = useState(false);
  const [deleteLabelVisible, setDeleteLabelVisible] = useState(false);
  const [showLabels, setShowLabels] = useState(false);
  const [filterTask, setFilterTask] = useState(false);
  const [filter, setFilter] = useState({ labelname: "", name: "", description: "" });

  const fetchTask = async function () {
    const taskRequest = await fetch(`/api/task?taskfilter=${filter.name}&descriptionfilter=${filter.description}&labelfilter=${filter.labelname}`, {
      headers: { "content-type": "application/json" },
    });
    console.log(taskRequest);
    if (taskRequest.status === 200) {
      const taskJSON = await taskRequest.json();
      setTask(taskJSON.data);
    }
  };

  useEffect(() => {
    fetchTask();
  }, [filter]);

  return (
    <Layout>
      <StyledTop>
        <div>
          <StyledP>Tasks</StyledP>
        </div>
        <StyledTopButton>
          <AddButton
            onClick={() => {
              setAddTaskVisible(true);
            }}
          />
          <NormalButton
            onClick={() => {
              setCreateLabelVisible(true);
            }}
          >
            Create Label
          </NormalButton>
          <NormalButton
            onClick={() => {
              setFilterTask(true);
            }}
          >
            Filter Task
          </NormalButton>
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
          <NormalButton
            onClick={() => {
              {
                setDeleteLabelVisible(true)
              }
            }}
          >
            Delete Labels
          </NormalButton>
        </StyledTopButton>
      </StyledTop>
      <div>
        {showLabels ? (
          <LabelList>
            {tasks.map(
              (task) =>
                task.labels &&
                task.labels.map((label: Label) => {
                  return <li key={label.labelid}>{label.labelid}: {label.name}</li>;
                })
            )}
          </LabelList>
        ) : null}
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
      {createLabelVisible && (
        <Modal
          title="Create Label"
          onCancel={() => {
            setCreateLabelVisible(false);
          }}
        >
          <CreateLabelForm
            afterSubmit={() => {
              setCreateLabelVisible(false);
              fetchTask();
            }}
          />
        </Modal>
      )}
      {deleteLabelVisible && (
        <Modal
          title="Delete Label"
          onCancel={() => {
            setDeleteLabelVisible(false);
          }}
        >
          <DeleteLabelForm
            afterSubmit={() => {
              setDeleteLabelVisible(false);
              fetchTask();
            }}
          />
        </Modal>
      )}
      {filterTask && (
        <Modal
          title="Filter Task"
          onCancel={() => {
            setFilterTask(false);
          }}
        >
          <FilterForm filter={filter} setFilter={setFilter}
            afterSubmit={() => {
              setFilterTask(false);
            }}

          />
        </Modal>
      )}
      <TaskList>
        {tasks.map((task) => (
          <TaskItem
            onClick={() => {
              history.push(`/taskpage/${task.taskid}`);
            }}
            key={task.taskid}
            task={task}
            fetchTask={fetchTask}
          ></TaskItem>
        ))}
      </TaskList>

      <StyledTimer> Test </StyledTimer>
    </Layout>
  );
};
