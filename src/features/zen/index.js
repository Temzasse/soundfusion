import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled, { keyframes, css } from 'styled-components';
import {
  primaryColorDarkest,
  primaryColorDarker,
  primaryColorDark,
  primaryColor,
  primaryColorLight,
  primaryColorLighter,
} from '../../constants';

const propTypes = {
  onHide: PropTypes.func.isRequired,
};

const range = num => [...Array(num).keys()];

const randomInBetween = (min, max) => {
  return Math.floor(Math.random() * max) + min  
};

const randomColor = () => {
  return [
    primaryColorDark,
    primaryColor,
    primaryColorLight,
    primaryColorLighter,
  ][randomInBetween(0, 4)];
};

class Zen extends Component {
  state = {
    bars: 90,
    update: null,
  }

  // shouldComponentUpdate() {
  //   return false;
  // }

  // componentDidMount() {
  //   this.loop = setInterval(() => {
  //     this.setState({ update: true });
  //   }, 10000);
  // }

  render() {
    const { bars } = this.state;
    return (
      <ZenWrapper onClick={this.props.onHide}>
        <Graphics>
          {range(bars).map(i =>
            <Bar
              len={bars}
              rot={i}
              width={randomInBetween(2, 7)}
              height={randomInBetween(40, 50)}
              fill={randomColor()}
              x='50%'
              y='50%'
              delay={randomInBetween(0, 4)}
            />          
          )}
           <Circle
            cx={'50%'}
            cy={'50%'}
            r={140}
            fill={primaryColorDarkest}
          />
          <Circle
            cx={'50%'}
            cy={'50%'}
            r={100}
            fill={primaryColorDarker}
            pulse
          />
          <Circle
            cx={'50%'}
            cy={'50%'}
            r={50}
            fill={primaryColorDark}
            pulse
          />
          <Circle
            cx={'50%'}
            cy={'50%'}
            r={20}
            fill={primaryColor}
            pulse
          />
        </Graphics>
      </ZenWrapper>
    );
  }
}

const rotAnim = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

const pulsate = keyframes`
  0% { transform: scale(0.1, 0.1); opacity: 0.3; }
  50% { opacity: 1.0; }
  100% { transform: scale(1.2, 1.2); opacity: 0.3; }
`;

const barAnim = props => keyframes`
  0% {
    transform:
      translate(-50%, -50%)
      rotate(${`${360 / props.len * props.rot}deg`})
      translate(0px, ${`${props.height / 2 + 100}px`})
      scale(1, 1);
  }
  25% {
    transform:
      translate(-50%, -50%)
      rotate(${`${360 / props.len * props.rot}deg`})
      translate(0px, ${`${props.height / 2 + 100}px`})
      scale(1, 2.2);
  }
  50% {
    transform:
      translate(-50%, -50%)
      rotate(${`${360 / props.len * props.rot}deg`})
      translate(0px, ${`${props.height / 2 + 100}px`})
      scale(1, 0.5);
  }
  75% {
    transform:
      translate(-50%, -50%)
      rotate(${`${360 / props.len * props.rot}deg`})
      translate(0px, ${`${props.height / 2 + 100}px`})
      scale(1, 1.5);
  }
  100% {
    transform:
      translate(-50%, -50%)
      rotate(${`${360 / props.len * props.rot}deg`})
      translate(0px, ${`${props.height / 2 + 100}px`})
      scale(1, 1);
  }
`;

const ZenWrapper = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${props => props.theme.primaryColorDarkest};
  z-index: 999999999;
`;
const Graphics = styled.svg`
  width: 800px;
  height: 800px;
  will-change: transform;
  animation: ${rotAnim} 10s infinite ease-out;
`;
const Circle = styled.circle`
  transform-origin: center center;
  ${props => props.pulse && css`
    opacity: 0;
    animation: ${pulsate} 2s infinite ease-out;
    animation-delay: ${props => props.delay || 0}s;
  `}
`;
const Bar = styled.rect`
  z-index: 9999999999;
  will-change: transform;
  transform-origin: center center;
  transform: ${props => css`
    translate(-50%, -50%)
    rotate(${`${360 / props.len * props.rot}deg`})
    translate(0px, ${`${props.height / 2 + 100}px`});
  `}
  animation: ${props => css`
    ${barAnim} 1.4s ease infinite
  `};
  animation-delay: ${props => props.delay}s;
`;

Zen.propTypes = propTypes;

export default Zen;
