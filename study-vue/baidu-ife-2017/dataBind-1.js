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
    }
  })
}


/**
 * 代码测试
 */

let app1 = new Observer({
  name: 'youngwind',
  age: 25
});

let app2 = new Observer({
  university: 'bupt',
  major: 'computer'
});

// 要实现的结果如下：
app1.data.name // 你访问了 name
app1.data.age = 100; // 你设置了 age，新的值为100
app2.data.university // 你访问了 university
app2.data.major = 'science' // 你设置了 major，新的值为 science
