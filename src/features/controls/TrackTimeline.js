import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const propTypes = {
  something: PropTypes.any,
};

// const msToMinAndSec = ms => {
//   const minutes = Math.floor(ms / 60000);
//   const seconds = ((ms % 60000) / 1000).toFixed(0);
//   return `${minutes}:${(seconds < 10 ? '0' : '')}${seconds}`;
// }

const processTime = seconds => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds - mins * 60;
  const secsFormatted = secs < 10 ? `0${secs}` : secs;
  return `${mins}:${secsFormatted}`;
}

const TrackTimeline = ({ duration, currentTime }) => (
  <TrackTimelineWrapper>
    <TrackTime>{processTime(Math.floor(currentTime))}</TrackTime>
    <TrackDuration
      type='range'
      step={1}
      min='0'
      max={Math.floor(duration)}
      value={Math.floor(currentTime)}
      percentage={(currentTime / duration).toFixed(2)}
    />
    <TrackTime>{processTime(Math.floor(duration))}</TrackTime>
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
  background-image: -webkit-gradient(
      linear,
      left top,
      right top,
      color-stop(
        ${props => props.percentage},
        ${props => props.theme.primaryColorLight}
      ),
      color-stop(
        ${props => props.percentage},
        #fff
      )
  );

  &:focus {
    outline: none;
  }

  &:active::-webkit-slider-thumb {
    background: ${props => props.theme.primaryColorLightest};
  }

  &::-webkit-slider-thumb {
    appearance: none;
    width: 14px;
    height: 14px;
    border-radius: 50%;
    background: ${props => props.theme.primaryColorLighter};
    cursor: pointer;
    transition: background .15s ease-in-out;

    &:hover {
      background: ${props => props.theme.primaryColorLightest};
    }
  }
`;


TrackTimeline.propTypes = propTypes;
TrackTimeline.defaultProps = {
  duration: 140000,
  currentTime: 13450,
};

export default TrackTimeline;
