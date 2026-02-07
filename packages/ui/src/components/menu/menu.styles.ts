import { css } from 'lit';

export const menuStyles = css`
  :host {
    display: inline-block;
    position: relative;
  }

  .menu-surface {
    position: fixed;
    z-index: var(--bl-z-dropdown);
    min-width: 180px;
    max-height: 320px;
    overflow-y: auto;
    padding: var(--bl-spacing-xs);
    background-color: #fff;
    border: 1px solid var(--bl-color-neutral-200);
    border-radius: var(--bl-radius-md);
    box-shadow: var(--bl-shadow-lg);

    opacity: 0;
    transform: translateY(4px);
    transition:
      opacity var(--bl-animation-duration-fast) var(--bl-animation-easing-enter),
      transform var(--bl-animation-duration-fast) var(--bl-animation-easing-enter);
  }

  .menu-surface[data-state='entering'],
  .menu-surface[data-state='entered'] {
    opacity: 1;
    transform: translateY(0);
  }

  .menu-surface[data-state='exiting'] {
    opacity: 0;
    transform: translateY(4px);
    transition:
      opacity var(--bl-animation-duration-fast) var(--bl-animation-easing-exit),
      transform var(--bl-animation-duration-fast) var(--bl-animation-easing-exit);
  }
`;
