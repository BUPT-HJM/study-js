const tree = require('./tree');

// 左子树 =>
// 根节点 =>
// 右子树
function inOrderTraversal (node) {
    let traArr = [];
    let stack = [];
    while (stack.length || node) {
        if (node) {
            stack.push(node);
            node = node.left;
        } else {
            node = stack.pop();
            traArr.push(node.value);
            node = node.right;
        }
    }
    return traArr;
}

console.log(inOrderTraversal(tree));