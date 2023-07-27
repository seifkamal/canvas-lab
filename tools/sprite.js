export class Sprite extends Image {
  /**
   * @param {string} src
   * @param {number} [width]
   * @param {number} [height]
   */
  constructor(src, width, height) {
    super(width, height);
    this.src = src;
  }
}
