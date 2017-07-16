import React from 'react';
import styled from 'styled-components';
import Playlists from '../features/playlist/list';
import logo from '../quantum_logo.svg';

const Sidebar = () => {
  return (
    <SidebarWrapper>
      <TitleBar>
        <Logo src={logo} />
        SoundFusion
      </TitleBar>
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

const TitleBar = styled.div`
  height: 60px;
  display: flex;
  align-items: center;
  padding: 0px 16px;
  margin: 0;
  font-size: 18px;
  font-weight: 200;
  color: #fff;
  background-color: ${props => props.theme.primaryColorDark};
`;

const Logo = styled.img`
  height: 40px;
  width: auto;
  margin-right: 12px;
`;


export default Sidebar;