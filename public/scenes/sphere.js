import { Circle } from "../modules/geometryV2.js";
import { animate } from "../modules/animate.js";

/**
 * @type {import('../index').Scene}
 */
export default function ({ canvas, input }) {
  const pointer = input.pointer({ scroll: true });
  const center = new DOMPoint(canvas.centerX, canvas.centerY);
  const circles = makeCircles(500, 6, center);

  let vel = 0;
  animate(() => {
    canvas.clear();

    circles.forEach((circle) => {
      canvas.ctx.strokeStyle = "hsla(150deg,100%,40%,1)";
      canvas.ctx.stroke(circle.path);
      canvas.ctx.fillStyle = "hsla(150deg,100%,60%,0.3)";
      canvas.ctx.fill(circle.path);

      circle.rot.y += vel;
    });

    vel += pointer.scroll.y / 100;
  });
}

/**
 * @param {number} rad
 * @param {number} count
 * @param {DOMPoint} pos
 */
function makeCircles(rad, count, pos) {
  return Array.from(
    Array(count),
    (_v, i) =>
      new Circle({
        rad,
        pos,
        rot: new DOMPoint(0, (180 / count) * i, 90),
      })
  );
}
