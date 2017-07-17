import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const propTypes = {
  results: PropTypes.array.isRequired,
  handleSelect: PropTypes.func.isRequired,
};

const getTypeClass = trackType => {
  switch (trackType) {
    case 'youtube': return 'mdi mdi-youtube-play';
    case 'soundcloud': return 'mdi mdi-soundcloud';
    default: return '';
  }
}

const SearchResults = ({ results, handleSelect }) => (
  <SearchResultsWrapper>
    {results.map(result => (
      <ResultRow onClick={() => handleSelect(result)} key={result.id}>
        <TrackType>
          <TypeIcon className={getTypeClass(result.type)} />
        </TrackType>
        <TrackInfo>
          <TrackTitle>{result.title}</TrackTitle>
          <TrackArtist>{result.artist}</TrackArtist>
        </TrackInfo>
        <SelectIcon className="mdi mdi-chevron-right" />
      </ResultRow>
    ))}
  </SearchResultsWrapper>
);

const SearchResultsWrapper = styled.ul`
  padding: 0px;
  margin: 0px;
  list-style: none;
`;
const SelectIcon = styled.i`
  font-size: 16px;
  color: #fff;
`;
const ResultRow = styled.li`
  padding: 8px 16px;
  border-bottom: 1px solid ${props => props.theme.primaryColor};
  display: flex;
  flex-direction: row;
  align-items: center;
  color: #fff;

  ${SelectIcon} {
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background-color: ${props => props.theme.primaryColor};

    ${SelectIcon} {
      opacity: 1;
    }
  }
`;
const TrackInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;
const TrackTitle = styled.div`
  font-size: 12px;
  font-weight: 400;
  margin-bottom: 4px;
`;
const TrackArtist = styled.div`
  font-size: 10px;
  font-weight: 700;
`;
const TrackType = styled.div`
  margin-right: 16px;
  display: flex;
  align-items: flex-start;
  justify-content: center;
`;
const TypeIcon = styled.i`
  font-size: 16px;
  color: #fff;
`;



SearchResults.propTypes = propTypes;

export default SearchResults;
