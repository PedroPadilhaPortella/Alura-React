import React from "react";
import styled, { css } from "styled-components";

export interface AbButtonProps {
  text?: string;
  type?: 'primary' | 'secondary';
  onClick?: () => void;
}

const StyledButton = styled.button<AbButtonProps>`
    background: ${(props: AbButtonProps) => props.type === 'primary'? '#EB9B00': '#FFF'};
    padding: 16px 32px;
    border: 2px solid #EB9B00;
    color: ${(props: AbButtonProps) => props.type === 'primary'? '#FFF': '#EB9B00'};;
    font-size: 20px;
    cursor: pointer;

    ${(props: AbButtonProps) => props.type === 'primary'
      ? css`
        &:hover {
          background: #B87900;
          border: 2px solid #B87900;
        }
      `
      : css`
        &:hover {
          background: #FFF;
          border: 2px solid #B87900;
          color: #B87900;
        }
      `
    };
`;

export const AbButton = ({ text, type = 'primary', onClick }: AbButtonProps) => {
  return (
    <StyledButton type={type} onClick={onClick}>
      {text}
    </StyledButton>
  );
}