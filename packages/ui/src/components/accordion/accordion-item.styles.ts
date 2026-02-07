import { css } from 'lit';

export const accordionItemStyles = css`
  :host {
    display: block;
    border-bottom: 1px solid var(--bl-color-neutral-200);
  }

  :host(:first-of-type) {
    border-top: 1px solid var(--bl-color-neutral-200);
  }

  :host([disabled]) {
    opacity: 0.5;
    pointer-events: none;
  }

  .trigger {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding: var(--bl-spacing-md) 0;
    background: none;
    border: none;
    cursor: pointer;
    font-family: var(--bl-font-family-base);
    font-size: var(--bl-font-size-md);
    font-weight: 500;
    color: var(--bl-color-neutral-900);
    text-align: left;
    line-height: 1.5;
  }

  .trigger:hover {
    color: var(--bl-color-neutral-700);
  }

  .trigger:focus-visible {
    outline: 2px solid var(--bl-focus-ring-color);
    outline-offset: 2px;
    border-radius: var(--bl-radius-sm);
  }

  .chevron {
    width: 20px;
    height: 20px;
    flex-shrink: 0;
    color: var(--bl-color-neutral-500);
    transition: transform var(--bl-transition-fast);
  }

  :host([open]) .chevron {
    transform: rotate(180deg);
  }

  .panel {
    display: grid;
    grid-template-rows: 0fr;
    transition: grid-template-rows var(--bl-transition-normal);
  }

  :host([open]) .panel {
    grid-template-rows: 1fr;
  }

  .panel-inner {
    overflow: hidden;
  }

  .panel-content {
    padding-bottom: var(--bl-spacing-md);
    color: var(--bl-color-neutral-600);
    font-size: var(--bl-font-size-sm);
    line-height: 1.6;
  }
`;
