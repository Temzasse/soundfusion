import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import styled from 'styled-components';
import { getCurrentTrack } from '../../player/player.ducks';

const propTypes = {
  currentTrack: PropTypes.object,
};

const getTrackImage = ({ thumbnails = {} }) => {
  const img = thumbnails.medium || thumbnails.default;
  return img.url;
};

const TrackDetailsContainer = ({ currentTrack }) => (
  <TrackDetailsWrapper>
    {!!currentTrack &&
      <TrackDetails>
        <TrackImage imgUrl={getTrackImage(currentTrack.track)} />
        <TrackInfo>
          <Title>{currentTrack.track.title}</Title>
          <Artist>{currentTrack.track.artist}</Artist>
        </TrackInfo>
      </TrackDetails>
    }
  </TrackDetailsWrapper>
)

const TrackDetailsWrapper = styled.div`
  width: 300px;
`;
const TrackDetails = styled.div`
  display: flex;
  flex-direction: row;
  padding: 16px;
`;
const TrackImage = styled.div`
  width: 80px;
  height: 80px;
  flex: none;
  background-image: url("${props => props.imgUrl}");
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
  margin-right: 16px;
  border-radius: 6px;
  border: none;
`;
const TrackInfo = styled.div`
  display: flex;
  flex-direction: column;
  color: #fff;
  justify-content: center;
`;
const Title = styled.div`
  font-size: 12px;
  margin-bottom: 8px;
`;
const Artist = styled.div`
  font-size: 14px;
  color: ${props => props.theme.primaryColorLighter};
  font-weight: 200;
`;



TrackDetailsContainer.propTypes = propTypes;

function mapStateToProps(state) {
  return {
    currentTrack: getCurrentTrack(state),
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({}, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TrackDetailsContainer);
