import { css } from 'lit';

export const dialogStyles = css`
  :host {
    display: contents;
  }

  :host(:not([open])) .backdrop,
  :host(:not([open])) .dialog {
    display: none;
  }

  .backdrop {
    position: fixed;
    inset: 0;
    z-index: var(--bl-z-modal);
    background-color: var(--bl-overlay-bg);
    backdrop-filter: blur(var(--bl-overlay-backdrop-blur));

    opacity: 0;
    transition: opacity var(--bl-animation-duration-normal) var(--bl-animation-easing-enter);
  }

  .backdrop[data-state='entering'],
  .backdrop[data-state='entered'] {
    opacity: 1;
  }

  .backdrop[data-state='exiting'] {
    opacity: 0;
    transition: opacity var(--bl-animation-duration-fast) var(--bl-animation-easing-exit);
  }

  .dialog {
    position: fixed;
    z-index: var(--bl-z-modal);
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) scale(0.95);
    max-width: min(520px, calc(100vw - 2rem));
    max-height: calc(100vh - 4rem);
    width: 100%;

    display: flex;
    flex-direction: column;

    background-color: #fff;
    border-radius: var(--bl-radius-lg);
    box-shadow: var(--bl-shadow-xl);
    font-family: var(--bl-font-family-base);

    opacity: 0;
    transition:
      opacity var(--bl-animation-duration-normal) var(--bl-animation-easing-enter),
      transform var(--bl-animation-duration-normal) var(--bl-animation-easing-enter);
  }

  .dialog[data-state='entering'],
  .dialog[data-state='entered'] {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1);
  }

  .dialog[data-state='exiting'] {
    opacity: 0;
    transform: translate(-50%, -50%) scale(0.95);
    transition:
      opacity var(--bl-animation-duration-fast) var(--bl-animation-easing-exit),
      transform var(--bl-animation-duration-fast) var(--bl-animation-easing-exit);
  }

  .dialog-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: var(--bl-spacing-lg);
    padding-bottom: 0;
  }

  .dialog-header ::slotted(*) {
    margin: 0;
    font-size: var(--bl-font-size-lg);
    font-weight: 600;
    color: var(--bl-color-neutral-900);
  }

  .close-button {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    padding: 0;
    margin-left: auto;
    background: none;
    border: none;
    border-radius: var(--bl-radius-sm);
    color: var(--bl-color-neutral-500);
    cursor: pointer;
    transition:
      background-color var(--bl-transition-fast),
      color var(--bl-transition-fast);
  }

  .close-button:hover {
    background-color: var(--bl-color-neutral-100);
    color: var(--bl-color-neutral-800);
  }

  .close-button:focus-visible {
    outline: 2px solid var(--bl-focus-ring-color);
    outline-offset: 2px;
  }

  .dialog-body {
    flex: 1;
    overflow-y: auto;
    padding: var(--bl-spacing-lg);
    color: var(--bl-color-neutral-600);
    font-size: var(--bl-font-size-sm);
    line-height: 1.6;
  }

  .dialog-footer {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: var(--bl-spacing-sm);
    padding: var(--bl-spacing-lg);
    padding-top: 0;
  }

  .dialog-footer:empty {
    display: none;
  }
`;
