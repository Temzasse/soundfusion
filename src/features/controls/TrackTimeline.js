import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const propTypes = {
  something: PropTypes.any,
};

const msToMinAndSec = ms => {
  const minutes = Math.floor(ms / 60000);
  const seconds = ((ms % 60000) / 1000).toFixed(0);
  return `${minutes}:${(seconds < 10 ? '0' : '')}${seconds}`;
}

const TrackTimeline = ({ duration, currentTime }) => (
  <TrackTimelineWrapper>
    <TrackTime>{msToMinAndSec(currentTime)}</TrackTime>
    <TrackDuration
      type='range'
      min='0'
      max={duration}
      step={1000}
    />
    <TrackTime>{msToMinAndSec(duration)}</TrackTime>
  </TrackTimelineWrapper>
);

const TrackTimelineWrapper = styled.div`
  display: flex;
  flex-dirextion: row;
`;
const TrackTime = styled.span`
  font-size: 12px;
  color: #fff;
`;
const TrackDuration = styled.input`
  width: 100%;
  min-width: 400px;
  margin: 0 12px;
`;


TrackTimeline.propTypes = propTypes;
TrackTimeline.defaultProps = {
  duration: 140000,
  currentTime: 13450,
};

export default TrackTimeline;
