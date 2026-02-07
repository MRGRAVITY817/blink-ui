/**
 * Rewrites `bl` prefix to a custom prefix in component source code.
 *
 * Patterns rewritten:
 *   @customElement('bl-button')    -> @customElement('my-button')
 *   class BlButton                 -> class MyButton
 *   'bl-button': BlButton          -> 'my-button': MyButton (HTMLElementTagNameMap)
 *   CustomEvent('bl-dismiss'       -> CustomEvent('my-dismiss'
 *   --bl-color-primary-500 (CSS)   -> --my-color-primary-500
 *   export { BlButton }            -> export { MyButton }
 *
 * Type names (ButtonVariant, ButtonSize) are NOT prefixed.
 */
export function applyPrefix(source: string, prefix: string): string {
  if (prefix === 'bl') return source;

  const capitalBl = 'Bl';
  const capitalPrefix = prefix.charAt(0).toUpperCase() + prefix.slice(1);

  let result = source;

  // Custom element tags: 'bl-xxx' -> 'prefix-xxx'
  result = result.replace(/(?<=['"`])bl-/g, `${prefix}-`);

  // CSS custom properties: --bl- -> --prefix-
  result = result.replace(/--bl-/g, `--${prefix}-`);

  // Class names: Bl followed by uppercase letter (BlButton, BlCard, etc.)
  result = result.replace(
    /\bBl([A-Z])/g,
    `${capitalPrefix}$1`,
  );

  return result;
}
