import React from 'react';
import styled from 'styled-components';

const ControlBar = () => {
  return (
    <ControlBarWrapper>
      ControlBar
    </ControlBarWrapper>
  );
};

const ControlBarWrapper = styled.div`
  height: 100px;
  background-color: #999;
  color: #fff;
  box-shadow: -2px 0px 18px rgba(0,0,0,0.4);
`;

export default ControlBar;