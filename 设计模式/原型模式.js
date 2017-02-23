var a = {
	name: '123',
	init: function(name) {
		this.name = name;
	}
}

var b = Object.create(a);
console.log(b)
console.log(b.name)


function c() {
	function F() {

	}
	F.prototype = a;
	var f = new F();
	f.init('567')
	return f;
}
console.log(c().name)
