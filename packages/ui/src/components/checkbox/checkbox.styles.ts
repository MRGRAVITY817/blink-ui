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
    cursor: not-allowed;
    pointer-events: none;
  }

  .checkbox {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    background-color: #fff;
    box-shadow: inset 0 0 0 1px var(--bl-color-neutral-300);
    transition:
      background-color var(--bl-transition-fast),
      box-shadow var(--bl-transition-fast);
  }

  :host([size='sm']) .checkbox {
    width: 1rem;
    height: 1rem;
    border-radius: var(--bl-radius-sm);
  }

  :host([size='md']) .checkbox {
    width: 1.25rem;
    height: 1.25rem;
    border-radius: var(--bl-radius-md-lg);
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
    box-shadow: none;
  }

  /* Indeterminate */
  :host([data-checked='mixed']) .checkbox {
    background-color: var(--bl-color-primary-600);
    box-shadow: none;
  }

  .check-icon {
    display: none;
    fill: white;
  }

  :host([data-checked]) .check-icon {
    display: block;
  }

  :host([size='sm']) .check-icon svg {
    width: 0.75rem;
    height: 0.75rem;
  }

  :host([size='md']) .check-icon svg {
    width: 0.875rem;
    height: 0.875rem;
  }

  /* Focus */
  :host(:focus-visible) .checkbox {
    outline: 2px solid var(--bl-focus-ring-color);
    outline-offset: 2px;
  }

  /* Hover */
  :host(:hover:not([aria-disabled='true']):not([data-checked])) .checkbox {
    box-shadow: inset 0 0 0 1px var(--bl-color-primary-300);
  }

  :host(:hover:not([aria-disabled='true'])[data-checked]) .checkbox {
    background-color: var(--bl-color-primary-700);
  }

  /* Disabled */
  :host([aria-disabled='true']) .checkbox {
    background-color: var(--bl-color-neutral-100);
    box-shadow: inset 0 0 0 1px var(--bl-color-neutral-300);
  }

  :host([aria-disabled='true'][data-checked]) .checkbox {
    background-color: var(--bl-color-neutral-100);
    box-shadow: inset 0 0 0 1px var(--bl-color-neutral-300);
  }

  :host([aria-disabled='true'][data-checked]) .check-icon {
    fill: var(--bl-color-neutral-400);
  }

  .label {
    color: var(--bl-color-neutral-700);
  }
`;
