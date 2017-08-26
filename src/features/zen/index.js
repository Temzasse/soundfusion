import React, { PureComponent } from 'react';
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
  visible: PropTypes.bool.isRequired,
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

class Zen extends PureComponent {
  constructor(props) {
    super(props);

    const numOfBars = 70;

    this.state = {
      bars: range(numOfBars).map(x => ({
        fill: randomColor(),
        width: randomInBetween(2, 7),
        height: randomInBetween(40, 50),
        rot: 360 / numOfBars * x,
        delay: randomInBetween(0, 4),
        id: `bar_${x}`
      })),
    };
  }

  render() {
    const { bars } = this.state;
    const { visible } = this.props;

    return (
      <ZenWrapper onClick={this.props.onHide} visible={visible}>
        <Graphics>
          {bars.map(bar =>
            <Bar key={bar.id} delay={bar.delay}>
              <BarFiller
                fill={bar.fill}
                len={bars}
                rot={bar.rot}
                width={bar.width}
                height={bar.height}
                x='50%'
                y='50%'
              />
            </Bar>          
          )}
          {/* eslint-disable max-len */}
          <Circle cx={'50%'} cy={'50%'} r={140} fill={primaryColorDarkest} />
          <Circle cx={'50%'} cy={'50%'} r={100} fill={primaryColorDarker} pulse />
          <Circle cx={'50%'} cy={'50%'} r={50} fill={primaryColorDark} pulse />
          <Circle cx={'50%'} cy={'50%'} r={20} fill={primaryColor} pulse />
          {/* eslint-enable max-len */}
        </Graphics>
        <Bg>
          <Circle
            cx={'30%'}
            cy={'40%'}
            r={10}
            fill={primaryColor}
            pulse
            delay={3}
          />
          <Circle
            cx={'70%'}
            cy={'40%'}
            r={12}
            fill={primaryColorDarker}
            pulse
            delay={2}
          />
          <Circle
            cx={'80%'}
            cy={'20%'}
            r={14}
            fill={primaryColor}
            pulse
            delay={1.2}
          />
          <Circle
            cx={'20%'}
            cy={'70%'}
            r={10}
            fill={primaryColor}
            pulse
            delay={0.5}
          />
          <Circle
            cx={'10%'}
            cy={'30%'}
            r={7}
            fill={primaryColorDark}
            pulse
            delay={0.2}
          />
          <Circle
            cx={'80%'}
            cy={'70%'}
            r={18}
            fill={primaryColorDarker}
            pulse
            delay={2.2}
          />
        </Bg>
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

const barAnim = keyframes`
  0% { transform: scale(1); }
  25% { transform: scale(2); }
  50% { transform: scale(0.5); }
  75% { transform: scale(1.5); }
  100% { transform: scale(1); }
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
  ${props => !props.visible && css`
    display: none;
  `}
`;
const Bg = styled.svg`
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: 2;
`;
const Graphics = styled.svg`
  width: 800px;
  height: 800px;
  will-change: transform;
  animation: ${rotAnim} 10s infinite ease-out;
  z-index: 2;
`;
const Circle = styled.circle`
  transform-origin: center center;
  ${props => props.pulse && css`
    opacity: 0;
    animation: ${pulsate} 2s infinite ease-out;
    animation-delay: ${props => props.delay || 0}s;
  `}
`;
const BarFiller = styled.rect`
  z-index: 9999999999;
  transform-origin: center center;
  transform: ${props => css`
    translate(-50%, -50%)
    rotate(${`${props.rot}deg`})
    translate(0px, ${`${props.height / 2 + 100}px`});
  `}
`;
const Bar = styled.g`
  transform-origin: center center;
  animation: ${props => css`
    ${barAnim} 1.4s ease infinite
  `};
  animation-delay: ${props => props.delay || 0}s;
`;

Zen.propTypes = propTypes;

export default Zen;
