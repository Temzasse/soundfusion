import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const propTypes = {
  handleDelete: PropTypes.func.isRequired,
  handleClick: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
};

const PlaylistItem = ({ name, handleDelete, handleClick }) => (
  <ItemWrapper>
    <Name onClick={handleClick}>{name}</Name>
    <DeleteIcon className="mdi mdi-close-circle" onClick={handleDelete} />
  </ItemWrapper>
);

const ItemWrapper = styled.div`
  padding: 8px 16px;
  font-size: 14px;
  display: flex;
`;
const Name = styled.div`
  flex: 1;
  opacity: 0.7;

  &:hover {
    opacity: 1;
  }
`;
const DeleteIcon = styled.i`
  font-size: 16px;
  opacity: 0.2;

  &:hover {
    opacity: 1;
  }
`;

PlaylistItem.propTypes = propTypes;

export default PlaylistItem;
