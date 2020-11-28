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
import { DeleteLabelForm } from "./components/DeleteLabelForm";
import { FilterForm } from "./components/FilterForm";
import { StopButton } from "../../components/StopButton";
import { TimeTrackingForm } from "./components/TimeTrackingForm";

const StyledTimer = styled.div`
  list-style: none;
  box-shadow: 0 0.125em 0.25em 0 ${(props) => props.theme.colors.shadowColor};
  width: 75%;
  padding: 0;
  margin: 0 auto;
  border-radius: 0.5rem;
  background-color: ${(props) => props.theme.colors.listBackgroundColor};
  flex: 1;
  justify-content: space-between;
  display: flex;
  align-items: top;
`;

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

const TrackingTime = styled.p`
  margin: 0;
  font-size: 0.8rem;
  color: ${(props) => props.theme.colors.secondaryFontColor};
`;

export const DashboardPage = () => {
  let history = useHistory();
  const [tasks, setTask] = useState<Task[]>([]);
  const [labels, setLabels] = useState<Label[]>([]);
  const [addTaskVisible, setAddTaskVisible] = useState(false);
  const [createLabelVisible, setCreateLabelVisible] = useState(false);
  const [deleteLabelVisible, setDeleteLabelVisible] = useState(false);
  const [showLabels, setShowLabels] = useState(false);
  const [showTracker, setShowTracker] = useState(false);
  const [trackerTask, setTrackerTask] = useState("");
  const [timeTrackerState, setTimeTrackerState] = useState(false);
  const [time, setTime] = useState<number>(0);
  const [filterTaskVisible, setFilterTaskVisible] = useState(false);
  const [timeStart, setTimeStart] = useState<Date>(new Date());
  const [timeEnd, setTimeEnd] = useState<Date>(new Date());
  const [onPauseResumeState, setOnPauseResumeState] = useState<string>("Pause");
  const [filter, setFilter] = useState({
    taskname: "",
    taskdescription: "",
    labelname: "",
  });

  const fetchTask = async function () {
    const taskRequest = await fetch(`/api/task?taskfilter=${filter.taskname}&descriptionfilter=${filter.taskdescription}&labelfilter=${filter.labelname}`,
      {
        headers: { "content-type": "application/json" },
      }
    );
    console.log(taskRequest);
    if (taskRequest.status === 200) {
      const taskJSON = await taskRequest.json();
      setTask(taskJSON.data);
    }
  };

  const fetchLabels = async function () {
    const labelRequest = await fetch(`/api/label`, {
      headers: { "content-type": "application/json" },
    });
    console.log(labelRequest);
    if (labelRequest.status === 200) {
      const taskJSON = await labelRequest.json();
      setLabels(taskJSON.data);
    }
  };

  let buttonText: string = "Pause";
  const onPauseResume = () => {
    if (onPauseResumeState === "Pause" && timeTrackerState == true) {
      buttonText = "Resume";
      setTimeTrackerState(false);
      console.log(buttonText);
    } else {
      buttonText = "Pause";
      setTimeTrackerState(true);
      console.log(buttonText);
    }
    setOnPauseResumeState(buttonText);
  };

  const seconds = `0${time % 60}`.slice(-2);
  const minutes = `${Math.floor(time / 60)}`;
  let getMinutes = `0${parseInt(minutes) % 60}`.slice(-2);
  const hours = `0${Math.floor(time / 3600)}`.slice(-2);

  useEffect(() => {
    fetchLabels();
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
              setFilterTaskVisible(true);
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
                setDeleteLabelVisible(true);
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
            {labels &&
              labels.map((label: Label) => {
                return (
                  <li key={label.labelid}>
                    {label.labelid}: {label.name}
                  </li>
                );
              })}
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
      {filterTaskVisible && (
        <Modal
          title="Filter Task"
          onCancel={() => {
            setFilterTaskVisible(false);
          }}
        >
          <FilterForm
            filter={filter}
            setFilter={setFilter}
            afterSubmit={() => {
              setFilterTaskVisible(false);
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
            showTracker={showTracker}
            setShowTracker={setShowTracker}
            setTrackerTask={setTrackerTask}
            timeTrackerState={timeTrackerState}
            setTimeTrackerState={setTimeTrackerState}
            time={time}
            setTime={setTime}
            setTimeStart={setTimeStart}
            setTimeEnd={setTimeEnd}
            onPauseResumeState={onPauseResumeState}
            setOnPauseResumeState={setOnPauseResumeState}
          ></TaskItem>
        ))}
      </TaskList>

      <StyledTimer>
        {showTracker ? (
          <>
            <div>
              <p
                css={`
                  font-size: 36px;
                  margin: 0;
                `}
              >
                {trackerTask}
              </p>
            </div>
            <div>
              <TrackingTime>
                {hours}:{getMinutes}:{seconds}
              </TrackingTime>
            </div>
            <TimeTrackingForm
              timeStart={timeStart}
              timeEnd={timeEnd}
              afterSubmit={() => {}}
            ></TimeTrackingForm>
            <NormalButton
              onClick={() => {
                onPauseResume();
                setTimeEnd(new Date(timeEnd.getTime() + 1000 * time));
              }}
            >
              {onPauseResumeState}
            </NormalButton>
          </>
        ) : null}
      </StyledTimer>
    </Layout>
  );
};
