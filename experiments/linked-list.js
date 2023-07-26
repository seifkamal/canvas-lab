import { Vec } from "../tools/geometry.js";
import { Body } from "../tools/physics.js";
import { LinkedList } from "../tools/struct.js";
import { loop } from "../plugins/loop.js";

/**
 * @type {import('../index').Experiment}
 */
export default function experiment(canvas, param) {
  const list = makeCircleList(canvas.center);
  const dissipation = param("Dissipation", {
    type: "number",
    min: "0",
    max: "1",
    step: "0.1",
    value: "0.8",
  });

  loop(({ delta }) => {
    canvas.clear();

    const force = Vec.down;
    force.mul(delta);
    list.value.applyForce(force);

    for (let item of list) {
      canvas.ellipse(item.value);

      if (item.next) {
        const force = Vec.mul(item.value.acc, Number(dissipation.value));
        item.next?.value.applyForce(force);
      }

      item.value.step();
      if (item.value.pos.y < 0 || item.value.pos.y > canvas.height) {
        item.value.vel.mul(-1);
      }
    }
  });
}

/**
 * @param {Vec} center
 * @returns {LinkedList<Body>}
 */
function makeCircleList(center) {
  const count = 10;
  const rad = 10;
  const gap = rad * 10;
  const circles = Array(count)
    .fill(null)
    .map((_v, i) => {
      const n = (count / 2 - i) * gap;
      const pos = new Vec(center.x + n, center.y);
      return new Body(new Vec(10), pos);
    });

  return LinkedList.from(circles);
}
