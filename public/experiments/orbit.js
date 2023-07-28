import { Vec } from "../tools/geometry.js";
import { Body } from "../tools/physics.js";
import { cursor } from "../plugins/cursor.js";
import { animate } from "../plugins/animate.js";

/**
 * @type {import('../index').Experiment}
 */
export default function experiment({ canvas, param }) {
  const center = new Vec(canvas.width / 2, canvas.height / 2);
  const target = cursor(center);
  const body = new Body(new Vec(40));

  const strength = param("Force", {
    type: "number",
    min: "0",
    max: "0.5",
    step: "0.1",
    value: "0.1",
  });

  animate(() => {
    const force = Vec.sub(target, body.center);
    force.norm();
    force.mul(Number(strength.value));
    body.applyForce(force);

    body.step();

    canvas.clear();
    canvas.ctx.lineWidth = 0.4;
    canvas.path(body.center, target);
    canvas.ellipse(body);
  });
}
