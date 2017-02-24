/**
 * Observer 观察data,监听其属性的读取与变化
 */
function Observer(data, events) {
  this.data = data; //存下当前data
  this.events = events || {}; //存下所有事件
  this.defineAllData(data, this.events);
}


/**
 * 递归修改属性
 */
Observer.prototype.defineAllData = function(obj, events) {
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) { //可枚举属性
        if (typeof obj[key] === 'object') { //这个key是obj，递归，往key加get、set
          new Observer(obj[key], events);
        }
        this.defineGetSet(key, obj[key], events); //对该obj的key加set、set
      }
    }
  }
  /**
   * 修改属性加get、set，监听其属性的读取与变化
   */
Observer.prototype.defineGetSet = function(key, val, events) {
  var self = this;
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
        self.$emit(key, newVal);
      }
      Observer.tempArr = [];
      if (typeof newVal === 'object') { //这个key是obj，递归，往key加get、set
        return new Observer(newVal, events);
      }
    }
  })
}

/**
 * watch key放入事件数组
 */
Observer.prototype.$watch = function(key, listener) {
  if (!this.events[key]) {
    this.events[key] = [];
  }
  this.events[key].push(listener);
}

/**
 * emit 触发事件
 */
Observer.prototype.$emit = function() {
  var key = [].shift.call(arguments);
  var data = [].slice.call(arguments);
  if (!this.events[key] || this.events[key].length < 1) {
    return;
  }
  this.events[key].forEach(function(listener) {
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


let app2 = new Observer({
  name: 'youngwind',
  age: 25
});

// 你需要实现 $watch 这个 API
app2.$watch('age', function(age) {
  console.log(`我的年纪变了，现在已经是：${age}岁了`)
});

app2.data.age = 100; // 输出：'我的年纪变了，现在已经是100岁了'*/
