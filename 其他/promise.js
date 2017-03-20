// http://tech.meituan.com/promise-insight.html
function MyPromise(fn) {
  var state = 'pending',
    value = null,
    deferreds = [];

  this.then = function(onFulfilled, onRejected) {
    return new MyPromise(function(resolve, reject) {
      handle({
        onFulfilled: onFulfilled || null,
        onRejected: onRejected || null,
        resolve: resolve,
        reject: reject
      });
    });
  };

  function handle(deferred) {
    if (state === 'pending') {
      deferreds.push(deferred);
      return;
    }

    var cb = state === 'fulfilled' ? deferred.onFulfilled : deferred.onRejected,
      ret;
    if (cb === null) {
      cb = state === 'fulfilled' ? deferred.resolve : deferred.reject;
      cb(value);
      return;
    }
    try {
      ret = cb(value);
      deferred.resolve(ret);
    } catch (e) {
      deferred.reject(e);
    }
  }

  function resolve(newValue) {
    if (newValue && (typeof newValue === 'object' || typeof newValue === 'function')) {
      var then = newValue.then;
      if (typeof then === 'function') {
        then.call(newValue, resolve, reject);
        return;
      }
    }
    state = 'fulfilled';
    value = newValue;
    finale();
  }

  function reject(reason) {
    state = 'rejected';
    value = reason;
    finale();
  }

  function finale() {
    setTimeout(function() {
      deferreds.forEach(function(deferred) {
        handle(deferred);
      });
    }, 0);
  }

  fn(resolve, reject);
}




function getName() {
  return new MyPromise(function(resolve, reject) {
    console.log("get name...");
    setTimeout(function() {
      resolve("hjm");
    }, 1000);
  })
}

function getName2() {
  return new MyPromise(function(resolve, reject) {
    console.log("get name2...");
    setTimeout(function() {
      reject("error");
    }, 1000);
  })
}


getName().then(function(name) {
  console.log(name);
}).then(getName2).then(function(name) {
  console.log(name);
}, function(err) {
  console.log(err);
});
