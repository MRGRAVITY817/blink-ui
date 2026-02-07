import { css } from 'lit';

export const radioStyles = css`
  :host {
    display: inline-flex;
    align-items: center;
    gap: var(--bl-spacing-sm);
    cursor: pointer;
    user-select: none;
    font-family: var(--bl-font-family-base);
    outline: none;
  }

  :host([aria-disabled='true']) {
    cursor: not-allowed;
    pointer-events: none;
  }

  :host([size='sm']) {
    font-size: var(--bl-font-size-sm);
  }

  :host([size='md']) {
    font-size: var(--bl-font-size-md);
  }

  .radio {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    border-radius: var(--bl-radius-full);
    background-color: #fff;
    box-shadow: inset 0 0 0 1px var(--bl-color-neutral-300);
    transition:
      background-color var(--bl-transition-fast),
      box-shadow var(--bl-transition-fast);
  }

  :host([size='sm']) .radio {
    width: 1rem;
    height: 1rem;
  }

  :host([size='md']) .radio {
    width: 1.25rem;
    height: 1.25rem;
  }

  .radio-dot {
    border-radius: var(--bl-radius-full);
    background-color: white;
    transform: scale(0);
    transition: transform var(--bl-transition-fast);
  }

  :host([size='sm']) .radio-dot {
    width: 0.375rem;
    height: 0.375rem;
  }

  :host([size='md']) .radio-dot {
    width: 0.5rem;
    height: 0.5rem;
  }

  /* Checked */
  :host([aria-checked='true']) .radio {
    background-color: var(--bl-color-primary-600);
    box-shadow: none;
  }

  :host([aria-checked='true']) .radio-dot {
    transform: scale(1);
  }

  /* Focus */
  :host(:focus-visible) .radio {
    outline: 2px solid var(--bl-focus-ring-color);
    outline-offset: 2px;
  }

  /* Hover */
  :host(:hover:not([aria-disabled='true']):not([aria-checked='true'])) .radio {
    box-shadow: inset 0 0 0 1px var(--bl-color-primary-300);
  }

  :host(:hover:not([aria-disabled='true'])[aria-checked='true']) .radio {
    background-color: var(--bl-color-primary-700);
  }

  /* Disabled */
  :host([aria-disabled='true']) .radio {
    background-color: var(--bl-color-neutral-100);
    box-shadow: inset 0 0 0 1px var(--bl-color-neutral-300);
  }

  :host([aria-disabled='true'][aria-checked='true']) .radio {
    background-color: var(--bl-color-neutral-100);
    box-shadow: inset 0 0 0 1px var(--bl-color-neutral-300);
  }

  :host([aria-disabled='true'][aria-checked='true']) .radio-dot {
    background-color: var(--bl-color-neutral-400);
  }

  .label {
    color: var(--bl-color-neutral-700);
  }
`;
