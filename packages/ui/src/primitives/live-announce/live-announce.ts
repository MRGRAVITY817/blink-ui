let liveRegion: HTMLDivElement | null = null;

function getOrCreateRegion(): HTMLDivElement {
  if (liveRegion && document.body.contains(liveRegion)) {
    return liveRegion;
  }

  liveRegion = document.createElement('div');
  liveRegion.setAttribute('data-bl-live', '');
  liveRegion.style.cssText =
    'position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0;';
  document.body.appendChild(liveRegion);
  return liveRegion;
}

/**
 * Programmatically announce a message to screen readers via an `aria-live` region.
 *
 * Creates a shared live region in the DOM on first call. Subsequent calls
 * reuse the same region.
 *
 * @param message - The text to announce.
 * @param politeness - 'polite' waits for the user to be idle; 'assertive' interrupts immediately.
 */
export function announce(message: string, politeness: 'polite' | 'assertive' = 'polite'): void {
  const region = getOrCreateRegion();
  region.setAttribute('aria-live', politeness);
  region.setAttribute('role', politeness === 'assertive' ? 'alert' : 'status');

  // Clear and re-set to trigger a new announcement
  region.textContent = '';
  requestAnimationFrame(() => {
    region.textContent = message;
  });
}
