import { canvas2D } from "./core/canvas.js";
import { info } from "./core/info.js";
import { param } from "./core/param.js";

document.addEventListener("DOMContentLoaded", async () => {
  const canvas = getCanvas2D();
  const param = getParamFunc();
  const info = getInfoFunc();
  const exp = await loadExperiment();

  exp({ canvas, param, info });
});

/**
 * @typedef {ReturnType<getCanvas2D>} Canvas
 * @typedef {ReturnType<getParamFunc>} ParamFunc
 * @typedef {ReturnType<getInfoFunc>} InfoFunc
 * @typedef {{ canvas: Canvas, param: ParamFunc, info: InfoFunc }} Context
 * @typedef {(context: Context) => void} Experiment
 *
 * @returns {Promise<Experiment>}
 */
async function loadExperiment() {
  const params = new URLSearchParams(location.search);
  const id = params.get("id") || "walker";
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
