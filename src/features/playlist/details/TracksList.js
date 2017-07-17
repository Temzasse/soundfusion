import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const propTypes = {
  tracks: PropTypes.array.isRequired,
  playTrack: PropTypes.func.isRequired,
  playlistId: PropTypes.string.isRequired,
  isPlaying: PropTypes.bool.isRequired,
  currentTrack: PropTypes.object,
};

const TracksList = ({
  tracks,
  playTrack,
  playlistId,
  isPlaying,
  currentTrack,
}) =>
  <TracksListWrapper>
    <TracksHeader>
      <Status />
      <Title>Track</Title>
      <Artist>Artist / Uploader</Artist>
    </TracksHeader>

    <Tracks>
      {tracks.map((track, index) =>
        <TrackRow
          onClick={() => playTrack({ track, index, playlistId })}
          key={track.id}
        >
          <Status>
            {(isPlaying && currentTrack.track.id === track.id) &&
              <PlayingIcon className="mdi mdi-volume-high" />
            }
          </Status>
          <Title>
            {track.title}
          </Title>
          <Artist>
            {track.artist}
          </Artist>
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



TracksList.propTypes = propTypes;

export default TracksList;
