/**
 * @typedef {{ delta: number; count: number; }} StepInfo
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
export function loop(onStep) {
  if (typeof onStep !== "function") {
    throw new Error("onStep must be a function");
  }

  let count = 0;
  let lastFrame = 0;
  let paused = false;
  let ended = false;
  const step = (elapsed = 0) => {
    if (ended) {
      return;
    }

    const seconds = elapsed / 1_000;
    const delta = seconds - lastFrame;

    if (!paused) {
      onStep({ delta, count });
      count++;
    }

    lastFrame = seconds;
    requestAnimationFrame(step);
  };

  queueMicrotask(step);

  return {
    end: () => (ended = true),
    pause: () => (paused = true),
    unpause: () => (paused = false),
  };
}
