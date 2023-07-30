import { Vec } from "../modules/geometry.js";
import { animate } from "../modules/animate.js";

class Walker {
  dir = new Vec(1);
  constructor(pos = new Vec()) {
    this.pos = pos;
  }
  walk() {
    this.pos.x += this.dir.x;
    this.pos.y += this.dir.y;
  }
  turn() {
    this.dir.x = Math.random() > 0.5 ? 1 : -1;
    this.dir.y = Math.random() > 0.5 ? 1 : -1;
  }
  /**
   * @param {{ width: number; height: number }} bounds
   */
  stayInSight(bounds) {
    const nextStep = Vec.add(this.pos, this.dir);
    if (nextStep.x < 0 || nextStep.x > bounds.width) {
      this.dir.x *= -1;
    }
    if (nextStep.y < 0 || nextStep.y > bounds.height) {
      this.dir.y *= -1;
    }
  }
}

/**
 * @type {import('../index').Scene}
 */
export default function ({ canvas }) {
  const center = new Vec(canvas.width / 2, canvas.height / 2);
  const walker = new Walker(center);

  animate(({ frame }) => {
    walker.walk();
    if (frame % 5 === 0) {
      walker.turn();
    }
    walker.stayInSight(canvas);

    canvas.plot(walker.pos);
  });
}
