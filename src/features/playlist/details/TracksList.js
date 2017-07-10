import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const propTypes = {
  tracks: PropTypes.array.isRequired,
  playTrack: PropTypes.func.isRequired,
};

const TracksList = ({ tracks, playTrack }) => (
  <TracksListWrapper>
    <TracksHeader>
      <Title>Track</Title>
      <Artist>Artist / Uploader</Artist>
    </TracksHeader>

    <Tracks>
      {tracks.map(track => (
        <TrackRow onClick={() => playTrack(track)} key={track.id}>
          <Title>{track.title}</Title>
          <Artist>{track.artist}</Artist>
        </TrackRow>
      ))}
    </Tracks>
  </TracksListWrapper>
);

const TracksListWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;
const Tracks = styled.ul`
  padding: 0;
  margin: 0;
  list-style: none;
  width: 100%;
`;
const TrackRow = styled.li`
  padding: 16px 0px;
  display: flex;
  flex-direction: row;
  align-items: center;
  border-bottom: 1px solid #222;
  color: #fff;
  font-size: 14px;

  &:hover {
    color: ${props => props.theme.primaryColorLightest}
  }
`;
const TracksHeader = styled.div`
  font-size: 10px;
  text-transform: uppercase;
  display: flex;
  flex-direction: row;
`;
const Title = styled.div`
  flex: 2;
  margin-right: 16px;
`;
const Artist = styled.div`
  flex: 2;
`;


TracksList.propTypes = propTypes;

export default TracksList;
