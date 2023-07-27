import { canvas2D } from "./core/canvas.js";
import { info } from "./core/info.js";
import { menu } from "./core/menu.js";

document.addEventListener("DOMContentLoaded", async () => {
  const canvas = getCanvas2D();
  const menu = getParamMenu();
  const info = getInfoPopover();
  const exp = await loadExperiment();

  exp(canvas, menu, info);
});

/**
 * @typedef {ReturnType<getCanvas2D>} Canvas
 * @typedef {ReturnType<getParamMenu>} Menu
 * @typedef {ReturnType<getInfoPopover>} Info
 * @typedef {(canvas: Canvas, menu: Menu, info: Info) => void} Experiment
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

function getParamMenu() {
  const root =
    document.querySelector("menu") ||
    document.body.appendChild(document.createElement("menu"));

  return menu(root);
}

function getInfoPopover() {
  const root =
    document.querySelector("details") ||
    document.body.appendChild(document.createElement("details"));

  return info(root);
}
