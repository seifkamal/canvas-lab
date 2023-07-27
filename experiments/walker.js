import { animate } from "../plugins/animate.js";
import { Vec } from "../tools/geometry.js";

class Walker {
  direction = new Vec(1);
  constructor(pos = new Vec()) {
    this.pos = pos;
  }
  walk(steps = 1) {
    this.pos.x += this.direction.x * steps;
    this.pos.y += this.direction.y * steps;
  }
  turn() {
    this.direction.x = Math.random() > 0.5 ? 1 : -1;
    this.direction.y = Math.random() > 0.5 ? 1 : -1;
  }
  /**
   * @param {{ width: number; height: number }} bounds
   */
  stayInSight(bounds) {
    if (this.pos.x < 0) {
      this.pos.x = 0;
    } else if (this.pos.x > bounds.width) {
      this.pos.x = bounds.width;
    }
    if (this.pos.y < 0) {
      this.pos.y = 0;
    } else if (this.pos.y > bounds.height) {
      this.pos.y = bounds.height;
    }
  }
}

/**
 * @type {import('../index').Experiment}
 */
export default function experiment({ canvas, param }) {
  const center = new Vec(canvas.width / 2, canvas.height / 2);
  const walker = new Walker(center);
  const steps = param("Steps", {
    type: "number",
    min: "1",
    max: "5",
    value: "1",
  });

  animate(({ frame }) => {
    walker.walk(Number(steps.value));
    walker.stayInSight(canvas);
    if (frame % 5 === 0) {
      walker.turn();
    }

    canvas.plot(walker.pos);
  });
}
