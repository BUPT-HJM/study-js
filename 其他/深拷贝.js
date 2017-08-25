var a = {
  arr: [1, 2, 3],
  num: 5,
}

console.log(JSON.parse(JSON.stringify(a)))

a.b = a;

function deepClone(initialObj, finalObj, srcStack, copyStack) {
  var obj = finalObj || {};
  var sStack = srcStack || [];
  var cStack = copyStack || [];
  for (var i in initialObj) {
    if (typeof initialObj[i] === "object") {
      var index = sStack.indexOf(initialObj[i]);
      if (index !== -1) {
        obj[i] = cStack[index];
      } else {
        sStack.push(initialObj[i]);
        obj[i] = (initialObj[i].constructor === Array) ? [] : {};
        cStack.push(obj[i]);
        deepClone(initialObj[i], obj[i], sStack, cStack);
      }                                           
    } else {
      obj[i] = initialObj[i]
    }
  }
  return obj;
}

// 测试deepClone是否解决环对象
var c = deepClone(a);
c.num = 3;
c.b.arr.push(4);
c.b.num = 5;
console.log(c);
console.log(a);

