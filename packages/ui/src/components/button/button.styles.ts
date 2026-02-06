import { css } from 'lit';

export const buttonStyles = css`
  /* -------------------------------------------------------
     Host
     ------------------------------------------------------- */
  :host {
    display: inline-block;
  }

  :host([disabled]) {
    pointer-events: none;
  }

  /* -------------------------------------------------------
     Base button
     ------------------------------------------------------- */
  button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: var(--bl-spacing-xs);
    border: 1px solid transparent;
    border-radius: var(--bl-radius-md);
    font-family: var(--bl-font-family-base);
    font-weight: 500;
    line-height: 1;
    cursor: pointer;
    white-space: nowrap;
    user-select: none;
    transition:
      background-color var(--bl-transition-fast),
      color var(--bl-transition-fast),
      border-color var(--bl-transition-fast),
      box-shadow var(--bl-transition-fast),
      opacity var(--bl-transition-fast);
  }

  /* -------------------------------------------------------
     Focus ring
     ------------------------------------------------------- */
  button:focus-visible {
    outline: var(--bl-focus-ring);
    outline-offset: var(--bl-focus-ring-offset);
  }

  /* -------------------------------------------------------
     Sizes
     ------------------------------------------------------- */
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

  /* -------------------------------------------------------
     Variant: Primary
     ------------------------------------------------------- */
  :host([variant='primary']) button {
    background-color: var(--bl-color-primary-600);
    color: white;
    border-color: var(--bl-color-primary-600);
  }

  :host([variant='primary']) button:hover {
    background-color: var(--bl-color-primary-700);
    border-color: var(--bl-color-primary-700);
  }

  :host([variant='primary']) button:active {
    background-color: var(--bl-color-primary-800);
    border-color: var(--bl-color-primary-800);
  }

  /* -------------------------------------------------------
     Variant: Secondary
     ------------------------------------------------------- */
  :host([variant='secondary']) button {
    background-color: transparent;
    color: var(--bl-color-neutral-700);
    border-color: var(--bl-color-neutral-300);
  }

  :host([variant='secondary']) button:hover {
    background-color: var(--bl-color-neutral-100);
    border-color: var(--bl-color-neutral-400);
  }

  :host([variant='secondary']) button:active {
    background-color: var(--bl-color-neutral-200);
    border-color: var(--bl-color-neutral-400);
  }

  /* -------------------------------------------------------
     Variant: Danger
     ------------------------------------------------------- */
  :host([variant='danger']) button {
    background-color: var(--bl-color-danger-600);
    color: white;
    border-color: var(--bl-color-danger-600);
  }

  :host([variant='danger']) button:hover {
    background-color: var(--bl-color-danger-700);
    border-color: var(--bl-color-danger-700);
  }

  :host([variant='danger']) button:active {
    background-color: var(--bl-color-danger-800);
    border-color: var(--bl-color-danger-800);
  }

  /* -------------------------------------------------------
     Variant: Ghost
     ------------------------------------------------------- */
  :host([variant='ghost']) button {
    background-color: transparent;
    color: var(--bl-color-neutral-700);
    border-color: transparent;
  }

  :host([variant='ghost']) button:hover {
    background-color: var(--bl-color-neutral-100);
  }

  :host([variant='ghost']) button:active {
    background-color: var(--bl-color-neutral-200);
  }

  /* -------------------------------------------------------
     Disabled state
     ------------------------------------------------------- */
  :host([disabled]) button {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;
