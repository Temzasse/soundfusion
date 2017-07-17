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
  setTrackTime,
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
  setTrackTime: PropTypes.func.isRequired,
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
      this.resetTimeUpdater();
    } else if (this.props.isPlaying && !nextProps.isPlaying) {
      // Clear interval when going from play to pause
      clearInterval(this.timeUpdater);
    }
  }

  resetTimeUpdater = () => {
    clearInterval(this.timeUpdater);
    this.timeUpdater = setInterval(this.updateTrackTimeline, 1000);
  }

  updateTrackTimeline = () => {
    const { isPlaying, currentPlayer } = this.props;

    // Only update timeline if track is playing
    if (isPlaying && !!currentPlayer) {      
      const currentTime = currentPlayer.getCurrentTime();
      const duration = currentPlayer.getDuration();

      this.setState({ currentTime, duration });

      const trackAlmostDone =
        (currentTime > 0 && duration > 0) &&
        (currentTime > (duration - 2));

      if (trackAlmostDone) this.props.nextTrack();
    }
  }

  setTrackTimeTmp = currentTime => {
    this.setState({ currentTime });
  }

  render() {
    const { isPlaying, currentTrack } = this.props;
    const { currentTime, duration } = this.state;

    return (
      <ControlsWrapper>
        <Controls>
          <ControlIcon
            className="mdi mdi-skip-previous"
            onClick={() => this.props.prevTrack()}
          />

          {isPlaying
            ? <ControlIcon
                className="mdi mdi-pause-circle-outline"
                onClick={() => this.props.pause()}
                size="40px"
              />
            : <ControlIcon
                className="mdi mdi-play-circle-outline"
                onClick={() => this.props.play()}
                size="40px"
              />}

          <ControlIcon
            className="mdi mdi-skip-next"
            onClick={() => this.props.nextTrack()}
          />
        </Controls>

        {currentTrack &&
          <TrackTimeline
            currentTime={currentTime}
            duration={duration}
            handleTimeChange={this.props.setTrackTime}
            handleTimeSlide={this.setTrackTimeTmp}
          />}
      </ControlsWrapper>
    );
  }
}

const ControlsWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
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
  opacity: 0.6;
  transition: transform 0.2s ease, opacity 0.3s ease-in;

  &:hover {
    transform: scale(1.1);
    opacity: 1;
  }
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
      setTrackTime,
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(ControlsContainer);
