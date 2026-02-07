import { css } from 'lit';

export const tooltipStyles = css`
  :host {
    display: inline-block;
    position: relative;
  }

  .tooltip-surface {
    position: fixed;
    z-index: var(--bl-z-dropdown);
    pointer-events: none;
    width: max-content;
    max-width: 250px;

    padding: var(--bl-spacing-xs) var(--bl-spacing-sm);
    background-color: var(--bl-color-neutral-900);
    color: #fff;
    font-family: var(--bl-font-family-base);
    font-size: var(--bl-font-size-sm);
    line-height: 1.4;
    border-radius: var(--bl-radius-md);
    box-shadow: var(--bl-shadow-md);

    opacity: 0;
    transform: scale(0.95);
    transition:
      opacity var(--bl-animation-duration-fast) var(--bl-animation-easing-enter),
      transform var(--bl-animation-duration-fast) var(--bl-animation-easing-enter);
  }

  .tooltip-surface[data-state='entering'],
  .tooltip-surface[data-state='entered'] {
    opacity: 1;
    transform: scale(1);
  }

  .tooltip-surface[data-state='exiting'] {
    opacity: 0;
    transform: scale(0.95);
    transition:
      opacity var(--bl-animation-duration-fast) var(--bl-animation-easing-exit),
      transform var(--bl-animation-duration-fast) var(--bl-animation-easing-exit);
  }

  .tooltip-arrow {
    position: absolute;
    width: 8px;
    height: 8px;
    background-color: var(--bl-color-neutral-900);
    transform: rotate(45deg);
  }
`;
