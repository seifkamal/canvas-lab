import { Vec } from "../tools/geometry.js";

/**
 * @param {Vec} anchor The default position if the pointer leaves.
 * @returns {Vec} The pointer location.
 */
export function pointer(anchor = new Vec()) {
  const pos = anchor;

  window.addEventListener("pointermove", ({ clientX, clientY }) => {
    pos.x = clientX;
    pos.y = clientY;
  });

  window.addEventListener("pointerout", () => {
    pos.x = anchor.x;
    pos.y = anchor.y;
  });

  return pos;
}
