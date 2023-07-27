export class Vec {
  constructor(x = 0, y = x) {
    this.x = x;
    this.y = y;
  }
  /**
   * @param {Vec} vec
   */
  add(vec) {
    this.x += vec.x;
    this.y += vec.y;
  }
  /**
   * @param {Vec} vec
   */
  sub(vec) {
    this.x -= vec.x;
    this.y -= vec.y;
  }
  /**
   * @param {number} value
   */
  mul(value) {
    this.x *= value;
    this.y *= value;
  }
  /**
   * @param {number} value
   */
  div(value) {
    this.x /= value;
    this.y /= value;
  }
  norm() {
    const mag = this.mag;
    if (mag !== 0) {
      this.div(mag);
    }
  }
  get mag() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }
  get head() {
    return Math.atan2(this.y, this.x);
  }
  static get zero() {
    return new Vec(0, 0);
  }
  static get up() {
    return new Vec(0, -1);
  }
  static get down() {
    return new Vec(0, 1);
  }
  static get left() {
    return new Vec(-1, 0);
  }
  static get right() {
    return new Vec(1, 0);
  }
  /**
   * @param {Vec} vec1
   * @param {Vec} vec2
   * @returns {Vec}
   */
  static add(vec1, vec2) {
    const res = Vec.copy(vec1);
    res.add(vec2);
    return res;
  }
  /**
   * @param {Vec} vec1
   * @param {Vec} vec2
   * @returns {Vec}
   */
  static sub(vec1, vec2) {
    const res = Vec.copy(vec1);
    res.sub(vec2);
    return res;
  }
  /**
   * @param {Vec} vec
   * @param {number} val
   * @returns {Vec}
   */
  static mul(vec, val) {
    const res = Vec.copy(vec);
    res.mul(val);
    return res;
  }
  /**
   * @param {Vec} vec
   * @param {number} val
   * @returns {Vec}
   */
  static div(vec, val) {
    const res = Vec.copy(vec);
    res.div(val);
    return res;
  }
  /**
   * @param {Vec} vec
   * @returns {Vec}
   */
  static norm(vec) {
    const res = Vec.copy(vec);
    res.norm();
    return res;
  }
  /**
   * @param {Vec} vec
   * @returns {Vec}
   */
  static copy(vec) {
    return new Vec(vec.x, vec.y);
  }
}

export class Rect {
  constructor(size = new Vec(), pos = new Vec(), rot = 0) {
    this.size = size;
    this.pos = pos;
    this.rot = rot;
  }
  get width() {
    return this.size.x;
  }
  get height() {
    return this.size.y;
  }
  get halfWidth() {
    return this.width / 2;
  }
  get halfHeight() {
    return this.height / 2;
  }
  get halfSize() {
    return new Vec(this.halfWidth, this.halfHeight);
  }
  get left() {
    return this.pos.x;
  }
  get right() {
    return this.left + this.width;
  }
  get top() {
    return this.pos.y;
  }
  get bottom() {
    return this.top + this.height;
  }
  get centerX() {
    return this.left + this.halfWidth;
  }
  get centerY() {
    return this.top + this.halfHeight;
  }
  get center() {
    return new Vec(this.centerX, this.centerY);
  }
  /**
   * @param {Rect} other
   * @returns {boolean}
   */
  touches(other) {
    return (
      this.bottom > other.top &&
      this.top < other.bottom &&
      this.right > other.left &&
      this.left < other.right
    );
  }
}
