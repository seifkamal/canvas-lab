import { loop } from "../plugins/loop.js";
import { Vec } from "../tools/geometry.js";
import { Body } from "../tools/physics.js";
import { BinaryTree } from "../tools/struct.js";

class RandomForce {
  static C = 0.1;
  static force() {
    const force = new Vec();
    const chance = Math.random();
    if (chance < 0.25) {
      force.add(Vec.up);
    } else if (chance < 0.5) {
      force.add(Vec.down);
    } else if (chance < 0.75) {
      force.add(Vec.left);
    } else {
      force.add(Vec.right);
    }
    force.mul(RandomForce.C);
    return force;
  }
}

/**
 * @type {import('../index').Experiment}
 */
export default function experiment(canvas) {
  const center = new Vec(canvas.centerX, canvas.centerY / 3);
  const tree = createSomeTree(center);

  loop(({ delta }) => {
    canvas.clear();
    tree.walk((node) => {
      // Draw
      if (node.left) {
        canvas.path(node.value.pos, node.left.value.pos);
      }
      if (node.right) {
        canvas.path(node.value.pos, node.right.value.pos);
      }
      // Step
      const force = RandomForce.force();
      force.mul(delta);
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
      new Body(Vec.zero, someVecNear(node.value.pos, -1))
    );
    node.right = new BinaryTree(
      new Body(Vec.zero, someVecNear(node.value.pos))
    );
  };

  const tree = new BinaryTree(new Body(Vec.zero, at));
  branch(tree);
  branch(tree.left);
  branch(tree.left?.left);
  branch(tree.left?.right);
  branch(tree.right);
  branch(tree.right?.left);
  branch(tree.right?.right);

  return tree;
}
