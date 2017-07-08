import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const propTypes = {
  handleDelete: PropTypes.func.isRequired,
  handleClick: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  active: PropTypes.bool.isRequired,
};

const PlaylistItem = ({ name, handleDelete, handleClick, active }) => (
  <ItemWrapper>
    <Name
      onClick={handleClick}
      active={active}
    >
      {name}
    </Name>
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
  opacity: ${props => props.active ? 1 : 0.7};
  color: ${props => props.active ? props.theme.primaryColorLighter : '#fff'};

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
