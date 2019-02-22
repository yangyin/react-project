var Global = (typeof window !== 'undefined' ? window : global);

function localStorage() {
	return Global.localStorage
}

export function read(key) {
	return JSON.parse( localStorage().getItem(key) );
}

export function write(key, data) {
	return localStorage().setItem(key, JSON.stringify(data));
}

// function each(fn) {
// 	for (var i = localStorage().length - 1; i >= 0; i--) {
// 		var key = localStorage().key(i)
// 		fn(read(key), key)
// 	}
// }

export function remove(key) {
	return localStorage().removeItem(key)
}

export function clearAll() {
	return localStorage().clear()
}

