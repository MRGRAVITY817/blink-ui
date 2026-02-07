import { css } from 'lit';

export const formLayoutStyles = css`
  :host {
    display: block;
  }

  .form-layout {
    display: flex;
    flex-direction: column;
    gap: var(--bl-spacing-lg);
  }

  :host([layout='horizontal']) .form-layout {
    flex-direction: column;
    gap: var(--bl-spacing-lg);
  }

  :host([layout='inline']) .form-layout {
    flex-direction: row;
    flex-wrap: wrap;
    align-items: flex-end;
    gap: var(--bl-spacing-md);
  }
`;

export const formFieldStyles = css`
  :host {
    display: block;
  }

  .form-field {
    display: flex;
    flex-direction: column;
    gap: var(--bl-spacing-xs);
  }

  :host([layout='horizontal']) .form-field {
    display: grid;
    grid-template-columns: minmax(120px, auto) 1fr;
    grid-template-rows: auto auto;
    gap: var(--bl-spacing-xs) var(--bl-spacing-md);
    align-items: start;
  }

  :host([layout='horizontal']) .label-area {
    padding-top: var(--bl-spacing-sm);
  }

  :host([layout='horizontal']) .control-area {
    grid-column: 2;
  }

  :host([layout='horizontal']) .support-area {
    grid-column: 2;
  }

  .label-area ::slotted(bl-label) {
    font-weight: 500;
    color: var(--bl-color-neutral-700);
    font-size: var(--bl-font-size-sm);
  }

  .required-indicator {
    color: var(--bl-color-danger-500);
    margin-left: 2px;
  }
`;

export const formDescriptionStyles = css`
  :host {
    display: block;
    color: var(--bl-color-neutral-500);
    font-size: var(--bl-font-size-xs);
    line-height: 1.5;
    font-family: var(--bl-font-family-base);
  }
`;

export const formErrorStyles = css`
  :host {
    display: block;
    color: var(--bl-color-danger-500);
    font-size: var(--bl-font-size-xs);
    line-height: 1.5;
    font-family: var(--bl-font-family-base);
  }

  :host(:empty) {
    display: none;
  }

  .error {
    display: flex;
    align-items: center;
    gap: var(--bl-spacing-xs);
  }

  .error-icon {
    width: 14px;
    height: 14px;
    flex-shrink: 0;
  }
`;

export const formFieldsetStyles = css`
  :host {
    display: block;
  }

  fieldset {
    border: 1px solid var(--bl-color-neutral-200);
    border-radius: var(--bl-radius-md);
    padding: var(--bl-spacing-lg);
    margin: 0;
  }

  legend {
    font-weight: 600;
    font-size: var(--bl-font-size-sm);
    color: var(--bl-color-neutral-700);
    padding: 0 var(--bl-spacing-xs);
    font-family: var(--bl-font-family-base);
  }

  .fieldset-content {
    display: flex;
    flex-direction: column;
    gap: var(--bl-spacing-lg);
  }
`;
