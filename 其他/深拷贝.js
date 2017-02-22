// 尚未解决循环引用问题
var a = {
  arr: [1, 2, 3],
  num: 5
}
var b = {
    a: a
  }
  // a.b = a;

console.log(JSON.parse(JSON.stringify(a)))

a.b = b;

console.log(Object.create(a))


// 还未解决好循环引用的问题

function deepClone(initialObj, finalObj) {
  var obj = finalObj || {};
  for (var i in initialObj) {
    if (initialObj[i] === a) {
      obj[i] = a;
      continue;
    }
    if (typeof initialObj[i] === "object") {
      obj[i] = (initialObj[i].constructor === Array) ? [] : {};
      deepClone(initialObj[i], obj[i]);
    } else {
      obj[i] = initialObj[i]
    }
  }
  return obj;
}


console.log(deepClone(a))
