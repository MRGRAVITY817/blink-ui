import { css } from 'lit';

export const tabStyles = css`
  :host {
    display: inline-flex;
  }

  :host([aria-disabled='true']) {
    pointer-events: none;
    opacity: 0.5;
  }

  .tab {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: var(--bl-spacing-xs);
    padding: var(--bl-spacing-sm) var(--bl-spacing-md);
    background: none;
    border: none;
    border-bottom: 2px solid transparent;
    cursor: pointer;
    font-family: var(--bl-font-family-base);
    font-size: var(--bl-font-size-sm);
    font-weight: 500;
    color: var(--bl-color-neutral-500);
    transition:
      color var(--bl-transition-fast),
      border-color var(--bl-transition-fast);
    white-space: nowrap;
  }

  .tab:hover {
    color: var(--bl-color-neutral-700);
  }

  :host([aria-selected='true']) .tab {
    color: var(--bl-color-primary-600);
    border-bottom-color: var(--bl-color-primary-600);
  }

  .tab:focus-visible {
    outline: 2px solid var(--bl-focus-ring-color);
    outline-offset: -2px;
    border-radius: var(--bl-radius-sm);
  }
`;
