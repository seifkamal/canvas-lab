import { Vec } from "../tools/geometry.js";
import { Body } from "../tools/physics.js";
import { cursor } from "../plugins/cursor.js";
import { loop } from "../plugins/loop.js";

/**
 * @type {import('../index').Experiment}
 */
export default function experiment(canvas, param) {
  const center = new Vec(canvas.width / 2, canvas.height / 2);
  const target = cursor(center);
  const body = new Body(new Vec(100));
  body.mass = 10;

  let F = 100;
  param("Force", (v) => (F = Number(v)), {
    type: "number",
    min: "0",
    max: "500",
    step: "25",
    value: String(F),
  });

  loop(({ delta }) => {
    const force = Vec.sub(target, body.center);
    force.norm();
    force.mul(F * delta);

    body.applyForce(force);
    body.step();

    canvas.clear();
    canvas.path(body.center, target);
    canvas.rect(body);
  });
}
