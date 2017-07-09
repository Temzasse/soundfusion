import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import styled from 'styled-components';

import { getPlaylistTracks, getActivePlaylist } from '../playlist.ducks';
import { setTrack } from '../../player/player.ducks';

// Components
import TracksList from './TracksList';

const propTypes = {
  playlistTracks: PropTypes.array.isRequired,
};

class PlaylistDetailsContainer extends Component {
  state = {

  }

  render() {
    const { playlist, playlistTracks } = this.props;

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
              playTrack={this.props.setTrack}
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
  border-bottom: 2px solid ${props => props.theme.primaryColorDarkest};
  padding-bottom: 8px;
  margin-bottom: 8px;
`;
const Label = styled.div`
  font-size: 12px;
  text-transform: uppercase;
`;
const Title = styled.h2`
  font-size: 32px;
  margin: 2px 0px;
`;
const TracksNum = styled.div`
  font-size: 12px;
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
