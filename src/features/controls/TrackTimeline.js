import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const propTypes = {
  something: PropTypes.any,
};

const formatTime = ms => ms / (60 * 1000);

const TrackTimeline = ({ duration, currentTime }) => (
  <TrackTimelineWrapper>
    <TrackTime>{formatTime(currentTime)}</TrackTime>
    <TrackDuration
      type='range'
      min='0'
      max={duration}
      step={1000}
    />
    <TrackTime>{formatTime(duration)}</TrackTime>
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
  max-width: 500px;
`;


TrackTimeline.propTypes = propTypes;
TrackTimeline.defaultProps = {
  duration: 1400000,
  currentTime: 13450,
};

export default TrackTimeline;
