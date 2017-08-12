import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import styled, { keyframes } from 'styled-components';

import {
  updateSearchTerm,
  getSearchResults,
  getSearchTerm,
  getSearchStatus,
} from './search.ducks';

import { getPlaylists, addTrackToPlaylist } from '../playlist/playlist.ducks';

import SearchResults from './SearchResults';
import PlaylistPicker from './PlaylistPicker';

const propTypes = {
  updateSearchTerm: PropTypes.func.isRequired,
};

class SearchContainer extends Component {
  state = {
    searchTerm: '',
    resultsVisible: false,
    resultsFocused: false,
    selectedTrack: null,
    trackAdded: false,
  }

  selectTrack = track => {
    this.setState({ selectedTrack: track });
  }

  handleTermChange = ({ target }) => {
    const searchTerm = target.value;
    this.props.updateSearchTerm(searchTerm);
    this.resetSelectedTrack();
  }

  showResults = () => {
    this.setState({ resultsVisible: true });
  }

  hideResults = () => {
    // Add a small delay so that result item onClick handlers fire correctly
    setTimeout(() => {
      if (!this.state.resultsFocused) {
        this.setState({ resultsVisible: false, resultsFocused: false });
      }
    }, 200);
  }

  resetSelectedTrack = () => {
    this.setState({ selectedTrack: null });
  }

  addTrackToPlaylist = playlist => {
    const { selectedTrack } = this.state;
    this.props.addTrackToPlaylist({ track: selectedTrack, playlist });
    this.setState({ trackAdded: true }, () => {
      setTimeout(() => this.setState({ trackAdded: false }), 2000);
    });
  }

  render() {
    const { resultsVisible, selectedTrack, trackAdded } = this.state;
    const { searchTerm, isSearching, searchResults, playlists } = this.props;

    return (
      <SearchWrapper>
        <SearchInput
          placeholder="Search tracks"
          value={searchTerm}
          onChange={this.handleTermChange}
          onFocus={this.showResults}
          onBlur={this.hideResults}
        />
        {resultsVisible &&
          <SearchResultsWrapper
            tabIndex="0"
            onFocus={() => this.setState({ resultsFocused: true })}
            onBlur={() => this.setState({
              resultsVisible: false,
              resultsFocused: false
            })}
          >
            <PanelSlider animateToRight={!!selectedTrack}>
              <Panel>
                {isSearching ?
                  <Loading>Loading...</Loading> :
                  <SearchResults
                    results={searchResults}
                    handleSelect={this.selectTrack}
                  />
                }
              </Panel>
              <Panel>
                <PlaylistPicker
                  playlists={playlists}
                  handlePick={this.addTrackToPlaylist}
                  cancel={this.resetSelectedTrack}
                />
              </Panel>
            </PanelSlider>

            {trackAdded &&
              <TrackAdded>
                Track added to playlist!
              </TrackAdded>
            }
          </SearchResultsWrapper>
        }
      </SearchWrapper>
    );
  }
}

const fadeUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(50px);
  }
  to {
    opacity: 1;
    transform: translateY(0px);
  }
`;

const SearchWrapper = styled.div`
  display: flex;
  position: relative;
`;
const SearchInput = styled.input`
  width: 400px;
  border-radius: 4px;
  border: none;
  color: #222;
  background-color: #fff;
  padding: 8px 16px;
  margin: 8px 16px;
  outline: none;
`;
const SearchResultsWrapper = styled.div`
  min-height: 200px;
  max-height: 85vh;
  overflow-x: hidden;
  overflow-y: auto;
  border-radius: 8px;
  position: absolute;
  top: 50px;
  left: 16px;
  right: 16px;
  box-shadow: 0px 6px 20px rgba(0,0,0,0.6);
  color: #fff;
  outline: none;
  background-color: ${props => props.theme.primaryColorDarker};
  animation: ${fadeUp} 0.3s;
  z-index: 999;
`;
const Loading = styled.div`
  font-size: 14px;
  color: #fff;
  margin: 16px;
`;
const PanelSlider = styled.div`
  display: flex;
  flex-direction: row;
  transition: transform 0.3s cubic-bezier(.05,.83,.56,.89);
  transform: translateX(${props => props.animateToRight ? '-432px' : '0px'});
`;
const Panel = styled.div`
  width: 432px;
  overflow-y: auto;
  flex: none;
`;
const TrackAdded = styled.div`
  animation: ${fadeUp} 0.3s;
  position: absolute;
  bottom: 0;
  right: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 14px;
  height: 50px;
  background-color: ${props => props.theme.primaryColor};
`;


SearchContainer.propTypes = propTypes;

function mapStateToProps(state) {
  return {
    isSearching: getSearchStatus(state),
    searchResults: getSearchResults(state),
    searchTerm: getSearchTerm(state),
    playlists: getPlaylists(state),
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    updateSearchTerm,
    addTrackToPlaylist,
  }, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchContainer);

// handleSearch = ({ target }) => {
//   const searchTerm = target.value;

//   this.setState({ searchTerm });

//   if (searchTerm.length > 3) {
//     this.props.youtubeApi.search.list({
//       q: searchTerm,
//       part: 'snippet',
//     }).execute(({ result }) => {
//       const video = result.items[0];
//       this.loadVideo(video.id.videoId);
//     });
//   }
// };
