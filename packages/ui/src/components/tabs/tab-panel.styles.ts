import { css } from 'lit';

export const tabPanelStyles = css`
  :host {
    display: block;
  }

  :host(:not([active])) {
    display: none;
  }

  .panel {
    padding: var(--bl-spacing-md) 0;
  }
`;
