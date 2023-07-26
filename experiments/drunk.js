import { animate } from "../plugins/animate.js";
import { Vec } from "../tools/geometry.js";

class Walker {
  constructor(pos = new Vec(), speed = 5) {
    this.pos = pos;
    this.speed = speed;
    this.direction = new Vec(1);
    this.steps = 0;
  }
  step() {
    this.pos.x += this.direction.x;
    this.pos.y += this.direction.y;
    this.steps++;
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

class DrunkWalker extends Walker {
  drinks = 0;
  step() {
    this.think();
    super.step();
  }
  think() {
    if (Math.random() * 100 > this.drinks) {
      return;
    }
    if (Math.random() > 0.5) {
      this.direction.x *= -1;
      return;
    }
    this.direction.y *= -1;
  }
}

/**
 * @type {import('../index').Experiment}
 */
export default function experiment(canvas, param) {
  const center = new Vec(canvas.width / 2, canvas.height / 2);
  const walker = new DrunkWalker(center);

  const drinks = param("Drinks", {
    type: "number",
    min: "0",
    max: "25",
    value: String(walker.drinks),
    disabled: true,
  });

  const { end } = animate(() => {
    if (walker.drinks === 25) {
      canvas.ctx.font = "24px sans-serif";
      canvas.ctx.fillStyle = "red";
      canvas.mark(walker.pos);
      end();
      return;
    }

    if (walker.steps % 100 === 0) {
      drinks.value = ++walker.drinks;
    }

    walker.step();
    walker.stayInSight(canvas);
    canvas.plot(walker.pos);
  });
}
