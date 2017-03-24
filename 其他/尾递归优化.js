// https://fe.ele.me/javascript-zhong-de-wei-diao-yong/
// 无侵入方式 尾递归优化

function tailCallOptimize(f) {  
  let value,
      active = false
  const accumulated = []
  return function accumulator() {
    accumulated.push(arguments)
    if (!active) {
      active = true
      while (accumulated.length) {
        value = f.apply(this, accumulated.shift())
      }
      active = false
      return value
    }
  }
}


const fibonacciTail = tailCallOptimize(function(n, a = 0, b = 1) {  
  if (n === 0) return a
  return fibonacciTail(n - 1, b, a + b)
})

function fibonacci(n, a = 0, b = 1) {
  if (n === 0) return a
  return fibonacci(n - 1, b, a + b);
}


console.time("optimize")
fibonacciTail(10477) //多大都毫无压力，只是耗时较长
console.timeEnd("optimize")

console.time("normal")
fibonacci(10477) //最多只能到这里，大于它就只能 Maximum call stack size exceeded
console.timeEnd("normal")


// 侵入方式尾递归优化

// 循环
function fibonacciLoop(n, a = 0, b = 1) {  
  while (n--) {
    [a, b] = [b, a + b]
  }
  return a
}
console.time("loop")
fibonacci(10477) 
console.timeEnd("loop")



// 蹦床函数
function trampoline(f) {  
  while (f && f instanceof Function) {
    f = f()
  }
  return f
}

function fibonacciFunc(n, a = 0, b = 1) {  
  if (n > 0) {
    [a, b] = [b, a + b]
    return fibonacciFunc.bind(null, n - 1, a, b)
  } else {
    return a
  }
}
console.time("trampline")
trampoline(fibonacciFunc(10477))
console.timeEnd("trampline")


