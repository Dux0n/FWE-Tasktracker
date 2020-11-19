import React from "react";
import styled from "styled-components";

export enum MessageType {
  INFO = "info",
  ERROR = "error",
  NONE = "",
}

export const StyledMessage = styled.div<{ type?: MessageType }>`
  color: ${(props) => {
    switch (props.type) {
      case MessageType.INFO:
        return "blue";
      case MessageType.ERROR:
        return "red";
      default:
        return "black";
    }
  }}
`;

