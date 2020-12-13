const assert = require("assert-one");

const Types = require("../src/types.js").Types;
const getCall = require("../src/types.js").getCall;

describe ("Data Type Object tests", () => {

	describe ("Type object function calls", () => {

		it ("Creates STRING type object with no arguments", () => {
			const t = Types.STRING();
			assert.equal(t.serialize(), 'STRING/STRING/string {"maxLen":255}');
		});

		it ("Creates STRING type object with specific arguments", () => {
			const t = Types.STRING(42);
			assert.equal(t.serialize(), 'STRING/STRING/string {"maxLen":42}');
		});

		it ("Creates BINARY type object with no arguments", () => {
			const t = Types.BINARY();
			assert.equal(t.serialize(), 'BINARY/BINARY/string {"maxLen":255}');
		});

		it ("Creates TEXT type object with no arguments", () => {
			const t = Types.TEXT();
			assert.equal(t.serialize(), 'TEXT/undefined/string {"maxLen":65535}');
		});

		it ("Creates TINYTEXT type object with no arguments", () => {
			const t = Types.TINYTEXT();
			assert.equal(t.serialize(), 'TINYTEXT/undefined/string {"maxLen":65535}');
		});

		it ("Creates CITEXT type object with no arguments", () => {
			const t = Types.CITEXT();
			assert.equal(t.serialize(), 'CITEXT/CITEXT/string {"maxLen":65535}');
		});

		it ("Creates INTEGER type object with no arguments", () => {
			const t = Types.INTEGER();
			assert.equal(t.serialize(), 'INTEGER/INTEGER/number {"min":null,"max":null,"mul":1}');
		});

		it ("Creates INTEGER type object with specific arguments", () => {
			const t = Types.INTEGER(100);
			assert.equal(t.serialize(), 'INTEGER/INTEGER/number {"min":-100,"max":100,"mul":1}');
		});

		it ("Creates BIGINT type object with no arguments", () => {
			const t = Types.BIGINT();
			assert.equal(t.serialize(), 'BIGINT/BIGINT/number {"min":null,"max":null,"mul":1}');
		});

		it ("Creates BIGINT type object with specific arguments", () => {
			const t = Types.BIGINT(10000000000);
			assert.equal(t.serialize(), 'BIGINT/BIGINT/number {"min":-10000000000,"max":10000000000,"mul":1}');
		});

		it ("Creates FLOAT type object with no arguments", () => {
			const t = Types.FLOAT();
			assert.equal(t.serialize(), 'FLOAT/FLOAT/number {"min":null,"max":null,"mul":1}');
		});

		it ("Creates FLOAT type object with specific arguments", () => {
			const t = Types.FLOAT(-1, 1);
			assert.equal(t.serialize(), 'FLOAT/FLOAT/number {"min":1,"max":-1,"mul":1}');
		});

		it ("Creates REAL type object with no arguments", () => {
			const t = Types.REAL();
			assert.equal(t.serialize(), 'REAL/REAL/number {"min":null,"max":null,"mul":1}');
		});

		it ("Creates REAL type object with specific arguments", () => {
			const t = Types.REAL(-10, 10);
			assert.equal(t.serialize(), 'REAL/REAL/number {"min":10,"max":-10,"mul":1}');
		});

		it ("Creates DOUBLE type object with no arguments", () => {
			const t = Types.DOUBLE();
			assert.equal(t.serialize(), 'DOUBLE/DOUBLE/number {"min":null,"max":null,"mul":1}');
		});

		it ("Creates DOUBLE type object with specific arguments", () => {
			const t = Types.DOUBLE(-0.5, 0.5);
			assert.equal(t.serialize(), 'DOUBLE/DOUBLE/number {"min":0.5,"max":-0.5,"mul":1}');
		});

		it ("Creates DATETIME type object with no arguments", () => {
			const t = Types.DATETIME();
			assert.equal(t.serialize(), 'DATETIME/DATETIME/date {"date":true,"time":true}');
		});

		it ("Creates DATEONLY type object with no arguments", () => {
			const t = Types.DATEONLY();
			assert.equal(t.serialize(), 'DATEONLY/DATEONLY/date {"date":true,"time":false}');
		});

		it ("Creates TIMEONLY type object with no arguments", () => {
			const t = Types.TIMEONLY();
			assert.equal(t.serialize(), 'TIMEONLY/TIMEONLY/date {"date":false,"time":true}');
		});

		it ("Creates BOOLEAN type object with no arguments", () => {
			const t = Types.BOOLEAN();
			assert.equal(t.serialize(), 'BOOLEAN/BOOLEAN/boolean');
		});

		it ("Creates BLOB type object with no arguments", () => {
			const t = Types.BLOB();
			assert.equal(t.serialize(), 'BLOB/undefined/string {"maxLen":65535}');
		});

		it ("Creates TINYBLOB type object with no arguments", () => {
			const t = Types.TINYBLOB();
			assert.equal(t.serialize(), 'TINYBLOB/undefined/string {"maxLen":65535}');
		});

		it ("Creates UUID type object with no arguments", () => {
			const t = Types.UUID();
			assert.equal(t.serialize(), 'UUID/UUID/string {"maxLen":128}');
		});

		it ("Creates CIDR type object with no arguments", () => {
			const t = Types.CIDR();
			assert.equal(t.serialize(), 'CIDR/CIDR/string {"maxLen":128}');
		});

		it ("Creates INET type object with no arguments", () => {
			const t = Types.INET();
			assert.equal(t.serialize(), 'INET/INET/string {"maxLen":128}');
		});

		it ("Creates MACADDR type object with no arguments", () => {
			const t = Types.MACADDR();
			assert.equal(t.serialize(), 'MACADDR/MACADDR/string {"maxLen":128}');
		});

	});

	describe ("getCall call string reconstruction", () => {

		it ("Returns STRING call object with no arguments", () => {
			const t = Types.STRING();
			assert.equal(getCall(t), "STRING()");
		});

		it ("Returns STRING call object with specific arguments", () => {
			const t = Types.STRING(42);
			assert.equal(getCall(t), "STRING(42)");
		});

		it ("Returns BINARY call object with no arguments", () => {
			const t = Types.BINARY();
			assert.equal(getCall(t), "BINARY()");
		});

		it ("Returns TEXT call object with no arguments", () => {
			const t = Types.TEXT();
			assert.equal(getCall(t), "TEXT()");
		});

		it ("Returns TINYTEXT call object with no arguments", () => {
			const t = Types.TINYTEXT();
			assert.equal(getCall(t), "TINYTEXT()");
		});

		it ("Returns CITEXT call object with no arguments", () => {
			const t = Types.CITEXT();
			assert.equal(getCall(t), "CITEXT()");
		});

		it ("Returns INTEGER call object with no arguments", () => {
			const t = Types.INTEGER();
			assert.equal(getCall(t), "INTEGER()");
		});

		it ("Returns INTEGER call object with specific arguments", () => {
			const t = Types.INTEGER(100);
			assert.equal(getCall(t), "INTEGER(100)");
		});

		it ("Returns BIGINT call object with no arguments", () => {
			const t = Types.BIGINT();
			assert.equal(getCall(t), "BIGINT()");
		});

		it ("Returns BIGINT call object with specific arguments", () => {
			const t = Types.BIGINT(10000000000);
			assert.equal(getCall(t), "BIGINT(10000000000)");
		});

		it ("Returns FLOAT call object with no arguments", () => {
			const t = Types.FLOAT();
			assert.equal(getCall(t), "FLOAT()");
		});

		it ("Returns FLOAT call object with specific arguments", () => {
			const t = Types.FLOAT(1);
			assert.equal(getCall(t), "FLOAT(1)");
		});

		it ("Returns REAL call object with no arguments", () => {
			const t = Types.REAL();
			assert.equal(getCall(t), "REAL()");
		});

		it ("Returns REAL call object with specific arguments", () => {
			const t = Types.REAL(10);
			assert.equal(getCall(t), "REAL(10)");
		});

		it ("Returns DOUBLE call object with no arguments", () => {
			const t = Types.DOUBLE();
			assert.equal(getCall(t), "DOUBLE()");
		});

		it ("Returns DOUBLE call object with specific arguments", () => {
			const t = Types.DOUBLE(0.5);
			assert.equal(getCall(t), "DOUBLE(0.5)");
		});

		it ("Returns DATETIME call object with no arguments", () => {
			const t = Types.DATETIME();
			assert.equal(getCall(t), "DATETIME()");
		});

		it ("Returns DATEONLY call object with no arguments", () => {
			const t = Types.DATEONLY();
			assert.equal(getCall(t), "DATEONLY()");
		});

		it ("Returns TIMEONLY call object with no arguments", () => {
			const t = Types.TIMEONLY();
			assert.equal(getCall(t), "TIMEONLY()");
		});

		it ("Returns BOOLEAN call object with no arguments", () => {
			const t = Types.BOOLEAN();
			assert.equal(getCall(t), "BOOLEAN()");
		});

		it ("Returns BLOB call object with no arguments", () => {
			const t = Types.BLOB();
			assert.equal(getCall(t), "BLOB()");
		});

		it ("Returns TINYBLOB call object with no arguments", () => {
			const t = Types.TINYBLOB();
			assert.equal(getCall(t), "TINYBLOB()");
		});

		it ("Returns UUID call object with no arguments", () => {
			const t = Types.UUID();
			assert.equal(getCall(t), "UUID()");
		});

		it ("Returns CIDR call object with no arguments", () => {
			const t = Types.CIDR();
			assert.equal(getCall(t), "CIDR()");
		});

		it ("Returns INET call object with no arguments", () => {
			const t = Types.INET();
			assert.equal(getCall(t), "INET()");
		});

		it ("Returns MACADDR call object with no arguments", () => {
			const t = Types.MACADDR();
			assert.equal(getCall(t), "MACADDR()");
		});

	});

});
