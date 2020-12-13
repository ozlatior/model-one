/*
 * Type Definitions for Model Properties
 *
 * The idea is to be able to define a type in SQL fashion, eg STRING(len)
 */

const TypeOne = require("type-one");

/*
 * Types are defined as functions that call the constructor of each
 * specific type class, eg STRING(len) will call the new TypeOne.STRING(len)
 */
const Types = {

	STRING:   (len) =>      new TypeOne.STRING(len),
	BINARY:   (len) =>      new TypeOne.BINARY(len),
	TEXT:     (tiny) =>     new TypeOne.TEXT(tiny),
	TINYTEXT: () =>         new TypeOne.TINYTEXT(),
	CITEXT:   () =>         new TypeOne.CITEXT(),
	INTEGER:  (max) =>      new TypeOne.INTEGER(max),
	BIGINT:   (max) =>      new TypeOne.BIGINT(max),
	FLOAT:    (max) =>      new TypeOne.FLOAT(max),
	REAL:     (max) =>      new TypeOne.REAL(max),
	DOUBLE:   (max) =>      new TypeOne.DOUBLE(max),
	DATETIME: () =>         new TypeOne.DATETIME(),
	DATEONLY: () =>         new TypeOne.DATEONLY(),
	TIMEONLY: () =>         new TypeOne.TIMEONLY(),
	BOOLEAN:  () =>         new TypeOne.BOOLEAN(),
	ENUM:     null,
	ARRAY:    null,
	JSON:     null,
	JSONB:    null,
	BLOB:     (tiny) =>     new TypeOne.BLOB(tiny),
	TINYBLOB: () =>         new TypeOne.TINYBLOB(),
	UUID:     () =>         new TypeOne.UUID(),
	CIDR:     () =>         new TypeOne.CIDR(),
	INET:     () =>         new TypeOne.INET(),
	MACADDR:  () =>         new TypeOne.MACADDR(),
	RANGE:    null,
	GEOMETRY: null

};

/*
 * Describes the call arguments for each type
 */
const Calls = {

	STRING:   { maxLen: 255 },
	BINARY:   { maxLen: 255 },
	TEXT:     {},
	TINYTEXT: {},
	CITEXT:   {},
	INTEGER:  { max: Infinity },
	BIGINT:   { max: Infinity },
	FLOAT:    { max: Infinity },
	REAL:     { max: Infinity },
	DOUBLE:   { max: Infinity },
	DATETIME: {},
	DATEONLY: {},
	TIMEONLY: {},
	BOOLEAN:  {},
	ENUM:     {},
	ARRAY:    {},
	JSON:     {},
	JSONB:    {},
	BLOB:     {},
	TINYBLOB: {},
	UUID:     {},
	CIDR:     {},
	INET:     {},
	MACADDR:  {},
	RANGE:    {},
	GEOMETRY: {}

};

/*
 * Gets a reconstructed string representation of the type call for a given type object
 * `type`: TypeOne object, an already constructed type
 * Returns a string containing the call to achieve the given type, eg "STRING(100)". Default argument
 * values will not be present in the arglist of returned call.
 */
const getCall = function (type) {
	let call = type.constructor.name;
	let ret = call + "(";
	let args = [];
	call = Calls[call];
	let lastDefault = -1;
	for (let i in call) {
		args.push(type[i]);
		if (lastDefault === -1 && type[i] === call[i])
			lastDefault = args.length-1;
		if (type[i] !== call[i])
			lastDefault = -1;
	}
	if (lastDefault !== -1)
		args = args.slice(0, lastDefault);
	ret += args.join(", ");
	ret += ")";
	return ret;
};

module.exports.Types = Types;
module.exports.Calls = Calls;
module.exports.getCall = getCall;
