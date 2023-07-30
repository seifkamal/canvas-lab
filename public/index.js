import { canvas } from "./core/canvas.js";
import { input } from "./core/input.js";
import { info } from "./core/info.js";

document.addEventListener("DOMContentLoaded", async () => {
  const params = new URLSearchParams(location.search);
  const id = params.get("id") || "intro";
  const scene = await loadScene(id);

  scene({
    canvas: getCanvas(),
    info: getInfoFunc(),
    input: getInputFuncs(),
  });
});

/**
 * @typedef {ReturnType<typeof getCanvas>} Canvas
 * @typedef {ReturnType<typeof getInfoFunc>} InfoFunc
 * @typedef {ReturnType<typeof getInputFuncs>} InputFuncs
 * @typedef {{ canvas: Canvas, info: InfoFunc, input: InputFuncs }} Context
 * @typedef {(context: Context) => void} Scene
 *
 * @param {string} id
 * @returns {Promise<Scene>}
 */
async function loadScene(id) {
  const expMod = await import(`./scenes/${id}.js`);
  const exp = expMod.default;
  if (!exp) {
    throw new Error(`scene ${id} not found`);
  }

  return exp;
}

function getCanvas() {
  const root = document.querySelector("canvas");
  if (!root) {
    throw new Error("canvas element not found");
  }

  return canvas(root);
}

function getInfoFunc() {
  const root = document.querySelector("details");
  if (!root) {
    throw new Error("details element not found");
  }

  return info(root);
}

function getInputFuncs() {
  const root = document.getElementById("controls");
  if (!root) {
    throw new Error("#controls element not found");
  }

  return input(root);
}
