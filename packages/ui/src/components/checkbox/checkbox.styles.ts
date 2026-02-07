import { css } from 'lit';

export const checkboxStyles = css`
  :host {
    display: inline-flex;
    align-items: center;
    gap: var(--bl-spacing-sm);
    cursor: pointer;
    user-select: none;
    font-family: var(--bl-font-family-base);
  }

  :host([aria-disabled='true']) {
    opacity: 0.5;
    cursor: not-allowed;
    pointer-events: none;
  }

  .checkbox {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    border: 2px solid var(--bl-color-neutral-400);
    border-radius: var(--bl-radius-sm);
    background-color: transparent;
    transition:
      background-color var(--bl-transition-fast),
      border-color var(--bl-transition-fast);
  }

  :host([size='sm']) .checkbox {
    width: 1rem;
    height: 1rem;
  }

  :host([size='md']) .checkbox {
    width: 1.25rem;
    height: 1.25rem;
  }

  :host([size='sm']) {
    font-size: var(--bl-font-size-sm);
  }

  :host([size='md']) {
    font-size: var(--bl-font-size-md);
  }

  /* Checked */
  :host([data-checked]) .checkbox {
    background-color: var(--bl-color-primary-600);
    border-color: var(--bl-color-primary-600);
  }

  /* Indeterminate */
  :host([data-checked='mixed']) .checkbox {
    background-color: var(--bl-color-primary-600);
    border-color: var(--bl-color-primary-600);
  }

  .check-icon {
    display: none;
    fill: white;
  }

  :host([data-checked]) .check-icon {
    display: block;
  }

  .check-icon svg {
    width: 100%;
    height: 100%;
  }

  /* Focus */
  :host(:focus-visible) .checkbox {
    outline: var(--bl-focus-ring);
    outline-offset: var(--bl-focus-ring-offset);
  }

  /* Hover */
  :host(:hover:not([aria-disabled='true'])) .checkbox {
    border-color: var(--bl-color-primary-500);
  }

  .label {
    color: var(--bl-color-neutral-700);
  }
`;
