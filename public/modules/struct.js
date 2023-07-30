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

/**
 * @template T
 */
export class LinkedList {
  /**
   * @param {T} value
   * @param {LinkedList<T>} [next]
   */
  constructor(value, next) {
    this.value = value;
    this.next = next;
  }
  *[Symbol.iterator]() {
    /** @type {LinkedList<T> | undefined} */
    let node = this;
    while (node) {
      yield node;
      node = node.next;
    }
  }
  /**
   * @template T
   * @param {T[]} arr
   * @returns {LinkedList<T>}
   */
  static from(arr) {
    if (arr.length === 0) {
      throw new Error("array is empty");
    }
    const list = new LinkedList(arr[0]);
    if (arr.length > 1) {
      list.next = LinkedList.from(arr.splice(1));
    }
    return list;
  }
}
