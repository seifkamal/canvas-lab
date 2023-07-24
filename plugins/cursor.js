import { Vec } from "../tools/geometry.js";

/**
 * @param {Vec} anchor
 * @returns {Vec} The cursor location.
 */
export function cursor(anchor = new Vec()) {
  const pos = anchor;

  window.addEventListener("mousemove", ({ clientX, clientY }) => {
    pos.x = clientX;
    pos.y = clientY;
  });

  window.addEventListener("mouseout", () => {
    pos.x = anchor.x;
    pos.y = anchor.y;
  });

  return pos;
}
