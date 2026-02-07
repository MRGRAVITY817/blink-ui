import { css } from 'lit';

export const labelStyles = css`
  :host {
    display: inline-block;
  }

  label {
    display: inline-flex;
    align-items: center;
    gap: var(--bl-spacing-xs);
    font-family: var(--bl-font-family-base);
    font-size: var(--bl-font-size-sm);
    font-weight: 500;
    color: var(--bl-color-neutral-700);
    cursor: default;
    user-select: none;
  }

  .required-indicator {
    color: var(--bl-color-danger-500);
  }
`;
