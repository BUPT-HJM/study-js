/**
 * Observer 观察data,监听其属性的读取与变化
 */
function Observer(data) {
  this.data = data; //存下当前data
  this.defineAllData(data);
}

/**
 * 递归修改属性
 */
Observer.prototype.defineAllData = function(obj) {
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) { //可枚举属性
      if (typeof obj[key] === 'object') { //这个key是obj，递归，往key加get、set
        return new Observer(obj[key]);
      }
      this.defineGetSet(key, obj[key]); //对该obj的key加set、set
    }
  }
}

/**
 * 修改属性加get、set，监听其属性的读取与变化
 */
Observer.prototype.defineGetSet = function(key, val) {
  Object.defineProperty(this.data, key, {
    enumerable: true,
    configurable: true,
    get: function() {
      console.log('你访问了', key);
      return val;
    },
    set: function(newVal) {
      console.log('你设置了', key, ',新的值为', newVal);
      if (newVal !== val) {
        val = newVal;
      }
      if (typeof newVal === 'object') { //这个key是obj，递归，往key加get、set
        return new Observer(newVal);
      }
    }
  })
}



/**
 *
 */
function EventEmitter() {
  this.events = {}
}

EventEmitter.prototype.on = function(event, listener) {
  if (!this.events[event]) {
    this.events[event] = [];
  }
  this.events[event].push(listener);
}

EventEmitter.prototype.emit = function(event, data) {
  if (!this.events[event] || this.events[event].length < 1) {
    return;
  }
  this.events[event].forEach(function(listener) {
    listener(data || {});
  })
}

/**
 * 代码测试
 */

let app1 = new Observer({
  name: 'youngwind',
  age: 25
});

app1.data.name = {
  lastName: 'liang',
  firstName: 'shaofeng'
};

app1.data.name.lastName;
// 这里还需要输出 '你访问了 lastName '
app1.data.name.firstName = 'lalala';
// 这里还需要输出 '你设置了firstName, 新的值为 lalala'




/*
 let app1 = new Observer({
         name: 'youngwind',
         age: 25
 });

 // 你需要实现 $watch 这个 API
 app1.$watch('age', function(age) {
         console.log(`我的年纪变了，现在已经是：${age}岁了`)
 });

 app1.data.age = 100; // 输出：'我的年纪变了，现在已经是100岁了'*/
