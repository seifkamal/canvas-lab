import { Vec } from "../modules/geometry.js";
import { Body, Friction } from "../modules/physics.js";
import { animate } from "../modules/animate.js";

/**
 * @param {string} src
 */
function sprite(src) {
  const img = document.createElement("img");
  img.src = src;
  return img;
}

class Car extends Body {
  mass = 10;
  power = 20;
  image = sprite("assets/car.png");
  /**
   * @param {Set} controls
   * @param {number} delta
   */
  drive(controls, delta) {
    const dir = Vec.zero;
    if (controls.has("up")) dir.add(Vec.up);
    if (controls.has("down")) dir.add(Vec.down);
    if (controls.has("left")) dir.add(Vec.left);
    if (controls.has("right")) dir.add(Vec.right);
    this.move(dir, delta);
  }
  /**
   * @param {Vec} dir
   * @param {number} delta
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
  }
}

/**
 * @type {import('../index').Scene}
 */
export default function ({ canvas, info, input }) {
  info(
    "Use <kbd>wasd</kbd> keys to move",
    `Sprite source: ${info.link(
      "Free Icons and PNG Backgrounds",
      "https://www.freeiconspng.com/img/11558"
    )}.`
  );

  const size = new Vec(150);
  const pos = Vec.sub(canvas.center, Vec.div(size, 2));
  const car = new Car(size, pos);

  const controls = input.keys({
    w: "up",
    ArrowUp: "up",
    s: "down",
    ArrowDown: "down",
    a: "left",
    ArrowLeft: "left",
    d: "right",
    ArrowRight: "right",
  });

  animate(({ delta }) => {
    car.drive(controls, delta);

    canvas.clear();
    canvas.image(car);
  });
}
