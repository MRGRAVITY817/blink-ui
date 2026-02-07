import { css } from 'lit';

export const radioStyles = css`
  :host {
    display: inline-flex;
    align-items: center;
    gap: var(--bl-spacing-sm);
    cursor: pointer;
    user-select: none;
    font-family: var(--bl-font-family-base);
    font-size: var(--bl-font-size-md);
    outline: none;
  }

  :host([aria-disabled='true']) {
    opacity: 0.5;
    cursor: not-allowed;
    pointer-events: none;
  }

  .radio {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    width: 1.25rem;
    height: 1.25rem;
    border: 2px solid var(--bl-color-neutral-400);
    border-radius: var(--bl-radius-full);
    background-color: transparent;
    transition:
      background-color var(--bl-transition-fast),
      border-color var(--bl-transition-fast);
  }

  .radio-dot {
    width: 0.5rem;
    height: 0.5rem;
    border-radius: var(--bl-radius-full);
    background-color: white;
    transform: scale(0);
    transition: transform var(--bl-transition-fast);
  }

  /* Checked */
  :host([aria-checked='true']) .radio {
    background-color: var(--bl-color-primary-600);
    border-color: var(--bl-color-primary-600);
  }

  :host([aria-checked='true']) .radio-dot {
    transform: scale(1);
  }

  /* Focus */
  :host(:focus-visible) .radio {
    outline: var(--bl-focus-ring);
    outline-offset: var(--bl-focus-ring-offset);
  }

  /* Hover */
  :host(:hover:not([aria-disabled='true'])) .radio {
    border-color: var(--bl-color-primary-500);
  }

  .label {
    color: var(--bl-color-neutral-700);
  }
`;
