const indentationArray = function (ind, depth) {
	if (depth === undefined)
		depth = 10;
	let ret = [];
	let str = "";
	let tab = "";
	for (let i=0; i<ind; i++)
		tab += " ";
	for (let i=0; i<depth; i++) {
		ret[i] = str;
		str += tab;
	}
	return ret;
};

/*
 * Return a key-value pair string (JSON-style)
 * `key`: string, name of the key
 * `value`: any type, value
 * `kq`: boolean, if true the key name is quoted (") in the returned string
 * `vq`: boolean, if true the value is quoted (") in the returned string
 * Returns a JSON-style string representation of the key-value pair
 */
const kvPair = function (key, value, kq, vq) {
	let ret = "";
	if (kq)
		ret += "\"";
	ret += key;
	if (kq)
		ret += "\"";
	ret += ": ";
	if (vq)
		ret += "\"";
	ret += value;
	if (vq)
		ret += "\"";
	return ret;
};

module.exports.indentationArray = indentationArray;
module.exports.kvPair = kvPair;
