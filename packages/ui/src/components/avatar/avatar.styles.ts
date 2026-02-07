import { css } from 'lit';

export const avatarStyles = css`
  :host {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    vertical-align: middle;
  }

  .avatar {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-radius: var(--bl-radius-full);
    overflow: hidden;
    background-color: var(--bl-color-neutral-100);
    color: var(--bl-color-neutral-600);
    font-family: var(--bl-font-family-base);
    font-weight: 600;
    user-select: none;
    box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.08);
  }

  :host([size='sm']) .avatar {
    width: 2rem;
    height: 2rem;
    font-size: var(--bl-font-size-xs);
  }

  :host([size='md']) .avatar {
    width: 2.5rem;
    height: 2.5rem;
    font-size: var(--bl-font-size-sm);
  }

  :host([size='lg']) .avatar {
    width: 3rem;
    height: 3rem;
    font-size: var(--bl-font-size-md);
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .fallback-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--bl-color-neutral-400);
  }

  .fallback-icon svg {
    width: 60%;
    height: 60%;
    fill: currentColor;
  }
`;
