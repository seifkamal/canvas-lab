import { Vec } from "../tools/geometry.js";
import { Body, Friction } from "../tools/physics.js";
import { keys } from "../plugins/keys.js";
import { animate } from "../plugins/animate.js";

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
export default function experiment(canvas, param, details) {
  const size = new Vec(100, 50);
  const pos = Vec.sub(canvas.center, Vec.div(size, 2));
  const car = new Car(size, pos);

  const speed = param("Speed", {
    type: "number",
    min: "0",
    max: "100",
    disabled: true,
  });

  const controls = keys({
    w: "up",
    s: "down",
    a: "left",
    d: "right",
  });

  details("Use <kbd>wasd</kbd> keys to move");

  animate(({ delta }) => {
    car.drive(axes(controls), delta);
    speed.value = car.speed;

    canvas.clear();
    canvas.rotated(car.center, car.rot, () => {
      canvas.rect(car);
    });
  });
}

/**
 * @param {Set} keys
 */
function axes(keys) {
  const vec = Vec.zero;
  if (keys.has("up")) vec.add(Vec.up);
  if (keys.has("down")) vec.add(Vec.down);
  if (keys.has("left")) vec.add(Vec.left);
  if (keys.has("right")) vec.add(Vec.right);
  return vec;
}
