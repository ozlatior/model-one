const assert = require("assert-one");

const Types = require("../src/types.js").Types;
const getCall = require("../src/types.js").getCall;

describe ("Data Type Object tests", () => {

	describe ("Type object function calls", () => {

/* MACRO.HEADER 1 */
const T = require("./src/types.js");

const ARGS = {
	STRING: [ 42 ],
	INTEGER: [ 100 ],
	BIGINT: [ 1e10 ],
	FLOAT: [ -1, 1 ],
	REAL: [ -10, 10 ],
	DOUBLE: [ -1/2, 1/2 ]
};

const DETAILS_STRING = function(o) {
	let m = o.serialize().match(/ \{.*\}/g);
	if (m === null)
		return "";
	return m[0];
};

const TOKENS = (i) => {
	if (T.Types[i] === null)
		return [];
	let o = T.Types[i]();
	let ret = [ {
		"1": i,
		"2": "",
		"3": o.name,
		"4": o.type,
		"5": DETAILS_STRING(o),
		"6": "no arguments"
	} ];
	if (ARGS[i]) {
		o = T.Types[i].apply(null, ARGS[i]);
		ret.push({
			"1": i,
			"2": ARGS[i].join(", "),
			"3": o.name,
			"4": o.type,
			"5": DETAILS_STRING(o),
			"6": "specific arguments"
		});
	}
	return ret;
};

const RANGES = [
	{ keys: T.Types }
];
/* MACRO.HEADER 1 */
/* MACRO.BODY 1
		it ("Creates %1% type object with %6%", () => {
			const t = Types.%1%(%2%);
			assert.equal(t.serialize(), '%1%/%3%/%4%%5%');
		});

*/
	});

	describe ("getCall call string reconstruction", () => {

/* MACRO.HEADER 2 */
const T = require("./src/types.js");

const ARGS = {
	STRING: [ 42 ],
	INTEGER: [ 100 ],
	BIGINT: [ 1e10 ],
	FLOAT: [ 1 ],
	REAL: [ 10 ],
	DOUBLE: [ 1/2 ]
};

const DETAILS_STRING = function(o) {
	let m = o.serialize().match(/ \{.*\}/g);
	if (m === null)
		return "";
	return m[0];
};

const TOKENS = (i) => {
	if (T.Types[i] === null)
		return [];
	let o = T.Types[i]();
	let ret = [ {
		"1": i,
		"2": "",
		"3": o.name,
		"4": o.type,
		"5": DETAILS_STRING(o),
		"6": "no arguments"
	} ];
	if (ARGS[i]) {
		o = T.Types[i].apply(null, ARGS[i]);
		ret.push({
			"1": i,
			"2": ARGS[i].join(", "),
			"3": o.name,
			"4": o.type,
			"5": DETAILS_STRING(o),
			"6": "specific arguments"
		});
	}
	return ret;
};

const RANGES = [
	{ keys: T.Types }
];
/* MACRO.HEADER 2 */
/* MACRO.BODY 2
		it ("Returns %1% call object with %6%", () => {
			const t = Types.%1%(%2%);
			assert.equal(getCall(t), "%1%(%2%)");
		});

*/
	});

});
