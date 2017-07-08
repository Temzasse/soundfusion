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

import { getPlaylists } from '../playlist/playlist.ducks';

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
  }

  selectTrack = track => {
    this.setState({ selectedTrack: track });
  }

  handleTermChange = ({ target }) => {
    const searchTerm = target.value;
    this.props.updateSearchTerm(searchTerm);
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

  render() {
    const { resultsVisible, selectedTrack } = this.state;
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
                  handlePick={(playlist) => console.log(playlist)}
                  cancel={this.resetSelectedTrack}
                />
              </Panel>
            </PanelSlider>
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
  width: 300px;
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
  max-height: 80vh;
  overflow-y: auto;
  overflow-x: hidden;
  border-radius: 8px;
  position: absolute;
  top: 50px;
  left: 16px;
  right: 16px;
  box-shadow: 4px 8px 20px rgba(0,0,0,0.4);
  color: #fff;
  outline: none;
  background-color: ${props => props.theme.primaryColorDarkest};
  animation: ${fadeUp} 0.3s;
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
  transform: translateX(${props => props.animateToRight ? '-332px' : '0px'});
`;
const Panel = styled.div`
  width: 332px;
  flex: none;
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
