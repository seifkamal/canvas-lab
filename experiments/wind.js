import { Vec } from "../tools/geometry.js";
import { Body } from "../tools/physics.js";
import { animate } from "../plugins/animate.js";

/**
 * @type {import('../index').Experiment}
 */
export default function experiment({ canvas, param }) {
  const size = new Vec(50);
  const pos = Vec.sub(canvas.center, Vec.div(size, 2));
  const body = new Body(size, pos);

  const strength = param("Strength", {
    type: "number",
    min: "2",
    max: "12",
    step: "1",
    value: "10",
  });

  animate(({ delta }) => {
    canvas.clear();
    canvas.ellipse(body);

    const force = new Vec(1);
    force.mul(Number(strength.value));
    force.mul(delta);

    body.applyForce(force);
    body.step();
    if (body.left < 0 || body.right > canvas.width) {
      body.vel.x *= -1;
    }
    if (body.top < 0 || body.bottom > canvas.height) {
      body.vel.y *= -1;
    }
  });
}
