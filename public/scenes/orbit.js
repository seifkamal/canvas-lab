import { Rect, Vec } from "../tools/geometry.js";
import { Body } from "../tools/physics.js";
import { pointer } from "../plugins/pointer.js";
import { animate } from "../plugins/animate.js";

/**
 * @type {import('../index').Scene}
 */
export default function ({ canvas, info }) {
  info("Click anywhere to move the target.");

  const ptr = pointer(canvas.el);
  const target = new Rect(new Vec(20));
  target.pos = Vec.sub(canvas.center, target.halfSize);
  const body = new Body(new Vec(40), Vec.mul(target.pos, 0.5));
  body.applyForce(new Vec(2.5, 5));

  animate(() => {
    if (ptr.pressed) {
      target.pos = Vec.sub(ptr.pos, target.halfSize);
    }

    const orbit = Vec.sub(target.pos, body.center);
    orbit.norm();
    orbit.mul(0.1);
    body.applyForce(orbit);

    if (body.touches(target)) {
      const bounce = Vec.sub(body.center, target.center);
      bounce.norm();
      bounce.mul(3);
      body.applyForce(bounce);
    }

    body.step();

    canvas.clear();
    canvas.path(body.center, target.center);
    canvas.ellipse(body);
    canvas.ellipse(target);
  });
}
