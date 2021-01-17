const indentationArray = function (ind, depth) {
	if (depth === undefined)
		depth = 10;
	let ret = [];
	let str = "";
	let tab = "";
	if (typeof(ind) === "string")
		tab = ind;
	else if (typeof(ind) === "number")
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
	if (key) {
		if (kq)
			ret += "\"";
		ret += key;
		if (kq)
			ret += "\"";
		ret += ": ";
	}
	if (vq)
		ret += "\"";
	ret += value;
	if (vq)
		ret += "\"";
	return ret;
};

/*
 * Return a string representation of an object (JSON-style with options)
 * `obj`: object, input object
 * `options`: object, options for this operation
 * - `keyQuotes`: boolean, wether to place keys in quotes (default: `false`)
 * - `valueQuotes`: array of strings, types for which quotes should be applied for values
 *                  (default: `[ "string" ]`)
 * - `indentation`: string, sequence to use for indentation (default: four spaces)
 * - `newLine`: boolean, if `true` format object data using new line (default: `true`)
 * - `depth`: number, for `newLine` formatting, indentation depth to start from (default: 0)
 * - `arrayMaxLength`: number, for arrays max total length on one row before using multi-row (default: 80)
 */
const stringify = function (obj, options) {
	if (obj === null || obj === undefined)
		return "" + obj;
	if (options === undefined)
		options = {};
	let kqu = options.keyQuotes === undefined ? false : options.keyQuotes;
	let vqu = options.valueQuotes === undefined ? [ "string" ] : options.valueQuotes;
	let ind = options.indentation === undefined ? "    " : options.indentation;
	let nln = options.newLine === false ? " " : "\n";
	let dpt = options.depth === undefined ? 0 : options.depth;
	let aml = options.arrayMaxLength === undefined ? 80 : options.arrayMaxLength;
	let ia = indentationArray(ind);
	let opt = JSON.parse(JSON.stringify(options));
	opt.depth = dpt + 1;

	if (typeof(obj) !== "object")
		return kvPair(null, obj, kqu, vqu.indexOf(typeof(obj)) !== -1);

	let hasNewLine = false;
	let totalLength = 0;

	let ret = [];

	if (obj instanceof Array) {
		for (let i=0; i<obj.length; i++) {
			let value = obj[i];
			if (typeof(obj[i]) === "object")
				value = stringify(obj[i], opt);
			if (typeof(value) === "string" && value.indexOf("\n") !== -1)
				hasNewLine = true;
			totalLength += value.length;
			ret.push(kvPair(null, value, kqu, vqu.indexOf(typeof(obj[i])) !== -1));
		}
	}
	else {
		for (let i in obj) {
			let value = obj[i];
			if (typeof(obj[i]) === "object")
				value = stringify(obj[i], opt);
			ret.push(ia[dpt+1] + kvPair(i, value, kqu, vqu.indexOf(typeof(obj[i])) !== -1));
		}
	}

	// empty object or array, we simply return {} or []
	if (ret.length === 0) {
		if (obj instanceof Array)
			return "[]";
		return "{}";
	}

	if (obj instanceof Array) {
		if (hasNewLine || totalLength > aml) {
			ret = ret.map((row) => ia[dpt+1] + row);
			ret = "[" + nln + ret.join("," + nln) + nln + ia[dpt] + "]";
		}
		else
			ret = "[ " + ret.join(", ") + " ]"
	}
	else
		ret = "{" + nln + ret.join("," + nln) + nln + ia[dpt] + "}";

	return ret;
};

module.exports.indentationArray = indentationArray;
module.exports.kvPair = kvPair;
module.exports.stringify = stringify;
