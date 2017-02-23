var re = new RegExp('^[a-zA-Z][a-zA-Z0-9_]{9,20}$')
console.log(re.test('ABV6465456'))
console.log(re.test('5556465456'))

String.prototype.trim = function() {
	return this.replace(/(^\s*)|(\s*$)/g,'')
}
console.log('  fsda    '.trim())
