import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AddButton } from '../../components/AddButton';
import { EditButton } from '../../components/EditButton';
import { Layout } from '../../components/Layout';
import { Modal } from '../../components/Modal';
import { NormalButton } from '../../components/NormalButton';
import {
	Label,
	LabelList,
	Task,
	TaskDate,
	TaskDescription,
	TaskFlex,
	TaskItemStyle,
	TaskTitle,
} from '../Dashboard/components/TaskList';
import { StyledP, StyledTop, StyledTopButton } from '../Dashboard/DashboardPage';
import { DeleteLabelForm } from '../Task/components/DeleteLabelsFromTaskForm';
import { AddTrackingForm } from './components/AddTrackingForm';
import { EditTaskForm } from './components/EditTaskForm';
import { TrackingItem, TrackingList } from './components/TrackingList';

export const TaskPage = () => {
	const { id }: any = useParams();
	const [task, setTask] = useState<Task>();
	const [labels, setLabels] = useState<Label[]>([]);
	const [editTaskVisible, setEditTaskVisible] = useState(false);
	const [editTask, setEditTask] = useState<Task | null>(null);
	const [addTrackingVisible, setAddTrackingVisible] = useState(false);
	const [deleteLabelFromTask, setDeleteLabelFromTask] = useState<Task | null>(null);
	const [showLabels, setShowLabels] = useState(false);
	const [deleteLabelFromTaskVisible, setDeleteLabelFromTaskVisible] = useState(false);
	const fetchTask = async () => {
		const taskRequest = await fetch(`/api/task/${id}`, {
			headers: { 'content-type': 'application/json' },
		});
		console.log(taskRequest);
		if (taskRequest.status === 200) {
			const taskJSON = await taskRequest.json();
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

	const totalTime = () => {
		let total: number = 0;
		task?.trackings.forEach((element) => {
			total += Date.parse(element.timeend.toString()) - Date.parse(element.timestart.toString());
		});
		const seconds = `0${(total / 1000) % 60}`.slice(-2);
		const minutes = `${Math.floor(total / 1000 / 60)}`;
		const getMinutes = `0${parseInt(minutes, 10) % 60}`.slice(-2);
		const hours = `0${Math.floor(total / 1000 / 3600)}`.slice(-2);

		return `${hours}:${getMinutes}:${seconds}`;
	};

	useEffect(() => {
		fetchTask();
		fetchLabels();
	}, []); // eslint-disable-line react-hooks/exhaustive-deps

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
							!showLabels ? setShowLabels(true) : setShowLabels(false);
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
						<TaskTitle>Task name: {task?.name}</TaskTitle>
						<TaskDescription>Task description: {task?.description}</TaskDescription>
						<TaskDate>Total time: {totalTime()}</TaskDate>
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
					<StyledP>Tracking</StyledP>
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
				{task?.trackings.reverse().map((tracking) => (
					<TrackingItem key={tracking.trackingid} tracking={tracking} fetchTask={fetchTask} />
				))}
			</TrackingList>
		</Layout>
	);
};
