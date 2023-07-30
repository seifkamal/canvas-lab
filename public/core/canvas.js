import { Rect, Vec } from "../modules/geometry.js";

/**
 * @param {HTMLCanvasElement} canvas
 * @returns A wrapper object around the given canvas
 * that exposes convenience functions for 2D operations.
 */
export function canvas(canvas) {
  const ctx = canvas.getContext("2d");
  if (!ctx) {
    throw new Error("canvas 2d context unavailable");
  }

  canvas.width = innerWidth;
  canvas.height = innerHeight;

  window.addEventListener("resize", () => {
    ctx.canvas.width = window.innerWidth;
    ctx.canvas.height = window.innerHeight;
  });

  return {
    get el() {
      return canvas;
    },
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
      const draw = () =>
        this.ctx.fillRect(rect.left, rect.top, rect.width, rect.height);

      if (rect.rot) {
        this.rotated(rect.center, rect.rot, draw);
        return;
      }

      draw();
    },
    /**
     * @param {Rect} rect
     */
    ellipse(rect) {
      this.ctx.beginPath();
      this.ctx.ellipse(
        rect.centerX,
        rect.centerY,
        rect.width,
        rect.height,
        rect.rot,
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
    /**
     * @typedef {{ image: CanvasImageSource }} HasImage
     * @param {Rect & HasImage} rect
     */
    image(rect) {
      const draw = () =>
        this.ctx.drawImage(
          rect.image,
          rect.left,
          rect.top,
          rect.width,
          rect.height
        );

      if (rect.rot) {
        this.rotated(rect.center, rect.rot, draw);
        return;
      }

      draw();
    },
  };
}
