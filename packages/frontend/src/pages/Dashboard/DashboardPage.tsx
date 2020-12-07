import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components/macro';
import { AddButton } from '../../components/AddButton';
import { Layout } from '../../components/Layout';
import { Modal } from '../../components/Modal';
import { NormalButton } from '../../components/NormalButton';
import { AddTaskForm } from './components/AddTaskForm';
import { CreateLabelForm } from './components/CreateLabelForm';
import { DeleteLabelForm } from './components/DeleteLabelForm';
import { FilterForm } from './components/FilterForm';
import { Label, LabelList, Task, TaskItem, TaskList } from './components/TaskList';
import { TimeTrackingForm } from './components/TimeTrackingForm';

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
	font-size: 1.5rem;
	color: ${(props) => props.theme.colors.secondaryFontColor};
`;

export const DashboardPage = () => {
	const history = useHistory();
	const [tasks, setTask] = useState<Task[]>([]);
	const [labels, setLabels] = useState<Label[]>([]);
	const [addTaskVisible, setAddTaskVisible] = useState(false);
	const [createLabelVisible, setCreateLabelVisible] = useState(false);
	const [deleteLabelVisible, setDeleteLabelVisible] = useState(false);
	const [showLabels, setShowLabels] = useState(false);
	const [trackerTaskName, setTrackerTaskName] = useState();
	const [trackerTaskID, setTrackerTaskID] = useState();
	const [time, setTime] = useState<number>(0);
	const [filterTaskVisible, setFilterTaskVisible] = useState(false);
	const [timeStart, setTimeStart] = useState<Date>(new Date());
	const [timeEnd, setTimeEnd] = useState<Date>(new Date());
	const [onPauseResumeState, setOnPauseResumeState] = useState<string>('Pause');
	const [state, setState] = useState<string>('Start Timer');
	const [timeTrackerState, setTimeTrackerState] = useState(false);
	const [showTracker, setShowTracker] = useState(false);
	const [actualTaskID, setActualTaskID] = useState<number>(0);
	const [filter, setFilter] = useState({
		labelname: '',
		taskdescription: '',
		taskname: '',
	});

	const fetchTask = async () => {
		const taskRequest = await fetch(
			`/api/task?taskfilter=${filter.taskname}&descriptionfilter=${filter.taskdescription}&labelfilter=${filter.labelname}`,
			{
				headers: { 'content-type': 'application/json' },
				method: 'GET',
			},
		);
		console.log(taskRequest);
		if (taskRequest.status === 200) {
			const taskJSON = await taskRequest.json();
			// console.log('te', taskJSON);
			setTask(taskJSON.data);
		}
	};

	const fetchLabels = async () => {
		const labelRequest = await fetch(`/api/label`, {
			headers: { 'content-type': 'application/json' },
		});
		console.log(labelRequest);
		if (labelRequest.status === 200) {
			const taskJSON = await labelRequest.json();
			setLabels(taskJSON.data);
		}
	};

	let buttonText: string = 'Pause';
	const onPauseResume = () => {
		if (onPauseResumeState === 'Pause' && timeTrackerState) {
			buttonText = 'Resume';
			setTimeTrackerState(false);
		} else if (onPauseResumeState === 'Pause' && !timeTrackerState) {
			buttonText = 'Pause';
			setTimeTrackerState(false);
		} else if (onPauseResumeState === 'Resume' && !timeTrackerState) {
			buttonText = 'Pause';
			setTimeTrackerState(true);
		} else if (onPauseResumeState === 'Resume' && timeTrackerState) {
			buttonText = 'Pause';
			setTimeTrackerState(false);
		}
		setOnPauseResumeState(buttonText);
	};

	const seconds = `0${time % 60}`.slice(-2);
	const minutes = `${Math.floor(time / 60)}`;
	const getMinutes = `0${parseInt(minutes, 10) % 60}`.slice(-2);
	const hours = `0${Math.floor(time / 3600)}`.slice(-2);

	useEffect(() => {
		fetchLabels();
		fetchTask();
	}, []); // eslint-disable-line react-hooks/exhaustive-deps

	useEffect(() => {
		if (filter) {
			fetchLabels();
			fetchTask();
		}
	}, [filter]); // eslint-disable-line react-hooks/exhaustive-deps

	return (
		<Layout>
			<StyledTop>
				<div>
					<StyledP>Tasks</StyledP>
				</div>
				<StyledTopButton>
					<AddButton
						data-testid="add-task-button"
						onClick={() => {
							setAddTaskVisible(true);
						}}
					/>
					<NormalButton
						data-testid="create-label-button"
						onClick={() => {
							setCreateLabelVisible(true);
						}}
					>
						Create Label
					</NormalButton>
					<NormalButton
						data-testid="filter-task-button"
						onClick={() => {
							setFilterTaskVisible(true);
						}}
					>
						Filter Task
					</NormalButton>
					<NormalButton
						data-testid="show-labels-button"
						onClick={() => {
							!showLabels ? setShowLabels(true) : setShowLabels(false);
						}}
					>
						Show Labels
					</NormalButton>
					<NormalButton
						data-testid="delete-label-button"
						onClick={() => {
							setDeleteLabelVisible(true);
						}}
					>
						Delete Label
					</NormalButton>
				</StyledTopButton>
			</StyledTop>
			<div>
				{showLabels ? (
					<LabelList data-testid="label-list-id">
						{labels &&
							labels.map((label: Label) => {
								return <li key={label.labelid}>{label.name}</li>;
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
							fetchLabels();
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
							fetchLabels();
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
			<TaskList data-testid="task-list-id">
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
						setTrackerTaskName={setTrackerTaskName}
						setTrackerTaskID={setTrackerTaskID}
						timeTrackerState={timeTrackerState}
						setTimeTrackerState={setTimeTrackerState}
						time={time}
						setTime={setTime}
						setTimeStart={setTimeStart}
						timeEnd={timeEnd}
						setTimeEnd={setTimeEnd}
						onPauseResumeState={onPauseResumeState}
						setOnPauseResumeState={setOnPauseResumeState}
						state={state}
						setState={setState}
						actualTaskID={actualTaskID}
						setActualTaskID={setActualTaskID}
					/>
				))}
			</TaskList>

			<StyledTimer>
				{showTracker ? (
					<>
						<div>
							<p
								css={`
									font-size: 24px;
									margin: 0;
								`}
							>
								Task name: {trackerTaskName}
							</p>
						</div>
						<div>
							<TrackingTime>
								Duration: {hours}:{getMinutes}:{seconds}
							</TrackingTime>
						</div>
						<TimeTrackingForm
							timeStart={timeStart}
							timeEnd={timeEnd}
							trackerTaskID={trackerTaskID}
							time={time}
							afterSubmit={() => {
								setState('Start Timer');
								setTimeTrackerState(false);
								setOnPauseResumeState('Pause');
								setShowTracker(false);
								fetchTask();
							}}
						/>
						<NormalButton
							onClick={() => {
								onPauseResume();
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
