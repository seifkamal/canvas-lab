import { Rect, Vec } from "../modules/geometry.js";
import { animate } from "../modules/animate.js";

/**
 * @type {import('../index').Scene}
 */
export default function ({ canvas, info, input }) {
  info(
    `This is a ${info.link(
      "sine wave",
      "https://en.wikipedia.org/wiki/Sine_wave"
    )}.`,
    `A type of continuous waveform, and the only periodic one
    that can be added onto itself and still retain its form.`
  );

  const length = 1400;
  const freq = length / 22;
  const radius = freq * 2;
  const xOffset = canvas.centerX - length / 2;
  const yOffset = canvas.centerY - radius / 2;

  /** @type {Rect[]} */
  const rects = [];
  for (let x = 0; x < length; x += freq) {
    rects.push(new Rect(new Vec(radius), new Vec(xOffset + x)));
  }

  let amp = 50;
  const pointer = input.pointer({
    target: canvas.el,
    scroll: true,
  });

  animate(({ elapsed }) => {
    canvas.clear();

    amp = Math.max(Math.min(amp + pointer.scroll.y, 200), 50);

    for (const rect of rects) {
      const y = yOffset + amp * Math.sin(rect.pos.x + elapsed);
      rect.pos.y = y;
      canvas.ctx.fillStyle = `hsl(${y / -14}deg,100%,50%,80%)`;
      canvas.ellipse(rect);
    }
  });
}
