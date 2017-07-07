import React from 'react';
import styled from 'styled-components';
import Controls from '../features/controls';

const ControlBar = () => {
  return (
    <ControlBarWrapper>
      <Controls />
    </ControlBarWrapper>
  );
};

const ControlBarWrapper = styled.div`
  height: 100px;
  background-color: ${props => props.theme.primaryColor};
  color: #fff;
  box-shadow: -2px 0px 18px rgba(0,0,0,0.3);
`;

export default ControlBar;