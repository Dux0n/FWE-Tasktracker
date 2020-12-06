import React, { useState } from 'react';
import styled from 'styled-components/macro';
import { DeleteButton } from '../../../components/DeleteButton';
import { EditButton } from '../../../components/EditButton';
import { Modal } from '../../../components/Modal';
import { Task } from '../../Dashboard/components/TaskList';
import { StyledTopButton } from '../../Dashboard/DashboardPage';
import { EditTrackingForm } from './EditTrackingForm';

export interface Tracking {
	trackingid: number;
	description: string;
	createdAt: Date;
	updatedAt: Date;
	timestart: Date;
	timeend: Date;
	task: Task;
}

export const TrackingFlex = styled.div`
	display: flex;
	align-items: center;
`;

export const TrackingHighlight = styled.span`
	position: absolute;
	top: 0;
	left: 0;
	height: 100%;
	display: none;
	width: 4px;
	background-color: ${(props) => props.theme.colors.primary};
`;

export const TrackingItemStyle = styled.div`
	margin: 0;
	min-height: 3rem;
	position: relative;
	padding: 0.7rem 2rem;
	&:hover {
		${TrackingHighlight} {
			display: block;
		}
	}
`;
export const TrackingList = styled.ul`
	list-style: none;
	box-shadow: 0 0.125em 0.25em 0 ${(props) => props.theme.colors.shadowColor};
	width: 100%;
	padding: 0;
	border-radius: 0.5rem;
	background-color: ${(props) => props.theme.colors.listBackgroundColor};
	${TrackingItemStyle} {
		border-bottom: 1px ${(props) => props.theme.colors.shadowColor} solid;
		&:last-of-type {
			border-bottom: 0;
		}
	}
`;

export const TrackingTitle = styled.p`
	font-size: 1.1rem;
	font-weight: 500;
	margin: 0;
`;

export const TrackingDescription = styled.p`
	font-size: 0.8rem;
	margin: 0;
`;
export const TrackingDate = styled.p`
	margin: 0;
	font-size: 0.8rem;
	color: ${(props) => props.theme.colors.secondaryFontColor};
`;
export const TrackingValue = styled.span`
	white-space: nowrap;
`;
export interface TrackingItemProps {
	tracking: Tracking;
	fetchTask: () => void;
}

export const TrackingItem: React.FC<TrackingItemProps> = ({ tracking, fetchTask }) => {
	const { trackingid, description, createdAt, updatedAt, timestart, timeend } = tracking;
	const [editTrackingVisible, setEditTrackingVisible] = useState(false);
	const [editTracking, setEditTracking] = useState<Tracking | null>(null);
	const deleteTracking = async (varTrackingid: number) => {
		await fetch(`/api/tracking/${varTrackingid!}`, {
			headers: { 'Content-Type': 'application/json' },
			method: 'DELETE',
		});
		fetchTask();
	};

	

	const total = Date.parse(timeend.toString()) - Date.parse(timestart.toString());

	const seconds = `0${(total / 1000) % 60}`.slice(-2);
	const minutes = `${Math.floor(total / 1000 / 60)}`;
	const getMinutes = `0${parseInt(minutes, 10) % 60}`.slice(-2);
	const hours = `0${Math.floor(total / 1000 / 3600)}`.slice(-2);

	return (
		<TrackingList>
			<TrackingItemStyle>
				<TrackingHighlight />
				<TrackingFlex>
					<div>
						<TrackingDescription>Tracking Description: {description}</TrackingDescription>
						<TrackingDate>Created at: {createdAt && createdAt.toLocaleString()}</TrackingDate>
						<TrackingDate>Updated at: {updatedAt && updatedAt.toLocaleString()}</TrackingDate>
						<TrackingDate>
							Duration: {hours}:{getMinutes}:{seconds}
						</TrackingDate>
					</div>
					<StyledTopButton>
						<EditButton
							onClick={() => {
								setEditTrackingVisible(true);
								setEditTracking(tracking);
							}}
						/>
						{editTrackingVisible && (
							<Modal
								title="Edit Task"
								onCancel={() => {
									setEditTrackingVisible(false);
								}}
							>
								<EditTrackingForm
									afterSubmit={() => {
										setEditTrackingVisible(false);
										fetchTask();
									}}
									tracking={editTracking!}
								/>
							</Modal>
						)}
						<DeleteButton
							onClick={() => {
								deleteTracking(trackingid);
							}}
						/>
					</StyledTopButton>
				</TrackingFlex>
			</TrackingItemStyle>
		</TrackingList>
	);
};
