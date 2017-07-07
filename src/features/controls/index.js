import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import styled from 'styled-components';

import {
  getPlayingStatus,
  play,
  pause,
  nextTrack,
  prevTrack,
} from '../player/player.ducks';

// Components
import TrackTimeline from './TrackTimeline';

const propTypes = {
  play: PropTypes.func.isRequired,
  pause: PropTypes.func.isRequired,
  nextTrack: PropTypes.func.isRequired,
  prevTrack: PropTypes.func.isRequired,
};

class ControlsContainer extends Component {
  state = {};

  render() {
    const { isPlaying } = this.props;

    return (
      <ControlsWrapper>
        <Controls>
          <ControlIcon
            className="mdi mdi-skip-previous"
            onClick={this.props.prevTrack}
          />

          {isPlaying
            ? <ControlIcon
                className="mdi mdi-pause-circle-outline"
                onClick={this.props.pause}
                size='56px'
              />
            : <ControlIcon
                className="mdi mdi-play-circle-outline"
                onClick={this.props.play}
                size='56px'
              />}

          <ControlIcon
            className="mdi mdi-skip-next"
            onClick={this.props.nextTrack}
          />
        </Controls>

        <TrackTimeline />
      </ControlsWrapper>
    );
  }
}

const ControlsWrapper = styled.div`
  height: 100px;
  background-color: ${props => props.theme.primaryColor};
  color: #fff;
  box-shadow: -2px 0px 18px rgba(0,0,0,0.3);
  display: flex;
  flex-direction: column;
`;

const Controls = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`;

const ControlIcon = styled.i`
  font-size: ${props => props.size || '40px'};
  color: #fff;
  margin: 0 16px;
`;

const Search = styled.input`
  font-size: 16px;
  color: #222;
  padding: 8px 16px;
  border: 1px solid #ccc;
  background-color: #f5f5f5;
  border-radius: 6px;
`;

ControlsContainer.propTypes = propTypes;

function mapStateToProps(state) {
  return {
    isPlaying: getPlayingStatus(state),
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      play,
      pause,
      nextTrack,
      prevTrack,
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(ControlsContainer);
