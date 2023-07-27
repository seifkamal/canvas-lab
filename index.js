import { canvas2D } from "./core/canvas.js";
import { info } from "./core/info.js";
import { param } from "./core/param.js";

document.addEventListener("DOMContentLoaded", async () => {
  const params = new URLSearchParams(location.search);
  const id = params.get("id") || "intro";
  const exp = await loadExperiment(id);

  exp({
    canvas: getCanvas2D(),
    param: getParamFunc(),
    info: getInfoFunc(),
  });
});

/**
 * @typedef {ReturnType<getCanvas2D>} Canvas
 * @typedef {ReturnType<getParamFunc>} ParamFunc
 * @typedef {ReturnType<getInfoFunc>} InfoFunc
 * @typedef {{ canvas: Canvas, param: ParamFunc, info: InfoFunc }} Context
 * @typedef {(context: Context) => void} Experiment
 *
 * @param {string} id
 * @returns {Promise<Experiment>}
 */
async function loadExperiment(id) {
  const expMod = await import(`./experiments/${id}.js`);
  const exp = expMod.default;
  if (!exp) {
    throw new Error(`experiment ${id} not found`);
  }

  return exp;
}

function getCanvas2D() {
  const canvas =
    document.querySelector("canvas") ??
    document.body.appendChild(document.createElement("canvas"));

  canvas.width = innerWidth;
  canvas.height = innerHeight;

  return canvas2D(canvas);
}

function getParamFunc() {
  const root =
    document.querySelector("menu") ||
    document.body.appendChild(document.createElement("menu"));

  return param(root);
}

function getInfoFunc() {
  const root =
    document.querySelector("details") ||
    document.body.appendChild(document.createElement("details"));

  return info(root);
}
