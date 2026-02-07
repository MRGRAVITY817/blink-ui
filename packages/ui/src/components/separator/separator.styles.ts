import { css } from 'lit';

export const separatorStyles = css`
  :host {
    display: block;
  }

  :host([orientation='vertical']) {
    display: inline-block;
    height: auto;
    align-self: stretch;
  }

  [part='separator'] {
    border: none;
    margin: 0;
    background-color: var(--bl-color-neutral-200);
  }

  :host(:not([orientation='vertical'])) [part='separator'] {
    height: 1px;
    width: 100%;
  }

  :host([orientation='vertical']) [part='separator'] {
    width: 1px;
    height: 100%;
    min-height: 1rem;
  }
`;
