import { css } from 'lit';

export const optionGroupStyles = css`
  :host {
    display: block;
  }

  .group-label {
    padding: var(--bl-spacing-sm) var(--bl-spacing-sm) var(--bl-spacing-xs);
    font-family: var(--bl-font-family-base);
    font-size: var(--bl-font-size-xs);
    font-weight: 600;
    color: var(--bl-color-neutral-500);
    text-transform: uppercase;
    letter-spacing: 0.05em;
    user-select: none;
  }
`;
