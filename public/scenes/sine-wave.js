import { animate } from "../plugins/animate.js";
import { Rect, Vec } from "../tools/geometry.js";

/**
 * @type {import('../index').Scene}
 */
export default function ({ canvas, param, info }) {
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
  const ampParam = param("Amplitude", {
    type: "number",
    min: "50",
    max: "200",
    step: "50",
    value: String(amp),
  });

  animate(({ elapsed }) => {
    canvas.clear();

    // Lerp amplitude to match user param value.
    const ampParamVal = Number(ampParam.value);
    if (amp !== ampParamVal) {
      amp += ampParamVal - amp < 0 ? -1 : 1;
    }

    for (const rect of rects) {
      const y = yOffset + amp * Math.sin(rect.pos.x + elapsed);
      rect.pos.y = y;
      canvas.ctx.fillStyle = `hsl(${y / -14}deg,100%,50%,80%)`;
      canvas.ellipse(rect);
    }
  });
}
