import { css } from 'lit';

export const optionStyles = css`
  :host {
    display: block;
  }

  :host([aria-disabled='true']) {
    pointer-events: none;
    opacity: 0.5;
  }

  .option {
    display: flex;
    align-items: center;
    gap: var(--bl-spacing-sm);
    padding: var(--bl-spacing-xs) var(--bl-spacing-sm);
    cursor: pointer;
    font-family: var(--bl-font-family-base);
    font-size: var(--bl-font-size-sm);
    color: var(--bl-color-neutral-800);
    border-radius: var(--bl-radius-sm);
    transition: background-color var(--bl-transition-fast);
    user-select: none;
  }

  .option:hover,
  :host([data-highlighted]) .option {
    background-color: var(--bl-color-neutral-100);
  }

  :host([aria-selected='true']) .option {
    color: var(--bl-color-primary-700);
    font-weight: 500;
  }

  .check {
    width: 16px;
    height: 16px;
    flex-shrink: 0;
    opacity: 0;
  }

  :host([aria-selected='true']) .check {
    opacity: 1;
    color: var(--bl-color-primary-600);
  }
`;
