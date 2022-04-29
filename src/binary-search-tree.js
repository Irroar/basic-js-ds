const { NotImplementedError } = require('../extensions/index.js');

const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/
class BinarySearchTree {
  constructor() {
    this.BSTRoot = null;
  }

  root() {
    return this.BSTRoot;
  }

  add(newData, current = this.BSTRoot) {
    let newNode = new Node(newData);

    if (!current) {
      this.BSTRoot = newNode;
    }
    else {
      let way = newData < current.data ? 'left' : 'right';
      switch (way) {
        case 'right':
          if (!current.right) { current.right = newNode; }
          else { this.add(newData, current.right); }
          break;
        case 'left':
          if (!current.left) { current.left = newNode; }
          else { this.add(newData, current.left); }
          break;
      }
    }

    return newNode;
  }

  has(data) {
    return !!this.find(data);
  }

  find(data, current = this.BSTRoot) {
    if (!current) { return null; }
    if (data === current.data) { return current; }

    let way = data < current.data ? 'left' : 'right';
    switch (way) {
      case 'right':
        return this.find(data, current.right);
      case 'left':
        return this.find(data, current.left);
    }
    return current;
  }

  remove(data, current = this.root()) {
    if (!current) { return null; }

    if (data < current.data) {
      current.left = this.remove(data, current.left);
      return current;
    }

    if (data > current.data) {
      current.right = this.remove(data, current.right);
      return current;
    }

    // no children

    if (!current.left && !current.right) {
      current = null;
      return current;
    }

    // one child

    if (!current.left) {
      current = current.right;
      return current;
    }

    if (!current.right) {
      current = current.left;
      return current;
    }

    // both chidren
    // find min in right subtree or find max in left subtree

    let minChildData = this.min(current.right);
    current.data = minChildData;

    current.right = this.remove(minChildData, current.right);
    return current;    
  }

  min(current = this.BSTRoot) {
    if (!current.left) { return current.data; }
    return this.min(current.left);
  }

  max(current = this.BSTRoot) {
    if (!current.right) { return current.data; }
    return this.max(current.right);
  }
}

module.exports = {
  BinarySearchTree
};