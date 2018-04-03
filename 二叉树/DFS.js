const tree = require('./tree');
// 递归实现
function recursionDFS (node, DFSArr = []) {
    DFSArr.push(node.value);
    if (node.left) {
        recursionDFS(node.left, DFSArr);
    }
    if (node.right) {
        recursionDFS(node.right, DFSArr);
    }
    return DFSArr;
}
// 非递归实现
function DFS (node) {
    let DFSArr = [];
    let stack = [node];
    while (stack.length) {
        let node = stack.pop();
        DFSArr.push(node.value);
        if (node.right) {
            stack.push(node.right);
        }
        if (node.left) {
            stack.push(node.left);
        }
    }
    return DFSArr;
}
console.log(recursionDFS(tree));
console.log(DFS(tree));