import React from 'react';
import styled from 'styled-components';
import Playlists from '../features/playlist/list';

const Sidebar = () => {
  return (
    <SidebarWrapper>
      <Title>Quantum</Title>
      <Playlists />
    </SidebarWrapper>
  );
};

const SidebarWrapper = styled.div`
  width: 300px;
  background-color: ${props => props.theme.primaryColorDarkest};
  color: #fff;
  display: flex;
  flex-direction: column;
`;

const Title = styled.h1`
  height: 60px;
  display: flex;
  align-items: center;
  padding: 0 16px;
  font-size: 24px;
  text-transform: uppercase;
  color: #fff;
  margin: 0;
  background-color: ${props => props.theme.primaryColorDark};
`;

export default Sidebar;