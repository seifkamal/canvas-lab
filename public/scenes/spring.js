import { animate } from "../modules/animate.js";
import { Vec } from "../modules/geometry.js";
import { Spring } from "../modules/physics.js";

/**
 * @type {import("../index.js").Scene}
 */
export default function({ canvas, info, input }) {
  info(
    "This is a spring.",
    `Modelled using ${info.link("Hooke's Law", "https://en.wikipedia.org/wiki/Hooke%27s_law")}.`
  );

  const ball = new Spring(new Vec(50), canvas.center);
  const pointer = input.pointer({
    target: canvas.el,
    press: true
  });

  animate(({ delta }) => {
    if (pointer.pressed) {
      ball.moveTo(pointer.pos);
    }

    ball.step(delta);

    canvas.clear();
    canvas.ellipse(ball);
  });
}
