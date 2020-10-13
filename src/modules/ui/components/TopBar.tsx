import React from "react";
import styled from "styled-components";
import { useAppContext } from "../../app/AppContext";

export const TopBar = () => {
  const { peer } = useAppContext();

  return <TopBarWrapper>My peer id: {peer.id}</TopBarWrapper>;
};

const TopBarWrapper = styled.div`
  display: flex;
  align-items: center;
  min-height: 45px;
  background: ${(props) => props.theme.colors.primary};
  color: white;
  padding: 15px 30px;
`;
