import { css } from 'lit';

export const iconStyles = css`
  :host {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 1em;
    height: 1em;
    line-height: 1;
    vertical-align: middle;
  }

  ::slotted(svg) {
    width: 100%;
    height: 100%;
    fill: currentColor;
  }
`;
