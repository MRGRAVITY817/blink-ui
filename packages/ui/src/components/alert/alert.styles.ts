import { css } from 'lit';

export const alertStyles = css`
  /* -------------------------------------------------------
     Host
     ------------------------------------------------------- */
  :host {
    display: block;
  }

  :host([hidden]),
  :host(:not([open])) {
    display: none;
  }

  /* -------------------------------------------------------
     Alert container
     ------------------------------------------------------- */
  .alert {
    position: relative;
    padding: var(--bl-spacing-md) var(--bl-spacing-lg);
    border-radius: var(--bl-radius-md);
    border-left: 4px solid;
    font-family: var(--bl-font-family-base);
    font-size: var(--bl-font-size-md);
    line-height: 1.5;
  }

  /* -------------------------------------------------------
     Variant: Info (default — uses primary colors)
     ------------------------------------------------------- */
  :host([variant='info']) .alert {
    background-color: var(--bl-color-primary-50);
    border-left-color: var(--bl-color-primary-500);
    color: var(--bl-color-primary-800);
  }

  /* -------------------------------------------------------
     Variant: Success
     ------------------------------------------------------- */
  :host([variant='success']) .alert {
    background-color: var(--bl-color-success-50);
    border-left-color: var(--bl-color-success-500);
    color: var(--bl-color-success-800);
  }

  /* -------------------------------------------------------
     Variant: Warning
     ------------------------------------------------------- */
  :host([variant='warning']) .alert {
    background-color: var(--bl-color-warning-50);
    border-left-color: var(--bl-color-warning-500);
    color: var(--bl-color-warning-800);
  }

  /* -------------------------------------------------------
     Variant: Danger
     ------------------------------------------------------- */
  :host([variant='danger']) .alert {
    background-color: var(--bl-color-danger-50);
    border-left-color: var(--bl-color-danger-500);
    color: var(--bl-color-danger-800);
  }

  /* -------------------------------------------------------
     Close button (hidden unless :host([closable]))
     ------------------------------------------------------- */
  .close-button {
    display: none;
    position: absolute;
    top: var(--bl-spacing-sm);
    right: var(--bl-spacing-sm);
    border: none;
    background: transparent;
    cursor: pointer;
    padding: var(--bl-spacing-xs);
    color: inherit;
    line-height: 1;
    border-radius: var(--bl-radius-sm);
    transition: background-color var(--bl-transition-fast);
  }

  .close-button:hover {
    background-color: rgba(0, 0, 0, 0.08);
  }

  .close-button:focus-visible {
    outline: var(--bl-focus-ring);
    outline-offset: var(--bl-focus-ring-offset);
  }

  :host([closable]) .close-button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }

  :host([closable]) .alert {
    padding-right: calc(var(--bl-spacing-lg) + var(--bl-spacing-lg));
  }
`;
