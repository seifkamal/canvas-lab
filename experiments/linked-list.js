import { Vec } from "../tools/geometry.js";
import { Body } from "../tools/physics.js";
import { LinkedList } from "../tools/struct.js";
import { animate } from "../plugins/animate.js";

/**
 * @type {import('../index').Experiment}
 */
export default function experiment({ canvas, param, info }) {
  info(
    `This is a ${info.link(
      "linked list",
      "https://en.wikipedia.org/wiki/Linked_list"
    )}.`,
    "A linear data collection in which each element points to the next one."
  );

  const list = makeCircleList(canvas);
  const dissipation = param("Dissipation", {
    type: "number",
    min: "0",
    max: "1",
    step: "0.1",
    value: "0.2",
  });

  animate(({ delta }) => {
    canvas.clear();

    const force = Vec.down;
    force.mul(delta);
    list.value.applyForce(force);

    for (let item of list) {
      canvas.ellipse(item.value);

      if (item.next) {
        const C = 1 - Number(dissipation.value);
        const force = Vec.mul(item.value.acc, C);
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
 * @param {import("../index").Canvas} canvas
 * @returns {LinkedList<Body>}
 */
function makeCircleList(canvas) {
  const r = 10;
  const d = r * 2;
  const count = 15;
  const half = count / 2;
  const gap = canvas.halfWidth / count;
  const centerX = canvas.centerX;

  /** @type {Body[]} */
  let circles = [];
  for (let i = 0; i < count; i++) {
    const x = centerX + d + gap * (i - half);
    const pos = new Vec(x, canvas.centerY);
    circles.push(new Body(new Vec(r), pos));
  }

  return LinkedList.from(circles);
}
