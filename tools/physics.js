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
  static Normal = 1;
  /**
   * @param {Body} body
   * @returns {Vec}
   */
  static force(body) {
    const force = Vec.norm(body.vel);
    force.mul(-1);
    force.mul(Friction.C);
    force.mul(Friction.Normal);
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
