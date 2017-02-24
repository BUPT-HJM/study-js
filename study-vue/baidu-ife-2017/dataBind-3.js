/**
 * Observer 观察data,监听其属性的读取与变化
 */
function Observer(data) {
  this.data = data; //存下当前data
  this.events = {}; //存下所有事件
  this.defineAllData(data);
}

/**
 * 递归修改属性
 */
Observer.prototype.defineAllData = function(obj) {
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) { //可枚举属性
      if (typeof obj[key] === 'object') { //这个key是obj，递归，往key加get、set
        new Observer(obj[key]);
      }
      this.defineGetSet(key, obj[key]); //对该obj的key加set、set
    }
  }
}

/**
 * 修改属性加get、set，监听其属性的读取与变化
 */
Observer.prototype.defineGetSet = function(key, val) {
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
        //console.log(self.events)
        self.$emit(key, newVal);
      }
      if (typeof newVal === 'object') { //这个key是obj，递归，往key加get、set
        return new Observer(newVal);
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
  if (typeof this.data[key] === 'object') {
    for (var i in this.data[key]) {
      console.log(i,'!!!!')
      this.$watch(i, listener);
    }
  }
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

let app2 = new Observer({
  name: {
    firstName: 'shaofeng',
    lastName: 'liang'
  },
  age: 25
});

app2.$watch('name', function(newName) {
  console.log('我的姓名发生了变化，可能是姓氏变了，也可能是名字变了。')
});

app2.data.name.firstName = 'hahaha';
// 输出：我的姓名发生了变化，可能是姓氏变了，也可能是名字变了。
app2.data.name.lastName = 'blablabla';
// 输出：我的姓名发生了变化，可能是姓氏变了，也可能是名字变了。

