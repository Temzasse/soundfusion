import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import styled from 'styled-components';

import {
  play,
  pause,
  nextTrack,
  prevTrack,
  getPlayingStatus,
  getCurrentPlayer,
  getCurrentTrack,
} from '../player/player.ducks';

// Components
import TrackTimeline from './TrackTimeline';

const propTypes = {
  play: PropTypes.func.isRequired,
  pause: PropTypes.func.isRequired,
  nextTrack: PropTypes.func.isRequired,
  prevTrack: PropTypes.func.isRequired,
  isPlaying: PropTypes.bool.isRequired,
  currentPlayer: PropTypes.object,
  currentTrack: PropTypes.object,
};

class ControlsContainer extends Component {
  state = {
    currentTime: 0,
    duration: 0,
  };

  componentWillMount() {
    this.timeUpdater = setInterval(this.updateTrackTimeline, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timeUpdater);
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.isPlaying && nextProps.isPlaying) {
      // Start interval again when going from pause to play
      clearInterval(this.timeUpdater);
      this.timeUpdater = setInterval(this.updateTrackTimeline, 1000);
    } else if (this.props.isPlaying && !nextProps.isPlaying) {
      // Clear interval when going from play to pause
      clearInterval(this.timeUpdater);
    }
  }

  updateTrackTimeline = () => {
    // Only update timeline if track is playing
    if (this.props.isPlaying) {
      const currentTime = this.props.currentPlayer.getCurrentTime();
      const duration = this.props.currentPlayer.getDuration();
      this.setState({ currentTime, duration });
    }
  }

  render() {
    const { isPlaying, currentTrack } = this.props;
    const { currentTime, duration } = this.state;

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
                onClick={() => this.props.pause()}
                size='40px'
              />
            : <ControlIcon
                className="mdi mdi-play-circle-outline"
                onClick={() => this.props.play()}
                size='40px'
              />}

          <ControlIcon
            className="mdi mdi-skip-next"
            onClick={() => this.props.nextTrack()}
          />
        </Controls>

        {currentTrack &&
          <TrackTimeline currentTime={currentTime} duration={duration} />
        }
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
  align-items: center;
`;

const Controls = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin: 8px 0px 4px 0px;
`;

const ControlIcon = styled.i`
  font-size: ${props => props.size || '24px'};
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
    currentPlayer: getCurrentPlayer(state),
    currentTrack: getCurrentTrack(state),
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
