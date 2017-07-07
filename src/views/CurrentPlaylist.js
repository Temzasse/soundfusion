import React from 'react';
import styled from 'styled-components';

const CurrentPlaylist = () => {
  return (
    <CurrentPlaylistWrapper>
      CurrentPlaylist
    </CurrentPlaylistWrapper>
  );
};

const CurrentPlaylistWrapper = styled.div`
  flex: 1;
  background-color: ${props => props.theme.primaryColorDarker};
  color: #fff;
`;

export default CurrentPlaylist;