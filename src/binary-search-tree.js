const { NotImplementedError } = require('../extensions/index.js');

const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/
class BinarySearchTree {
  constructor() {
    this.r = null;
  }

  root() {
    return this.r;
  }

  add(data) {
    const node = new Node(data);
    let next = this.r;
    if (!next) {
      this.r = node;
      return null;
    }
    while (next) {
      if (next.data > data && next.left) {
        next = next.left;
      } else if (next.data > data && !next.left) {
        next.left = node;
        return null;
      }
      if (next.data < data && next.right) {
        next = next.right;
      } else if (next.data < data && !next.right) {
        next.right = node;
        return null;
      }
    }
  }

  has(data) {
    let next = this.r;
    if (!next) {
      return false;
    }

    while (next) {
      if (next.data > data) {
        next = next.left;
      } else if (next.data < data) {
        next = next.right;
      } else if (next.data === data) {
        return true;
      }
    }

    return false;
  }

  find(data) {
    let next = this.r;

    if (!next) {
      return null;
    }

    while (next) {
      if (next.data > data) {
        next = next.left;
      } else if (next.data < data) {
        next = next.right;
      } else if (next.data === data) {
        return next;
      }
    }

    return null;
  }

  remove(data) {
    const delNode = (node, data) => {
      if (!node) {
        return null;
      }

      if (node.data > data) {
        node.left = delNode(node.left, data);

        return node;
      } else if (node.data < data) {
        node.right = delNode(node.right, data);

        return node;
      } else {
        if (!node.left) {
          node = node.right;
          return node;
        }

        if (!node.right) {
          node = node.left;
          return node;
        }
        
        if (!node.left && !node.right) {
          return null;
        }

        let min = node.right;

        while (min.left) {
          min = min.left;
        }

        node.data = min.data;
        node.right = delNode(node.right, min.data);

        return node;
      }
    }

    this.r = delNode(this.r, data);
  }

  min() {
    let next = this.r;
    
    if (!next) {
      return null;
    }

    while (next.left) {
      next = next.left;
    }

    return next.data;
  }

  max() {
    let next = this.r;
    
    if (!next) {
      return null;
    }

    while (next.right) {
      next = next.right;
    }

    return next.data;
  }
}

module.exports = {
  BinarySearchTree
};