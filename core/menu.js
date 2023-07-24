/**
 * @param {HTMLMenuElement} root
 * @returns A param creator function which, when used,
 * creates and appends an input param to the given menu
 * and returns a corresponding update function.
 * @example
 * let force = 1;
 * const updateForce = param("Force", (v) => (force = v), {
 *   type: 'number',
 *   min: '1',
 *   max: '10',
 *   value: String(F),
 * });
 *
 * let someOverride = 10;
 * updateForce(someOverride);
 */
export function menu(root) {
  /**
   * @param {string} title
   * @param {(value: string) => void} [onChange]
   * @param {Partial<HTMLInputElement>} [config]
   */
  return (title, onChange, config) => {
    const input = document.createElement("input");
    const label = document.createElement("label");
    label.append(`${title}: `, input);
    root.appendChild(label);

    if (config !== undefined) {
      Object.entries(config).forEach(([key, value]) => (input[key] = value));
    }

    input.addEventListener("change", (event) => {
      if (!onChange || !(event.target instanceof HTMLInputElement)) {
        return;
      }
      onChange(event.target.value);
    });

    /**
     * @param {string} newValue
     */
    return (newValue) => (input.value = newValue);
  };
}
