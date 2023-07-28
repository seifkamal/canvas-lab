/**
 * @typedef {{
 *   frame: number;
 *   delta: number;
 *   elapsed: number;
 * }} StepInfo
 * @typedef {{
 *   end(): void;
 *   pause(): void;
 *   unpause(): void;
 * }} LoopControls
 *
 * @param {(info: StepInfo) => void} onStep
 * @returns {LoopControls}
 */
export function animate(onStep) {
  if (typeof onStep !== "function") {
    throw new Error("loop requires an onStep function");
  }

  let count = 0;
  let prev = 0;
  let paused = false;
  let ended = false;
  const step = (timestamp = 0) => {
    if (ended) {
      return;
    }

    const now = timestamp / 1_000;
    // For now, limit frame jumps to 1fps.
    // This is to avoid huge jumps when returning to a suspended window.
    const delta = Math.min(now - prev, 1);

    if (!paused) {
      onStep({ frame: count, delta, elapsed: now });
      count++;
    }

    prev = now;
    requestAnimationFrame(step);
  };

  queueMicrotask(step);

  return {
    end: () => (ended = true),
    pause: () => (paused = true),
    unpause: () => (paused = false),
  };
}
