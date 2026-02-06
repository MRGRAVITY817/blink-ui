import { css } from 'lit';

export const cardStyles = css`
  /* -------------------------------------------------------
     Host
     ------------------------------------------------------- */
  :host {
    display: block;
  }

  /* -------------------------------------------------------
     Container
     ------------------------------------------------------- */
  [part='container'] {
    border: 1px solid var(--bl-color-neutral-200);
    border-radius: var(--bl-radius-lg);
    background: white;
    overflow: hidden;
  }

  /* -------------------------------------------------------
     Header
     ------------------------------------------------------- */
  [part='header'] {
    padding: var(--bl-spacing-md) var(--bl-spacing-lg);
    border-bottom: 1px solid var(--bl-color-neutral-200);
  }

  /* -------------------------------------------------------
     Body
     ------------------------------------------------------- */
  [part='body'] {
    padding: var(--bl-spacing-lg);
  }

  /* -------------------------------------------------------
     Footer
     ------------------------------------------------------- */
  [part='footer'] {
    padding: var(--bl-spacing-md) var(--bl-spacing-lg);
    border-top: 1px solid var(--bl-color-neutral-200);
  }

  /* -------------------------------------------------------
     Variant: Elevated
     ------------------------------------------------------- */
  :host([variant='elevated']) [part='container'] {
    border-color: transparent;
    box-shadow:
      0 1px 3px 0 rgb(0 0 0 / 0.1),
      0 1px 2px -1px rgb(0 0 0 / 0.1);
  }
`;
