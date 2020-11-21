import React from "react";
import styled from "styled-components";

export const AddButton = (
  props: React.ButtonHTMLAttributes<HTMLButtonElement>
) => {
  const StyledButton = styled.button`
    width: 48px;
    border: 0px;
    height: 48px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    background-color: ${(props) => props.theme.colors.primary};
  `;
  return (
    <StyledButton {...props}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 32 32"
        focusable="false"
        style={{ fill: "#fff", height: "24px", width: "24px" }}
      >
        <path d="M14.5 2a1.5 1.5 0 0 1 3 0v28a1.5 1.5 0 0 1-3 0V2z"></path>
        <path d="M30 14.5a1.5 1.5 0 0 1 0 3H2a1.5 1.5 0 0 1 0-3h28z"></path>
      </svg>
    </StyledButton>
  );
};
