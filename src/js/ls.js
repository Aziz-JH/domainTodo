/**
 * store.js wrapper
 */
(function() {
	var ls = {};
	var arrCallbacks = [];
	var callCallbacks = function(key, re, me) {
		for (var i = 0, len = arrCallbacks.length; i < len; i++) {
			var callback = arrCallbacks[i];
			if(typeof callback[0] == 'undefined' || !callback[0]) {
				callback[1](re, me);
				continue;
			}
			if(key == callback[0]) {
				callback[1](re, me);
			}
		}
	};
	ls.set = function(key, val) {
		var re = store.set(key, val);
		callCallbacks(key, re, 'set');
		return re;
	};
	ls.get = function(key) {
		return store.get(key);
		//callCallbacks(key, re, 'get');
	};
	ls.remove = function(key) {
		var re = store.remove(key);
		callCallbacks(key, re, 'remove');
		return re;
	};
	ls.clear = function() {
		var re = store.clear();
		callCallbacks(key, re, 'clear');
		return re;
	};

	ls.callback = function(key, callback) {
		if(arrCallbacks.indexOf([key, callback]) != -1) {
			return;
		}
		arrCallbacks.push([key, callback]);
	};
	addEvent(window, 'storage', function (event) {
		if(typeof event.key == 'undefined') return;
		callCallbacks(event.key, store.get(event.key), 'change');
	});
	window.ls = ls;
}());