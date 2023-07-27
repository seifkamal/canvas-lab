/**
 * @param {HTMLDetailsElement} root
 */
export function info(root) {
  /** @type {HTMLElement} */
  let sum;

  /**
   * @param {string} summary
   * @param {string} [extra]
   */
  const func = (summary, extra) => {
    if (!sum) {
      sum =
        root.querySelector("summary") ||
        root.appendChild(document.createElement("summary"));
    }

    if (extra) {
      root.innerHTML = `<p>${extra}</p>`;
    }

    sum.innerHTML = `<p>${summary}</p>`;
    root.prepend(sum);
  };

  /**
   * @param {string} label
   * @param {string} link
   * @returns {string}
   */
  func.link = (label, link) =>
    `<a target="_blank" rel="noopener noreferrer" href="${link}">${label}</a>`;

  return func;
}
