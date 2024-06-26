import React, { ReactNode } from "react";
import styled from "styled-components";

export interface AbCardProps {
  children: ReactNode;
}

const StyledCard = styled.button`
    padding: 48px;
    background: #FFF;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 10px;
`

export const AbCard = ({ children }: AbCardProps) => {
  return (
    <StyledCard>
      {children}
    </StyledCard>
  );
}