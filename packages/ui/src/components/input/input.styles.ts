import { css } from 'lit';

export const inputStyles = css`
  /* -------------------------------------------------------
     Host
     ------------------------------------------------------- */
  :host {
    display: block;
  }

  :host([disabled]) {
    pointer-events: none;
  }

  /* -------------------------------------------------------
     Wrapper
     ------------------------------------------------------- */
  .input-wrapper {
    display: flex;
    flex-direction: column;
    gap: var(--bl-spacing-xs);
  }

  /* -------------------------------------------------------
     Label
     ------------------------------------------------------- */
  [part='label'] {
    font-family: var(--bl-font-family-base);
    font-size: var(--bl-font-size-sm);
    font-weight: 500;
    color: var(--bl-color-neutral-700);
    line-height: 1.4;
  }

  /* -------------------------------------------------------
     Base input
     ------------------------------------------------------- */
  [part='input'] {
    display: block;
    width: 100%;
    border: 1px solid var(--bl-color-neutral-300);
    border-radius: var(--bl-radius-md);
    font-family: var(--bl-font-family-base);
    font-size: var(--bl-font-size-md);
    color: var(--bl-color-neutral-900);
    background-color: white;
    box-sizing: border-box;
    transition:
      border-color var(--bl-transition-fast),
      box-shadow var(--bl-transition-fast),
      opacity var(--bl-transition-fast);
  }

  [part='input']::placeholder {
    color: var(--bl-color-neutral-400);
  }

  /* -------------------------------------------------------
     Sizes
     ------------------------------------------------------- */
  :host([size='sm']) [part='input'] {
    font-size: var(--bl-font-size-sm);
    padding: var(--bl-spacing-xs) var(--bl-spacing-sm);
    min-height: 1.75rem;
  }

  :host([size='md']) [part='input'] {
    font-size: var(--bl-font-size-md);
    padding: var(--bl-spacing-sm) var(--bl-spacing-md);
    min-height: 2.25rem;
  }

  :host([size='lg']) [part='input'] {
    font-size: var(--bl-font-size-lg);
    padding: var(--bl-spacing-sm) var(--bl-spacing-lg);
    min-height: 2.75rem;
  }

  /* -------------------------------------------------------
     Focus state
     ------------------------------------------------------- */
  [part='input']:focus {
    outline: none;
    border-color: var(--bl-color-primary-500);
    box-shadow: 0 0 0 var(--bl-focus-ring-width) var(--bl-focus-ring-color);
  }

  /* -------------------------------------------------------
     Disabled state
     ------------------------------------------------------- */
  :host([disabled]) [part='input'] {
    opacity: 0.5;
    background-color: var(--bl-color-neutral-50);
    cursor: not-allowed;
  }

  /* -------------------------------------------------------
     Error state
     ------------------------------------------------------- */
  :host([error]) [part='input'] {
    border-color: var(--bl-color-danger-500);
  }

  :host([error]) [part='input']:focus {
    border-color: var(--bl-color-danger-500);
    box-shadow: 0 0 0 var(--bl-focus-ring-width) var(--bl-color-danger-200);
  }

  /* -------------------------------------------------------
     Help text
     ------------------------------------------------------- */
  [part='help-text'] {
    font-family: var(--bl-font-family-base);
    font-size: var(--bl-font-size-sm);
    color: var(--bl-color-neutral-500);
    line-height: 1.4;
  }

  :host([error]) [part='help-text'] {
    color: var(--bl-color-danger-500);
  }
`;
