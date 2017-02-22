var EventEmitter = {
  events: {},
  on: function(event, listener) {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].push(listener);
  },
  emit: function(event, data) {
    if (!this.events[event] || this.events[event].length < 1) {
      return;
    }
    this.events[event].forEach(function(listener) {
      listener(data || {});
    })

  }
}
EventEmitter.on('console', function(data) {
  console.log(data)
})
EventEmitter.on('console', function(data) {
  console.log(data)
})
EventEmitter.emit('console', '发布订阅！')
