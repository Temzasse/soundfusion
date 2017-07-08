import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const propTypes = {
  playlists: PropTypes.array.isRequired,
  cancel: PropTypes.func.isRequired,
};

const PlaylistPicker = ({ playlists, cancel, handlePick }) => (
  <PlaylistPickerWrapper>
    <Header>
      <BackIcon
        className="mdi mdi-chevron-left"
        onClick={cancel}
      />
      <Title>Add to playlist</Title>
    </Header>

    {playlists.map(playlist => (
      <PlaylistRow onClick={() => handlePick(playlist)} key={playlist._id}>
        {playlist.name}
      </PlaylistRow>
    ))}
  </PlaylistPickerWrapper>
);

const PlaylistPickerWrapper = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;
const Header = styled.div`
  display: flex;
  align-items: center;
  padding: 0px 16px;
`;
const Title = styled.div`
  flex: 1;
  text-align: center;
  font-size: 12px;
  color: #fff;
  margin-right: 32px;
  padding: 8px 0px;
  border-bottom: 1px solid #000;
`;
const PlaylistRow = styled.li`
  padding: 8px 16px;
  color: #fff;

  &:hover {
    background-color: ${props => props.theme.primaryColor};
  }
`;
const BackIcon = styled.i`
  font-size: 16px;
  color: #fff;
  width: 32px;
`;

PlaylistPicker.propTypes = propTypes;

export default PlaylistPicker;
