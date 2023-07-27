/**
 * @typedef {{ delta: number; frame: number; }} StepInfo
 * @typedef {(info: StepInfo) => void} StepFunc
 * @typedef {{
 *   end(): void;
 *   pause(): void;
 *   unpause(): void;
 * }} LoopControls
 *
 * @param {StepFunc} onStep
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
      onStep({ delta, frame: count });
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
