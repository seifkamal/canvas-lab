import { Vec, Rect } from "./geometry.js";

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

export class Spring extends Body {
  stiffness = 210;
  friction = 13.5;
  threshold = 0.4;
  /** @type {Vec} */
  targetPosition;
  done = false;
  /**
   * @param {number} delta
   */
  step(delta = 1 / 30) {
    if (!this.targetPosition || this.done) {
      return;
    }

    this.done = [
      this.distance.x,
      this.distance.y,
      this.acc.x,
      this.acc.y,
      this.vel.x,
      this.vel.y,
    ].every((value) => Math.abs(value) < this.threshold);

    if (this.done) {
      return;
    }

    this.acc = Vec.sub(
      Vec.mul(this.distance, this.stiffness),
      Vec.mul(this.vel, this.friction),
    );
    this.vel.add(Vec.mul(this.acc, delta));
    this.pos.add(Vec.mul(this.vel, delta));
  }
  get distance() {
    return Vec.sub(this.targetPosition, this.pos);
  }
  /**
   * @param {Vec} targetPosition
   */
  moveTo(targetPosition) {
    this.done = false;
    this.targetPosition = Vec.sub(targetPosition, this.halfSize);
  }
}

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
