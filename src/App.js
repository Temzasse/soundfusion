import React, { Component } from 'react';
import styled from 'styled-components';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
} from 'react-router-dom'


import logo from './logo.svg';
import './App.css';

import Home from './views/Home';
import Dashboard from './views/Dashboard';
import Settings from './views/Settings';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <div>
            <Navbar>
              <Title>Quantum App</Title>
              <NavItems>
                <Link to='/'>Home</Link>
                <Link to='/dashboard'>Dashboard</Link>
                <Link to='/settings'>Settings</Link>
              </NavItems>
            </Navbar>

            <Switch>
              <Route exact path='/' component={Home} />
              <Route path='/dashboard' component={Dashboard} />
              <Route path='/settings' component={Settings} />
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}

const Navbar = styled.div`
  height: 60px;
  width: 100%;
  padding: 0px 32px;
  display: flex;
  align-items: center;
  background-color: tomato;
  box-shadow: 0px 0px 18px rgba(0,0,0,0.4);
`;

const Title = styled.h1`
  font-size: 24px;
  text-transform: uppercase;
  color: #fff;
  margin-right: 40px;
`;

const NavItems = styled.div`
  display: flex;
  flex-direction: row;

  & a {
    margin-right: 16px;
    text-decoration: none;
    color: #fff;
  }
`;

export default App;
