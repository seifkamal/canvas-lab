import { Vec } from "../tools/geometry.js";
import { Body, Friction } from "../tools/physics.js";
import { keys } from "../plugins/keys.js";
import { loop } from "../plugins/loop.js";

class Car extends Body {
  static HP = 20;
  mass = 10;
  /**
   * @param {Vec} dir
   * @param {number} delta
   */
  drive(dir, delta) {
    const force = Vec.mul(dir, Car.HP);
    force.mul(delta);

    const friction = Friction.force(this);
    friction.mul(delta);

    this.applyForce(force);
    this.applyForce(friction);
    this.step();
    this.rot = this.vel.head;
  }
  get speed() {
    return Math.round(this.vel.mag * 10);
  }
}

/**
 * @type {import('../index').Experiment}
 */
export default function experiment(canvas, param) {
  const size = new Vec(100, 50);
  const pos = Vec.sub(canvas.center, Vec.div(size, 2));
  const car = new Car(size, pos);

  const speed = param("Speed", {
    type: "number",
    disabled: true,
  });

  const controls = keys({
    w: "up",
    s: "down",
    a: "left",
    d: "right",
  });

  loop(({ delta }) => {
    const dir = keysToVec(controls);
    car.drive(dir, delta);
    speed.value = car.speed;

    canvas.clear();
    canvas.rotated(car.center, car.rot, () => {
      canvas.rect(car);
    });
  });
}

/**
 * @param {{
 *   up: boolean;
 *   down: boolean;
 *   left: boolean;
 *   right: boolean;
 * }} keys
 */
function keysToVec(keys) {
  if (keys.up) return Vec.up;
  if (keys.down) return Vec.down;
  if (keys.left) return Vec.left;
  if (keys.right) return Vec.right;
  return Vec.zero;
}
