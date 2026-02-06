import { css } from 'lit';

export const tokens = css`
  :host {
    /* -------------------------------------------------------
       Colors - Primary (blue)
       ------------------------------------------------------- */
    --bl-color-primary-50: #eff6ff;
    --bl-color-primary-100: #dbeafe;
    --bl-color-primary-200: #bfdbfe;
    --bl-color-primary-300: #93c5fd;
    --bl-color-primary-400: #60a5fa;
    --bl-color-primary-500: #3b82f6;
    --bl-color-primary-600: #2563eb;
    --bl-color-primary-700: #1d4ed8;
    --bl-color-primary-800: #1e40af;
    --bl-color-primary-900: #1e3a8a;

    /* -------------------------------------------------------
       Colors - Secondary (violet)
       ------------------------------------------------------- */
    --bl-color-secondary-50: #f5f3ff;
    --bl-color-secondary-100: #ede9fe;
    --bl-color-secondary-200: #ddd6fe;
    --bl-color-secondary-300: #c4b5fd;
    --bl-color-secondary-400: #a78bfa;
    --bl-color-secondary-500: #8b5cf6;
    --bl-color-secondary-600: #7c3aed;
    --bl-color-secondary-700: #6d28d9;
    --bl-color-secondary-800: #5b21b6;
    --bl-color-secondary-900: #4c1d95;

    /* -------------------------------------------------------
       Colors - Success (green)
       ------------------------------------------------------- */
    --bl-color-success-50: #f0fdf4;
    --bl-color-success-100: #dcfce7;
    --bl-color-success-200: #bbf7d0;
    --bl-color-success-300: #86efac;
    --bl-color-success-400: #4ade80;
    --bl-color-success-500: #22c55e;
    --bl-color-success-600: #16a34a;
    --bl-color-success-700: #15803d;
    --bl-color-success-800: #166534;
    --bl-color-success-900: #14532d;

    /* -------------------------------------------------------
       Colors - Warning (amber)
       ------------------------------------------------------- */
    --bl-color-warning-50: #fffbeb;
    --bl-color-warning-100: #fef3c7;
    --bl-color-warning-200: #fde68a;
    --bl-color-warning-300: #fcd34d;
    --bl-color-warning-400: #fbbf24;
    --bl-color-warning-500: #f59e0b;
    --bl-color-warning-600: #d97706;
    --bl-color-warning-700: #b45309;
    --bl-color-warning-800: #92400e;
    --bl-color-warning-900: #78350f;

    /* -------------------------------------------------------
       Colors - Danger (red)
       ------------------------------------------------------- */
    --bl-color-danger-50: #fef2f2;
    --bl-color-danger-100: #fee2e2;
    --bl-color-danger-200: #fecaca;
    --bl-color-danger-300: #fca5a5;
    --bl-color-danger-400: #f87171;
    --bl-color-danger-500: #ef4444;
    --bl-color-danger-600: #dc2626;
    --bl-color-danger-700: #b91c1c;
    --bl-color-danger-800: #991b1b;
    --bl-color-danger-900: #7f1d1d;

    /* -------------------------------------------------------
       Colors - Neutral (slate)
       ------------------------------------------------------- */
    --bl-color-neutral-50: #f8fafc;
    --bl-color-neutral-100: #f1f5f9;
    --bl-color-neutral-200: #e2e8f0;
    --bl-color-neutral-300: #cbd5e1;
    --bl-color-neutral-400: #94a3b8;
    --bl-color-neutral-500: #64748b;
    --bl-color-neutral-600: #475569;
    --bl-color-neutral-700: #334155;
    --bl-color-neutral-800: #1e293b;
    --bl-color-neutral-900: #0f172a;

    /* -------------------------------------------------------
       Typography - Font Family
       ------------------------------------------------------- */
    --bl-font-family-base: 'Inter', system-ui, -apple-system, BlinkMacSystemFont,
      'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
    --bl-font-family-mono: 'JetBrains Mono', ui-monospace, SFMono-Regular,
      'SF Mono', Menlo, Consolas, 'Liberation Mono', monospace;

    /* -------------------------------------------------------
       Typography - Font Sizes
       ------------------------------------------------------- */
    --bl-font-size-xs: 0.75rem;
    --bl-font-size-sm: 0.875rem;
    --bl-font-size-md: 1rem;
    --bl-font-size-lg: 1.125rem;
    --bl-font-size-xl: 1.25rem;

    /* -------------------------------------------------------
       Spacing
       ------------------------------------------------------- */
    --bl-spacing-xs: 0.25rem;
    --bl-spacing-sm: 0.5rem;
    --bl-spacing-md: 1rem;
    --bl-spacing-lg: 1.5rem;
    --bl-spacing-xl: 2rem;
    --bl-spacing-2xl: 3rem;

    /* -------------------------------------------------------
       Border Radius
       ------------------------------------------------------- */
    --bl-radius-sm: 0.25rem;
    --bl-radius-md: 0.5rem;
    --bl-radius-lg: 1rem;
    --bl-radius-full: 9999px;

    /* -------------------------------------------------------
       Focus Ring
       ------------------------------------------------------- */
    --bl-focus-ring-width: 2px;
    --bl-focus-ring-offset: 2px;
    --bl-focus-ring-color: var(--bl-color-primary-400);
    --bl-focus-ring: var(--bl-focus-ring-width) solid var(--bl-focus-ring-color);

    /* -------------------------------------------------------
       Transitions
       ------------------------------------------------------- */
    --bl-transition-fast: 150ms cubic-bezier(0.4, 0, 0.2, 1);
    --bl-transition-normal: 250ms cubic-bezier(0.4, 0, 0.2, 1);
    --bl-transition-slow: 350ms cubic-bezier(0.4, 0, 0.2, 1);
  }
`;
