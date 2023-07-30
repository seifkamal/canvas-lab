import { Vec, Rect } from "../tools/geometry.js";
import { Body, Gravity } from "../tools/physics.js";
import { animate } from "../plugins/animate.js";

/**
 * @type {import('../index').Scene}
 */
export default function ({ canvas }) {
  const body = new Body(new Vec(100));
  const center = new Vec(canvas.width / 2, canvas.height / 3);
  body.pos.x = center.x - body.halfWidth;
  body.pos.y = center.y - body.halfHeight;
  body.mass = 100;

  const ground = new Rect(new Vec(canvas.width, 50));
  ground.pos.y = canvas.height - ground.height;

  animate(() => {
    if (!body.touches(ground)) {
      body.applyForce(Gravity.force(body));
    } else if (body.vel.mag > 0.0001) {
      // TODO: use an actual force
      body.vel.mul(-0.5);
    } else {
      body.vel.mul(0);
    }

    body.step();

    canvas.clear();
    canvas.rect(ground);
    canvas.rect(body);
  });
}
