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
    opacity: 0.5;
    cursor: not-allowed;
    pointer-events: none;
  }

  .track {
    position: relative;
    flex-shrink: 0;
    border-radius: var(--bl-radius-full);
    background-color: var(--bl-color-neutral-300);
    transition: background-color var(--bl-transition-fast);
  }

  :host([size='sm']) .track {
    width: 2rem;
    height: 1.125rem;
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
    background-color: white;
    transition: transform var(--bl-transition-fast);
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  }

  :host([size='sm']) .thumb {
    width: calc(1.125rem - 4px);
    height: calc(1.125rem - 4px);
  }

  :host([size='md']) .thumb {
    width: calc(1.5rem - 4px);
    height: calc(1.5rem - 4px);
  }

  /* Checked */
  :host([data-checked]) .track {
    background-color: var(--bl-color-primary-600);
  }

  :host([data-checked][size='sm']) .thumb {
    transform: translateX(calc(2rem - 1.125rem));
  }

  :host([data-checked][size='md']) .thumb {
    transform: translateX(calc(2.75rem - 1.5rem));
  }

  /* Focus */
  :host(:focus-visible) .track {
    outline: var(--bl-focus-ring);
    outline-offset: var(--bl-focus-ring-offset);
  }

  /* Hover */
  :host(:hover:not([aria-disabled='true'])) .track {
    background-color: var(--bl-color-neutral-400);
  }

  :host([data-checked]:hover:not([aria-disabled='true'])) .track {
    background-color: var(--bl-color-primary-700);
  }

  .label {
    color: var(--bl-color-neutral-700);
  }
`;
