import { css } from 'lit';

export const toastStyles = css`
  :host {
    display: block;
    pointer-events: auto;
  }

  .toast {
    display: flex;
    align-items: flex-start;
    gap: var(--bl-spacing-sm);
    padding: var(--bl-spacing-sm) var(--bl-spacing-md);
    background-color: #fff;
    border: 1px solid var(--bl-color-neutral-200);
    border-radius: var(--bl-radius-md);
    box-shadow: var(--bl-shadow-lg);
    font-family: var(--bl-font-family-base);
    font-size: var(--bl-font-size-sm);
    color: var(--bl-color-neutral-800);
    min-width: 280px;
    max-width: 420px;

    opacity: 0;
    transform: translateY(8px);
    transition:
      opacity var(--bl-animation-duration-normal) var(--bl-animation-easing-enter),
      transform var(--bl-animation-duration-normal) var(--bl-animation-easing-enter);
  }

  .toast[data-state='entering'],
  .toast[data-state='entered'] {
    opacity: 1;
    transform: translateY(0);
  }

  .toast[data-state='exiting'] {
    opacity: 0;
    transform: translateY(8px);
    transition:
      opacity var(--bl-animation-duration-fast) var(--bl-animation-easing-exit),
      transform var(--bl-animation-duration-fast) var(--bl-animation-easing-exit);
  }

  /* Variants */
  :host([variant='success']) .toast {
    border-left: 3px solid var(--bl-color-success-500);
  }

  :host([variant='warning']) .toast {
    border-left: 3px solid var(--bl-color-warning-500);
  }

  :host([variant='danger']) .toast {
    border-left: 3px solid var(--bl-color-danger-500);
  }

  .toast-content {
    flex: 1;
    line-height: 1.5;
  }

  .toast-close {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 24px;
    height: 24px;
    padding: 0;
    flex-shrink: 0;
    background: none;
    border: none;
    border-radius: var(--bl-radius-sm);
    color: var(--bl-color-neutral-400);
    cursor: pointer;
    transition:
      background-color var(--bl-transition-fast),
      color var(--bl-transition-fast);
  }

  .toast-close:hover {
    background-color: var(--bl-color-neutral-100);
    color: var(--bl-color-neutral-600);
  }

  .toast-action {
    flex-shrink: 0;
  }
`;
