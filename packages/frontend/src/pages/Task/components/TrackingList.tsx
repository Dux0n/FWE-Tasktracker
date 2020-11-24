import React from "react";
import styled from "styled-components";
import {
  BrowserRouter,
  Switch,
  Route,
  Redirect,
  RouteProps,
} from "react-router-dom";
import { Task } from "../../Dashboard/components/TaskList";

export type Tracking = {
    trackingid: number;
    description: string;
    createdAt: Date;
    updatedAt: Date;
    task: Task;
  };

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
export type TrackingItemProps = {
    tracking: Tracking;
  };
  

  export const TrackingItem: React.FC<TrackingItemProps> = ({
    tracking: { trackingid, description, createdAt, updatedAt, task},
  }) => {
  
  return (
    <TrackingList>
    <TrackingItemStyle >
      <TrackingHighlight />
      <TrackingFlex>
        <div>
          <TrackingDescription>{description}</TrackingDescription>
          <TrackingDate>{createdAt && createdAt.toLocaleString()}</TrackingDate>
        </div>
      </TrackingFlex>
    </TrackingItemStyle>
    </TrackingList>
  );
};