/**
 * @template T
 */
export class BinaryTree {
  /**
   * @param {T} value
   * @param {BinaryTree<T>} [left]
   * @param {BinaryTree<T>} [right]
   */
  constructor(value, left, right) {
    this.value = value;
    this.left = left;
    this.right = right;
  }
  /**
   * @param {(node: BinaryTree<T>) => void} callback
   */
  walk(callback) {
    callback(this);
    this.left?.walk(callback);
    this.right?.walk(callback);
  }
}
