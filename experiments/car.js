import { Vec } from "../tools/geometry.js";
import { Body, Friction } from "../tools/physics.js";
import { keys } from "../plugins/keys.js";
import { animate } from "../plugins/animate.js";

/**
 * @param {string} url
 * @returns {CanvasImageSource}
 */
const Sprite = (url) => {
  const image = new Image();
  image.src = url;
  return image;
};

class Car extends Body {
  mass = 10;
  power = 20;
  sprite = Sprite("assets/car.png");
  /**
   * @param {Vec} dir
   * @param {number} delta
   */
  drive(dir, delta) {
    const force = Vec.mul(dir, this.power);
    force.mul(delta);
    const friction = Friction.force(this);
    friction.mul(delta);

    this.applyForce(force);
    this.applyForce(friction);

    this.step();
    if (this.vel.mag > 0.01) {
      this.rot = this.vel.head;
    }
  }
  get speed() {
    return Math.round(this.vel.mag * 10);
  }
}

/**
 * @type {import('../index').Experiment}
 */
export default function experiment({ canvas, param, info }) {
  info("Use <kbd>wasd</kbd> keys to move");

  const size = new Vec(200);
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

  animate(({ delta }) => {
    car.drive(axes(controls), delta);
    speed.value = car.speed;

    canvas.clear();
    canvas.rotated(car.center, car.rot, () => {
      canvas.image(car, car.sprite);
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
