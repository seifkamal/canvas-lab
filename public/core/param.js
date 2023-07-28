/**
 * @param {HTMLMenuElement} menu
 * @returns A param creator function which, when used,
 * creates and appends an input param to the given menu
 * and returns an object containing a value getter and setter.
 *
 * @example
 * const force = param("Force", {
 *   type: 'number',
 *   min: '1',
 *   max: '10',
 *   value: '1',
 * });
 *
 * console.log(force.value);
 * force.value = 100;
 */
export function param(menu) {
  /**
   * @typedef {{ get value(): string; set value(val: any) }} Param
   * @param {string} title
   * @param {Partial<HTMLInputElement>} [config]
   * @returns {Param}
   */
  return (title, config) => {
    const input = document.createElement("input");
    const label = document.createElement("label");
    const item = document.createElement("li");
    label.append(`${title}: `, input);
    item.appendChild(label);
    menu.appendChild(item);

    if (config) {
      Object.entries(config).forEach(([key, value]) => (input[key] = value));
    }

    return {
      get value() {
        return input.value;
      },
      set value(val) {
        input.value = String(val);
      },
    };
  };
}
