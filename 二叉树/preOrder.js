const tree = require('./tree');

// 根节点 =>
// 左子树 =>
// 右子树
function preOrderTraversal (node) {
    let traArr = [];
    let stack = [node];
    while (stack.length) {
        let node = stack.pop();
        traArr.push(node.value);
        if (node.right) {
            stack.push(node.right);
        }
        if (node.left) {
            stack.push(node.left);
        }
    }
    return traArr;
}

console.log(preOrderTraversal(tree));