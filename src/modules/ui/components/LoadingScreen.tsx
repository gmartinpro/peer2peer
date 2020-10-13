import React from "react";
import styled from "styled-components";

export function LoadingScreen() {
  return (
    <LoadingWrapper>
      <h1>Loading ...</h1>
    </LoadingWrapper>
  );
}

const LoadingWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: auto;
  height: 100vh;
  background: ${(props) => props.theme.colors.secondary};
  animation: fadeIn ease 0.5s;
  color: white;
  @keyframes fadeIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
`;
