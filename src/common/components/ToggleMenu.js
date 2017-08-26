import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled, { keyframes } from 'styled-components';
import { fadeDown } from '../animations';
import { primaryColorLight, primaryColorLighter } from '../../constants';

const propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      onClick: PropTypes.func.isRequired,
    })
  ).isRequired,
};

class ToggleMenu extends Component {
  state = {
    isOpen: false,
  }

  toggleMenu = () => {
    this.setState(({ isOpen }) => ({ isOpen: !isOpen }));
  };

  delayedToggleMenu = () => {
    this.blurTimeout = setTimeout(this.toggleMenu, 200);
  };

  componentWillUnmount() {
    clearTimeout(this.blurTimeout);
  }

  render() {
    const { items, menuOnLeft } = this.props;
    const { isOpen } = this.state;

    return (
      <ToggleMenuWrapper>
        <ToggleIcon
          tabIndex='-1'
          onFocus={this.toggleMenu}
          onBlur={this.delayedToggleMenu}
        >
          <Ball i={0} />
          <Ball i={1} />
          <Ball i={2} />
        </ToggleIcon>

        {isOpen &&
          <Menu alignLeft={menuOnLeft}>
            {items.map(item =>
              <MenuItem onClick={item.onClick} key={item.label}>
                {item.label}
              </MenuItem>
            )}
          </Menu>
        }
      </ToggleMenuWrapper>
    );
  }
}

const twinkle = keyframes`
  from {
    background-color: ${primaryColorLight};
  }
  to {
    background-color: ${primaryColorLighter};
  }
`;

const ToggleMenuWrapper = styled.div`
  position: relative;
`;
const Ball = styled.div`
  border-radius: 2px;
  height: 4px;
  width: 4px;
  background-color: ${props => props.theme.primaryColor};
  animation-delay: ${props => props.i * 0.2}s;
  animation-iteration-count: infinite;
  animation-duration: 0.8s;
`;
const ToggleIcon = styled.div`
  position: relative;
  height: 18px;
  width: 18px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  outline: none;

  &:hover {
    & > ${Ball} {
      animation-name: ${twinkle};
    }
  }
`;
const Menu = styled.ul`
  ${props => props.alignLeft ? 'right: 0;' : 'left: 0;'} 
  top: 0;
  position: absolute;
  z-index: 999;
  padding: 0px;
  margin: 0px;
  list-style: none;
  animation: ${fadeDown(20)} 0.3s;
  min-width: 200px;
  background-color: ${props => props.theme.primaryColorDark};
  box-shadow: 0px 0px 12px rgba(0,0,0,0.4);
  border-radius: 4px;
`;
const MenuItem = styled.li`
  cursor: default;
  padding: 8px 12px;
  font-size: 14px;
  border-bottom: 1px solid ${props => props.theme.primaryColorDarkest};

  &:hover {
    background-color: ${props => props.theme.primaryColor};
  }

  &:first-child {
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
  }

  &:last-child {
    border-bottom: none;
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
  }
`;

ToggleMenu.propTypes = propTypes;
ToggleMenu.defaultProps = {
  items: [],
};

export default ToggleMenu;
