import React from 'react';
import styled from 'styled-components';

const Navbar = () => {
  return (
    <NavbarWrapper>
      Navbar
    </NavbarWrapper>
  );
};

const NavbarWrapper = styled.div`
  height: 60px;
  width: 100%;
  padding: 0px 32px;
  display: flex;
  align-items: center;
  background-color: ${props => props.theme.primaryColorDark};
`;

export default Navbar;