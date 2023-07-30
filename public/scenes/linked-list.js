import { Vec } from "../modules/geometry.js";
import { Body } from "../modules/physics.js";
import { LinkedList } from "../modules/struct.js";
import { animate } from "../modules/animate.js";

/**
 * @type {import('../index').Scene}
 */
export default function ({ canvas, info }) {
  info(
    `This is a ${info.link(
      "linked list",
      "https://en.wikipedia.org/wiki/Linked_list"
    )}.`,
    "A linear data collection in which each element points to the next one."
  );

  const list = makeCircleList(canvas);
  const force = new Vec(0, 0.005);
  const dissipation = 0.8;

  animate(() => {
    canvas.clear();

    list.value.applyForce(force);

    for (let item of list) {
      canvas.ellipse(item.value);

      if (item.next) {
        const force = Vec.mul(item.value.acc, dissipation);
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
