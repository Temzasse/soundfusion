import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// Actions
import { setPlayer } from './features/player/player.ducks';
import { getActivePlaylist } from './features/playlist/playlist.ducks';
import { initApp, getInitStatus } from './init/init.ducks';

// Components, views
import withApis from './init/withApis';
import Sidebar from './views/Sidebar';
import Navbar from './views/Navbar';
import CurrentPlaylist from './features/playlist/details';
import ControlBar from './features/controls';

const propTypes = {
  setPlayer: PropTypes.func.isRequired,
};

class App extends Component {
  componentDidMount() {
    // Do general initialization: load playlists etc...
    this.props.initApp();

    // We now have access to the player APIs so create the different player objs
    const ytPlayer = new window.YT.Player('player', {
      height: '360',
      width: '640',
    });

    this.props.setPlayer({ name: 'youtube', player: ytPlayer });
  }

  // play = () => {
  //   this.player.playVideo();
  // };

  // pause = () => {
  //   this.player.pauseVideo();
  // };

  // loadVideo = (videoId) => {
  //   this.player.loadVideoById({ videoId });
  // };

  render() {
    const { appReady, activePlaylist } = this.props;

    if (!appReady) return <div>Ladataan...</div>;

    return (
      <AppWrapper className='App'>
        <MainWrapper>
          <Sidebar />

          <MainContent>
            <Navbar />
            <ContentWrapper>
              {activePlaylist ?
                <CurrentPlaylist /> :
                <NoActivePlaylist>Choose playlist</NoActivePlaylist>
              }
            </ContentWrapper>
          </MainContent>
        </MainWrapper>

        <ControlBar />
      </AppWrapper>
    );
  }
}

const AppWrapper = styled.div`
  height: 100vh;
  widht: 100vw;
  display: flex;
  flex-direction: column;
`;
const MainWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row;
`;
const MainContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  box-shadow: 0px -4px 18px rgba(0,0,0,0.3);
`;
const ContentWrapper = styled.div`
  flex: 1;
  background: linear-gradient(
    to bottom,
    ${props => props.theme.primaryColorDark} 0%,
    ${props => props.theme.primaryColorDarker} 100%
  );
  color: #fff;
`;
const NoActivePlaylist = styled.h4`
  font-size: 24px;
  margin: 16px;
`;

App.propTypes = propTypes;

function mapStateToProps(state) {
  return {
    appReady: getInitStatus(state),
    activePlaylist: getActivePlaylist(state),
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    initApp,
    setPlayer,
  }, dispatch)
}

export default withApis(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(App)
);
