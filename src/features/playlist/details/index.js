import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import styled from 'styled-components';

import { getPlaylistTracks, getActivePlaylist } from '../playlist.ducks';

import {
  setTrack,
  getCurrentTrack,
  getPlayingStatus,
} from '../../player/player.ducks';

// Components
import TracksList from './TracksList';

const propTypes = {
  playlist: PropTypes.object.isRequired,
  playlistTracks: PropTypes.array.isRequired,
  isPlaying: PropTypes.bool.isRequired,
  currentTrack: PropTypes.object,
};

class PlaylistDetailsContainer extends PureComponent {
  render() {
    const { playlist, playlistTracks, isPlaying, currentTrack } = this.props;

    return (
      <PlaylistDetailsWrapper>
        <PlaylistInfo>
          <Label>Playlist</Label>
          <Title>{playlist.name}</Title>
          <TracksNum>{playlistTracks.length} tracks</TracksNum>
        </PlaylistInfo>

        <Tracks>
          {playlistTracks.length > 0 ?
            <TracksList
              tracks={playlistTracks}
              playlistId={playlist._id}
              playTrack={this.props.setTrack}
              isPlaying={isPlaying}
              currentTrack={currentTrack}
            /> :
            <div>Add tracks by searching them with the input above.</div>
          }
        </Tracks>
      </PlaylistDetailsWrapper>
    );
  }
}

const PlaylistDetailsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 16px;
`;
const PlaylistInfo = styled.div`
  display: flex;
  flex-direction: column;
  border-bottom: 6px solid ${props => props.theme.primaryColorDark};
  padding-bottom: 8px;
  margin-bottom: 8px;
`;
const Label = styled.div`
  font-size: 16px;
  text-transform: uppercase;
`;
const Title = styled.h2`
  font-size: 40px;
  margin: 2px 0px;
`;
const TracksNum = styled.div`
  font-size: 14px;
`;
const Tracks = styled.ul`
  padding: 0;
  list-style: none;
`;

PlaylistDetailsContainer.propTypes = propTypes;

function mapStateToProps(state) {
  return {
    playlist: getActivePlaylist(state),
    playlistTracks: getPlaylistTracks(state),
    isPlaying: getPlayingStatus(state),
    currentTrack: getCurrentTrack(state),
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    setTrack,
  }, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PlaylistDetailsContainer);
