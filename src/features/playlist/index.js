import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import styled from 'styled-components';

import {
  createPlaylist,
  deletePlaylist,
  getPlaylists,
} from './playlist.ducks';

// Components
import CreatePlaylist from './CreatePlaylist';
import PlaylistItem from './PlaylistItem';

const propTypes = {
  deletePlaylist: PropTypes.func.isRequired,
  createPlaylist: PropTypes.func.isRequired,
};

class PlaylistsContainer extends Component {
  state = {

  }

  render() {
    const { playlists } = this.props;

    return (
      <PlaylistsWrapper>
        <CreatePlaylist
          createPlaylist={this.props.createPlaylist}
        />

        <Playlists>
          {playlists.length > 0 ?
            playlists.map(({ name, _id }) => (
              <PlaylistItem
                name={name}
                handleDelete={() => this.props.deletePlaylist(_id)}
                handleClick={() => this.props.deletePlaylist(_id)}
                key={_id}
              />
            )) :
            <NoPlaylists>You don't have any playlists yet</NoPlaylists>
          }
        </Playlists>
      </PlaylistsWrapper>
    );
  }
}

const PlaylistsWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;
const ControlIcon = styled.i`
  font-size: 18px;
  color: #fff;
`;
const Playlists = styled.ul`
  list-style: none;
  padding: 0;
`;
const NoPlaylists = styled.div`
  font-size: 14px;
  font-style: italic;
  padding: 8px;
`;

PlaylistsContainer.propTypes = propTypes;

function mapStateToProps(state) {
  return {
    playlists: getPlaylists(state),
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    createPlaylist,
    deletePlaylist,
  }, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PlaylistsContainer);
