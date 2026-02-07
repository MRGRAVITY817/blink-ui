import type { ReactiveController, ReactiveControllerHost } from 'lit';

export type AnimationState = 'idle' | 'entering' | 'entered' | 'exiting';

export interface AnimationOptions {
  /** Duration for enter transition in ms. Default: 200 */
  enterDuration?: number;
  /** Duration for exit transition in ms. Default: 150 */
  exitDuration?: number;
}

/**
 * Manages enter/exit animations via `data-state` attribute.
 * Components style transitions using CSS selectors:
 *   [data-state="entering"] / [data-state="entered"] / [data-state="exiting"]
 */
export class AnimationController implements ReactiveController {
  private _host: ReactiveControllerHost & HTMLElement;
  private _options: Required<AnimationOptions>;

  state: AnimationState = 'idle';

  constructor(host: ReactiveControllerHost & HTMLElement, options?: AnimationOptions) {
    this._host = host;
    this._options = {
      enterDuration: options?.enterDuration ?? 200,
      exitDuration: options?.exitDuration ?? 150,
    };
    host.addController(this);
  }

  hostConnected(): void {}
  hostDisconnected(): void {
    this.state = 'idle';
  }

  /** Runs the enter animation on the target element (defaults to host). */
  async enter(el?: HTMLElement): Promise<void> {
    const target = el ?? this._host;
    this.state = 'entering';
    target.setAttribute('data-state', 'entering');

    // Wait one frame for the browser to apply the entering styles
    await new Promise<void>((resolve) => requestAnimationFrame(() => resolve()));

    // Wait for CSS transition to complete, or fall back to duration timeout
    await this._waitForTransition(target, this._options.enterDuration);

    this.state = 'entered';
    target.setAttribute('data-state', 'entered');
  }

  /** Runs the exit animation on the target element (defaults to host). */
  async exit(el?: HTMLElement): Promise<void> {
    const target = el ?? this._host;
    this.state = 'exiting';
    target.setAttribute('data-state', 'exiting');

    await this._waitForTransition(target, this._options.exitDuration);

    this.state = 'idle';
    target.removeAttribute('data-state');
  }

  private _waitForTransition(el: HTMLElement, fallbackMs: number): Promise<void> {
    return new Promise<void>((resolve) => {
      let settled = false;
      const done = () => {
        if (settled) return;
        settled = true;
        el.removeEventListener('transitionend', onEnd);
        resolve();
      };
      const onEnd = (e: TransitionEvent) => {
        if (e.target === el) done();
      };
      el.addEventListener('transitionend', onEnd);
      // Fallback timer in case no CSS transition is defined
      setTimeout(done, fallbackMs + 50);
    });
  }
}
