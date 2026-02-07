import { css } from 'lit';

export const toggleStyles = css`
  :host {
    display: inline-block;
  }

  :host([aria-disabled='true']) {
    pointer-events: none;
  }

  button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: var(--bl-spacing-xs);
    border-radius: var(--bl-radius-md);
    font-family: var(--bl-font-family-base);
    font-weight: 500;
    line-height: 1;
    cursor: pointer;
    user-select: none;
    background-color: #fff;
    color: var(--bl-color-neutral-600);
    border: 1px solid var(--bl-color-neutral-300);
    box-shadow: var(--bl-shadow-xs);
    transition:
      background-color var(--bl-transition-fast),
      color var(--bl-transition-fast),
      border-color var(--bl-transition-fast),
      box-shadow var(--bl-transition-fast);
  }

  /* Sizes */
  :host([size='sm']) button {
    font-size: var(--bl-font-size-sm);
    padding: var(--bl-spacing-xs) var(--bl-spacing-sm);
    min-height: 1.75rem;
  }

  :host([size='md']) button {
    font-size: var(--bl-font-size-md);
    padding: var(--bl-spacing-sm) var(--bl-spacing-md);
    min-height: 2.25rem;
  }

  :host([size='lg']) button {
    font-size: var(--bl-font-size-lg);
    padding: var(--bl-spacing-sm) var(--bl-spacing-lg);
    min-height: 2.75rem;
  }

  /* Pressed state */
  :host([data-pressed]) button {
    background-color: var(--bl-color-neutral-100);
    color: var(--bl-color-neutral-900);
    border-color: var(--bl-color-neutral-400);
  }

  /* Outline variant */
  :host([variant='outline']) button {
    border-color: var(--bl-color-neutral-300);
  }

  :host([variant='outline'][data-pressed]) button {
    background-color: var(--bl-color-primary-50);
    color: var(--bl-color-primary-700);
    border-color: var(--bl-color-primary-300);
  }

  /* Hover */
  button:hover {
    background-color: var(--bl-color-neutral-50);
  }

  :host([data-pressed]) button:hover {
    background-color: var(--bl-color-neutral-200);
  }

  /* Focus */
  button:focus-visible {
    outline: 2px solid var(--bl-focus-ring-color);
    outline-offset: 2px;
  }

  /* Disabled */
  :host([aria-disabled='true']) button {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;
