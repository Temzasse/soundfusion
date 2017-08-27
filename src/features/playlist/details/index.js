import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import styled from 'styled-components';

import {
  getPlaylistTracks,
  getActivePlaylist,
  resetShuffled,
} from '../playlist.ducks';

import {
  setTrack,
  getCurrentTrack,
  getPlayingStatus,
} from '../../player/player.ducks';

import { removeTrackFromPlaylist } from '../playlist.ducks';

// Components
import TracksList from './TracksList';

const propTypes = {
  playlist: PropTypes.object.isRequired,
  playlistTracks: PropTypes.array.isRequired,
  isPlaying: PropTypes.bool.isRequired,
  currentTrack: PropTypes.object,
  setTrack: PropTypes.func.isRequired,
  removeTrackFromPlaylist: PropTypes.func.isRequired,
  resetShuffled: PropTypes.func.isRequired,
};

class PlaylistDetailsContainer extends PureComponent {
  removeTrackFromPlaylist = (trackId) => {
    const { playlist } = this.props;
    this.props.removeTrackFromPlaylist({
      playlistId: playlist._id,
      trackId,
    });
  };

  handleTrackClick = ({ track, index, playlistId }) => {
    this.props.setTrack({ track, index, playlistId });
    // Everytime we manually set a track we want to reset the shuffle array.
    // TODO: we should add the track to shuffled array if shuffle is enabled.
    this.props.resetShuffled();
  };

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
              isPlaying={isPlaying}
              currentTrack={currentTrack}
              playTrack={this.handleTrackClick}
              removeTrack={this.removeTrackFromPlaylist}
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
    removeTrackFromPlaylist,
    resetShuffled,
  }, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PlaylistDetailsContainer);
