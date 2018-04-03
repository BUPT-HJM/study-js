const tree = require('./tree');
// 递归
function recursionBFS (node, queue = [], breadthArr = [], isRoot = true) {
    if (isRoot) {
        breadthArr.push(node.value);
        queue.push(node);
    }
    node = queue.shift();
    if (node) {
        if (node.left) {
            breadthArr.push(node.left.value);
            queue.push(node.left);
        }
        if (node.right) {
            breadthArr.push(node.right.value);
            queue.push(node.right);
        }
        recursionBFS(node, queue, breadthArr, false);
    }
    return breadthArr;
}
// 非递归
function BFS (node) {
    let breadthArr = [];
    let queue = [node];
    while (queue.length !== 0) {
        node = queue.shift();
        breadthArr.push(node.value);
        if (node.left) {
            queue.push(node.left);
        }
        if (node.right) {
            queue.push(node.right);
        }
    }
    return breadthArr;
}
console.log(recursionBFS(tree));
console.log(BFS(tree));