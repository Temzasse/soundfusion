import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const propTypes = {
  tracks: PropTypes.array.isRequired,
  playlistId: PropTypes.string.isRequired,
  isPlaying: PropTypes.bool.isRequired,
  playTrack: PropTypes.func.isRequired,
  removeTrack: PropTypes.func.isRequired,
  currentTrack: PropTypes.object,
};

const TracksList = ({
  tracks,
  playTrack,
  playlistId,
  isPlaying,
  currentTrack,
  removeTrack,
}) =>
  <TracksListWrapper>
    <TracksHeader>
      <Status />
      <Title>Track</Title>
      <Artist>Artist / Uploader</Artist>
    </TracksHeader>

    <Tracks>
      {tracks.map((track, index) =>
        <TrackRow key={track.id}>
          <Status>
            {(isPlaying && currentTrack.track.id === track.id) &&
              <PlayingIcon className="mdi mdi-volume-high" />
            }
          </Status>
          <Title onClick={() => playTrack({ track, index, playlistId })}>
            {track.title}
          </Title>
          <Artist onClick={() => playTrack({ track, index, playlistId })}>
            {track.artist}
          </Artist>
          <RemoveIcon
            className="mdi mdi-close-circle"
            onClick={() => removeTrack(track.id)}
          />
        </TrackRow>
      )}
    </Tracks>
  </TracksListWrapper>;

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
  border-bottom: 1px solid ${props => props.theme.primaryColorDarkest};
  color: #fff;
  font-size: 14px;
  cursor: default;

  &:hover {
    color: ${props => props.theme.primaryColorLight};
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
const Status = styled.div`
  width: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const PlayingIcon = styled.i`
  font-size: 18px;
  color: ${props => props.theme.primaryColorLight};
`;
const RemoveIcon = styled.i`
  font-size: 16px;
  opacity: 0.2;

  &:hover {
    opacity: 1;
  }
`;

TracksList.propTypes = propTypes;

export default TracksList;
