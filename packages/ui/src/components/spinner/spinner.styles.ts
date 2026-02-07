import { css } from 'lit';

export const spinnerStyles = css`
  :host {
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }

  .spinner {
    display: inline-block;
    border-radius: var(--bl-radius-full);
    border-style: solid;
    border-color: var(--bl-color-neutral-200);
    border-top-color: var(--bl-color-primary-600);
    animation: bl-spin 0.6s linear infinite;
  }

  :host([size='sm']) .spinner {
    width: 1rem;
    height: 1rem;
    border-width: 2px;
  }

  :host([size='md']) .spinner {
    width: 1.5rem;
    height: 1.5rem;
    border-width: 2px;
  }

  :host([size='lg']) .spinner {
    width: 2rem;
    height: 2rem;
    border-width: 3px;
  }

  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }

  @keyframes bl-spin {
    to {
      transform: rotate(360deg);
    }
  }
`;
