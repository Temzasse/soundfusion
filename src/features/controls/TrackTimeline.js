import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { primaryColorLight } from '../../constants';

const propTypes = {
  something: PropTypes.any,
};

// const msToMinAndSec = ms => {
//   const minutes = Math.floor(ms / 60000);
//   const seconds = ((ms % 60000) / 1000).toFixed(0);
//   return `${minutes}:${(seconds < 10 ? '0' : '')}${seconds}`;
// }

const formatTime = seconds => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds - mins * 60;
  const secsFormatted = secs < 10 ? `0${secs}` : secs;
  return `${mins}:${secsFormatted}`;
};

/**
 * NOTE:
 * `handleTimeChange` is triggered when the slider thumb STOPS!
 * `handleTimeSlide` is triggers while the slider is MOVING!
 */
const TrackTimeline = ({
  duration,
  currentTime,
  handleTimeChange,
  handleTimeSlide,
}) => (
  <TrackTimelineWrapper>
    <TrackTime>{formatTime(Math.floor(currentTime))}</TrackTime>
    <TrackDuration
      type="range"
      step={1}
      min="0"
      max={Math.floor(duration)}
      value={Math.floor(currentTime)}
      onChange={({ target }) => handleTimeChange(target.value)}
      onInput={({ target }) => handleTimeSlide(target.value)}
      style={{
        backgroundImage: `-webkit-gradient(
          linear,
          left top,
          right top,
          color-stop(
            ${Math.round(currentTime / duration * 1000) / 1000},
            ${primaryColorLight}
          ),
          color-stop(
            ${Math.round(currentTime / duration * 1000) / 1000},
            #fff
          )
      )`}}
    />
    <TrackTime>{formatTime(Math.floor(duration))}</TrackTime>
  </TrackTimelineWrapper>
);

const TrackTimelineWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;
const TrackTime = styled.span`
  font-size: 12px;
  color: #fff;
`;
const TrackDuration = styled.input`
  -webkit-appearance: none;
  width: 100%;
  min-width: 400px;
  margin: 0 12px;
  height: 4px;
  border-radius: 3px;
  outline: none;
  padding: 0;

  &:focus {
    outline: none;
  }

  &:active::-webkit-slider-thumb {
    background: ${props => props.theme.primaryColorLightest};
  }

  &::-webkit-slider-thumb {
    appearance: none;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: ${props => props.theme.primaryColorLighter};
    cursor: pointer;
    transition: background .15s ease-in-out, transform 0.2s ease;

    &:hover {
      background: ${props => props.theme.primaryColorLightest};
      transform: scale(2.0);
    }
  }
`;

TrackTimeline.propTypes = propTypes;
TrackTimeline.defaultProps = {
  duration: 140000,
  currentTime: 13450,
};

export default TrackTimeline;
