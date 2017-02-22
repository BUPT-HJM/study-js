var debounce = function(fn, time) {
  var timer;
  return function() {
    var self = this;
    var args = arguments;
    clearTimeout(timer)
    timer = setTimeout(function() {
      fn.apply(self, args);
    }, time || 500)
  }
}
function a() {
  console.log(1)
}
var b = debounce(a, 1000);
for (var i = 0; i < 500; i++) {
  b();
}
