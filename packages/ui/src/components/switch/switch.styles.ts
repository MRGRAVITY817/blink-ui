import { css } from 'lit';

export const switchStyles = css`
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

  .track {
    position: relative;
    flex-shrink: 0;
    border-radius: var(--bl-radius-full);
    background-color: var(--bl-color-neutral-200);
    transition: background-color var(--bl-transition-fast);
  }

  :host([size='sm']) .track {
    width: 2.25rem;
    height: 1.25rem;
  }

  :host([size='md']) .track {
    width: 2.75rem;
    height: 1.5rem;
  }

  :host([size='sm']) {
    font-size: var(--bl-font-size-sm);
  }

  :host([size='md']) {
    font-size: var(--bl-font-size-md);
  }

  .thumb {
    position: absolute;
    top: 2px;
    left: 2px;
    border-radius: var(--bl-radius-full);
    background-color: #fff;
    transition: transform var(--bl-transition-fast);
    box-shadow: var(--bl-shadow-xs);
  }

  :host([size='sm']) .thumb {
    width: 1rem;
    height: 1rem;
  }

  :host([size='md']) .thumb {
    width: 1.25rem;
    height: 1.25rem;
  }

  /* Checked */
  :host([data-checked]) .track {
    background-color: var(--bl-color-primary-600);
  }

  :host([data-checked][size='sm']) .thumb {
    transform: translateX(1rem);
  }

  :host([data-checked][size='md']) .thumb {
    transform: translateX(1.25rem);
  }

  /* Focus */
  :host(:focus-visible) .track {
    outline: 2px solid var(--bl-focus-ring-color);
    outline-offset: 2px;
  }

  /* Hover */
  :host(:hover:not([aria-disabled='true']):not([data-checked])) .track {
    background-color: var(--bl-color-neutral-300);
  }

  :host([data-checked]:hover:not([aria-disabled='true'])) .track {
    background-color: var(--bl-color-primary-700);
  }

  /* Disabled */
  :host([aria-disabled='true']) .track {
    background-color: var(--bl-color-neutral-100);
  }

  :host([aria-disabled='true']) .thumb {
    background-color: var(--bl-color-neutral-50);
    box-shadow: none;
  }

  .label {
    color: var(--bl-color-neutral-700);
  }
`;
