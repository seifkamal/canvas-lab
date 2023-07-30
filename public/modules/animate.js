/**
 * @typedef {{
 *   frame: number;
 *   delta: number;
 *   elapsed: number;
 * }} StepInfo
 *
 * @param {(info: StepInfo) => void} onStep
 */
export function animate(onStep) {
  if (typeof onStep !== "function") {
    throw new Error("loop requires an onStep function");
  }

  let frame = 0;
  let prev = 0;
  const step = (timestamp = 0) => {
    const elapsed = timestamp / 1_000;
    // For now, limit frame jumps to 1fps.
    // This is to avoid huge jumps when returning to a suspended window.
    const delta = Math.min(elapsed - prev, 1);
    frame++;
    prev = elapsed;

    onStep({ frame, delta, elapsed });
    requestAnimationFrame(step);
  };

  step();
}
