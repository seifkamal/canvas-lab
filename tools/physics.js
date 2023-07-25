import { Vec, Rect } from "./geometry.js";

export class Gravity {
  static C = 0.1;
  /**
   * @param {Body} body
   * @returns {Vec}
   */
  static force(body) {
    const force = Vec.down;
    force.mul(Gravity.C);
    force.mul(body.mass);
    return force;
  }
}

export class Friction {
  static C = 0.1;
  /**
   * f = µN
   *  µ -> coefficient = C
   *  N -> normal force = mg/µ
   *
   * @param {Body} body
   * @returns {Vec}
   */
  static force(body) {
    const force = Vec.norm(body.vel);
    force.mul(-1);
    const normal = (body.mass * Gravity.C) / Friction.C;
    force.mul(normal);
    return force;
  }
}

export class Body extends Rect {
  mass = 1;
  vel = new Vec();
  acc = new Vec();
  /**
   * @param {Vec} force
   */
  applyForce(force) {
    this.acc.add(Vec.div(force, this.mass));
  }
  step() {
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.mul(0);
  }
}
