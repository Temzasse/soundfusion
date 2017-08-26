import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import ToggleMenu from '../../../common/components/ToggleMenu';

const propTypes = {
  handleDelete: PropTypes.func.isRequired,
  handleRename: PropTypes.func.isRequired,
  handleClick: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  active: PropTypes.bool.isRequired,
};

const PlaylistItem = ({
  name,
  handleDelete,
  handleRename,
  handleClick,
  active,
}) => (
  <ItemWrapper>
    <Name onClick={handleClick} active={active}>
      {name}
    </Name>
    <ToggleMenu
      items={[
        { label: 'Rename playlist', onClick: handleRename },
        { label: 'Delete playlist', onClick: handleDelete },
      ]}
    />
  </ItemWrapper>
);

const ItemWrapper = styled.div`
  padding: 8px 16px;
  font-size: 18px;
  display: flex;
  cursor: default;
`;
const Name = styled.div`
  flex: 1;
  opacity: ${props => props.active ? 1 : 0.7};
  color: ${props => props.active ? props.theme.primaryColorLight : '#fff'};

  &:hover {
    opacity: 1;
  }
`;

PlaylistItem.propTypes = propTypes;

export default PlaylistItem;
