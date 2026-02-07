import { css } from 'lit';

export const radioGroupStyles = css`
  :host {
    display: flex;
    flex-direction: column;
    gap: var(--bl-spacing-sm);
  }

  :host([orientation='horizontal']) {
    flex-direction: row;
    align-items: center;
  }

  :host([aria-disabled='true']) {
    opacity: 0.5;
    pointer-events: none;
  }
`;
