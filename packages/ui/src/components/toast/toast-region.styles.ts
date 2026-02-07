import { css } from 'lit';

export const toastRegionStyles = css`
  :host {
    display: block;
    position: fixed;
    z-index: var(--bl-z-toast);
    pointer-events: none;
    padding: var(--bl-spacing-md);
  }

  /* Position variants */
  :host([position='top-left']) {
    top: 0;
    left: 0;
  }
  :host([position='top-center']) {
    top: 0;
    left: 50%;
    transform: translateX(-50%);
  }
  :host([position='top-right']),
  :host(:not([position])) {
    top: 0;
    right: 0;
  }
  :host([position='bottom-left']) {
    bottom: 0;
    left: 0;
  }
  :host([position='bottom-center']) {
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
  }
  :host([position='bottom-right']) {
    bottom: 0;
    right: 0;
  }

  .toast-list {
    display: flex;
    flex-direction: column;
    gap: var(--bl-spacing-sm);
  }

  /* Stack from bottom for top positions */
  :host([position='bottom-left']) .toast-list,
  :host([position='bottom-center']) .toast-list,
  :host([position='bottom-right']) .toast-list {
    flex-direction: column-reverse;
  }
`;
