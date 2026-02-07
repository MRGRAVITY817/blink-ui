import { css } from 'lit';

export const skeletonStyles = css`
  :host {
    display: block;
  }

  .skeleton {
    background-color: var(--bl-color-neutral-200);
    border-radius: var(--bl-radius-md);
    animation: bl-pulse 1.5s ease-in-out infinite;
  }

  :host([variant='circle']) .skeleton {
    border-radius: var(--bl-radius-full);
  }

  :host([variant='text']) .skeleton {
    border-radius: var(--bl-radius-sm);
  }

  @keyframes bl-pulse {
    0%,
    100% {
      opacity: 1;
    }
    50% {
      opacity: 0.4;
    }
  }
`;
