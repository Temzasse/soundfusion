import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import logo from './logo.svg';

// Actions
import { setPlayer } from './features/player/player.ducks';
import { getActivePlaylist } from './features/playlist/playlist.ducks';
import { initApp, getInitStatus } from './init/init.ducks';

// Components
import withApis from './init/withApis';
import Search from './features/search';
import Playlists from './features/playlist/list';
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

// TODO: move `zenMode` to Redux store
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
        <Zen onHide={this.toggleZenMode} visible={zenMode} />
        <MainWrapper>
          <Sidebar>
            <TitleBar>
              <Logo src={logo} />
              SoundFusion
            </TitleBar>
            <Playlists />
          </Sidebar>

          <MainContent>
            <Navbar>
              <Search />
            </Navbar>

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
const Navbar = styled.div`
  height: 60px;
  width: 100%;
  display: flex;
  align-items: center;
  background-color: ${props => props.theme.primaryColor};
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
const Sidebar = styled.div`
  width: 300px;
  background-color: ${props => props.theme.primaryColorDarkest};
  color: #fff;
  display: flex;
  flex-direction: column;
`;

const TitleBar = styled.div`
  height: 60px;
  display: flex;
  align-items: center;
  padding: 0px 16px;
  margin: 0;
  font-size: 18px;
  font-weight: 200;
  color: #fff;
  background-color: ${props => props.theme.primaryColorDark};
`;

const Logo = styled.img`
  height: 40px;
  width: auto;
  margin-right: 12px;
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
