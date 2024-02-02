/**
 * @file Experimental
 */

export class Rect {
  static Default = {
    size: new DOMPoint(1, 1, 0),
    pos: new DOMPoint(0, 0, 0),
    rot: new DOMPoint(0, 0, 0),
    center: false,
  };

  /**
   * @param {Partial<typeof Rect.Default>} [config]
   */
  constructor(config) {
    this.size = config?.size || DOMPoint.fromPoint(Rect.Default.size);
    this.pos = config?.pos || DOMPoint.fromPoint(Rect.Default.pos);
    this.rot = config?.rot || DOMPoint.fromPoint(Rect.Default.rot);
    this.center = config?.center || Rect.Default.center;
  }

  get matrix() {
    const m = new DOMMatrix()
      .translateSelf(this.pos.x, this.pos.y)
      .rotateSelf(this.rot.x, this.rot.y, this.rot.z);
    if (this.center) {
      m.translateSelf(-this.size.x / 2, -this.size.y / 2);
    }
    m.scaleSelf(this.size.x, this.size.y);
    return m;
  }

  get path() {
    const path = new Path2D();
    path.rect(0, 0, 1, 1);
    const shape = new Path2D();
    shape.addPath(path, this.matrix);
    return shape;
  }
}

export class Circle {
  static Default = {
    rad: 1,
    pos: new DOMPoint(0, 0, 0),
    rot: new DOMPoint(0, 0, 0),
  };

  /**
   * @param {Partial<typeof Circle.Default>} [config]
   */
  constructor(config) {
    this.rad = config?.rad || Circle.Default.rad;
    this.pos = config?.pos || DOMPoint.fromPoint(Circle.Default.pos);
    this.rot = config?.rot || DOMPoint.fromPoint(Circle.Default.rot);
  }

  get matrix() {
    return new DOMMatrix()
      .translateSelf(this.pos.x, this.pos.y)
      .rotateSelf(this.rot.x, this.rot.y, this.rot.z)
      .scaleSelf(this.rad, this.rad);
  }

  get path() {
    const path = new Path2D();
    path.arc(0, 0, 0.5, 0, Math.PI * 2);
    const shape = new Path2D();
    shape.addPath(path, this.matrix);
    return shape;
  }
}
