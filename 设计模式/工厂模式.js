var foodManager = {};
foodManager.foodA = function() {
	console.log('foodA')
}
foodManager.foodB = function() {
	console.log('foodB')
}
foodManager.factory = function(type) {
	return new foodManager[type];
}

foodManager.factory('foodA')
foodManager.factory('foodB')
