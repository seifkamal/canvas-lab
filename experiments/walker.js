import { loop } from "../plugins/loop.js";
import { Vec } from "../tools/geometry.js";

class Walker {
  steps = 0;
  speed = 1;
  direction = new Vec(1);
  constructor(pos = new Vec()) {
    this.pos = pos;
  }
  step() {
    this.pos.x += this.direction.x * this.speed;
    this.pos.y += this.direction.y * this.speed;
    this.steps++;
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
export default function experiment(canvas, param) {
  const center = new Vec(canvas.width / 2, canvas.height / 2);
  const walker = new Walker(center);

  param("Speed", (value) => (walker.speed = Number(value)), {
    type: "number",
    min: "1",
    max: "5",
    value: String(walker.speed),
  });

  loop(() => {
    if (walker.steps % 5 === 0) {
      walker.turn();
    }
    walker.step();
    walker.stayInSight(canvas);
    canvas.plot(walker.pos);
  });
}
