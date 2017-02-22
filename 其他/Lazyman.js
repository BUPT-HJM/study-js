function _LazyMan(name) {
  this.tasks = [];
  var self = this;
  this.tasks.push(function() {
    console.log("Hi this is " + name);
    self.next();
  })
  setTimeout(function() {
    self.next();
  }, 0)
}

_LazyMan.prototype.next = function() {
  var fn = this.tasks.shift();
  fn && fn();
}

_LazyMan.prototype.sleep = function(time) {
  var self = this;
  this.tasks.push(function() {
    setTimeout(function() {
      console.log("Wake up after " + time * 1000 + 's!');
      self.next()
    }, time * 1000)

  })
  return this;
}

_LazyMan.prototype.eat = function(food) {
  var self = this;
  this.tasks.push(function() {
    console.log("Eat " + food + " !");
    self.next();
  })
  return this;
}

_LazyMan.prototype.sleepFirst = function(time) {
  var self = this;
  this.tasks.unshift(function() {
    setTimeout(function() {
      console.log("Wake up after " + time * 1000 + 's!');
      self.next()
    }, time * 1000)
  })
  return this;
}


function LazyMan(name) {
  return new _LazyMan(name);
}
LazyMan("gary").sleepFirst(2).eat('apple').sleep(3).eat("dinner");
