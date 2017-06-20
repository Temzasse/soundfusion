import React from 'react';
import styled from 'styled-components';

const Sidebar = () => {
  return (
    <SidebarWrapper>
      <Title>Awesomefy</Title>
      <Playlists />
    </SidebarWrapper>
  );
};

const SidebarWrapper = styled.div`
  width: 300px;
  background-color: #222;
  color: #fff;
  display: flex;
  flex-direction: column;
`;

const Playlists = styled.div`
  background-color: #222;
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
  background-color: #111;
`;

export default Sidebar;