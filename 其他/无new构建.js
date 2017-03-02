// 共享同一个对象，会同时修改
function A(name) {
  return A.prototype.init(name);
}
A.prototype.init = function(name) {
  this.name = name;
  return this;
}
var a1 = new A('123')
console.log(a1)

var a2 = A('567')
console.log(a1)
console.log(a2)
console.log(a1 === a2)



// 这样肯定是不行的，B()调用不会等于对象的
function B(name) {
  this.name = name;
  return this;
}
var b1 = new B('123')
console.log(b1)

var b2 = B('567')
console.log(b1)
console.log(b2)
console.log(b1 === b2)


// new
function C(name) {
  return new C.prototype.init(name);
}
C.prototype.init = function(name) {
  this.name = name;
  return this;
}
C.prototype.otherFn = function() {
  console.log("It works!")
}
var c1 = new C('123')
console.log(c1)

var c2 = C('567')
console.log(c1)
console.log(c2)
console.log(c1 === c2)

c1.otherFn() //报错


function D(name) {
  return new D.prototype.init(name);
}
D.prototype.init = function(name) {
  this.name = name;
  return this;
}
D.prototype.otherFn = function() {
  console.log("It works!")
}

// 关键继承
D.prototype.init.prototype = D.prototype;

var d1 = new D('123')
console.log(d1)

var d2 = D('567')
console.log(d1)
console.log(d2)
console.log(d1 === d2)

d1.otherFn() //It works!
