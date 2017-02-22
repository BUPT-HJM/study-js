var throttle = function(fn, time) {
  var timer;
  var firstTime = true;
  return function() {
    var args = arguments;
    var self = this;
    if (firstTime) {
      fn.apply(self, arguments);
      return firstTime = false;
    }
    if (timer) {
      return false;
    }
    timer = setTimeout(function() {
      clearTimeout(timer);
      timer = null;
      fn.apply(self, args)
    }, time || 500)
  }
}

function a() {
  console.log(1)
}
var b = throttle(a, 1000);
for (var i = 0; i < 50000; i++) {
  b();
}
