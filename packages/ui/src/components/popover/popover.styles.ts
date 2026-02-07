import { css } from 'lit';

export const popoverStyles = css`
  :host {
    display: inline-block;
    position: relative;
  }

  .popover-surface {
    position: fixed;
    z-index: var(--bl-z-dropdown);
    width: max-content;
    max-width: min(360px, 95vw);

    background-color: #fff;
    border: 1px solid var(--bl-color-neutral-200);
    border-radius: var(--bl-radius-md);
    box-shadow: var(--bl-shadow-lg);
    font-family: var(--bl-font-family-base);
    font-size: var(--bl-font-size-md);

    opacity: 0;
    transform: translateY(4px);
    transition:
      opacity var(--bl-animation-duration-normal) var(--bl-animation-easing-enter),
      transform var(--bl-animation-duration-normal) var(--bl-animation-easing-enter);
  }

  .popover-surface[data-state='entering'],
  .popover-surface[data-state='entered'] {
    opacity: 1;
    transform: translateY(0);
  }

  .popover-surface[data-state='exiting'] {
    opacity: 0;
    transform: translateY(4px);
    transition:
      opacity var(--bl-animation-duration-fast) var(--bl-animation-easing-exit),
      transform var(--bl-animation-duration-fast) var(--bl-animation-easing-exit);
  }

  .popover-content {
    padding: var(--bl-spacing-md);
  }

  .popover-arrow {
    position: absolute;
    width: 10px;
    height: 10px;
    background-color: #fff;
    border: 1px solid var(--bl-color-neutral-200);
    border-right: none;
    border-bottom: none;
    transform: rotate(45deg);
  }
`;
