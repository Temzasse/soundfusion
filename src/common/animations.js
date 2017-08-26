import { keyframes } from 'styled-components';

export const fadeUp = (amount = 50) => keyframes`
  from {
    opacity: 0;
    transform: translateY(${amount}px);
  }
  to {
    opacity: 1;
    transform: translateY(0px);
  }
`;

export const fadeDown = (amount = 50) => keyframes`
  from {
    opacity: 0;
    transform: translateY(-${amount}px);
  }
  to {
    opacity: 1;
    transform: translateY(0px);
  }
`;