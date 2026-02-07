import { css } from 'lit';

export const pageHeaderStyles = css`
  :host {
    display: block;
    font-family: var(--bl-font-family-base);
  }

  .page-header {
    display: flex;
    flex-direction: column;
    gap: var(--bl-spacing-md);
    padding-bottom: var(--bl-spacing-lg);
    border-bottom: 1px solid var(--bl-color-neutral-200);
  }

  .breadcrumb-area {
    display: contents;
  }

  .breadcrumb-area ::slotted(*) {
    margin-bottom: var(--bl-spacing-xs);
  }

  .header-row {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: var(--bl-spacing-lg);
  }

  .header-content {
    flex: 1;
    min-width: 0;
  }

  .title ::slotted(*) {
    margin: 0;
    font-size: var(--bl-font-size-xl);
    font-weight: 600;
    color: var(--bl-color-neutral-900);
    line-height: 1.3;
  }

  .description {
    margin-top: var(--bl-spacing-xs);
  }

  .description ::slotted(*) {
    margin: 0;
    font-size: var(--bl-font-size-sm);
    color: var(--bl-color-neutral-500);
    line-height: 1.5;
  }

  .actions {
    display: flex;
    align-items: center;
    gap: var(--bl-spacing-sm);
    flex-shrink: 0;
  }
`;

export const breadcrumbStyles = css`
  :host {
    display: block;
    font-family: var(--bl-font-family-base);
  }

  nav {
    display: block;
  }

  ol {
    display: flex;
    align-items: center;
    list-style: none;
    margin: 0;
    padding: 0;
    gap: var(--bl-spacing-xs);
    flex-wrap: wrap;
  }
`;

export const breadcrumbItemStyles = css`
  :host {
    display: inline-flex;
    align-items: center;
    font-size: var(--bl-font-size-sm);
    font-family: var(--bl-font-family-base);
  }

  :host(:not(:first-child))::before {
    content: '/';
    color: var(--bl-color-neutral-400);
    margin-right: var(--bl-spacing-xs);
  }

  a,
  ::slotted(a) {
    color: var(--bl-color-neutral-500);
    text-decoration: none;
    transition: color var(--bl-transition-fast);
  }

  a:hover,
  ::slotted(a:hover) {
    color: var(--bl-color-primary-600);
  }

  :host([current]) ::slotted(*),
  :host([current]) span {
    color: var(--bl-color-neutral-900);
    font-weight: 500;
  }

  ::slotted(*):focus-visible,
  a:focus-visible {
    outline: 2px solid var(--bl-focus-ring-color);
    outline-offset: 2px;
    border-radius: var(--bl-radius-xs);
  }
`;
