import { Vec } from "../modules/geometry.js";
import { Body, Gravity } from "../modules/physics.js";
import { animate } from "../modules/animate.js";

class Wind {
  static C = 40;
  /**
   * @param {Body} body
   * @param {number} strength
   */
  static force(body, strength) {
    const force = new Vec(Wind.C, 0);
    force.mul(strength);
    force.div(body.mass);
    return force;
  }
}

class Bounce {
  static C = 5000;
  /**
   * @param {Body} body
   * @param {{
   *   left: number;
   *   top: number;
   *   width: number;
   *   height: number;
   * }} bounds
   */
  static force(body, bounds) {
    const force = Vec.zero;
    if (body.left < bounds.left) {
      force.add(Vec.right);
    }
    if (body.right > bounds.width) {
      force.add(Vec.left);
    }
    if (body.top < bounds.top) {
      force.add(Vec.down);
    }
    if (body.bottom > bounds.height) {
      force.add(Vec.up);
    }
    force.mul(Bounce.C);
    force.div(body.mass);
    return force;
  }
}

/**
 * @type {import('../index').Scene}
 */
export default function ({ canvas }) {
  const size = new Vec(50);
  const pos = Vec.sub(canvas.center, Vec.div(size, 2));
  const body = new Body(size, pos);
  body.mass = 40;

  const wind = Wind.force(body, 5);
  const bounds = {
    left: 0,
    top: 0,
    width: canvas.width,
    height: canvas.height,
  };

  animate(() => {
    body.applyForce(wind);
    const gravity = Gravity.force(body);
    body.applyForce(gravity);
    const bounce = Bounce.force(body, bounds);
    body.applyForce(bounce);

    body.step();

    canvas.clear();
    canvas.ellipse(body);
  });
}
