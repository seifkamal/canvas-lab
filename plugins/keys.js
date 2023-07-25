/**
 * @template {string} Action
 * @param {{ [key: string]: Action }} controls
 * @return {{ [key in Action]: boolean }}
 *
 * @example
 * const act = keyboard({
 *   a: 'left',
 *   d: 'right',
 *   ' ': 'jump',
 * });
 * console.log(act.jump);
 */
export function keys(controls) {
  /** @type {ReturnType<typeof keys<Action>>} */
  // @ts-expect-error, as the object is being initialised.
  const actions = {};
  Object.entries(controls).forEach(([key, mapping]) => {
    actions[mapping] = false;
  });

  window.addEventListener("keyup", ({ key }) => {
    if (!(key in controls)) {
      return;
    }
    actions[controls[key]] = false;
  });

  window.addEventListener("keydown", ({ key, repeat }) => {
    if (!(key in controls) || repeat) {
      return;
    }
    actions[controls[key]] = true;
  });

  return actions;
}
