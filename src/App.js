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
import Controls from './features/controls';
import TrackDetails from './features/track/details';
import Zen from './features/zen';

const propTypes = {
  setPlayer: PropTypes.func.isRequired,
  initApp: PropTypes.func.isRequired,
  appReady: PropTypes.bool.isRequired,
  activePlaylist: PropTypes.object,
};

class App extends Component {
  state = {
    zenMode: false,
  }

  componentDidMount() {
    // Do general initialization: load playlists, setup players etc...
    this.props.initApp();
  }

  toggleZenMode = () => {
    this.setState(prevState => ({
      zenMode: !prevState.zenMode,
    }));
  }

  render() {
    const { appReady, activePlaylist } = this.props;
    const { zenMode } = this.state;

    if (!appReady) return <div>Ladataan...</div>;

    return (
      <AppWrapper className="App">
        {zenMode && <Zen onHide={this.toggleZenMode} />}
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

        <BottomBar>
          <TrackDetails />
          <Controls/>
          <ZenBlock>
            <OpenZen onClick={this.toggleZenMode}>Zen Mode</OpenZen>
          </ZenBlock>
        </BottomBar>
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
  color: #fff;
  overflow-x: hidden;
  overflow-y: auto;
  background: linear-gradient(
    to bottom,
    ${props => props.theme.primaryColor} 0%,
    ${props => props.theme.primaryColorDarker} 100%
  );
`;
const NoActivePlaylist = styled.h4`
  font-size: 24px;
  margin: 16px;
`;
const BottomBar = styled.div`
  height: 100px;
  color: #fff;
  box-shadow: -2px 0px 18px rgba(0,0,0,0.3);
  display: flex;
  flex-direction: row;
  align-items: center;
  background: linear-gradient(
    to right,
    ${props => props.theme.primaryLighterBaseColor.darken(0.7).rgb().string()} 0%,
    ${props => props.theme.primaryColorDark} 100%
  );
`;
const ZenBlock = styled.div`
  width: 300px;
  padding: 0px 16px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;
const OpenZen = styled.button`
  border: none;
  padding: 8px 16px;
  color: ${props => props.theme.primaryColorLightest};
  background-color: ${props => props.theme.primaryColor};
  border-radius: 12px;
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
