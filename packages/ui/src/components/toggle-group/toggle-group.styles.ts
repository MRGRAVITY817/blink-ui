import { css } from 'lit';

export const toggleGroupStyles = css`
  :host {
    display: inline-flex;
    gap: 0;
    align-items: center;
  }

  :host([orientation='vertical']) {
    flex-direction: column;
  }

  /* Merge borders between adjacent toggles */
  ::slotted(bl-toggle:not(:first-child)) {
    margin-left: -1px;
  }

  :host([orientation='vertical']) ::slotted(bl-toggle:not(:first-child)) {
    margin-left: 0;
    margin-top: -1px;
  }

  /* Remove inner border-radius for connected look */
  ::slotted(bl-toggle:not(:first-child):not(:last-child)) {
    --_bl-toggle-radius: 0;
  }

  ::slotted(bl-toggle:first-child) {
    --_bl-toggle-radius-end: 0;
  }

  ::slotted(bl-toggle:last-child) {
    --_bl-toggle-radius-start: 0;
  }

  :host([aria-disabled='true']) {
    opacity: 0.5;
    pointer-events: none;
  }
`;
