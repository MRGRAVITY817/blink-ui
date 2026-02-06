import { css } from 'lit';

export const badgeStyles = css`
  /* -------------------------------------------------------
     Host
     ------------------------------------------------------- */
  :host {
    display: inline-flex;
  }

  /* -------------------------------------------------------
     Base badge
     ------------------------------------------------------- */
  span {
    display: inline-flex;
    align-items: center;
    font-family: var(--bl-font-family-base);
    font-weight: 500;
    line-height: 1;
    white-space: nowrap;
    border-radius: var(--bl-radius-full);
  }

  /* -------------------------------------------------------
     Sizes
     ------------------------------------------------------- */
  :host([size='sm']) span {
    font-size: var(--bl-font-size-xs);
    padding: var(--bl-spacing-xs) var(--bl-spacing-sm);
  }

  :host([size='md']) span {
    font-size: var(--bl-font-size-sm);
    padding: var(--bl-spacing-xs) var(--bl-spacing-md);
  }

  /* -------------------------------------------------------
     Variant: Neutral (default)
     ------------------------------------------------------- */
  :host([variant='neutral']) span {
    background-color: var(--bl-color-neutral-100);
    color: var(--bl-color-neutral-700);
  }

  /* -------------------------------------------------------
     Variant: Primary
     ------------------------------------------------------- */
  :host([variant='primary']) span {
    background-color: var(--bl-color-primary-100);
    color: var(--bl-color-primary-700);
  }

  /* -------------------------------------------------------
     Variant: Secondary
     ------------------------------------------------------- */
  :host([variant='secondary']) span {
    background-color: var(--bl-color-secondary-100);
    color: var(--bl-color-secondary-700);
  }

  /* -------------------------------------------------------
     Variant: Success
     ------------------------------------------------------- */
  :host([variant='success']) span {
    background-color: var(--bl-color-success-100);
    color: var(--bl-color-success-700);
  }

  /* -------------------------------------------------------
     Variant: Warning
     ------------------------------------------------------- */
  :host([variant='warning']) span {
    background-color: var(--bl-color-warning-100);
    color: var(--bl-color-warning-700);
  }

  /* -------------------------------------------------------
     Variant: Danger
     ------------------------------------------------------- */
  :host([variant='danger']) span {
    background-color: var(--bl-color-danger-100);
    color: var(--bl-color-danger-700);
  }
`;
