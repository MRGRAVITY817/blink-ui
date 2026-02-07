import { css } from 'lit';

export const menuItemStyles = css`
  :host {
    display: block;
  }

  :host([aria-disabled='true']) {
    pointer-events: none;
    opacity: 0.5;
  }

  .menu-item {
    display: flex;
    align-items: center;
    gap: var(--bl-spacing-sm);
    padding: var(--bl-spacing-xs) var(--bl-spacing-sm);
    cursor: pointer;
    font-family: var(--bl-font-family-base);
    font-size: var(--bl-font-size-sm);
    color: var(--bl-color-neutral-800);
    border-radius: var(--bl-radius-sm);
    border: none;
    background: none;
    width: 100%;
    text-align: left;
    transition: background-color var(--bl-transition-fast);
    user-select: none;
    line-height: 1.5;
  }

  .menu-item:hover,
  :host([data-highlighted]) .menu-item {
    background-color: var(--bl-color-neutral-100);
  }

  :host([variant='danger']) .menu-item {
    color: var(--bl-color-danger-600);
  }

  :host([variant='danger']) .menu-item:hover,
  :host([variant='danger'][data-highlighted]) .menu-item {
    background-color: var(--bl-color-danger-50);
  }

  .menu-item:focus-visible {
    outline: 2px solid var(--bl-focus-ring-color);
    outline-offset: -2px;
  }
`;
