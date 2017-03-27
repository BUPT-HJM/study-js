// 柯里化（英语：Currying），又称为部分求值，是把接受多个参数的函数变换成接受一个单一参数（最初函数的第一个参数）的函数，并且返回一个新的函数的技术，新函数接受余下参数并返回运算结果。


function add1() {
  var arr = [].slice.call(arguments);
  var addFn = function() {
    [].push.apply(arr, [].slice.call(arguments)); // 闭包存储所有参数
    return addFn;
  }
  return addFn.apply(null, arr);
}

console.log(add1(1))

// 返回addFn,不符合要求,可以利用函数隐式转换来实现最后的输出

function add() {
  var arr = [];
  var addFn = function() {
    [].push.apply(arr, [].slice.call(arguments)); // 闭包存储所有参数
    return addFn;
  }
  addFn.toString = function() {
    return arr.reduce(function(a, b) {
      return a + b;
    })
  }
  return addFn.apply(null, [].slice.call(arguments));
}

console.log(add(1))
// node里返回一个对象{ [Function: addFn] toString: [Function] }
// 浏览器返回1

console.log(add(1)(2,3)(4) + 1); // 11




// currying

var currying = function(fn) {
    var args = [].slice.call(arguments, 1); //取出第2个参数

    return function() { // 返回一个新的函数继续计算剩余的参数
        var _args = args.concat([].slice.call(arguments));
        return fn.apply(null, _args);
    }
}

var sum = currying(function() {
    var args = [].slice.call(arguments);
    return args.reduce(function(a, b) {
        return a + b;
    })
}, 10)

console.log(sum(20, 10));  // 40
console.log(sum(10, 5));   // 25




