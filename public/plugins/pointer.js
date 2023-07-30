import { Vec } from "../tools/geometry.js";

/**
 * @param {HTMLElement} target
 * @typedef {{ pressed: boolean; pos: Vec; }} PointerState
 * @returns {PointerState}
 */
export function pointer(target = document.body) {
  const state = {
    pressed: false,
    pos: new Vec(),
  };

  target.addEventListener("pointerdown", () => {
    state.pressed = true;
  });

  target.addEventListener("pointerup", () => {
    state.pressed = false;
  });

  target.addEventListener("pointermove", ({ clientX, clientY }) => {
    state.pos.x = clientX;
    state.pos.y = clientY;
  });

  return state;
}
