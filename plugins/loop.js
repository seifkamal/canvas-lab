/**
 * @typedef {(delta: number) => void} StepFunc
 * @typedef {{ end(): void, pause(): void, unpause(): void }} LoopControls
 * @param {StepFunc} onStep
 * @returns {LoopControls}
 */
export function loop(onStep) {
  if (typeof onStep !== "function") {
    throw new Error("onStep must be a function");
  }

  let ended = false;
  let paused = false;
  let lastFrame = 0;
  const step = (elapsed = 0) => {
    if (ended) {
      return;
    }

    const seconds = elapsed / 1_000;
    const delta = seconds - lastFrame;

    if (!paused) {
      onStep(delta);
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
