import { Vec } from "../modules/geometry.js";

const inputs = {
  keyboard: {
    iconSrc: "/assets/keyboard.svg",
    tooltip: "Control using keyboard",
  },
  "pointer-move": {
    iconSrc: "/assets/pointer-move.svg",
    tooltip: "Control using pointer movement",
  },
  "pointer-press": {
    iconSrc: "/assets/pointer-press.svg",
    tooltip: "Control using pointer press",
  },
  "pointer-scroll": {
    iconSrc: "/assets/pointer-scroll.svg",
    tooltip: "Control using pointer wheel",
  },
};

/**
 * @typedef {keyof typeof inputs} Input
 * @param {HTMLElement} ui
 */
export function input(ui) {
  /**
   * @param {Input} type
   */
  const displayIndicator = (type) => {
    if (!(type in inputs)) {
      return;
    }
    const meta = inputs[type];
    const icon = document.createElement("img");
    icon.src = meta.iconSrc;
    icon.title = meta.tooltip;
    const item = document.createElement("li");
    item.appendChild(icon);
    ui.appendChild(item);
  };

  return {
    /**
     * @type {typeof keys}
     */
    keys(controls) {
      displayIndicator("keyboard");
      return keys(controls);
    },
    /**
     * @type {typeof pointer}
     */
    pointer(config) {
      if (config.press) {
        displayIndicator("pointer-press");
      }
      if (config.move) {
        displayIndicator("pointer-move");
      }
      if (config.scroll) {
        displayIndicator("pointer-scroll");
      }
      return pointer(config);
    },
  };
}

/**
 * @template {string} Action
 * @param {{ [key: string]: Action }} mappings
 * @return {Set<Action>}
 *
 * @example
 * const controls = keys({
 *   a: 'left',
 *   d: 'right',
 *   ' ': 'jump',
 * });
 * console.log(controls.has('jump'));
 */
function keys(mappings) {
  const controls = new Set();

  window.addEventListener("keydown", ({ key, repeat }) => {
    if (!(key in mappings) || repeat) {
      return;
    }
    controls.add(mappings[key]);
  });

  window.addEventListener("keyup", ({ key }) => {
    if (!(key in mappings)) {
      return;
    }
    controls.delete(mappings[key]);
  });

  return controls;
}

/**
 * @param {{
 *   press?: boolean;
 *   move?: boolean;
 *   scroll?: boolean;
 *   scrollDamp?: number;
 *   target? : HTMLElement;
 * }} config
 * @returns {{
 *   pressed: boolean;
 *   pos: Vec;
 *   scroll: Vec;
 * }}
 */
function pointer(config) {
  const target = config.target || document.body;
  let pressed = false;
  let pos = new Vec();
  let scroll = new Vec();

  if (config.press) {
    target.addEventListener("pointerdown", ({ x, y }) => {
      pressed = true;
      pos.x = x;
      pos.y = y;
    });

    target.addEventListener("pointerup", ({ x, y }) => {
      pressed = false;
      pos.x = x;
      pos.y = y;
    });
  }

  if (config.move) {
    target.addEventListener("pointermove", ({ x, y }) => {
      pos.x = x;
      pos.y = y;
    });
  }

  if (config.scroll) {
    const damp = config.scrollDamp || 0.01;
    target.addEventListener(
      "wheel",
      ({ deltaX, deltaY }) => {
        scroll.x = deltaX * damp;
        scroll.y = deltaY * damp;
      },
      { passive: true }
    );
  }

  return {
    get pressed() {
      return pressed;
    },
    get pos() {
      return pos;
    },
    get scroll() {
      return scroll;
    },
  };
}
