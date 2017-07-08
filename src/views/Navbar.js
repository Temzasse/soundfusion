import React from 'react';
import styled from 'styled-components';
import Search from '../features/search';

const Navbar = () => {
  return (
    <NavbarWrapper>
      <Search />
    </NavbarWrapper>
  );
};

const NavbarWrapper = styled.div`
  height: 60px;
  width: 100%;
  display: flex;
  align-items: center;
  background-color: ${props => props.theme.primaryColorDark};
`;

export default Navbar;