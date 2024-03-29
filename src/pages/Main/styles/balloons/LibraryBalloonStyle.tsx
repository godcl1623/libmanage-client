import { StyleSet, SetSize } from '../../../../custom_modules/commonUtils';

export const libraryBalloonWrapper = (balloonOrigin: string, balloonState: string) => (`
  display: ${balloonOrigin === 'Library' ? balloonState : 'none'};
  position: absolute;
  top: 0;
  right: 0;
  z-index: 2;
`);

export const libraryBalloonStyle = (styles: StyleSet, vars: any) => {
  const { sizes } = styles;
  const { balloonOrigin, balloonState, btnCoords } = vars;
  const setSize = sizes as unknown as SetSize;

  return (`
    padding: var(--gap-standard);
    display: ${balloonOrigin === 'Library' ? balloonState : 'none'};
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    ${setSize.free('15.625vw', '7.813vw')}
    ${setSize.free('max-content', 'max-content')}
    position: absolute;
    top: calc(${btnCoords.topCoord}px + 3.241vh);
    right: 1.563vw;
    background: var(--btn-active);
    z-index: 2;

    @media (orientation: portrait) {
      @media (min-width: 600px) {
        top: calc(${btnCoords.topCoord}px + ${3.241 / 1.778}vh);
        right: ${1.563 * 1.778}vw;
      }

      @media (max-width: 599px) {
        padding: var(--gap-standard);
        ${setSize.free('100vw', '175px')}
        top: 35px;
        top: 0;
        right: 0;
        justify-content: flex-end;
      }
    }
  `);
};

export const libraryBalloonHand = (vars: any) => {
  const { btnCoords, balloonOrigin, balloonState } = vars;

  return (`
    border-left: var(--gap-standard) solid transparent;
    border-right: var(--gap-standard) solid transparent;
    border-bottom: calc(var(--gap-standard) * 2) solid var(--btn-active);
    position: absolute;
    top: calc(${btnCoords.topCoord}px + 0.463vh);
    right: 1.563vw;
    display: ${balloonOrigin === 'Library' ? balloonState : 'none'};

    @media (orientation: portrait) {
      @media (min-width: 600px) {
        top: calc(${btnCoords.topCoord}px + ${0.463 / 1.778}vh);
        right: ${1.563 * 1.778}vw;
      }

      @media (max-width: 599px) {
        display: none;
      }
    }
  `);
};