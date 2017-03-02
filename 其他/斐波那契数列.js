// 递归方式
function fi(num) {
  if (num == 1) {
    return 1;
  }
  if (num == 2) {
    return 2;
  }
  return (fi(num - 1) + fi(num - 2));
}

console.log(fi(10))


// 循环方式
// 1 2 3
// sum = 1+2  只需一次，则num-2
function fi2(num) {
  var a = 1;
  var b = 2;
  var sum;
  for (var i = 0; i < num - 2; i++) {
    sum = a + b;
    a = b;
    b = sum;
  }
  return sum;
}

console.log(fi2(10))
