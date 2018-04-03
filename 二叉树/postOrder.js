const tree = require('./tree');

// 根节点 =>
// 右子树 =>
// 左子树
function postOrderTraversal (node) {
    let traArr = [];
    let stack = [node];
    while (stack.length) {
        let node = stack.pop();
        traArr.push(node.value);
        if (node.left) {
            stack.push(node.left);
        }
        if (node.right) {
            stack.push(node.right);
        }
    }
    return traArr;
}

console.log(postOrderTraversal(tree));