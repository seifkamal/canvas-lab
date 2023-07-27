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
   * @param {Set} controls
   * @param {number} delta
   * @returns {number} speed
   */
  drive(controls, delta) {
    const dir = Vec.zero;
    if (controls.has("up")) dir.add(Vec.up);
    if (controls.has("down")) dir.add(Vec.down);
    if (controls.has("left")) dir.add(Vec.left);
    if (controls.has("right")) dir.add(Vec.right);
    return this.move(dir, delta);
  }
  /**
   * @param {Vec} dir
   * @param {number} delta
   * @returns {number} speed
   */
  move(dir, delta) {
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

    return this.speed;
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

  const size = new Vec(150);
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
    speed.value = car.drive(controls, delta);

    canvas.clear();
    canvas.image(car, car.sprite);
  });
}
