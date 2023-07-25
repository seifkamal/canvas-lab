import { Vec } from "../tools/geometry.js";
import { Body } from "../tools/physics.js";
import { loop } from "../plugins/loop.js";

/**
 * @type {import('../index').Experiment}
 */
export default function experiment(canvas) {
  const size = new Vec(100);
  const pos = Vec.sub(canvas.center, Vec.div(size, 2));
  const body = new Body(size, pos);
  const force = new Vec(10);

  loop(({ delta }) => {
    canvas.clear();
    canvas.rect(body);

    body.applyForce(Vec.mul(force, delta));
    body.step();
    if (body.left < 0 || body.right > canvas.width) {
      body.vel.x *= -1;
    }
    if (body.top < 0 || body.bottom > canvas.height) {
      body.vel.y *= -1;
    }
  });
}
