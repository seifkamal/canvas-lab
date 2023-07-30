import { Rect, Vec } from "../modules/geometry.js";
import { Body } from "../modules/physics.js";
import { animate } from "../modules/animate.js";

/**
 * @type {import('../index').Scene}
 */
export default function ({ canvas, input }) {
  const pointer = input.pointer({
    target: canvas.el,
    press: true,
    move: true,
  });

  const target = new Rect(new Vec(20));
  target.pos = Vec.sub(canvas.center, target.halfSize);
  const body = new Body(new Vec(40), Vec.mul(target.pos, 0.5));
  body.applyForce(new Vec(2.5, 5));

  animate(() => {
    if (pointer.pressed) {
      target.pos = Vec.sub(pointer.pos, target.halfSize);
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
