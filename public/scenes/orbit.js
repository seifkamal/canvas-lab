import { Rect, Vec } from "../tools/geometry.js";
import { Body } from "../tools/physics.js";
import { pointer } from "../plugins/pointer.js";
import { animate } from "../plugins/animate.js";

/**
 * @type {import('../index').Scene}
 */
export default function ({ canvas, param }) {
  const body = new Body(new Vec(40));
  const center = new Vec(canvas.width / 2, canvas.height / 2);
  const target = pointer(center);
  const targetBody = new Rect(new Vec(20), target);

  const bounciness = 3;
  const strength = param("Force", {
    type: "number",
    min: "0",
    max: "0.5",
    step: "0.1",
    value: "0.1",
  });

  animate(() => {
    const orbit = Vec.sub(target, body.center);
    orbit.norm();
    orbit.mul(Number(strength.value));
    body.applyForce(orbit);

    if (body.touches(targetBody)) {
      const bounce = Vec.sub(body.center, targetBody.center);
      bounce.norm();
      bounce.mul(bounciness);
      body.applyForce(bounce);
    }

    body.step();

    canvas.clear();
    canvas.path(body.center, targetBody.center);
    canvas.ellipse(body);
    canvas.ellipse(targetBody);
  });
}
