import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import { sizes, flex } from '.';
import { StyleSet } from '../custom_modules/commonUtils';

export const A = styled.a`
  @media (orientation: landscape) {
    border: 0.052vw solid transparent;
    border-radius: 0.365vw;
  }

  @media (orientation: portrait) {
    border: ${0.052 * 1.778}vw solid transparent;
    border-radius: ${0.365 * 1.778}vw;
  }

  background: #EFEFEF;
  ${(sizes as StyleSet).full}
  ${flex.horizontal}
  text-decoration: none;

  :hover {
    -webkit-filter: brightness(90%);
            filter: brightness(90%);
  }

  :active {
    -webkit-transform: scale(0.98);
        -ms-transform: scale(0.98);
            transform: scale(0.98);
  }
`;

export const Button = styled.button`
  @media (orientation: landscape) {
    border: 0.052vw solid transparent;
    border-radius: 0.365vw;
  }

  @media (orientation: portrait) {
    border: ${0.052 * 1.778}vw solid transparent;
    border-radius: ${0.365 * 1.778}vw;
  }

  ${(sizes as StyleSet).full}
  cursor: pointer;

  :hover {
    -webkit-filter: brightness(90%);
            filter: brightness(90%);
  }

  :active {
    -webkit-transform: scale(0.95);
        -ms-transform: scale(0.95);
            transform: scale(0.95);
  }
`;

export const Div = styled.div`
  @media (orientation: landscape) {
    padding: 0.365vw;
    border: 0.052vw solid transparent;
    border-radius: 0.365vw;
  }

  @media (orientation: portrait) {
    padding: ${0.365 * 1.778}vw;
    border: ${0.052 * 1.778}vw solid transparent;
    border-radius: ${0.365 * 1.778}vw;
  }
  background-color: var(--white);
  color: var(--point-dark);
  font-family: 'Gothic A1', sans-serif;
  font-weight: bolder;
  font-size: var(--p);
  text-align: center;
  cursor: pointer;
`;

export const StyledLink = A.withComponent(Link);