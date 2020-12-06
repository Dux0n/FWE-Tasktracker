import React, { useEffect } from 'react';
import styled from 'styled-components/macro';
import { DeleteButton } from '../../../components/DeleteButton';
import { NormalButton } from '../../../components/NormalButton';
import { Tracking } from '../../Task/components/TrackingList';
import { StyledTop, StyledTopButton } from '../DashboardPage';

export interface Label {
	labelid: number;
	name: string;
	createdAt: Date;
	updatedAt: Date;
	tasks: Task[];
}

export interface Task {
	taskid: number;
	name: string;
	description: string;
	createdAt: Date;
	updatedAt: Date;
	labels: Label[];
	trackings: Tracking[];
}

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
export interface TaskItemProps {
	task: Task;
	onClick?: (task: Task) => void;
	fetchTask: () => void;
	showTracker: any;
	setShowTracker: any;
	setTrackerTaskID: any;
	setTrackerTaskName: any;
	timeTrackerState: any;
	setTimeTrackerState: any;
	time: any;
	setTime: any;
	timeEnd: any;
	setTimeStart: any;
	setTimeEnd: any;
	onPauseResumeState: any;
	setOnPauseResumeState: any;
	state: any;
	setState: any;
	actualTaskID: any;
	setActualTaskID: any;
}

export const TaskItem: React.FC<TaskItemProps> = ({
	task,
	onClick = () => {},
	fetchTask,
	showTracker,
	setShowTracker,
	setTrackerTaskName,
	setTrackerTaskID,
	timeTrackerState,
	setTimeTrackerState,
	time,
	setTime,
	timeEnd,
	setTimeStart,
	setTimeEnd,
	onPauseResumeState,
	setOnPauseResumeState,
	state,
	setState,
	actualTaskID,
	setActualTaskID,
}) => {
	const { name, description, labels, createdAt, updatedAt, trackings } = task;

	const deleteTask = async (taskobj: Task) => {
		await fetch(`/api/task/${taskobj.taskid}`, {
			headers: { 'Content-Type': 'application/json' },
			method: 'DELETE',
		});
		fetchTask();
	};

	let buttonText: string = 'Start Timer';
	const onStartHandle = () => {
		buttonText = state === 'Start Timer' ? 'Stop Timer' : 'Start Timer';
		setState(buttonText);
		setTrackerTaskName(task.name);
		setTrackerTaskID(task.taskid);

		if (timeTrackerState === false && onPauseResumeState === 'Pause') {
			setTime(0);
			setTimeTrackerState(true);
		} else if (timeTrackerState === false && onPauseResumeState === 'Resume') {
			setTime(0);
			setTimeTrackerState(false);
			setOnPauseResumeState('Pause');
		} else if (timeTrackerState === true && onPauseResumeState === 'Pause') {
			setTime(0);
			setTimeTrackerState(false);
			setOnPauseResumeState('Pause');
		}
		showTracker === false ? setShowTracker(true) : setShowTracker(false);
	};

	const totalTime = () => {
		let total: number = 0;
		if (trackings !== null) {
			trackings.forEach((element) => {
				total += Date.parse(element.timeend.toString()) - Date.parse(element.timestart.toString());
			});
		}

		const seconds = `0${(total / 1000) % 60}`.slice(-2);
		const minutes = `${Math.floor(total / 1000 / 60)}`;
		const getMinutes = `0${parseInt(minutes, 10) % 60}`.slice(-2);
		const hours = `0${Math.floor(total / 1000 / 3600)}`.slice(-2);

		return `Total Time: ${hours}:${getMinutes}:${seconds}`;
	};

	useEffect(() => {
		if (timeTrackerState) {
			setTimeout(() => {
				setTime(time + 1);
			}, 1000);
		}
	});

	return (
		<TaskList>
			<TaskItemStyle data-testid="task-item">
				<TaskHighlight />
				<TaskFlex
					onClick={() => {
						onClick(task);
					}}
				>
					<div>
						<TaskTitle>Task name: {name}</TaskTitle>
						<TaskDescription>Task description: {description}</TaskDescription>
						<TaskDate>Created at: {createdAt && createdAt.toLocaleString()}</TaskDate>
						<TaskDate>Updated at: {updatedAt && updatedAt.toLocaleString()}</TaskDate>
						<TaskDate>Total time: {totalTime()}</TaskDate>
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
							if (actualTaskID === 0) {
								onStartHandle();
								setActualTaskID(task.taskid);
								setTimeStart(new Date());
								setTimeEnd(new Date());
							} else if (actualTaskID === task.taskid) {
								onStartHandle();
								setActualTaskID(0);
							}
						}}
					>
						{actualTaskID === task.taskid ? state : 'Start Timer'}
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
