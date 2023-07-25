/**
 * @template {string} Action
 * @param {{ [key: string]: Action }} controls
 * @return {Set<Action>}
 *
 * @example
 * const act = keys({
 *   a: 'left',
 *   d: 'right',
 *   ' ': 'jump',
 * });
 * console.log(act.has('jump'));
 */
export function keys(controls) {
  const actions = new Set();

  window.addEventListener("keydown", ({ key, repeat }) => {
    if (!(key in controls) || repeat) {
      return;
    }
    actions.add(controls[key]);
  });

  window.addEventListener("keyup", ({ key }) => {
    if (!(key in controls)) {
      return;
    }
    actions.delete(controls[key]);
  });

  return actions;
}
