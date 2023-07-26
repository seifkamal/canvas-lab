import { Rect, Vec } from "../tools/geometry.js";

const Chars = {
  x: "✘",
  o: "○",
};

/**
 * @param {HTMLCanvasElement} canvas
 * @returns A wrapper object around the given canvas that exposes convenience
 * functions for 2D operations.
 */
export function canvas2D(canvas) {
  const ctx = canvas.getContext("2d");
  if (!ctx) {
    throw new Error("canvas 2d context unavailable");
  }

  return {
    get ctx() {
      return ctx;
    },
    get width() {
      return canvas.width;
    },
    get halfWidth() {
      return this.width / 2;
    },
    get height() {
      return canvas.height;
    },
    get halfHeight() {
      return this.height / 2;
    },
    get centerX() {
      return this.halfWidth;
    },
    get centerY() {
      return this.halfHeight;
    },
    get center() {
      return new Vec(this.centerX, this.centerY);
    },
    clear() {
      this.ctx.clearRect(0, 0, this.width, this.height);
    },
    /**
     * @param {string} text
     * @param {Vec} at
     */
    write(text, at) {
      this.ctx.fillText(text, at.x, at.y);
    },
    /**
     * @param {Vec} point
     * @param {'x' | 'o'} type
     */
    mark(point, type = "x") {
      this.write(Chars[type], point);
    },
    /**
     * @param {Vec} point
     */
    plot(point) {
      this.ctx.lineTo(point.x, point.y);
      this.ctx.stroke();
    },
    /**
     * @param {Vec[]} points
     */
    path(...points) {
      this.ctx.beginPath();
      points.forEach((point, idx) => {
        if (idx === 0) {
          this.ctx.moveTo(point.x, point.y);
          return;
        }
        this.ctx.lineTo(point.x, point.y);
      });
      this.ctx.stroke();
      this.ctx.closePath();
    },
    /**
     * @param {Rect} rect
     */
    rect(rect) {
      this.ctx.fillRect(rect.left, rect.top, rect.width, rect.height);
    },
    /**
     * @param {Rect} rect
     */
    ellipse(rect) {
      this.ctx.beginPath();
      this.ctx.ellipse(
        rect.left,
        rect.top,
        rect.width,
        rect.height,
        0,
        Math.PI * 2,
        0
      );
      this.ctx.fill();
    },
    /**
     * @param {Vec} center
     * @param {number} radians
     * @param {() => void} callback
     */
    rotated(center, radians, callback) {
      this.ctx.translate(center.x, center.y);
      this.ctx.rotate(radians);
      this.ctx.translate(-center.x, -center.y);
      callback();
      this.ctx.resetTransform();
    },
  };
}
