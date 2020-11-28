import React from "react";
import styled from "styled-components";

const StyledButton = styled.button`
  width: 48px;
  border: 0px;
  height: 48px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  background-color: ${(props) => props.theme.colors.primary};
  float:right;
`;

export const StopButton = (
  props: React.ButtonHTMLAttributes<HTMLButtonElement>
) => {
  return (
    <StyledButton {...props}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 64 64"
        aria-labelledby="title"
        aria-describedby="desc"
        role="img"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        
      >
        <title>Stop</title>
        <desc>A line styled icon from Orion Icon Library.</desc>
        <path
          data-name="layer1"
          fill="none"
          stroke="#fff"
          strokeMiterlimit="10"
          strokeWidth="2"
          d="M8 8h48v48H8z"
          strokeLinejoin="round"
          strokeLinecap="round"
        ></path>
      </svg>
    </StyledButton>
  );
};
