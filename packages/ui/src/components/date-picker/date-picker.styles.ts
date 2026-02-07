import { css } from 'lit';

export const datePickerStyles = css`
  :host {
    display: inline-block;
    position: relative;
    font-family: var(--bl-font-family-base);
  }

  :host([disabled]) {
    opacity: 0.5;
    pointer-events: none;
  }

  .popup {
    position: fixed;
    z-index: var(--bl-z-dropdown);
    background-color: #fff;
    border: 1px solid var(--bl-color-neutral-200);
    border-radius: var(--bl-radius-md);
    box-shadow: var(--bl-shadow-lg);
    padding: var(--bl-spacing-md);

    opacity: 0;
    transform: translateY(4px);
    transition:
      opacity var(--bl-animation-duration-fast) var(--bl-animation-easing-enter),
      transform var(--bl-animation-duration-fast) var(--bl-animation-easing-enter);
  }

  .popup[data-state='entering'],
  .popup[data-state='entered'] {
    opacity: 1;
    transform: translateY(0);
  }

  .popup[data-state='exiting'] {
    opacity: 0;
    transform: translateY(4px);
    transition:
      opacity var(--bl-animation-duration-fast) var(--bl-animation-easing-exit),
      transform var(--bl-animation-duration-fast) var(--bl-animation-easing-exit);
  }
`;

export const dateFieldStyles = css`
  :host {
    display: inline-flex;
  }

  .date-field {
    display: inline-flex;
    align-items: center;
    gap: 1px;
    padding: var(--bl-spacing-sm) var(--bl-spacing-md);
    background-color: #fff;
    border: 1px solid var(--bl-color-neutral-300);
    border-radius: var(--bl-radius-md);
    font-family: var(--bl-font-family-base);
    font-size: var(--bl-font-size-sm);
    box-shadow: var(--bl-shadow-xs);
    cursor: text;
    transition:
      border-color var(--bl-transition-fast),
      box-shadow var(--bl-transition-fast);
  }

  .date-field:focus-within {
    border-color: var(--bl-color-primary-500);
    box-shadow: 0 0 0 1px var(--bl-color-primary-500);
  }

  .separator {
    color: var(--bl-color-neutral-400);
    padding: 0 1px;
    user-select: none;
  }

  .calendar-trigger {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 20px;
    height: 20px;
    padding: 0;
    margin-left: var(--bl-spacing-sm);
    background: none;
    border: none;
    color: var(--bl-color-neutral-500);
    cursor: pointer;
    border-radius: var(--bl-radius-sm);
    transition: color var(--bl-transition-fast);
  }

  .calendar-trigger:hover {
    color: var(--bl-color-neutral-800);
  }

  .calendar-trigger:focus-visible {
    outline: 2px solid var(--bl-focus-ring-color);
    outline-offset: 2px;
  }
`;

export const dateSegmentStyles = css`
  :host {
    display: inline-block;
  }

  .segment {
    display: inline-block;
    min-width: 1.5em;
    padding: 1px 2px;
    text-align: center;
    border-radius: var(--bl-radius-xs);
    color: var(--bl-color-neutral-900);
    font-variant-numeric: tabular-nums;
    caret-color: transparent;
    cursor: default;
    outline: none;
    transition: background-color var(--bl-transition-fast);
  }

  .segment:focus {
    background-color: var(--bl-color-primary-100);
    color: var(--bl-color-primary-700);
  }

  .segment.placeholder {
    color: var(--bl-color-neutral-400);
  }
`;

export const calendarStyles = css`
  :host {
    display: block;
    font-family: var(--bl-font-family-base);
  }

  .calendar {
    width: 280px;
  }

  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: var(--bl-spacing-sm);
  }

  .month-year {
    font-weight: 600;
    font-size: var(--bl-font-size-sm);
    color: var(--bl-color-neutral-900);
  }

  .nav-buttons {
    display: flex;
    gap: var(--bl-spacing-xs);
  }

  .nav-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 28px;
    height: 28px;
    padding: 0;
    background: none;
    border: 1px solid var(--bl-color-neutral-200);
    border-radius: var(--bl-radius-md);
    color: var(--bl-color-neutral-600);
    cursor: pointer;
    transition:
      background-color var(--bl-transition-fast),
      border-color var(--bl-transition-fast);
  }

  .nav-btn:hover {
    background-color: var(--bl-color-neutral-100);
  }

  .nav-btn:focus-visible {
    outline: 2px solid var(--bl-focus-ring-color);
    outline-offset: 2px;
  }

  .weekdays {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    margin-bottom: var(--bl-spacing-xs);
  }

  .weekday {
    text-align: center;
    font-size: 11px;
    font-weight: 600;
    color: var(--bl-color-neutral-500);
    padding: var(--bl-spacing-xs) 0;
  }

  .days {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: 1px;
  }
`;

export const calendarCellStyles = css`
  :host {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  button {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 36px;
    height: 36px;
    padding: 0;
    background: none;
    border: none;
    border-radius: var(--bl-radius-md);
    font-size: var(--bl-font-size-sm);
    font-family: var(--bl-font-family-base);
    color: var(--bl-color-neutral-700);
    cursor: pointer;
    font-variant-numeric: tabular-nums;
    transition:
      background-color var(--bl-transition-fast),
      color var(--bl-transition-fast);
  }

  button:hover:not(:disabled) {
    background-color: var(--bl-color-neutral-100);
  }

  button:focus-visible {
    outline: 2px solid var(--bl-focus-ring-color);
    outline-offset: -2px;
  }

  :host([outside-month]) button {
    color: var(--bl-color-neutral-400);
  }

  :host([today]) button {
    font-weight: 600;
    border: 1px solid var(--bl-color-primary-300);
  }

  :host([selected]) button {
    background-color: var(--bl-color-primary-600);
    color: #fff;
  }

  :host([selected]) button:hover {
    background-color: var(--bl-color-primary-700);
  }

  button:disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }

  /* Range selection states */
  :host([in-range]) button {
    background-color: var(--bl-color-primary-50);
    color: var(--bl-color-primary-700);
    border-radius: 0;
  }

  :host([in-range]) button:hover:not(:disabled) {
    background-color: var(--bl-color-primary-100);
  }

  :host([range-start]) button {
    background-color: var(--bl-color-primary-600);
    color: #fff;
    border-radius: var(--bl-radius-md) 0 0 var(--bl-radius-md);
  }

  :host([range-start]) button:hover:not(:disabled) {
    background-color: var(--bl-color-primary-700);
  }

  :host([range-end]) button {
    background-color: var(--bl-color-primary-600);
    color: #fff;
    border-radius: 0 var(--bl-radius-md) var(--bl-radius-md) 0;
  }

  :host([range-end]) button:hover:not(:disabled) {
    background-color: var(--bl-color-primary-700);
  }

  :host([range-start][range-end]) button {
    border-radius: var(--bl-radius-md);
  }

  :host([range-preview]) button {
    background-color: var(--bl-color-primary-50);
    border-radius: 0;
  }

  :host([range-preview][range-preview-start]) button {
    border-radius: var(--bl-radius-md) 0 0 var(--bl-radius-md);
  }

  :host([range-preview][range-preview-end]) button {
    border-radius: 0 var(--bl-radius-md) var(--bl-radius-md) 0;
  }
`;

/* ---- Range Calendar (dual-month side-by-side) ---- */
export const rangeCalendarStyles = css`
  :host {
    display: block;
    font-family: var(--bl-font-family-base);
  }

  .range-calendar {
    display: flex;
    gap: var(--bl-spacing-lg);
  }

  .month-panel {
    width: 280px;
  }

  .month-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: var(--bl-spacing-sm);
  }

  .month-year {
    font-weight: 600;
    font-size: var(--bl-font-size-sm);
    color: var(--bl-color-neutral-900);
  }

  .nav-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 28px;
    height: 28px;
    padding: 0;
    background: none;
    border: 1px solid var(--bl-color-neutral-200);
    border-radius: var(--bl-radius-md);
    color: var(--bl-color-neutral-600);
    cursor: pointer;
    transition:
      background-color var(--bl-transition-fast),
      border-color var(--bl-transition-fast);
  }

  .nav-btn:hover {
    background-color: var(--bl-color-neutral-100);
  }

  .nav-btn:focus-visible {
    outline: 2px solid var(--bl-focus-ring-color);
    outline-offset: 2px;
  }

  .nav-spacer {
    width: 28px;
    height: 28px;
  }

  .weekdays {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    margin-bottom: var(--bl-spacing-xs);
  }

  .weekday {
    text-align: center;
    font-size: 11px;
    font-weight: 600;
    color: var(--bl-color-neutral-500);
    padding: var(--bl-spacing-xs) 0;
  }

  .days {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: 1px;
  }

  .divider {
    width: 1px;
    background-color: var(--bl-color-neutral-200);
    align-self: stretch;
  }
`;

/* ---- Date Range Picker ---- */
export const dateRangePickerStyles = css`
  :host {
    display: inline-block;
    position: relative;
    font-family: var(--bl-font-family-base);
  }

  :host([disabled]) {
    opacity: 0.5;
    pointer-events: none;
  }

  .range-input {
    display: inline-flex;
    align-items: center;
    gap: var(--bl-spacing-xs);
    padding: var(--bl-spacing-sm) var(--bl-spacing-md);
    background-color: #fff;
    border: 1px solid var(--bl-color-neutral-300);
    border-radius: var(--bl-radius-md);
    font-family: var(--bl-font-family-base);
    font-size: var(--bl-font-size-sm);
    box-shadow: var(--bl-shadow-xs);
    cursor: pointer;
    transition:
      border-color var(--bl-transition-fast),
      box-shadow var(--bl-transition-fast);
    user-select: none;
  }

  .range-input:hover {
    border-color: var(--bl-color-neutral-400);
  }

  .range-input:focus-within,
  :host([open]) .range-input {
    border-color: var(--bl-color-primary-500);
    box-shadow: 0 0 0 1px var(--bl-color-primary-500);
  }

  .range-text {
    color: var(--bl-color-neutral-900);
    font-variant-numeric: tabular-nums;
  }

  .range-text.placeholder {
    color: var(--bl-color-neutral-400);
  }

  .range-separator {
    color: var(--bl-color-neutral-400);
    padding: 0 2px;
  }

  .calendar-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--bl-color-neutral-500);
    margin-left: var(--bl-spacing-xs);
  }

  .popup {
    position: fixed;
    z-index: var(--bl-z-dropdown);
    background-color: #fff;
    border: 1px solid var(--bl-color-neutral-200);
    border-radius: var(--bl-radius-md);
    box-shadow: var(--bl-shadow-lg);
    padding: var(--bl-spacing-md);

    opacity: 0;
    transform: translateY(4px);
    transition:
      opacity var(--bl-animation-duration-fast) var(--bl-animation-easing-enter),
      transform var(--bl-animation-duration-fast) var(--bl-animation-easing-enter);
  }

  .popup[data-state='entering'],
  .popup[data-state='entered'] {
    opacity: 1;
    transform: translateY(0);
  }

  .popup[data-state='exiting'] {
    opacity: 0;
    transform: translateY(4px);
    transition:
      opacity var(--bl-animation-duration-fast) var(--bl-animation-easing-exit),
      transform var(--bl-animation-duration-fast) var(--bl-animation-easing-exit);
  }
`;

/* ---- Calendar Presets ---- */
export const calendarPresetsStyles = css`
  :host {
    display: block;
    font-family: var(--bl-font-family-base);
  }

  .presets {
    display: flex;
    flex-direction: column;
    gap: 2px;
    min-width: 160px;
  }

  .preset-btn {
    display: flex;
    align-items: center;
    padding: var(--bl-spacing-sm) var(--bl-spacing-md);
    background: none;
    border: none;
    border-radius: var(--bl-radius-md);
    font-family: var(--bl-font-family-base);
    font-size: var(--bl-font-size-sm);
    color: var(--bl-color-neutral-700);
    cursor: pointer;
    text-align: left;
    white-space: nowrap;
    transition:
      background-color var(--bl-transition-fast),
      color var(--bl-transition-fast);
  }

  .preset-btn:hover {
    background-color: var(--bl-color-neutral-100);
    color: var(--bl-color-neutral-900);
  }

  .preset-btn:focus-visible {
    outline: 2px solid var(--bl-focus-ring-color);
    outline-offset: -2px;
  }

  .preset-btn[aria-pressed='true'] {
    background-color: var(--bl-color-primary-50);
    color: var(--bl-color-primary-700);
    font-weight: 500;
  }
`;

/* ---- Calendar Card (wraps calendar + presets + footer) ---- */
export const calendarCardStyles = css`
  :host {
    display: block;
    font-family: var(--bl-font-family-base);
  }

  .calendar-card {
    display: flex;
    flex-direction: column;
    background-color: #fff;
    border-radius: var(--bl-radius-md);
  }

  .card-body {
    display: flex;
  }

  .presets-sidebar {
    padding-right: var(--bl-spacing-md);
    border-right: 1px solid var(--bl-color-neutral-200);
    margin-right: var(--bl-spacing-md);
  }

  .calendar-content {
    flex: 1;
    min-width: 0;
  }

  .card-footer {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: var(--bl-spacing-sm);
    padding-top: var(--bl-spacing-md);
    margin-top: var(--bl-spacing-md);
    border-top: 1px solid var(--bl-color-neutral-200);
  }

  .footer-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: var(--bl-spacing-sm) var(--bl-spacing-lg);
    border-radius: var(--bl-radius-md);
    font-family: var(--bl-font-family-base);
    font-size: var(--bl-font-size-sm);
    font-weight: 500;
    cursor: pointer;
    transition:
      background-color var(--bl-transition-fast),
      border-color var(--bl-transition-fast),
      color var(--bl-transition-fast);
  }

  .footer-btn:focus-visible {
    outline: 2px solid var(--bl-focus-ring-color);
    outline-offset: 2px;
  }

  .footer-btn--cancel {
    background: none;
    border: 1px solid var(--bl-color-neutral-300);
    color: var(--bl-color-neutral-700);
  }

  .footer-btn--cancel:hover {
    background-color: var(--bl-color-neutral-50);
    border-color: var(--bl-color-neutral-400);
  }

  .footer-btn--apply {
    background-color: var(--bl-color-primary-600);
    border: 1px solid var(--bl-color-primary-600);
    color: #fff;
  }

  .footer-btn--apply:hover {
    background-color: var(--bl-color-primary-700);
    border-color: var(--bl-color-primary-700);
  }

  .footer-btn--apply:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;
