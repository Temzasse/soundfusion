import React, { Component } from 'react';
import styled from 'styled-components';
import './App.css';

import withApis from './components/withApis';
import Sidebar from './views/Sidebar';
import Navbar from './views/Navbar';
import CurrentPlaylist from './views/CurrentPlaylist';
import ControlBar from './views/ControlBar';

class App extends Component {
  state = {
    searchTerm: '',
  }

  componentDidMount() {
    this.player = new window.YT.Player('player', {
      height: '360',
      width: '640',
    });
  }

  play = () => {
    this.player.playVideo();
  };

  pause = () => {
    this.player.pauseVideo();
  };

  loadVideo = (videoId) => {
    this.player.loadVideoById({ videoId });
  };

  handleSearch = ({ target }) => {
    const searchTerm = target.value;

    this.setState({ searchTerm });

    if (searchTerm.length > 3) {
      this.props.youtubeApi.search.list({
        q: searchTerm,
        part: 'snippet',
      }).execute(({ result }) => {
        const video = result.items[0];
        this.loadVideo(video.id.videoId);
      });
    }
  };

  render() {
    return (
      <AppWrapper className='App'>
        <MainWrapper>
          <Sidebar />

          <MainContent>
            <Navbar />
            <CurrentPlaylist />
          </MainContent>
        </MainWrapper>

        <ControlBar />
      </AppWrapper>
    );
  }
}
/*
<Search
  value={this.state.searchTerm || ''}
  onChange={this.handleSearch}
/>

<Controls>
  <ControlIcon
    className='mdi mdi-play-circle-outline'
    onClick={this.play}
  />
  <ControlIcon
    className='mdi mdi-pause-circle-outline'
    onClick={this.pause}
  />
</Controls>
*/

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
`;

// const Controls = styled.div`
//   display: flex;
//   flex-direction: row;
//   align-items: center;
//   width: 100%;
//   margin-top: 100px;
// `;

// const ControlIcon = styled.i`
//   font-size: 60px;
//   color: #222;
//   margin: 0 16px;
// `;

// const Search = styled.input`
//   font-size: 16px;
//   color: #222;
//   padding: 8px 16px;
//   border: 1px solid #ccc;
//   background-color: #f5f5f5;
//   border-radius: 6px;
// `;

export default withApis(App);
