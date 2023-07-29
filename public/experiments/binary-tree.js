import { animate } from "../plugins/animate.js";
import { Vec } from "../tools/geometry.js";
import { Body } from "../tools/physics.js";
import { BinaryTree } from "../tools/struct.js";

class MagneticForce {
  static C = 0.001;
  /**
   * @param {Body} body
   * @param {Vec} anchor
   * @returns
   */
  static force(body, anchor) {
    const force = Vec.sub(anchor, body.center);
    force.y = 0;
    force.norm();
    force.mul(MagneticForce.C);
    return force;
  }
}

/**
 * @type {import('../index').Experiment}
 */
export default function experiment({ canvas, info }) {
  info(
    `This is a ${info.link(
      "binary tree",
      "https://en.wikipedia.org/wiki/Binary_tree"
    )}.`,
    `A non-linear data structure in which each element has 
    up to two children, typically referred to as the left
    and right nodes.`
  );

  const center = new Vec(canvas.centerX, canvas.centerY / 3);
  const tree = createSomeTree(center);

  animate(() => {
    canvas.clear();
    tree.walk((node) => {
      // Draw
      canvas.ellipse(node.value);
      if (node.left) {
        canvas.path(node.value.center, node.left.value.center);
      }
      if (node.right) {
        canvas.path(node.value.center, node.right.value.center);
      }
      // Step
      const force = MagneticForce.force(node.value, canvas.center);
      node.value.applyForce(force);
      node.value.step();
      // Keep within bounds
      if (node.value.pos.y < 0 || node.value.pos.y > canvas.height) {
        node.value.vel.y *= -1;
      }
      if (node.value.pos.x < 0 || node.value.pos.x > canvas.width) {
        node.value.vel.x *= -1;
      }
    });
  });
}

/**
 * @param {Vec} at
 */
function createSomeTree(at) {
  const size = 4;

  /**
   * @param {Vec} to
   * @param {1 | -1} dir
   */
  const someVecNear = (to, dir = 1) => {
    const swayX = Math.random() * 25;
    const swayY = Math.random() * 25 * dir;
    return Vec.add(to, new Vec((100 + swayX) * dir, 200 + swayY));
  };

  /**
   * @param {BinaryTree<Body>} [node]
   */
  const branch = (node) => {
    if (!node) {
      return;
    }
    node.left = new BinaryTree(
      new Body(new Vec(size), someVecNear(node.value.pos, -1))
    );
    node.right = new BinaryTree(
      new Body(new Vec(size), someVecNear(node.value.pos))
    );
  };

  const tree = new BinaryTree(new Body(new Vec(size), at));
  branch(tree);
  branch(tree.left);
  branch(tree.left?.left);
  branch(tree.left?.right);
  branch(tree.right);
  branch(tree.right?.left);
  branch(tree.right?.right);

  return tree;
}
