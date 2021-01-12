const assert = require("assert-one");

const Attribute = require("../src/attribute.js");
const Types = require("../src/types.js").Types;
const T1 = require("type-one");

describe ("Attribute tests", () => {

	describe ("constructor", () => {

		it ("Creates valid attributes object from type object", () => {
			let atr = new Attribute(Types.STRING());
			assert.fieldValues(atr.toMinimalTemplate(), {
				type: "STRING()"
			});
		});

		it ("Creates valid attributes object with minimal template", () => {
			let atr = new Attribute({
				type: Types.STRING()
			});
			assert.fieldValues(atr.toMinimalTemplate(), {
				type: "STRING()"
			});
		});

		it ("Creates valid attributes object with complete template", () => {
			let atr = new Attribute({
				name: "foo",
				type: Types.STRING(42),
				notNull: true,
				primary: true,
				unique: true,
				check: "foo.length > 10",
				foreign: "foo_table",
				enumerable: false,
				comparable: false,
				searchable: false,
				fragmentable: false,
				absentValue: ""
			});
			assert.fieldValues(atr.toCompleteTemplate(), {
				name: "foo",
				type: "STRING(42)",
				notNull: true,
				primary: true,
				unique: true,
				check: "foo.length > 10",
				foreign: "foo_table",
				enumerable: false,
				comparable: false,
				searchable: false,
				fragmentable: false,
				absentValue: ""
			});
		});

	});

	describe ("Template output", () => {

		it ("Produces STRING minimal template from only type field, internal format", () => {
			let atr = new Attribute({
				type: Types.STRING()
			});
			let res = atr.toMinimalTemplate("internal");
			assert.fieldValues(res, {
				type: 'STRING/STRING/string {"maxLen":255}'
			});
			assert.allowedFields(res, [ 'type', 'type' ]);
		});

		it ("Produces STRING minimal template from only type field, explicit format", () => {
			let atr = new Attribute({
				type: Types.STRING()
			});
			let res = atr.toMinimalTemplate("explicit");
			assert.fieldValues(res, {
				type: 'STRING()'
			});
			assert.allowedFields(res, [ 'type', 'type' ]);
		});

		it ("Produces STRING minimal template from only type field, object format", () => {
			let atr = new Attribute({
				type: Types.STRING()
			});
			let res = atr.toMinimalTemplate("object");
			assert.fieldValues(res, {
				type: 'Types.STRING()'
			});
			assert.allowedFields(res, [ 'type', 'type' ]);
		});

		it ("Produces STRING minimal template from some defined fields, internal format", () => {
			let atr = new Attribute({
				name: 'foo',
				type: Types.STRING(),
				notNull: true,
				primary: false,
				check: 'foo.length > 10',
				enumerable: false,
				comparable: true
			});
			let res = atr.toMinimalTemplate("internal");
			assert.fieldValues(res, {
				name: 'foo',
				type: 'STRING/STRING/string {"maxLen":255}',
				notNull: true,
				check: 'foo.length > 10',
				enumerable: false
			});
			assert.allowedFields(res, [ 'name', 'type', 'notNull', 'check', 'enumerable', 'type' ]);
		});

		it ("Produces STRING minimal template from some defined fields, explicit format", () => {
			let atr = new Attribute({
				name: 'foo',
				type: Types.STRING(),
				notNull: true,
				primary: false,
				check: 'foo.length > 10',
				enumerable: false,
				comparable: true
			});
			let res = atr.toMinimalTemplate("explicit");
			assert.fieldValues(res, {
				name: 'foo',
				type: 'STRING()',
				notNull: true,
				check: 'foo.length > 10',
				enumerable: false
			});
			assert.allowedFields(res, [ 'name', 'type', 'notNull', 'check', 'enumerable', 'type' ]);
		});

		it ("Produces STRING minimal template from some defined fields, object format", () => {
			let atr = new Attribute({
				name: 'foo',
				type: Types.STRING(),
				notNull: true,
				primary: false,
				check: 'foo.length > 10',
				enumerable: false,
				comparable: true
			});
			let res = atr.toMinimalTemplate("object");
			assert.fieldValues(res, {
				name: 'foo',
				type: 'Types.STRING()',
				notNull: true,
				check: 'foo.length > 10',
				enumerable: false
			});
			assert.allowedFields(res, [ 'name', 'type', 'notNull', 'check', 'enumerable', 'type' ]);
		});

		it ("Produces STRING minimal template from all defined fields, internal format", () => {
			let atr = new Attribute({
				name: 'foo',
				type: Types.STRING(),
				notNull: true,
				primary: false,
				unique: true,
				check: 'foo.length > 10',
				foreign: 'foo_table',
				enumerable: false,
				comparable: true,
				searchable: false,
				fragmentable: true,
				absentValue: ""
			});
			let res = atr.toMinimalTemplate("internal");
			assert.fieldValues(res, {
				name: 'foo',
				type: 'STRING/STRING/string {"maxLen":255}',
				notNull: true,
				unique: true,
				check: 'foo.length > 10',
				foreign: 'foo_table',
				enumerable: false,
				searchable: false,
				absentValue: ""
			});
			assert.allowedFields(res, [ 'name', 'type', 'notNull', 'unique', 'check', 'foreign',
				'enumerable', 'searchable', 'absentValue', 'type' ]);
		});

		it ("Produces STRING minimal template from all defined fields, explicit format", () => {
			let atr = new Attribute({
				name: 'foo',
				type: Types.STRING(),
				notNull: true,
				primary: false,
				unique: true,
				check: 'foo.length > 10',
				foreign: 'foo_table',
				enumerable: false,
				comparable: true,
				searchable: false,
				fragmentable: true,
				absentValue: ""
			});
			let res = atr.toMinimalTemplate("explicit");
			assert.fieldValues(res, {
				name: 'foo',
				type: 'STRING()',
				notNull: true,
				unique: true,
				check: 'foo.length > 10',
				foreign: 'foo_table',
				enumerable: false,
				searchable: false,
				absentValue: ""
			});
			assert.allowedFields(res, [ 'name', 'type', 'notNull', 'unique', 'check', 'foreign',
				'enumerable', 'searchable', 'absentValue', 'type' ]);
		});

		it ("Produces STRING minimal template from all defined fields, object format", () => {
			let atr = new Attribute({
				name: 'foo',
				type: Types.STRING(),
				notNull: true,
				primary: false,
				unique: true,
				check: 'foo.length > 10',
				foreign: 'foo_table',
				enumerable: false,
				comparable: true,
				searchable: false,
				fragmentable: true,
				absentValue: ""
			});
			let res = atr.toMinimalTemplate("object");
			assert.fieldValues(res, {
				name: 'foo',
				type: 'Types.STRING()',
				notNull: true,
				unique: true,
				check: 'foo.length > 10',
				foreign: 'foo_table',
				enumerable: false,
				searchable: false,
				absentValue: ""
			});
			assert.allowedFields(res, [ 'name', 'type', 'notNull', 'unique', 'check', 'foreign',
				'enumerable', 'searchable', 'absentValue', 'type' ]);
		});

		it ("Produces STRING complete template from only type field, internal format", () => {
			let atr = new Attribute({
				type: Types.STRING()
			});
			let res = atr.toCompleteTemplate("internal");
			assert.fieldValues(res, {
				type: 'STRING/STRING/string {"maxLen":255}',
				notNull: false,
				primary: false,
				unique: false,
				check: null,
				foreign: null,
				enumerable: true,
				comparable: true,
				searchable: true,
				fragmentable: true,
				absentValue: null
			});
			assert.allowedFields(res, [ 'type', 'notNull', 'primary', 'unique', 'check', 'foreign',
				'enumerable', 'comparable', 'searchable', 'fragmentable', 'absentValue', 'type' ]);
		});

		it ("Produces STRING complete template from only type field, explicit format", () => {
			let atr = new Attribute({
				type: Types.STRING()
			});
			let res = atr.toCompleteTemplate("explicit");
			assert.fieldValues(res, {
				type: 'STRING()',
				notNull: false,
				primary: false,
				unique: false,
				check: null,
				foreign: null,
				enumerable: true,
				comparable: true,
				searchable: true,
				fragmentable: true,
				absentValue: null
			});
			assert.allowedFields(res, [ 'type', 'notNull', 'primary', 'unique', 'check', 'foreign',
				'enumerable', 'comparable', 'searchable', 'fragmentable', 'absentValue', 'type' ]);
		});

		it ("Produces STRING complete template from only type field, object format", () => {
			let atr = new Attribute({
				type: Types.STRING()
			});
			let res = atr.toCompleteTemplate("object");
			assert.fieldValues(res, {
				type: 'Types.STRING()',
				notNull: false,
				primary: false,
				unique: false,
				check: null,
				foreign: null,
				enumerable: true,
				comparable: true,
				searchable: true,
				fragmentable: true,
				absentValue: null
			});
			assert.allowedFields(res, [ 'type', 'notNull', 'primary', 'unique', 'check', 'foreign',
				'enumerable', 'comparable', 'searchable', 'fragmentable', 'absentValue', 'type' ]);
		});

		it ("Produces STRING complete template from some defined fields, internal format", () => {
			let atr = new Attribute({
				name: 'foo',
				type: Types.STRING(),
				notNull: true,
				primary: false,
				check: 'foo.length > 10',
				enumerable: false,
				comparable: true
			});
			let res = atr.toCompleteTemplate("internal");
			assert.fieldValues(res, {
				name: 'foo',
				type: 'STRING/STRING/string {"maxLen":255}',
				notNull: true,
				primary: false,
				unique: false,
				check: 'foo.length > 10',
				foreign: null,
				enumerable: false,
				comparable: true,
				searchable: true,
				fragmentable: true,
				absentValue: null
			});
			assert.allowedFields(res, [ 'name', 'type', 'notNull', 'primary', 'unique', 'check',
				'foreign', 'enumerable', 'comparable', 'searchable', 'fragmentable', 'absentValue',
				'type' ]);
		});

		it ("Produces STRING complete template from some defined fields, explicit format", () => {
			let atr = new Attribute({
				name: 'foo',
				type: Types.STRING(),
				notNull: true,
				primary: false,
				check: 'foo.length > 10',
				enumerable: false,
				comparable: true
			});
			let res = atr.toCompleteTemplate("explicit");
			assert.fieldValues(res, {
				name: 'foo',
				type: 'STRING()',
				notNull: true,
				primary: false,
				unique: false,
				check: 'foo.length > 10',
				foreign: null,
				enumerable: false,
				comparable: true,
				searchable: true,
				fragmentable: true,
				absentValue: null
			});
			assert.allowedFields(res, [ 'name', 'type', 'notNull', 'primary', 'unique', 'check',
				'foreign', 'enumerable', 'comparable', 'searchable', 'fragmentable', 'absentValue',
				'type' ]);
		});

		it ("Produces STRING complete template from some defined fields, object format", () => {
			let atr = new Attribute({
				name: 'foo',
				type: Types.STRING(),
				notNull: true,
				primary: false,
				check: 'foo.length > 10',
				enumerable: false,
				comparable: true
			});
			let res = atr.toCompleteTemplate("object");
			assert.fieldValues(res, {
				name: 'foo',
				type: 'Types.STRING()',
				notNull: true,
				primary: false,
				unique: false,
				check: 'foo.length > 10',
				foreign: null,
				enumerable: false,
				comparable: true,
				searchable: true,
				fragmentable: true,
				absentValue: null
			});
			assert.allowedFields(res, [ 'name', 'type', 'notNull', 'primary', 'unique', 'check',
				'foreign', 'enumerable', 'comparable', 'searchable', 'fragmentable', 'absentValue',
				'type' ]);
		});

		it ("Produces STRING complete template from all defined fields, internal format", () => {
			let atr = new Attribute({
				name: 'foo',
				type: Types.STRING(),
				notNull: true,
				primary: false,
				unique: true,
				check: 'foo.length > 10',
				foreign: 'foo_table',
				enumerable: false,
				comparable: true,
				searchable: false,
				fragmentable: true,
				absentValue: ""
			});
			let res = atr.toCompleteTemplate("internal");
			assert.fieldValues(res, {
				name: 'foo',
				type: 'STRING/STRING/string {"maxLen":255}',
				notNull: true,
				primary: false,
				unique: true,
				check: 'foo.length > 10',
				foreign: 'foo_table',
				enumerable: false,
				comparable: true,
				searchable: false,
				fragmentable: true,
				absentValue: ""
			});
			assert.allowedFields(res, [ 'name', 'type', 'notNull', 'primary', 'unique', 'check',
				'foreign', 'enumerable', 'comparable', 'searchable', 'fragmentable', 'absentValue',
				'type' ]);
		});

		it ("Produces STRING complete template from all defined fields, explicit format", () => {
			let atr = new Attribute({
				name: 'foo',
				type: Types.STRING(),
				notNull: true,
				primary: false,
				unique: true,
				check: 'foo.length > 10',
				foreign: 'foo_table',
				enumerable: false,
				comparable: true,
				searchable: false,
				fragmentable: true,
				absentValue: ""
			});
			let res = atr.toCompleteTemplate("explicit");
			assert.fieldValues(res, {
				name: 'foo',
				type: 'STRING()',
				notNull: true,
				primary: false,
				unique: true,
				check: 'foo.length > 10',
				foreign: 'foo_table',
				enumerable: false,
				comparable: true,
				searchable: false,
				fragmentable: true,
				absentValue: ""
			});
			assert.allowedFields(res, [ 'name', 'type', 'notNull', 'primary', 'unique', 'check',
				'foreign', 'enumerable', 'comparable', 'searchable', 'fragmentable', 'absentValue',
				'type' ]);
		});

		it ("Produces STRING complete template from all defined fields, object format", () => {
			let atr = new Attribute({
				name: 'foo',
				type: Types.STRING(),
				notNull: true,
				primary: false,
				unique: true,
				check: 'foo.length > 10',
				foreign: 'foo_table',
				enumerable: false,
				comparable: true,
				searchable: false,
				fragmentable: true,
				absentValue: ""
			});
			let res = atr.toCompleteTemplate("object");
			assert.fieldValues(res, {
				name: 'foo',
				type: 'Types.STRING()',
				notNull: true,
				primary: false,
				unique: true,
				check: 'foo.length > 10',
				foreign: 'foo_table',
				enumerable: false,
				comparable: true,
				searchable: false,
				fragmentable: true,
				absentValue: ""
			});
			assert.allowedFields(res, [ 'name', 'type', 'notNull', 'primary', 'unique', 'check',
				'foreign', 'enumerable', 'comparable', 'searchable', 'fragmentable', 'absentValue',
				'type' ]);
		});

		it ("Produces BINARY minimal template from only type field, internal format", () => {
			let atr = new Attribute({
				type: Types.BINARY()
			});
			let res = atr.toMinimalTemplate("internal");
			assert.fieldValues(res, {
				type: 'BINARY/BINARY/string {"maxLen":255}'
			});
			assert.allowedFields(res, [ 'type', 'type' ]);
		});

		it ("Produces BINARY minimal template from only type field, explicit format", () => {
			let atr = new Attribute({
				type: Types.BINARY()
			});
			let res = atr.toMinimalTemplate("explicit");
			assert.fieldValues(res, {
				type: 'BINARY()'
			});
			assert.allowedFields(res, [ 'type', 'type' ]);
		});

		it ("Produces BINARY minimal template from only type field, object format", () => {
			let atr = new Attribute({
				type: Types.BINARY()
			});
			let res = atr.toMinimalTemplate("object");
			assert.fieldValues(res, {
				type: 'Types.BINARY()'
			});
			assert.allowedFields(res, [ 'type', 'type' ]);
		});

		it ("Produces BINARY minimal template from some defined fields, internal format", () => {
			let atr = new Attribute({
				name: 'foo',
				type: Types.BINARY(),
				notNull: true,
				primary: false,
				check: 'foo.length > 10',
				enumerable: false,
				comparable: true
			});
			let res = atr.toMinimalTemplate("internal");
			assert.fieldValues(res, {
				name: 'foo',
				type: 'BINARY/BINARY/string {"maxLen":255}',
				notNull: true,
				check: 'foo.length > 10',
				enumerable: false
			});
			assert.allowedFields(res, [ 'name', 'type', 'notNull', 'check', 'enumerable', 'type' ]);
		});

		it ("Produces BINARY minimal template from some defined fields, explicit format", () => {
			let atr = new Attribute({
				name: 'foo',
				type: Types.BINARY(),
				notNull: true,
				primary: false,
				check: 'foo.length > 10',
				enumerable: false,
				comparable: true
			});
			let res = atr.toMinimalTemplate("explicit");
			assert.fieldValues(res, {
				name: 'foo',
				type: 'BINARY()',
				notNull: true,
				check: 'foo.length > 10',
				enumerable: false
			});
			assert.allowedFields(res, [ 'name', 'type', 'notNull', 'check', 'enumerable', 'type' ]);
		});

		it ("Produces BINARY minimal template from some defined fields, object format", () => {
			let atr = new Attribute({
				name: 'foo',
				type: Types.BINARY(),
				notNull: true,
				primary: false,
				check: 'foo.length > 10',
				enumerable: false,
				comparable: true
			});
			let res = atr.toMinimalTemplate("object");
			assert.fieldValues(res, {
				name: 'foo',
				type: 'Types.BINARY()',
				notNull: true,
				check: 'foo.length > 10',
				enumerable: false
			});
			assert.allowedFields(res, [ 'name', 'type', 'notNull', 'check', 'enumerable', 'type' ]);
		});

		it ("Produces BINARY minimal template from all defined fields, internal format", () => {
			let atr = new Attribute({
				name: 'foo',
				type: Types.BINARY(),
				notNull: true,
				primary: false,
				unique: true,
				check: 'foo.length > 10',
				foreign: 'foo_table',
				enumerable: false,
				comparable: true,
				searchable: false,
				fragmentable: true,
				absentValue: ""
			});
			let res = atr.toMinimalTemplate("internal");
			assert.fieldValues(res, {
				name: 'foo',
				type: 'BINARY/BINARY/string {"maxLen":255}',
				notNull: true,
				unique: true,
				check: 'foo.length > 10',
				foreign: 'foo_table',
				enumerable: false,
				searchable: false,
				absentValue: ""
			});
			assert.allowedFields(res, [ 'name', 'type', 'notNull', 'unique', 'check', 'foreign',
				'enumerable', 'searchable', 'absentValue', 'type' ]);
		});

		it ("Produces BINARY minimal template from all defined fields, explicit format", () => {
			let atr = new Attribute({
				name: 'foo',
				type: Types.BINARY(),
				notNull: true,
				primary: false,
				unique: true,
				check: 'foo.length > 10',
				foreign: 'foo_table',
				enumerable: false,
				comparable: true,
				searchable: false,
				fragmentable: true,
				absentValue: ""
			});
			let res = atr.toMinimalTemplate("explicit");
			assert.fieldValues(res, {
				name: 'foo',
				type: 'BINARY()',
				notNull: true,
				unique: true,
				check: 'foo.length > 10',
				foreign: 'foo_table',
				enumerable: false,
				searchable: false,
				absentValue: ""
			});
			assert.allowedFields(res, [ 'name', 'type', 'notNull', 'unique', 'check', 'foreign',
				'enumerable', 'searchable', 'absentValue', 'type' ]);
		});

		it ("Produces BINARY minimal template from all defined fields, object format", () => {
			let atr = new Attribute({
				name: 'foo',
				type: Types.BINARY(),
				notNull: true,
				primary: false,
				unique: true,
				check: 'foo.length > 10',
				foreign: 'foo_table',
				enumerable: false,
				comparable: true,
				searchable: false,
				fragmentable: true,
				absentValue: ""
			});
			let res = atr.toMinimalTemplate("object");
			assert.fieldValues(res, {
				name: 'foo',
				type: 'Types.BINARY()',
				notNull: true,
				unique: true,
				check: 'foo.length > 10',
				foreign: 'foo_table',
				enumerable: false,
				searchable: false,
				absentValue: ""
			});
			assert.allowedFields(res, [ 'name', 'type', 'notNull', 'unique', 'check', 'foreign',
				'enumerable', 'searchable', 'absentValue', 'type' ]);
		});

		it ("Produces BINARY complete template from only type field, internal format", () => {
			let atr = new Attribute({
				type: Types.BINARY()
			});
			let res = atr.toCompleteTemplate("internal");
			assert.fieldValues(res, {
				type: 'BINARY/BINARY/string {"maxLen":255}',
				notNull: false,
				primary: false,
				unique: false,
				check: null,
				foreign: null,
				enumerable: true,
				comparable: true,
				searchable: true,
				fragmentable: true,
				absentValue: null
			});
			assert.allowedFields(res, [ 'type', 'notNull', 'primary', 'unique', 'check', 'foreign',
				'enumerable', 'comparable', 'searchable', 'fragmentable', 'absentValue', 'type' ]);
		});

		it ("Produces BINARY complete template from only type field, explicit format", () => {
			let atr = new Attribute({
				type: Types.BINARY()
			});
			let res = atr.toCompleteTemplate("explicit");
			assert.fieldValues(res, {
				type: 'BINARY()',
				notNull: false,
				primary: false,
				unique: false,
				check: null,
				foreign: null,
				enumerable: true,
				comparable: true,
				searchable: true,
				fragmentable: true,
				absentValue: null
			});
			assert.allowedFields(res, [ 'type', 'notNull', 'primary', 'unique', 'check', 'foreign',
				'enumerable', 'comparable', 'searchable', 'fragmentable', 'absentValue', 'type' ]);
		});

		it ("Produces BINARY complete template from only type field, object format", () => {
			let atr = new Attribute({
				type: Types.BINARY()
			});
			let res = atr.toCompleteTemplate("object");
			assert.fieldValues(res, {
				type: 'Types.BINARY()',
				notNull: false,
				primary: false,
				unique: false,
				check: null,
				foreign: null,
				enumerable: true,
				comparable: true,
				searchable: true,
				fragmentable: true,
				absentValue: null
			});
			assert.allowedFields(res, [ 'type', 'notNull', 'primary', 'unique', 'check', 'foreign',
				'enumerable', 'comparable', 'searchable', 'fragmentable', 'absentValue', 'type' ]);
		});

		it ("Produces BINARY complete template from some defined fields, internal format", () => {
			let atr = new Attribute({
				name: 'foo',
				type: Types.BINARY(),
				notNull: true,
				primary: false,
				check: 'foo.length > 10',
				enumerable: false,
				comparable: true
			});
			let res = atr.toCompleteTemplate("internal");
			assert.fieldValues(res, {
				name: 'foo',
				type: 'BINARY/BINARY/string {"maxLen":255}',
				notNull: true,
				primary: false,
				unique: false,
				check: 'foo.length > 10',
				foreign: null,
				enumerable: false,
				comparable: true,
				searchable: true,
				fragmentable: true,
				absentValue: null
			});
			assert.allowedFields(res, [ 'name', 'type', 'notNull', 'primary', 'unique', 'check',
				'foreign', 'enumerable', 'comparable', 'searchable', 'fragmentable', 'absentValue',
				'type' ]);
		});

		it ("Produces BINARY complete template from some defined fields, explicit format", () => {
			let atr = new Attribute({
				name: 'foo',
				type: Types.BINARY(),
				notNull: true,
				primary: false,
				check: 'foo.length > 10',
				enumerable: false,
				comparable: true
			});
			let res = atr.toCompleteTemplate("explicit");
			assert.fieldValues(res, {
				name: 'foo',
				type: 'BINARY()',
				notNull: true,
				primary: false,
				unique: false,
				check: 'foo.length > 10',
				foreign: null,
				enumerable: false,
				comparable: true,
				searchable: true,
				fragmentable: true,
				absentValue: null
			});
			assert.allowedFields(res, [ 'name', 'type', 'notNull', 'primary', 'unique', 'check',
				'foreign', 'enumerable', 'comparable', 'searchable', 'fragmentable', 'absentValue',
				'type' ]);
		});

		it ("Produces BINARY complete template from some defined fields, object format", () => {
			let atr = new Attribute({
				name: 'foo',
				type: Types.BINARY(),
				notNull: true,
				primary: false,
				check: 'foo.length > 10',
				enumerable: false,
				comparable: true
			});
			let res = atr.toCompleteTemplate("object");
			assert.fieldValues(res, {
				name: 'foo',
				type: 'Types.BINARY()',
				notNull: true,
				primary: false,
				unique: false,
				check: 'foo.length > 10',
				foreign: null,
				enumerable: false,
				comparable: true,
				searchable: true,
				fragmentable: true,
				absentValue: null
			});
			assert.allowedFields(res, [ 'name', 'type', 'notNull', 'primary', 'unique', 'check',
				'foreign', 'enumerable', 'comparable', 'searchable', 'fragmentable', 'absentValue',
				'type' ]);
		});

		it ("Produces BINARY complete template from all defined fields, internal format", () => {
			let atr = new Attribute({
				name: 'foo',
				type: Types.BINARY(),
				notNull: true,
				primary: false,
				unique: true,
				check: 'foo.length > 10',
				foreign: 'foo_table',
				enumerable: false,
				comparable: true,
				searchable: false,
				fragmentable: true,
				absentValue: ""
			});
			let res = atr.toCompleteTemplate("internal");
			assert.fieldValues(res, {
				name: 'foo',
				type: 'BINARY/BINARY/string {"maxLen":255}',
				notNull: true,
				primary: false,
				unique: true,
				check: 'foo.length > 10',
				foreign: 'foo_table',
				enumerable: false,
				comparable: true,
				searchable: false,
				fragmentable: true,
				absentValue: ""
			});
			assert.allowedFields(res, [ 'name', 'type', 'notNull', 'primary', 'unique', 'check',
				'foreign', 'enumerable', 'comparable', 'searchable', 'fragmentable', 'absentValue',
				'type' ]);
		});

		it ("Produces BINARY complete template from all defined fields, explicit format", () => {
			let atr = new Attribute({
				name: 'foo',
				type: Types.BINARY(),
				notNull: true,
				primary: false,
				unique: true,
				check: 'foo.length > 10',
				foreign: 'foo_table',
				enumerable: false,
				comparable: true,
				searchable: false,
				fragmentable: true,
				absentValue: ""
			});
			let res = atr.toCompleteTemplate("explicit");
			assert.fieldValues(res, {
				name: 'foo',
				type: 'BINARY()',
				notNull: true,
				primary: false,
				unique: true,
				check: 'foo.length > 10',
				foreign: 'foo_table',
				enumerable: false,
				comparable: true,
				searchable: false,
				fragmentable: true,
				absentValue: ""
			});
			assert.allowedFields(res, [ 'name', 'type', 'notNull', 'primary', 'unique', 'check',
				'foreign', 'enumerable', 'comparable', 'searchable', 'fragmentable', 'absentValue',
				'type' ]);
		});

		it ("Produces BINARY complete template from all defined fields, object format", () => {
			let atr = new Attribute({
				name: 'foo',
				type: Types.BINARY(),
				notNull: true,
				primary: false,
				unique: true,
				check: 'foo.length > 10',
				foreign: 'foo_table',
				enumerable: false,
				comparable: true,
				searchable: false,
				fragmentable: true,
				absentValue: ""
			});
			let res = atr.toCompleteTemplate("object");
			assert.fieldValues(res, {
				name: 'foo',
				type: 'Types.BINARY()',
				notNull: true,
				primary: false,
				unique: true,
				check: 'foo.length > 10',
				foreign: 'foo_table',
				enumerable: false,
				comparable: true,
				searchable: false,
				fragmentable: true,
				absentValue: ""
			});
			assert.allowedFields(res, [ 'name', 'type', 'notNull', 'primary', 'unique', 'check',
				'foreign', 'enumerable', 'comparable', 'searchable', 'fragmentable', 'absentValue',
				'type' ]);
		});

		it ("Produces TEXT minimal template from only type field, internal format", () => {
			let atr = new Attribute({
				type: Types.TEXT()
			});
			let res = atr.toMinimalTemplate("internal");
			assert.fieldValues(res, {
				type: 'TEXT/undefined/string {"maxLen":65535}'
			});
			assert.allowedFields(res, [ 'type', 'type' ]);
		});

		it ("Produces TEXT minimal template from only type field, explicit format", () => {
			let atr = new Attribute({
				type: Types.TEXT()
			});
			let res = atr.toMinimalTemplate("explicit");
			assert.fieldValues(res, {
				type: 'TEXT()'
			});
			assert.allowedFields(res, [ 'type', 'type' ]);
		});

		it ("Produces TEXT minimal template from only type field, object format", () => {
			let atr = new Attribute({
				type: Types.TEXT()
			});
			let res = atr.toMinimalTemplate("object");
			assert.fieldValues(res, {
				type: 'Types.TEXT()'
			});
			assert.allowedFields(res, [ 'type', 'type' ]);
		});

		it ("Produces TEXT minimal template from some defined fields, internal format", () => {
			let atr = new Attribute({
				name: 'foo',
				type: Types.TEXT(),
				notNull: true,
				primary: false,
				check: 'foo.length > 10',
				enumerable: false,
				comparable: true
			});
			let res = atr.toMinimalTemplate("internal");
			assert.fieldValues(res, {
				name: 'foo',
				type: 'TEXT/undefined/string {"maxLen":65535}',
				notNull: true,
				check: 'foo.length > 10',
				enumerable: false
			});
			assert.allowedFields(res, [ 'name', 'type', 'notNull', 'check', 'enumerable', 'type' ]);
		});

		it ("Produces TEXT minimal template from some defined fields, explicit format", () => {
			let atr = new Attribute({
				name: 'foo',
				type: Types.TEXT(),
				notNull: true,
				primary: false,
				check: 'foo.length > 10',
				enumerable: false,
				comparable: true
			});
			let res = atr.toMinimalTemplate("explicit");
			assert.fieldValues(res, {
				name: 'foo',
				type: 'TEXT()',
				notNull: true,
				check: 'foo.length > 10',
				enumerable: false
			});
			assert.allowedFields(res, [ 'name', 'type', 'notNull', 'check', 'enumerable', 'type' ]);
		});

		it ("Produces TEXT minimal template from some defined fields, object format", () => {
			let atr = new Attribute({
				name: 'foo',
				type: Types.TEXT(),
				notNull: true,
				primary: false,
				check: 'foo.length > 10',
				enumerable: false,
				comparable: true
			});
			let res = atr.toMinimalTemplate("object");
			assert.fieldValues(res, {
				name: 'foo',
				type: 'Types.TEXT()',
				notNull: true,
				check: 'foo.length > 10',
				enumerable: false
			});
			assert.allowedFields(res, [ 'name', 'type', 'notNull', 'check', 'enumerable', 'type' ]);
		});

		it ("Produces TEXT minimal template from all defined fields, internal format", () => {
			let atr = new Attribute({
				name: 'foo',
				type: Types.TEXT(),
				notNull: true,
				primary: false,
				unique: true,
				check: 'foo.length > 10',
				foreign: 'foo_table',
				enumerable: false,
				comparable: true,
				searchable: false,
				fragmentable: true,
				absentValue: ""
			});
			let res = atr.toMinimalTemplate("internal");
			assert.fieldValues(res, {
				name: 'foo',
				type: 'TEXT/undefined/string {"maxLen":65535}',
				notNull: true,
				unique: true,
				check: 'foo.length > 10',
				foreign: 'foo_table',
				enumerable: false,
				searchable: false,
				absentValue: ""
			});
			assert.allowedFields(res, [ 'name', 'type', 'notNull', 'unique', 'check', 'foreign',
				'enumerable', 'searchable', 'absentValue', 'type' ]);
		});

		it ("Produces TEXT minimal template from all defined fields, explicit format", () => {
			let atr = new Attribute({
				name: 'foo',
				type: Types.TEXT(),
				notNull: true,
				primary: false,
				unique: true,
				check: 'foo.length > 10',
				foreign: 'foo_table',
				enumerable: false,
				comparable: true,
				searchable: false,
				fragmentable: true,
				absentValue: ""
			});
			let res = atr.toMinimalTemplate("explicit");
			assert.fieldValues(res, {
				name: 'foo',
				type: 'TEXT()',
				notNull: true,
				unique: true,
				check: 'foo.length > 10',
				foreign: 'foo_table',
				enumerable: false,
				searchable: false,
				absentValue: ""
			});
			assert.allowedFields(res, [ 'name', 'type', 'notNull', 'unique', 'check', 'foreign',
				'enumerable', 'searchable', 'absentValue', 'type' ]);
		});

		it ("Produces TEXT minimal template from all defined fields, object format", () => {
			let atr = new Attribute({
				name: 'foo',
				type: Types.TEXT(),
				notNull: true,
				primary: false,
				unique: true,
				check: 'foo.length > 10',
				foreign: 'foo_table',
				enumerable: false,
				comparable: true,
				searchable: false,
				fragmentable: true,
				absentValue: ""
			});
			let res = atr.toMinimalTemplate("object");
			assert.fieldValues(res, {
				name: 'foo',
				type: 'Types.TEXT()',
				notNull: true,
				unique: true,
				check: 'foo.length > 10',
				foreign: 'foo_table',
				enumerable: false,
				searchable: false,
				absentValue: ""
			});
			assert.allowedFields(res, [ 'name', 'type', 'notNull', 'unique', 'check', 'foreign',
				'enumerable', 'searchable', 'absentValue', 'type' ]);
		});

		it ("Produces TEXT complete template from only type field, internal format", () => {
			let atr = new Attribute({
				type: Types.TEXT()
			});
			let res = atr.toCompleteTemplate("internal");
			assert.fieldValues(res, {
				type: 'TEXT/undefined/string {"maxLen":65535}',
				notNull: false,
				primary: false,
				unique: false,
				check: null,
				foreign: null,
				enumerable: true,
				comparable: true,
				searchable: true,
				fragmentable: true,
				absentValue: null
			});
			assert.allowedFields(res, [ 'type', 'notNull', 'primary', 'unique', 'check', 'foreign',
				'enumerable', 'comparable', 'searchable', 'fragmentable', 'absentValue', 'type' ]);
		});

		it ("Produces TEXT complete template from only type field, explicit format", () => {
			let atr = new Attribute({
				type: Types.TEXT()
			});
			let res = atr.toCompleteTemplate("explicit");
			assert.fieldValues(res, {
				type: 'TEXT()',
				notNull: false,
				primary: false,
				unique: false,
				check: null,
				foreign: null,
				enumerable: true,
				comparable: true,
				searchable: true,
				fragmentable: true,
				absentValue: null
			});
			assert.allowedFields(res, [ 'type', 'notNull', 'primary', 'unique', 'check', 'foreign',
				'enumerable', 'comparable', 'searchable', 'fragmentable', 'absentValue', 'type' ]);
		});

		it ("Produces TEXT complete template from only type field, object format", () => {
			let atr = new Attribute({
				type: Types.TEXT()
			});
			let res = atr.toCompleteTemplate("object");
			assert.fieldValues(res, {
				type: 'Types.TEXT()',
				notNull: false,
				primary: false,
				unique: false,
				check: null,
				foreign: null,
				enumerable: true,
				comparable: true,
				searchable: true,
				fragmentable: true,
				absentValue: null
			});
			assert.allowedFields(res, [ 'type', 'notNull', 'primary', 'unique', 'check', 'foreign',
				'enumerable', 'comparable', 'searchable', 'fragmentable', 'absentValue', 'type' ]);
		});

		it ("Produces TEXT complete template from some defined fields, internal format", () => {
			let atr = new Attribute({
				name: 'foo',
				type: Types.TEXT(),
				notNull: true,
				primary: false,
				check: 'foo.length > 10',
				enumerable: false,
				comparable: true
			});
			let res = atr.toCompleteTemplate("internal");
			assert.fieldValues(res, {
				name: 'foo',
				type: 'TEXT/undefined/string {"maxLen":65535}',
				notNull: true,
				primary: false,
				unique: false,
				check: 'foo.length > 10',
				foreign: null,
				enumerable: false,
				comparable: true,
				searchable: true,
				fragmentable: true,
				absentValue: null
			});
			assert.allowedFields(res, [ 'name', 'type', 'notNull', 'primary', 'unique', 'check',
				'foreign', 'enumerable', 'comparable', 'searchable', 'fragmentable', 'absentValue',
				'type' ]);
		});

		it ("Produces TEXT complete template from some defined fields, explicit format", () => {
			let atr = new Attribute({
				name: 'foo',
				type: Types.TEXT(),
				notNull: true,
				primary: false,
				check: 'foo.length > 10',
				enumerable: false,
				comparable: true
			});
			let res = atr.toCompleteTemplate("explicit");
			assert.fieldValues(res, {
				name: 'foo',
				type: 'TEXT()',
				notNull: true,
				primary: false,
				unique: false,
				check: 'foo.length > 10',
				foreign: null,
				enumerable: false,
				comparable: true,
				searchable: true,
				fragmentable: true,
				absentValue: null
			});
			assert.allowedFields(res, [ 'name', 'type', 'notNull', 'primary', 'unique', 'check',
				'foreign', 'enumerable', 'comparable', 'searchable', 'fragmentable', 'absentValue',
				'type' ]);
		});

		it ("Produces TEXT complete template from some defined fields, object format", () => {
			let atr = new Attribute({
				name: 'foo',
				type: Types.TEXT(),
				notNull: true,
				primary: false,
				check: 'foo.length > 10',
				enumerable: false,
				comparable: true
			});
			let res = atr.toCompleteTemplate("object");
			assert.fieldValues(res, {
				name: 'foo',
				type: 'Types.TEXT()',
				notNull: true,
				primary: false,
				unique: false,
				check: 'foo.length > 10',
				foreign: null,
				enumerable: false,
				comparable: true,
				searchable: true,
				fragmentable: true,
				absentValue: null
			});
			assert.allowedFields(res, [ 'name', 'type', 'notNull', 'primary', 'unique', 'check',
				'foreign', 'enumerable', 'comparable', 'searchable', 'fragmentable', 'absentValue',
				'type' ]);
		});

		it ("Produces TEXT complete template from all defined fields, internal format", () => {
			let atr = new Attribute({
				name: 'foo',
				type: Types.TEXT(),
				notNull: true,
				primary: false,
				unique: true,
				check: 'foo.length > 10',
				foreign: 'foo_table',
				enumerable: false,
				comparable: true,
				searchable: false,
				fragmentable: true,
				absentValue: ""
			});
			let res = atr.toCompleteTemplate("internal");
			assert.fieldValues(res, {
				name: 'foo',
				type: 'TEXT/undefined/string {"maxLen":65535}',
				notNull: true,
				primary: false,
				unique: true,
				check: 'foo.length > 10',
				foreign: 'foo_table',
				enumerable: false,
				comparable: true,
				searchable: false,
				fragmentable: true,
				absentValue: ""
			});
			assert.allowedFields(res, [ 'name', 'type', 'notNull', 'primary', 'unique', 'check',
				'foreign', 'enumerable', 'comparable', 'searchable', 'fragmentable', 'absentValue',
				'type' ]);
		});

		it ("Produces TEXT complete template from all defined fields, explicit format", () => {
			let atr = new Attribute({
				name: 'foo',
				type: Types.TEXT(),
				notNull: true,
				primary: false,
				unique: true,
				check: 'foo.length > 10',
				foreign: 'foo_table',
				enumerable: false,
				comparable: true,
				searchable: false,
				fragmentable: true,
				absentValue: ""
			});
			let res = atr.toCompleteTemplate("explicit");
			assert.fieldValues(res, {
				name: 'foo',
				type: 'TEXT()',
				notNull: true,
				primary: false,
				unique: true,
				check: 'foo.length > 10',
				foreign: 'foo_table',
				enumerable: false,
				comparable: true,
				searchable: false,
				fragmentable: true,
				absentValue: ""
			});
			assert.allowedFields(res, [ 'name', 'type', 'notNull', 'primary', 'unique', 'check',
				'foreign', 'enumerable', 'comparable', 'searchable', 'fragmentable', 'absentValue',
				'type' ]);
		});

		it ("Produces TEXT complete template from all defined fields, object format", () => {
			let atr = new Attribute({
				name: 'foo',
				type: Types.TEXT(),
				notNull: true,
				primary: false,
				unique: true,
				check: 'foo.length > 10',
				foreign: 'foo_table',
				enumerable: false,
				comparable: true,
				searchable: false,
				fragmentable: true,
				absentValue: ""
			});
			let res = atr.toCompleteTemplate("object");
			assert.fieldValues(res, {
				name: 'foo',
				type: 'Types.TEXT()',
				notNull: true,
				primary: false,
				unique: true,
				check: 'foo.length > 10',
				foreign: 'foo_table',
				enumerable: false,
				comparable: true,
				searchable: false,
				fragmentable: true,
				absentValue: ""
			});
			assert.allowedFields(res, [ 'name', 'type', 'notNull', 'primary', 'unique', 'check',
				'foreign', 'enumerable', 'comparable', 'searchable', 'fragmentable', 'absentValue',
				'type' ]);
		});

		it ("Produces TINYTEXT minimal template from only type field, internal format", () => {
			let atr = new Attribute({
				type: Types.TINYTEXT()
			});
			let res = atr.toMinimalTemplate("internal");
			assert.fieldValues(res, {
				type: 'TINYTEXT/undefined/string {"maxLen":65535}'
			});
			assert.allowedFields(res, [ 'type', 'type' ]);
		});

		it ("Produces TINYTEXT minimal template from only type field, explicit format", () => {
			let atr = new Attribute({
				type: Types.TINYTEXT()
			});
			let res = atr.toMinimalTemplate("explicit");
			assert.fieldValues(res, {
				type: 'TINYTEXT()'
			});
			assert.allowedFields(res, [ 'type', 'type' ]);
		});

		it ("Produces TINYTEXT minimal template from only type field, object format", () => {
			let atr = new Attribute({
				type: Types.TINYTEXT()
			});
			let res = atr.toMinimalTemplate("object");
			assert.fieldValues(res, {
				type: 'Types.TINYTEXT()'
			});
			assert.allowedFields(res, [ 'type', 'type' ]);
		});

		it ("Produces TINYTEXT minimal template from some defined fields, internal format", () => {
			let atr = new Attribute({
				name: 'foo',
				type: Types.TINYTEXT(),
				notNull: true,
				primary: false,
				check: 'foo.length > 10',
				enumerable: false,
				comparable: true
			});
			let res = atr.toMinimalTemplate("internal");
			assert.fieldValues(res, {
				name: 'foo',
				type: 'TINYTEXT/undefined/string {"maxLen":65535}',
				notNull: true,
				check: 'foo.length > 10',
				enumerable: false
			});
			assert.allowedFields(res, [ 'name', 'type', 'notNull', 'check', 'enumerable', 'type' ]);
		});

		it ("Produces TINYTEXT minimal template from some defined fields, explicit format", () => {
			let atr = new Attribute({
				name: 'foo',
				type: Types.TINYTEXT(),
				notNull: true,
				primary: false,
				check: 'foo.length > 10',
				enumerable: false,
				comparable: true
			});
			let res = atr.toMinimalTemplate("explicit");
			assert.fieldValues(res, {
				name: 'foo',
				type: 'TINYTEXT()',
				notNull: true,
				check: 'foo.length > 10',
				enumerable: false
			});
			assert.allowedFields(res, [ 'name', 'type', 'notNull', 'check', 'enumerable', 'type' ]);
		});

		it ("Produces TINYTEXT minimal template from some defined fields, object format", () => {
			let atr = new Attribute({
				name: 'foo',
				type: Types.TINYTEXT(),
				notNull: true,
				primary: false,
				check: 'foo.length > 10',
				enumerable: false,
				comparable: true
			});
			let res = atr.toMinimalTemplate("object");
			assert.fieldValues(res, {
				name: 'foo',
				type: 'Types.TINYTEXT()',
				notNull: true,
				check: 'foo.length > 10',
				enumerable: false
			});
			assert.allowedFields(res, [ 'name', 'type', 'notNull', 'check', 'enumerable', 'type' ]);
		});

		it ("Produces TINYTEXT minimal template from all defined fields, internal format", () => {
			let atr = new Attribute({
				name: 'foo',
				type: Types.TINYTEXT(),
				notNull: true,
				primary: false,
				unique: true,
				check: 'foo.length > 10',
				foreign: 'foo_table',
				enumerable: false,
				comparable: true,
				searchable: false,
				fragmentable: true,
				absentValue: ""
			});
			let res = atr.toMinimalTemplate("internal");
			assert.fieldValues(res, {
				name: 'foo',
				type: 'TINYTEXT/undefined/string {"maxLen":65535}',
				notNull: true,
				unique: true,
				check: 'foo.length > 10',
				foreign: 'foo_table',
				enumerable: false,
				searchable: false,
				absentValue: ""
			});
			assert.allowedFields(res, [ 'name', 'type', 'notNull', 'unique', 'check', 'foreign',
				'enumerable', 'searchable', 'absentValue', 'type' ]);
		});

		it ("Produces TINYTEXT minimal template from all defined fields, explicit format", () => {
			let atr = new Attribute({
				name: 'foo',
				type: Types.TINYTEXT(),
				notNull: true,
				primary: false,
				unique: true,
				check: 'foo.length > 10',
				foreign: 'foo_table',
				enumerable: false,
				comparable: true,
				searchable: false,
				fragmentable: true,
				absentValue: ""
			});
			let res = atr.toMinimalTemplate("explicit");
			assert.fieldValues(res, {
				name: 'foo',
				type: 'TINYTEXT()',
				notNull: true,
				unique: true,
				check: 'foo.length > 10',
				foreign: 'foo_table',
				enumerable: false,
				searchable: false,
				absentValue: ""
			});
			assert.allowedFields(res, [ 'name', 'type', 'notNull', 'unique', 'check', 'foreign',
				'enumerable', 'searchable', 'absentValue', 'type' ]);
		});

		it ("Produces TINYTEXT minimal template from all defined fields, object format", () => {
			let atr = new Attribute({
				name: 'foo',
				type: Types.TINYTEXT(),
				notNull: true,
				primary: false,
				unique: true,
				check: 'foo.length > 10',
				foreign: 'foo_table',
				enumerable: false,
				comparable: true,
				searchable: false,
				fragmentable: true,
				absentValue: ""
			});
			let res = atr.toMinimalTemplate("object");
			assert.fieldValues(res, {
				name: 'foo',
				type: 'Types.TINYTEXT()',
				notNull: true,
				unique: true,
				check: 'foo.length > 10',
				foreign: 'foo_table',
				enumerable: false,
				searchable: false,
				absentValue: ""
			});
			assert.allowedFields(res, [ 'name', 'type', 'notNull', 'unique', 'check', 'foreign',
				'enumerable', 'searchable', 'absentValue', 'type' ]);
		});

		it ("Produces TINYTEXT complete template from only type field, internal format", () => {
			let atr = new Attribute({
				type: Types.TINYTEXT()
			});
			let res = atr.toCompleteTemplate("internal");
			assert.fieldValues(res, {
				type: 'TINYTEXT/undefined/string {"maxLen":65535}',
				notNull: false,
				primary: false,
				unique: false,
				check: null,
				foreign: null,
				enumerable: true,
				comparable: true,
				searchable: true,
				fragmentable: true,
				absentValue: null
			});
			assert.allowedFields(res, [ 'type', 'notNull', 'primary', 'unique', 'check', 'foreign',
				'enumerable', 'comparable', 'searchable', 'fragmentable', 'absentValue', 'type' ]);
		});

		it ("Produces TINYTEXT complete template from only type field, explicit format", () => {
			let atr = new Attribute({
				type: Types.TINYTEXT()
			});
			let res = atr.toCompleteTemplate("explicit");
			assert.fieldValues(res, {
				type: 'TINYTEXT()',
				notNull: false,
				primary: false,
				unique: false,
				check: null,
				foreign: null,
				enumerable: true,
				comparable: true,
				searchable: true,
				fragmentable: true,
				absentValue: null
			});
			assert.allowedFields(res, [ 'type', 'notNull', 'primary', 'unique', 'check', 'foreign',
				'enumerable', 'comparable', 'searchable', 'fragmentable', 'absentValue', 'type' ]);
		});

		it ("Produces TINYTEXT complete template from only type field, object format", () => {
			let atr = new Attribute({
				type: Types.TINYTEXT()
			});
			let res = atr.toCompleteTemplate("object");
			assert.fieldValues(res, {
				type: 'Types.TINYTEXT()',
				notNull: false,
				primary: false,
				unique: false,
				check: null,
				foreign: null,
				enumerable: true,
				comparable: true,
				searchable: true,
				fragmentable: true,
				absentValue: null
			});
			assert.allowedFields(res, [ 'type', 'notNull', 'primary', 'unique', 'check', 'foreign',
				'enumerable', 'comparable', 'searchable', 'fragmentable', 'absentValue', 'type' ]);
		});

		it ("Produces TINYTEXT complete template from some defined fields, internal format", () => {
			let atr = new Attribute({
				name: 'foo',
				type: Types.TINYTEXT(),
				notNull: true,
				primary: false,
				check: 'foo.length > 10',
				enumerable: false,
				comparable: true
			});
			let res = atr.toCompleteTemplate("internal");
			assert.fieldValues(res, {
				name: 'foo',
				type: 'TINYTEXT/undefined/string {"maxLen":65535}',
				notNull: true,
				primary: false,
				unique: false,
				check: 'foo.length > 10',
				foreign: null,
				enumerable: false,
				comparable: true,
				searchable: true,
				fragmentable: true,
				absentValue: null
			});
			assert.allowedFields(res, [ 'name', 'type', 'notNull', 'primary', 'unique', 'check',
				'foreign', 'enumerable', 'comparable', 'searchable', 'fragmentable', 'absentValue',
				'type' ]);
		});

		it ("Produces TINYTEXT complete template from some defined fields, explicit format", () => {
			let atr = new Attribute({
				name: 'foo',
				type: Types.TINYTEXT(),
				notNull: true,
				primary: false,
				check: 'foo.length > 10',
				enumerable: false,
				comparable: true
			});
			let res = atr.toCompleteTemplate("explicit");
			assert.fieldValues(res, {
				name: 'foo',
				type: 'TINYTEXT()',
				notNull: true,
				primary: false,
				unique: false,
				check: 'foo.length > 10',
				foreign: null,
				enumerable: false,
				comparable: true,
				searchable: true,
				fragmentable: true,
				absentValue: null
			});
			assert.allowedFields(res, [ 'name', 'type', 'notNull', 'primary', 'unique', 'check',
				'foreign', 'enumerable', 'comparable', 'searchable', 'fragmentable', 'absentValue',
				'type' ]);
		});

		it ("Produces TINYTEXT complete template from some defined fields, object format", () => {
			let atr = new Attribute({
				name: 'foo',
				type: Types.TINYTEXT(),
				notNull: true,
				primary: false,
				check: 'foo.length > 10',
				enumerable: false,
				comparable: true
			});
			let res = atr.toCompleteTemplate("object");
			assert.fieldValues(res, {
				name: 'foo',
				type: 'Types.TINYTEXT()',
				notNull: true,
				primary: false,
				unique: false,
				check: 'foo.length > 10',
				foreign: null,
				enumerable: false,
				comparable: true,
				searchable: true,
				fragmentable: true,
				absentValue: null
			});
			assert.allowedFields(res, [ 'name', 'type', 'notNull', 'primary', 'unique', 'check',
				'foreign', 'enumerable', 'comparable', 'searchable', 'fragmentable', 'absentValue',
				'type' ]);
		});

		it ("Produces TINYTEXT complete template from all defined fields, internal format", () => {
			let atr = new Attribute({
				name: 'foo',
				type: Types.TINYTEXT(),
				notNull: true,
				primary: false,
				unique: true,
				check: 'foo.length > 10',
				foreign: 'foo_table',
				enumerable: false,
				comparable: true,
				searchable: false,
				fragmentable: true,
				absentValue: ""
			});
			let res = atr.toCompleteTemplate("internal");
			assert.fieldValues(res, {
				name: 'foo',
				type: 'TINYTEXT/undefined/string {"maxLen":65535}',
				notNull: true,
				primary: false,
				unique: true,
				check: 'foo.length > 10',
				foreign: 'foo_table',
				enumerable: false,
				comparable: true,
				searchable: false,
				fragmentable: true,
				absentValue: ""
			});
			assert.allowedFields(res, [ 'name', 'type', 'notNull', 'primary', 'unique', 'check',
				'foreign', 'enumerable', 'comparable', 'searchable', 'fragmentable', 'absentValue',
				'type' ]);
		});

		it ("Produces TINYTEXT complete template from all defined fields, explicit format", () => {
			let atr = new Attribute({
				name: 'foo',
				type: Types.TINYTEXT(),
				notNull: true,
				primary: false,
				unique: true,
				check: 'foo.length > 10',
				foreign: 'foo_table',
				enumerable: false,
				comparable: true,
				searchable: false,
				fragmentable: true,
				absentValue: ""
			});
			let res = atr.toCompleteTemplate("explicit");
			assert.fieldValues(res, {
				name: 'foo',
				type: 'TINYTEXT()',
				notNull: true,
				primary: false,
				unique: true,
				check: 'foo.length > 10',
				foreign: 'foo_table',
				enumerable: false,
				comparable: true,
				searchable: false,
				fragmentable: true,
				absentValue: ""
			});
			assert.allowedFields(res, [ 'name', 'type', 'notNull', 'primary', 'unique', 'check',
				'foreign', 'enumerable', 'comparable', 'searchable', 'fragmentable', 'absentValue',
				'type' ]);
		});

		it ("Produces TINYTEXT complete template from all defined fields, object format", () => {
			let atr = new Attribute({
				name: 'foo',
				type: Types.TINYTEXT(),
				notNull: true,
				primary: false,
				unique: true,
				check: 'foo.length > 10',
				foreign: 'foo_table',
				enumerable: false,
				comparable: true,
				searchable: false,
				fragmentable: true,
				absentValue: ""
			});
			let res = atr.toCompleteTemplate("object");
			assert.fieldValues(res, {
				name: 'foo',
				type: 'Types.TINYTEXT()',
				notNull: true,
				primary: false,
				unique: true,
				check: 'foo.length > 10',
				foreign: 'foo_table',
				enumerable: false,
				comparable: true,
				searchable: false,
				fragmentable: true,
				absentValue: ""
			});
			assert.allowedFields(res, [ 'name', 'type', 'notNull', 'primary', 'unique', 'check',
				'foreign', 'enumerable', 'comparable', 'searchable', 'fragmentable', 'absentValue',
				'type' ]);
		});

		it ("Produces CITEXT minimal template from only type field, internal format", () => {
			let atr = new Attribute({
				type: Types.CITEXT()
			});
			let res = atr.toMinimalTemplate("internal");
			assert.fieldValues(res, {
				type: 'CITEXT/CITEXT/string {"maxLen":65535}'
			});
			assert.allowedFields(res, [ 'type', 'type' ]);
		});

		it ("Produces CITEXT minimal template from only type field, explicit format", () => {
			let atr = new Attribute({
				type: Types.CITEXT()
			});
			let res = atr.toMinimalTemplate("explicit");
			assert.fieldValues(res, {
				type: 'CITEXT()'
			});
			assert.allowedFields(res, [ 'type', 'type' ]);
		});

		it ("Produces CITEXT minimal template from only type field, object format", () => {
			let atr = new Attribute({
				type: Types.CITEXT()
			});
			let res = atr.toMinimalTemplate("object");
			assert.fieldValues(res, {
				type: 'Types.CITEXT()'
			});
			assert.allowedFields(res, [ 'type', 'type' ]);
		});

		it ("Produces CITEXT minimal template from some defined fields, internal format", () => {
			let atr = new Attribute({
				name: 'foo',
				type: Types.CITEXT(),
				notNull: true,
				primary: false,
				check: 'foo.length > 10',
				enumerable: false,
				comparable: true
			});
			let res = atr.toMinimalTemplate("internal");
			assert.fieldValues(res, {
				name: 'foo',
				type: 'CITEXT/CITEXT/string {"maxLen":65535}',
				notNull: true,
				check: 'foo.length > 10',
				enumerable: false
			});
			assert.allowedFields(res, [ 'name', 'type', 'notNull', 'check', 'enumerable', 'type' ]);
		});

		it ("Produces CITEXT minimal template from some defined fields, explicit format", () => {
			let atr = new Attribute({
				name: 'foo',
				type: Types.CITEXT(),
				notNull: true,
				primary: false,
				check: 'foo.length > 10',
				enumerable: false,
				comparable: true
			});
			let res = atr.toMinimalTemplate("explicit");
			assert.fieldValues(res, {
				name: 'foo',
				type: 'CITEXT()',
				notNull: true,
				check: 'foo.length > 10',
				enumerable: false
			});
			assert.allowedFields(res, [ 'name', 'type', 'notNull', 'check', 'enumerable', 'type' ]);
		});

		it ("Produces CITEXT minimal template from some defined fields, object format", () => {
			let atr = new Attribute({
				name: 'foo',
				type: Types.CITEXT(),
				notNull: true,
				primary: false,
				check: 'foo.length > 10',
				enumerable: false,
				comparable: true
			});
			let res = atr.toMinimalTemplate("object");
			assert.fieldValues(res, {
				name: 'foo',
				type: 'Types.CITEXT()',
				notNull: true,
				check: 'foo.length > 10',
				enumerable: false
			});
			assert.allowedFields(res, [ 'name', 'type', 'notNull', 'check', 'enumerable', 'type' ]);
		});

		it ("Produces CITEXT minimal template from all defined fields, internal format", () => {
			let atr = new Attribute({
				name: 'foo',
				type: Types.CITEXT(),
				notNull: true,
				primary: false,
				unique: true,
				check: 'foo.length > 10',
				foreign: 'foo_table',
				enumerable: false,
				comparable: true,
				searchable: false,
				fragmentable: true,
				absentValue: ""
			});
			let res = atr.toMinimalTemplate("internal");
			assert.fieldValues(res, {
				name: 'foo',
				type: 'CITEXT/CITEXT/string {"maxLen":65535}',
				notNull: true,
				unique: true,
				check: 'foo.length > 10',
				foreign: 'foo_table',
				enumerable: false,
				searchable: false,
				absentValue: ""
			});
			assert.allowedFields(res, [ 'name', 'type', 'notNull', 'unique', 'check', 'foreign',
				'enumerable', 'searchable', 'absentValue', 'type' ]);
		});

		it ("Produces CITEXT minimal template from all defined fields, explicit format", () => {
			let atr = new Attribute({
				name: 'foo',
				type: Types.CITEXT(),
				notNull: true,
				primary: false,
				unique: true,
				check: 'foo.length > 10',
				foreign: 'foo_table',
				enumerable: false,
				comparable: true,
				searchable: false,
				fragmentable: true,
				absentValue: ""
			});
			let res = atr.toMinimalTemplate("explicit");
			assert.fieldValues(res, {
				name: 'foo',
				type: 'CITEXT()',
				notNull: true,
				unique: true,
				check: 'foo.length > 10',
				foreign: 'foo_table',
				enumerable: false,
				searchable: false,
				absentValue: ""
			});
			assert.allowedFields(res, [ 'name', 'type', 'notNull', 'unique', 'check', 'foreign',
				'enumerable', 'searchable', 'absentValue', 'type' ]);
		});

		it ("Produces CITEXT minimal template from all defined fields, object format", () => {
			let atr = new Attribute({
				name: 'foo',
				type: Types.CITEXT(),
				notNull: true,
				primary: false,
				unique: true,
				check: 'foo.length > 10',
				foreign: 'foo_table',
				enumerable: false,
				comparable: true,
				searchable: false,
				fragmentable: true,
				absentValue: ""
			});
			let res = atr.toMinimalTemplate("object");
			assert.fieldValues(res, {
				name: 'foo',
				type: 'Types.CITEXT()',
				notNull: true,
				unique: true,
				check: 'foo.length > 10',
				foreign: 'foo_table',
				enumerable: false,
				searchable: false,
				absentValue: ""
			});
			assert.allowedFields(res, [ 'name', 'type', 'notNull', 'unique', 'check', 'foreign',
				'enumerable', 'searchable', 'absentValue', 'type' ]);
		});

		it ("Produces CITEXT complete template from only type field, internal format", () => {
			let atr = new Attribute({
				type: Types.CITEXT()
			});
			let res = atr.toCompleteTemplate("internal");
			assert.fieldValues(res, {
				type: 'CITEXT/CITEXT/string {"maxLen":65535}',
				notNull: false,
				primary: false,
				unique: false,
				check: null,
				foreign: null,
				enumerable: true,
				comparable: true,
				searchable: true,
				fragmentable: true,
				absentValue: null
			});
			assert.allowedFields(res, [ 'type', 'notNull', 'primary', 'unique', 'check', 'foreign',
				'enumerable', 'comparable', 'searchable', 'fragmentable', 'absentValue', 'type' ]);
		});

		it ("Produces CITEXT complete template from only type field, explicit format", () => {
			let atr = new Attribute({
				type: Types.CITEXT()
			});
			let res = atr.toCompleteTemplate("explicit");
			assert.fieldValues(res, {
				type: 'CITEXT()',
				notNull: false,
				primary: false,
				unique: false,
				check: null,
				foreign: null,
				enumerable: true,
				comparable: true,
				searchable: true,
				fragmentable: true,
				absentValue: null
			});
			assert.allowedFields(res, [ 'type', 'notNull', 'primary', 'unique', 'check', 'foreign',
				'enumerable', 'comparable', 'searchable', 'fragmentable', 'absentValue', 'type' ]);
		});

		it ("Produces CITEXT complete template from only type field, object format", () => {
			let atr = new Attribute({
				type: Types.CITEXT()
			});
			let res = atr.toCompleteTemplate("object");
			assert.fieldValues(res, {
				type: 'Types.CITEXT()',
				notNull: false,
				primary: false,
				unique: false,
				check: null,
				foreign: null,
				enumerable: true,
				comparable: true,
				searchable: true,
				fragmentable: true,
				absentValue: null
			});
			assert.allowedFields(res, [ 'type', 'notNull', 'primary', 'unique', 'check', 'foreign',
				'enumerable', 'comparable', 'searchable', 'fragmentable', 'absentValue', 'type' ]);
		});

		it ("Produces CITEXT complete template from some defined fields, internal format", () => {
			let atr = new Attribute({
				name: 'foo',
				type: Types.CITEXT(),
				notNull: true,
				primary: false,
				check: 'foo.length > 10',
				enumerable: false,
				comparable: true
			});
			let res = atr.toCompleteTemplate("internal");
			assert.fieldValues(res, {
				name: 'foo',
				type: 'CITEXT/CITEXT/string {"maxLen":65535}',
				notNull: true,
				primary: false,
				unique: false,
				check: 'foo.length > 10',
				foreign: null,
				enumerable: false,
				comparable: true,
				searchable: true,
				fragmentable: true,
				absentValue: null
			});
			assert.allowedFields(res, [ 'name', 'type', 'notNull', 'primary', 'unique', 'check',
				'foreign', 'enumerable', 'comparable', 'searchable', 'fragmentable', 'absentValue',
				'type' ]);
		});

		it ("Produces CITEXT complete template from some defined fields, explicit format", () => {
			let atr = new Attribute({
				name: 'foo',
				type: Types.CITEXT(),
				notNull: true,
				primary: false,
				check: 'foo.length > 10',
				enumerable: false,
				comparable: true
			});
			let res = atr.toCompleteTemplate("explicit");
			assert.fieldValues(res, {
				name: 'foo',
				type: 'CITEXT()',
				notNull: true,
				primary: false,
				unique: false,
				check: 'foo.length > 10',
				foreign: null,
				enumerable: false,
				comparable: true,
				searchable: true,
				fragmentable: true,
				absentValue: null
			});
			assert.allowedFields(res, [ 'name', 'type', 'notNull', 'primary', 'unique', 'check',
				'foreign', 'enumerable', 'comparable', 'searchable', 'fragmentable', 'absentValue',
				'type' ]);
		});

		it ("Produces CITEXT complete template from some defined fields, object format", () => {
			let atr = new Attribute({
				name: 'foo',
				type: Types.CITEXT(),
				notNull: true,
				primary: false,
				check: 'foo.length > 10',
				enumerable: false,
				comparable: true
			});
			let res = atr.toCompleteTemplate("object");
			assert.fieldValues(res, {
				name: 'foo',
				type: 'Types.CITEXT()',
				notNull: true,
				primary: false,
				unique: false,
				check: 'foo.length > 10',
				foreign: null,
				enumerable: false,
				comparable: true,
				searchable: true,
				fragmentable: true,
				absentValue: null
			});
			assert.allowedFields(res, [ 'name', 'type', 'notNull', 'primary', 'unique', 'check',
				'foreign', 'enumerable', 'comparable', 'searchable', 'fragmentable', 'absentValue',
				'type' ]);
		});

		it ("Produces CITEXT complete template from all defined fields, internal format", () => {
			let atr = new Attribute({
				name: 'foo',
				type: Types.CITEXT(),
				notNull: true,
				primary: false,
				unique: true,
				check: 'foo.length > 10',
				foreign: 'foo_table',
				enumerable: false,
				comparable: true,
				searchable: false,
				fragmentable: true,
				absentValue: ""
			});
			let res = atr.toCompleteTemplate("internal");
			assert.fieldValues(res, {
				name: 'foo',
				type: 'CITEXT/CITEXT/string {"maxLen":65535}',
				notNull: true,
				primary: false,
				unique: true,
				check: 'foo.length > 10',
				foreign: 'foo_table',
				enumerable: false,
				comparable: true,
				searchable: false,
				fragmentable: true,
				absentValue: ""
			});
			assert.allowedFields(res, [ 'name', 'type', 'notNull', 'primary', 'unique', 'check',
				'foreign', 'enumerable', 'comparable', 'searchable', 'fragmentable', 'absentValue',
				'type' ]);
		});

		it ("Produces CITEXT complete template from all defined fields, explicit format", () => {
			let atr = new Attribute({
				name: 'foo',
				type: Types.CITEXT(),
				notNull: true,
				primary: false,
				unique: true,
				check: 'foo.length > 10',
				foreign: 'foo_table',
				enumerable: false,
				comparable: true,
				searchable: false,
				fragmentable: true,
				absentValue: ""
			});
			let res = atr.toCompleteTemplate("explicit");
			assert.fieldValues(res, {
				name: 'foo',
				type: 'CITEXT()',
				notNull: true,
				primary: false,
				unique: true,
				check: 'foo.length > 10',
				foreign: 'foo_table',
				enumerable: false,
				comparable: true,
				searchable: false,
				fragmentable: true,
				absentValue: ""
			});
			assert.allowedFields(res, [ 'name', 'type', 'notNull', 'primary', 'unique', 'check',
				'foreign', 'enumerable', 'comparable', 'searchable', 'fragmentable', 'absentValue',
				'type' ]);
		});

		it ("Produces CITEXT complete template from all defined fields, object format", () => {
			let atr = new Attribute({
				name: 'foo',
				type: Types.CITEXT(),
				notNull: true,
				primary: false,
				unique: true,
				check: 'foo.length > 10',
				foreign: 'foo_table',
				enumerable: false,
				comparable: true,
				searchable: false,
				fragmentable: true,
				absentValue: ""
			});
			let res = atr.toCompleteTemplate("object");
			assert.fieldValues(res, {
				name: 'foo',
				type: 'Types.CITEXT()',
				notNull: true,
				primary: false,
				unique: true,
				check: 'foo.length > 10',
				foreign: 'foo_table',
				enumerable: false,
				comparable: true,
				searchable: false,
				fragmentable: true,
				absentValue: ""
			});
			assert.allowedFields(res, [ 'name', 'type', 'notNull', 'primary', 'unique', 'check',
				'foreign', 'enumerable', 'comparable', 'searchable', 'fragmentable', 'absentValue',
				'type' ]);
		});

		it ("Produces INTEGER minimal template from only type field, internal format", () => {
			let atr = new Attribute({
				type: Types.INTEGER()
			});
			let res = atr.toMinimalTemplate("internal");
			assert.fieldValues(res, {
				type: 'INTEGER/INTEGER/number {"min":null,"max":null,"mul":1}'
			});
			assert.allowedFields(res, [ 'type', 'type' ]);
		});

		it ("Produces INTEGER minimal template from only type field, explicit format", () => {
			let atr = new Attribute({
				type: Types.INTEGER()
			});
			let res = atr.toMinimalTemplate("explicit");
			assert.fieldValues(res, {
				type: 'INTEGER()'
			});
			assert.allowedFields(res, [ 'type', 'type' ]);
		});

		it ("Produces INTEGER minimal template from only type field, object format", () => {
			let atr = new Attribute({
				type: Types.INTEGER()
			});
			let res = atr.toMinimalTemplate("object");
			assert.fieldValues(res, {
				type: 'Types.INTEGER()'
			});
			assert.allowedFields(res, [ 'type', 'type' ]);
		});

		it ("Produces INTEGER minimal template from some defined fields, internal format", () => {
			let atr = new Attribute({
				name: 'foo',
				type: Types.INTEGER(),
				notNull: true,
				primary: false,
				check: 'foo.length > 10',
				enumerable: true,
				comparable: true
			});
			let res = atr.toMinimalTemplate("internal");
			assert.fieldValues(res, {
				name: 'foo',
				type: 'INTEGER/INTEGER/number {"min":null,"max":null,"mul":1}',
				notNull: true,
				check: 'foo.length > 10',
				enumerable: true
			});
			assert.allowedFields(res, [ 'name', 'type', 'notNull', 'check', 'enumerable', 'type' ]);
		});

		it ("Produces INTEGER minimal template from some defined fields, explicit format", () => {
			let atr = new Attribute({
				name: 'foo',
				type: Types.INTEGER(),
				notNull: true,
				primary: false,
				check: 'foo.length > 10',
				enumerable: true,
				comparable: true
			});
			let res = atr.toMinimalTemplate("explicit");
			assert.fieldValues(res, {
				name: 'foo',
				type: 'INTEGER()',
				notNull: true,
				check: 'foo.length > 10',
				enumerable: true
			});
			assert.allowedFields(res, [ 'name', 'type', 'notNull', 'check', 'enumerable', 'type' ]);
		});

		it ("Produces INTEGER minimal template from some defined fields, object format", () => {
			let atr = new Attribute({
				name: 'foo',
				type: Types.INTEGER(),
				notNull: true,
				primary: false,
				check: 'foo.length > 10',
				enumerable: true,
				comparable: true
			});
			let res = atr.toMinimalTemplate("object");
			assert.fieldValues(res, {
				name: 'foo',
				type: 'Types.INTEGER()',
				notNull: true,
				check: 'foo.length > 10',
				enumerable: true
			});
			assert.allowedFields(res, [ 'name', 'type', 'notNull', 'check', 'enumerable', 'type' ]);
		});

		it ("Produces INTEGER minimal template from all defined fields, internal format", () => {
			let atr = new Attribute({
				name: 'foo',
				type: Types.INTEGER(),
				notNull: true,
				primary: false,
				unique: true,
				check: 'foo.length > 10',
				foreign: 'foo_table',
				enumerable: true,
				comparable: true,
				searchable: true,
				fragmentable: false,
				absentValue: 0
			});
			let res = atr.toMinimalTemplate("internal");
			assert.fieldValues(res, {
				name: 'foo',
				type: 'INTEGER/INTEGER/number {"min":null,"max":null,"mul":1}',
				notNull: true,
				unique: true,
				check: 'foo.length > 10',
				foreign: 'foo_table',
				enumerable: true,
				searchable: true,
				absentValue: 0
			});
			assert.allowedFields(res, [ 'name', 'type', 'notNull', 'unique', 'check', 'foreign',
				'enumerable', 'searchable', 'absentValue', 'type' ]);
		});

		it ("Produces INTEGER minimal template from all defined fields, explicit format", () => {
			let atr = new Attribute({
				name: 'foo',
				type: Types.INTEGER(),
				notNull: true,
				primary: false,
				unique: true,
				check: 'foo.length > 10',
				foreign: 'foo_table',
				enumerable: true,
				comparable: true,
				searchable: true,
				fragmentable: false,
				absentValue: 0
			});
			let res = atr.toMinimalTemplate("explicit");
			assert.fieldValues(res, {
				name: 'foo',
				type: 'INTEGER()',
				notNull: true,
				unique: true,
				check: 'foo.length > 10',
				foreign: 'foo_table',
				enumerable: true,
				searchable: true,
				absentValue: 0
			});
			assert.allowedFields(res, [ 'name', 'type', 'notNull', 'unique', 'check', 'foreign',
				'enumerable', 'searchable', 'absentValue', 'type' ]);
		});

		it ("Produces INTEGER minimal template from all defined fields, object format", () => {
			let atr = new Attribute({
				name: 'foo',
				type: Types.INTEGER(),
				notNull: true,
				primary: false,
				unique: true,
				check: 'foo.length > 10',
				foreign: 'foo_table',
				enumerable: true,
				comparable: true,
				searchable: true,
				fragmentable: false,
				absentValue: 0
			});
			let res = atr.toMinimalTemplate("object");
			assert.fieldValues(res, {
				name: 'foo',
				type: 'Types.INTEGER()',
				notNull: true,
				unique: true,
				check: 'foo.length > 10',
				foreign: 'foo_table',
				enumerable: true,
				searchable: true,
				absentValue: 0
			});
			assert.allowedFields(res, [ 'name', 'type', 'notNull', 'unique', 'check', 'foreign',
				'enumerable', 'searchable', 'absentValue', 'type' ]);
		});

		it ("Produces INTEGER complete template from only type field, internal format", () => {
			let atr = new Attribute({
				type: Types.INTEGER()
			});
			let res = atr.toCompleteTemplate("internal");
			assert.fieldValues(res, {
				type: 'INTEGER/INTEGER/number {"min":null,"max":null,"mul":1}',
				notNull: false,
				primary: false,
				unique: false,
				check: null,
				foreign: null,
				enumerable: false,
				comparable: true,
				searchable: false,
				fragmentable: false,
				absentValue: null
			});
			assert.allowedFields(res, [ 'type', 'notNull', 'primary', 'unique', 'check', 'foreign',
				'enumerable', 'comparable', 'searchable', 'fragmentable', 'absentValue', 'type' ]);
		});

		it ("Produces INTEGER complete template from only type field, explicit format", () => {
			let atr = new Attribute({
				type: Types.INTEGER()
			});
			let res = atr.toCompleteTemplate("explicit");
			assert.fieldValues(res, {
				type: 'INTEGER()',
				notNull: false,
				primary: false,
				unique: false,
				check: null,
				foreign: null,
				enumerable: false,
				comparable: true,
				searchable: false,
				fragmentable: false,
				absentValue: null
			});
			assert.allowedFields(res, [ 'type', 'notNull', 'primary', 'unique', 'check', 'foreign',
				'enumerable', 'comparable', 'searchable', 'fragmentable', 'absentValue', 'type' ]);
		});

		it ("Produces INTEGER complete template from only type field, object format", () => {
			let atr = new Attribute({
				type: Types.INTEGER()
			});
			let res = atr.toCompleteTemplate("object");
			assert.fieldValues(res, {
				type: 'Types.INTEGER()',
				notNull: false,
				primary: false,
				unique: false,
				check: null,
				foreign: null,
				enumerable: false,
				comparable: true,
				searchable: false,
				fragmentable: false,
				absentValue: null
			});
			assert.allowedFields(res, [ 'type', 'notNull', 'primary', 'unique', 'check', 'foreign',
				'enumerable', 'comparable', 'searchable', 'fragmentable', 'absentValue', 'type' ]);
		});

		it ("Produces INTEGER complete template from some defined fields, internal format", () => {
			let atr = new Attribute({
				name: 'foo',
				type: Types.INTEGER(),
				notNull: true,
				primary: false,
				check: 'foo.length > 10',
				enumerable: true,
				comparable: true
			});
			let res = atr.toCompleteTemplate("internal");
			assert.fieldValues(res, {
				name: 'foo',
				type: 'INTEGER/INTEGER/number {"min":null,"max":null,"mul":1}',
				notNull: true,
				primary: false,
				unique: false,
				check: 'foo.length > 10',
				foreign: null,
				enumerable: true,
				comparable: true,
				searchable: false,
				fragmentable: false,
				absentValue: null
			});
			assert.allowedFields(res, [ 'name', 'type', 'notNull', 'primary', 'unique', 'check',
				'foreign', 'enumerable', 'comparable', 'searchable', 'fragmentable', 'absentValue',
				'type' ]);
		});

		it ("Produces INTEGER complete template from some defined fields, explicit format", () => {
			let atr = new Attribute({
				name: 'foo',
				type: Types.INTEGER(),
				notNull: true,
				primary: false,
				check: 'foo.length > 10',
				enumerable: true,
				comparable: true
			});
			let res = atr.toCompleteTemplate("explicit");
			assert.fieldValues(res, {
				name: 'foo',
				type: 'INTEGER()',
				notNull: true,
				primary: false,
				unique: false,
				check: 'foo.length > 10',
				foreign: null,
				enumerable: true,
				comparable: true,
				searchable: false,
				fragmentable: false,
				absentValue: null
			});
			assert.allowedFields(res, [ 'name', 'type', 'notNull', 'primary', 'unique', 'check',
				'foreign', 'enumerable', 'comparable', 'searchable', 'fragmentable', 'absentValue',
				'type' ]);
		});

		it ("Produces INTEGER complete template from some defined fields, object format", () => {
			let atr = new Attribute({
				name: 'foo',
				type: Types.INTEGER(),
				notNull: true,
				primary: false,
				check: 'foo.length > 10',
				enumerable: true,
				comparable: true
			});
			let res = atr.toCompleteTemplate("object");
			assert.fieldValues(res, {
				name: 'foo',
				type: 'Types.INTEGER()',
				notNull: true,
				primary: false,
				unique: false,
				check: 'foo.length > 10',
				foreign: null,
				enumerable: true,
				comparable: true,
				searchable: false,
				fragmentable: false,
				absentValue: null
			});
			assert.allowedFields(res, [ 'name', 'type', 'notNull', 'primary', 'unique', 'check',
				'foreign', 'enumerable', 'comparable', 'searchable', 'fragmentable', 'absentValue',
				'type' ]);
		});

		it ("Produces INTEGER complete template from all defined fields, internal format", () => {
			let atr = new Attribute({
				name: 'foo',
				type: Types.INTEGER(),
				notNull: true,
				primary: false,
				unique: true,
				check: 'foo.length > 10',
				foreign: 'foo_table',
				enumerable: true,
				comparable: true,
				searchable: true,
				fragmentable: false,
				absentValue: 0
			});
			let res = atr.toCompleteTemplate("internal");
			assert.fieldValues(res, {
				name: 'foo',
				type: 'INTEGER/INTEGER/number {"min":null,"max":null,"mul":1}',
				notNull: true,
				primary: false,
				unique: true,
				check: 'foo.length > 10',
				foreign: 'foo_table',
				enumerable: true,
				comparable: true,
				searchable: true,
				fragmentable: false,
				absentValue: 0
			});
			assert.allowedFields(res, [ 'name', 'type', 'notNull', 'primary', 'unique', 'check',
				'foreign', 'enumerable', 'comparable', 'searchable', 'fragmentable', 'absentValue',
				'type' ]);
		});

		it ("Produces INTEGER complete template from all defined fields, explicit format", () => {
			let atr = new Attribute({
				name: 'foo',
				type: Types.INTEGER(),
				notNull: true,
				primary: false,
				unique: true,
				check: 'foo.length > 10',
				foreign: 'foo_table',
				enumerable: true,
				comparable: true,
				searchable: true,
				fragmentable: false,
				absentValue: 0
			});
			let res = atr.toCompleteTemplate("explicit");
			assert.fieldValues(res, {
				name: 'foo',
				type: 'INTEGER()',
				notNull: true,
				primary: false,
				unique: true,
				check: 'foo.length > 10',
				foreign: 'foo_table',
				enumerable: true,
				comparable: true,
				searchable: true,
				fragmentable: false,
				absentValue: 0
			});
			assert.allowedFields(res, [ 'name', 'type', 'notNull', 'primary', 'unique', 'check',
				'foreign', 'enumerable', 'comparable', 'searchable', 'fragmentable', 'absentValue',
				'type' ]);
		});

		it ("Produces INTEGER complete template from all defined fields, object format", () => {
			let atr = new Attribute({
				name: 'foo',
				type: Types.INTEGER(),
				notNull: true,
				primary: false,
				unique: true,
				check: 'foo.length > 10',
				foreign: 'foo_table',
				enumerable: true,
				comparable: true,
				searchable: true,
				fragmentable: false,
				absentValue: 0
			});
			let res = atr.toCompleteTemplate("object");
			assert.fieldValues(res, {
				name: 'foo',
				type: 'Types.INTEGER()',
				notNull: true,
				primary: false,
				unique: true,
				check: 'foo.length > 10',
				foreign: 'foo_table',
				enumerable: true,
				comparable: true,
				searchable: true,
				fragmentable: false,
				absentValue: 0
			});
			assert.allowedFields(res, [ 'name', 'type', 'notNull', 'primary', 'unique', 'check',
				'foreign', 'enumerable', 'comparable', 'searchable', 'fragmentable', 'absentValue',
				'type' ]);
		});

		it ("Produces BIGINT minimal template from only type field, internal format", () => {
			let atr = new Attribute({
				type: Types.BIGINT()
			});
			let res = atr.toMinimalTemplate("internal");
			assert.fieldValues(res, {
				type: 'BIGINT/BIGINT/number {"min":null,"max":null,"mul":1}'
			});
			assert.allowedFields(res, [ 'type', 'type' ]);
		});

		it ("Produces BIGINT minimal template from only type field, explicit format", () => {
			let atr = new Attribute({
				type: Types.BIGINT()
			});
			let res = atr.toMinimalTemplate("explicit");
			assert.fieldValues(res, {
				type: 'BIGINT()'
			});
			assert.allowedFields(res, [ 'type', 'type' ]);
		});

		it ("Produces BIGINT minimal template from only type field, object format", () => {
			let atr = new Attribute({
				type: Types.BIGINT()
			});
			let res = atr.toMinimalTemplate("object");
			assert.fieldValues(res, {
				type: 'Types.BIGINT()'
			});
			assert.allowedFields(res, [ 'type', 'type' ]);
		});

		it ("Produces BIGINT minimal template from some defined fields, internal format", () => {
			let atr = new Attribute({
				name: 'foo',
				type: Types.BIGINT(),
				notNull: true,
				primary: false,
				check: 'foo.length > 10',
				enumerable: true,
				comparable: true
			});
			let res = atr.toMinimalTemplate("internal");
			assert.fieldValues(res, {
				name: 'foo',
				type: 'BIGINT/BIGINT/number {"min":null,"max":null,"mul":1}',
				notNull: true,
				check: 'foo.length > 10',
				enumerable: true
			});
			assert.allowedFields(res, [ 'name', 'type', 'notNull', 'check', 'enumerable', 'type' ]);
		});

		it ("Produces BIGINT minimal template from some defined fields, explicit format", () => {
			let atr = new Attribute({
				name: 'foo',
				type: Types.BIGINT(),
				notNull: true,
				primary: false,
				check: 'foo.length > 10',
				enumerable: true,
				comparable: true
			});
			let res = atr.toMinimalTemplate("explicit");
			assert.fieldValues(res, {
				name: 'foo',
				type: 'BIGINT()',
				notNull: true,
				check: 'foo.length > 10',
				enumerable: true
			});
			assert.allowedFields(res, [ 'name', 'type', 'notNull', 'check', 'enumerable', 'type' ]);
		});

		it ("Produces BIGINT minimal template from some defined fields, object format", () => {
			let atr = new Attribute({
				name: 'foo',
				type: Types.BIGINT(),
				notNull: true,
				primary: false,
				check: 'foo.length > 10',
				enumerable: true,
				comparable: true
			});
			let res = atr.toMinimalTemplate("object");
			assert.fieldValues(res, {
				name: 'foo',
				type: 'Types.BIGINT()',
				notNull: true,
				check: 'foo.length > 10',
				enumerable: true
			});
			assert.allowedFields(res, [ 'name', 'type', 'notNull', 'check', 'enumerable', 'type' ]);
		});

		it ("Produces BIGINT minimal template from all defined fields, internal format", () => {
			let atr = new Attribute({
				name: 'foo',
				type: Types.BIGINT(),
				notNull: true,
				primary: false,
				unique: true,
				check: 'foo.length > 10',
				foreign: 'foo_table',
				enumerable: true,
				comparable: true,
				searchable: true,
				fragmentable: false,
				absentValue: 0
			});
			let res = atr.toMinimalTemplate("internal");
			assert.fieldValues(res, {
				name: 'foo',
				type: 'BIGINT/BIGINT/number {"min":null,"max":null,"mul":1}',
				notNull: true,
				unique: true,
				check: 'foo.length > 10',
				foreign: 'foo_table',
				enumerable: true,
				searchable: true,
				absentValue: 0
			});
			assert.allowedFields(res, [ 'name', 'type', 'notNull', 'unique', 'check', 'foreign',
				'enumerable', 'searchable', 'absentValue', 'type' ]);
		});

		it ("Produces BIGINT minimal template from all defined fields, explicit format", () => {
			let atr = new Attribute({
				name: 'foo',
				type: Types.BIGINT(),
				notNull: true,
				primary: false,
				unique: true,
				check: 'foo.length > 10',
				foreign: 'foo_table',
				enumerable: true,
				comparable: true,
				searchable: true,
				fragmentable: false,
				absentValue: 0
			});
			let res = atr.toMinimalTemplate("explicit");
			assert.fieldValues(res, {
				name: 'foo',
				type: 'BIGINT()',
				notNull: true,
				unique: true,
				check: 'foo.length > 10',
				foreign: 'foo_table',
				enumerable: true,
				searchable: true,
				absentValue: 0
			});
			assert.allowedFields(res, [ 'name', 'type', 'notNull', 'unique', 'check', 'foreign',
				'enumerable', 'searchable', 'absentValue', 'type' ]);
		});

		it ("Produces BIGINT minimal template from all defined fields, object format", () => {
			let atr = new Attribute({
				name: 'foo',
				type: Types.BIGINT(),
				notNull: true,
				primary: false,
				unique: true,
				check: 'foo.length > 10',
				foreign: 'foo_table',
				enumerable: true,
				comparable: true,
				searchable: true,
				fragmentable: false,
				absentValue: 0
			});
			let res = atr.toMinimalTemplate("object");
			assert.fieldValues(res, {
				name: 'foo',
				type: 'Types.BIGINT()',
				notNull: true,
				unique: true,
				check: 'foo.length > 10',
				foreign: 'foo_table',
				enumerable: true,
				searchable: true,
				absentValue: 0
			});
			assert.allowedFields(res, [ 'name', 'type', 'notNull', 'unique', 'check', 'foreign',
				'enumerable', 'searchable', 'absentValue', 'type' ]);
		});

		it ("Produces BIGINT complete template from only type field, internal format", () => {
			let atr = new Attribute({
				type: Types.BIGINT()
			});
			let res = atr.toCompleteTemplate("internal");
			assert.fieldValues(res, {
				type: 'BIGINT/BIGINT/number {"min":null,"max":null,"mul":1}',
				notNull: false,
				primary: false,
				unique: false,
				check: null,
				foreign: null,
				enumerable: false,
				comparable: true,
				searchable: false,
				fragmentable: false,
				absentValue: null
			});
			assert.allowedFields(res, [ 'type', 'notNull', 'primary', 'unique', 'check', 'foreign',
				'enumerable', 'comparable', 'searchable', 'fragmentable', 'absentValue', 'type' ]);
		});

		it ("Produces BIGINT complete template from only type field, explicit format", () => {
			let atr = new Attribute({
				type: Types.BIGINT()
			});
			let res = atr.toCompleteTemplate("explicit");
			assert.fieldValues(res, {
				type: 'BIGINT()',
				notNull: false,
				primary: false,
				unique: false,
				check: null,
				foreign: null,
				enumerable: false,
				comparable: true,
				searchable: false,
				fragmentable: false,
				absentValue: null
			});
			assert.allowedFields(res, [ 'type', 'notNull', 'primary', 'unique', 'check', 'foreign',
				'enumerable', 'comparable', 'searchable', 'fragmentable', 'absentValue', 'type' ]);
		});

		it ("Produces BIGINT complete template from only type field, object format", () => {
			let atr = new Attribute({
				type: Types.BIGINT()
			});
			let res = atr.toCompleteTemplate("object");
			assert.fieldValues(res, {
				type: 'Types.BIGINT()',
				notNull: false,
				primary: false,
				unique: false,
				check: null,
				foreign: null,
				enumerable: false,
				comparable: true,
				searchable: false,
				fragmentable: false,
				absentValue: null
			});
			assert.allowedFields(res, [ 'type', 'notNull', 'primary', 'unique', 'check', 'foreign',
				'enumerable', 'comparable', 'searchable', 'fragmentable', 'absentValue', 'type' ]);
		});

		it ("Produces BIGINT complete template from some defined fields, internal format", () => {
			let atr = new Attribute({
				name: 'foo',
				type: Types.BIGINT(),
				notNull: true,
				primary: false,
				check: 'foo.length > 10',
				enumerable: true,
				comparable: true
			});
			let res = atr.toCompleteTemplate("internal");
			assert.fieldValues(res, {
				name: 'foo',
				type: 'BIGINT/BIGINT/number {"min":null,"max":null,"mul":1}',
				notNull: true,
				primary: false,
				unique: false,
				check: 'foo.length > 10',
				foreign: null,
				enumerable: true,
				comparable: true,
				searchable: false,
				fragmentable: false,
				absentValue: null
			});
			assert.allowedFields(res, [ 'name', 'type', 'notNull', 'primary', 'unique', 'check',
				'foreign', 'enumerable', 'comparable', 'searchable', 'fragmentable', 'absentValue',
				'type' ]);
		});

		it ("Produces BIGINT complete template from some defined fields, explicit format", () => {
			let atr = new Attribute({
				name: 'foo',
				type: Types.BIGINT(),
				notNull: true,
				primary: false,
				check: 'foo.length > 10',
				enumerable: true,
				comparable: true
			});
			let res = atr.toCompleteTemplate("explicit");
			assert.fieldValues(res, {
				name: 'foo',
				type: 'BIGINT()',
				notNull: true,
				primary: false,
				unique: false,
				check: 'foo.length > 10',
				foreign: null,
				enumerable: true,
				comparable: true,
				searchable: false,
				fragmentable: false,
				absentValue: null
			});
			assert.allowedFields(res, [ 'name', 'type', 'notNull', 'primary', 'unique', 'check',
				'foreign', 'enumerable', 'comparable', 'searchable', 'fragmentable', 'absentValue',
				'type' ]);
		});

		it ("Produces BIGINT complete template from some defined fields, object format", () => {
			let atr = new Attribute({
				name: 'foo',
				type: Types.BIGINT(),
				notNull: true,
				primary: false,
				check: 'foo.length > 10',
				enumerable: true,
				comparable: true
			});
			let res = atr.toCompleteTemplate("object");
			assert.fieldValues(res, {
				name: 'foo',
				type: 'Types.BIGINT()',
				notNull: true,
				primary: false,
				unique: false,
				check: 'foo.length > 10',
				foreign: null,
				enumerable: true,
				comparable: true,
				searchable: false,
				fragmentable: false,
				absentValue: null
			});
			assert.allowedFields(res, [ 'name', 'type', 'notNull', 'primary', 'unique', 'check',
				'foreign', 'enumerable', 'comparable', 'searchable', 'fragmentable', 'absentValue',
				'type' ]);
		});

		it ("Produces BIGINT complete template from all defined fields, internal format", () => {
			let atr = new Attribute({
				name: 'foo',
				type: Types.BIGINT(),
				notNull: true,
				primary: false,
				unique: true,
				check: 'foo.length > 10',
				foreign: 'foo_table',
				enumerable: true,
				comparable: true,
				searchable: true,
				fragmentable: false,
				absentValue: 0
			});
			let res = atr.toCompleteTemplate("internal");
			assert.fieldValues(res, {
				name: 'foo',
				type: 'BIGINT/BIGINT/number {"min":null,"max":null,"mul":1}',
				notNull: true,
				primary: false,
				unique: true,
				check: 'foo.length > 10',
				foreign: 'foo_table',
				enumerable: true,
				comparable: true,
				searchable: true,
				fragmentable: false,
				absentValue: 0
			});
			assert.allowedFields(res, [ 'name', 'type', 'notNull', 'primary', 'unique', 'check',
				'foreign', 'enumerable', 'comparable', 'searchable', 'fragmentable', 'absentValue',
				'type' ]);
		});

		it ("Produces BIGINT complete template from all defined fields, explicit format", () => {
			let atr = new Attribute({
				name: 'foo',
				type: Types.BIGINT(),
				notNull: true,
				primary: false,
				unique: true,
				check: 'foo.length > 10',
				foreign: 'foo_table',
				enumerable: true,
				comparable: true,
				searchable: true,
				fragmentable: false,
				absentValue: 0
			});
			let res = atr.toCompleteTemplate("explicit");
			assert.fieldValues(res, {
				name: 'foo',
				type: 'BIGINT()',
				notNull: true,
				primary: false,
				unique: true,
				check: 'foo.length > 10',
				foreign: 'foo_table',
				enumerable: true,
				comparable: true,
				searchable: true,
				fragmentable: false,
				absentValue: 0
			});
			assert.allowedFields(res, [ 'name', 'type', 'notNull', 'primary', 'unique', 'check',
				'foreign', 'enumerable', 'comparable', 'searchable', 'fragmentable', 'absentValue',
				'type' ]);
		});

		it ("Produces BIGINT complete template from all defined fields, object format", () => {
			let atr = new Attribute({
				name: 'foo',
				type: Types.BIGINT(),
				notNull: true,
				primary: false,
				unique: true,
				check: 'foo.length > 10',
				foreign: 'foo_table',
				enumerable: true,
				comparable: true,
				searchable: true,
				fragmentable: false,
				absentValue: 0
			});
			let res = atr.toCompleteTemplate("object");
			assert.fieldValues(res, {
				name: 'foo',
				type: 'Types.BIGINT()',
				notNull: true,
				primary: false,
				unique: true,
				check: 'foo.length > 10',
				foreign: 'foo_table',
				enumerable: true,
				comparable: true,
				searchable: true,
				fragmentable: false,
				absentValue: 0
			});
			assert.allowedFields(res, [ 'name', 'type', 'notNull', 'primary', 'unique', 'check',
				'foreign', 'enumerable', 'comparable', 'searchable', 'fragmentable', 'absentValue',
				'type' ]);
		});

		it ("Produces FLOAT minimal template from only type field, internal format", () => {
			let atr = new Attribute({
				type: Types.FLOAT()
			});
			let res = atr.toMinimalTemplate("internal");
			assert.fieldValues(res, {
				type: 'FLOAT/FLOAT/number {"min":null,"max":null,"mul":1}'
			});
			assert.allowedFields(res, [ 'type', 'type' ]);
		});

		it ("Produces FLOAT minimal template from only type field, explicit format", () => {
			let atr = new Attribute({
				type: Types.FLOAT()
			});
			let res = atr.toMinimalTemplate("explicit");
			assert.fieldValues(res, {
				type: 'FLOAT()'
			});
			assert.allowedFields(res, [ 'type', 'type' ]);
		});

		it ("Produces FLOAT minimal template from only type field, object format", () => {
			let atr = new Attribute({
				type: Types.FLOAT()
			});
			let res = atr.toMinimalTemplate("object");
			assert.fieldValues(res, {
				type: 'Types.FLOAT()'
			});
			assert.allowedFields(res, [ 'type', 'type' ]);
		});

		it ("Produces FLOAT minimal template from some defined fields, internal format", () => {
			let atr = new Attribute({
				name: 'foo',
				type: Types.FLOAT(),
				notNull: true,
				primary: false,
				check: 'foo.length > 10',
				enumerable: true,
				comparable: true
			});
			let res = atr.toMinimalTemplate("internal");
			assert.fieldValues(res, {
				name: 'foo',
				type: 'FLOAT/FLOAT/number {"min":null,"max":null,"mul":1}',
				notNull: true,
				check: 'foo.length > 10',
				enumerable: true
			});
			assert.allowedFields(res, [ 'name', 'type', 'notNull', 'check', 'enumerable', 'type' ]);
		});

		it ("Produces FLOAT minimal template from some defined fields, explicit format", () => {
			let atr = new Attribute({
				name: 'foo',
				type: Types.FLOAT(),
				notNull: true,
				primary: false,
				check: 'foo.length > 10',
				enumerable: true,
				comparable: true
			});
			let res = atr.toMinimalTemplate("explicit");
			assert.fieldValues(res, {
				name: 'foo',
				type: 'FLOAT()',
				notNull: true,
				check: 'foo.length > 10',
				enumerable: true
			});
			assert.allowedFields(res, [ 'name', 'type', 'notNull', 'check', 'enumerable', 'type' ]);
		});

		it ("Produces FLOAT minimal template from some defined fields, object format", () => {
			let atr = new Attribute({
				name: 'foo',
				type: Types.FLOAT(),
				notNull: true,
				primary: false,
				check: 'foo.length > 10',
				enumerable: true,
				comparable: true
			});
			let res = atr.toMinimalTemplate("object");
			assert.fieldValues(res, {
				name: 'foo',
				type: 'Types.FLOAT()',
				notNull: true,
				check: 'foo.length > 10',
				enumerable: true
			});
			assert.allowedFields(res, [ 'name', 'type', 'notNull', 'check', 'enumerable', 'type' ]);
		});

		it ("Produces FLOAT minimal template from all defined fields, internal format", () => {
			let atr = new Attribute({
				name: 'foo',
				type: Types.FLOAT(),
				notNull: true,
				primary: false,
				unique: true,
				check: 'foo.length > 10',
				foreign: 'foo_table',
				enumerable: true,
				comparable: true,
				searchable: true,
				fragmentable: false,
				absentValue: 0
			});
			let res = atr.toMinimalTemplate("internal");
			assert.fieldValues(res, {
				name: 'foo',
				type: 'FLOAT/FLOAT/number {"min":null,"max":null,"mul":1}',
				notNull: true,
				unique: true,
				check: 'foo.length > 10',
				foreign: 'foo_table',
				enumerable: true,
				searchable: true,
				absentValue: 0
			});
			assert.allowedFields(res, [ 'name', 'type', 'notNull', 'unique', 'check', 'foreign',
				'enumerable', 'searchable', 'absentValue', 'type' ]);
		});

		it ("Produces FLOAT minimal template from all defined fields, explicit format", () => {
			let atr = new Attribute({
				name: 'foo',
				type: Types.FLOAT(),
				notNull: true,
				primary: false,
				unique: true,
				check: 'foo.length > 10',
				foreign: 'foo_table',
				enumerable: true,
				comparable: true,
				searchable: true,
				fragmentable: false,
				absentValue: 0
			});
			let res = atr.toMinimalTemplate("explicit");
			assert.fieldValues(res, {
				name: 'foo',
				type: 'FLOAT()',
				notNull: true,
				unique: true,
				check: 'foo.length > 10',
				foreign: 'foo_table',
				enumerable: true,
				searchable: true,
				absentValue: 0
			});
			assert.allowedFields(res, [ 'name', 'type', 'notNull', 'unique', 'check', 'foreign',
				'enumerable', 'searchable', 'absentValue', 'type' ]);
		});

		it ("Produces FLOAT minimal template from all defined fields, object format", () => {
			let atr = new Attribute({
				name: 'foo',
				type: Types.FLOAT(),
				notNull: true,
				primary: false,
				unique: true,
				check: 'foo.length > 10',
				foreign: 'foo_table',
				enumerable: true,
				comparable: true,
				searchable: true,
				fragmentable: false,
				absentValue: 0
			});
			let res = atr.toMinimalTemplate("object");
			assert.fieldValues(res, {
				name: 'foo',
				type: 'Types.FLOAT()',
				notNull: true,
				unique: true,
				check: 'foo.length > 10',
				foreign: 'foo_table',
				enumerable: true,
				searchable: true,
				absentValue: 0
			});
			assert.allowedFields(res, [ 'name', 'type', 'notNull', 'unique', 'check', 'foreign',
				'enumerable', 'searchable', 'absentValue', 'type' ]);
		});

		it ("Produces FLOAT complete template from only type field, internal format", () => {
			let atr = new Attribute({
				type: Types.FLOAT()
			});
			let res = atr.toCompleteTemplate("internal");
			assert.fieldValues(res, {
				type: 'FLOAT/FLOAT/number {"min":null,"max":null,"mul":1}',
				notNull: false,
				primary: false,
				unique: false,
				check: null,
				foreign: null,
				enumerable: false,
				comparable: true,
				searchable: false,
				fragmentable: false,
				absentValue: null
			});
			assert.allowedFields(res, [ 'type', 'notNull', 'primary', 'unique', 'check', 'foreign',
				'enumerable', 'comparable', 'searchable', 'fragmentable', 'absentValue', 'type' ]);
		});

		it ("Produces FLOAT complete template from only type field, explicit format", () => {
			let atr = new Attribute({
				type: Types.FLOAT()
			});
			let res = atr.toCompleteTemplate("explicit");
			assert.fieldValues(res, {
				type: 'FLOAT()',
				notNull: false,
				primary: false,
				unique: false,
				check: null,
				foreign: null,
				enumerable: false,
				comparable: true,
				searchable: false,
				fragmentable: false,
				absentValue: null
			});
			assert.allowedFields(res, [ 'type', 'notNull', 'primary', 'unique', 'check', 'foreign',
				'enumerable', 'comparable', 'searchable', 'fragmentable', 'absentValue', 'type' ]);
		});

		it ("Produces FLOAT complete template from only type field, object format", () => {
			let atr = new Attribute({
				type: Types.FLOAT()
			});
			let res = atr.toCompleteTemplate("object");
			assert.fieldValues(res, {
				type: 'Types.FLOAT()',
				notNull: false,
				primary: false,
				unique: false,
				check: null,
				foreign: null,
				enumerable: false,
				comparable: true,
				searchable: false,
				fragmentable: false,
				absentValue: null
			});
			assert.allowedFields(res, [ 'type', 'notNull', 'primary', 'unique', 'check', 'foreign',
				'enumerable', 'comparable', 'searchable', 'fragmentable', 'absentValue', 'type' ]);
		});

		it ("Produces FLOAT complete template from some defined fields, internal format", () => {
			let atr = new Attribute({
				name: 'foo',
				type: Types.FLOAT(),
				notNull: true,
				primary: false,
				check: 'foo.length > 10',
				enumerable: true,
				comparable: true
			});
			let res = atr.toCompleteTemplate("internal");
			assert.fieldValues(res, {
				name: 'foo',
				type: 'FLOAT/FLOAT/number {"min":null,"max":null,"mul":1}',
				notNull: true,
				primary: false,
				unique: false,
				check: 'foo.length > 10',
				foreign: null,
				enumerable: true,
				comparable: true,
				searchable: false,
				fragmentable: false,
				absentValue: null
			});
			assert.allowedFields(res, [ 'name', 'type', 'notNull', 'primary', 'unique', 'check',
				'foreign', 'enumerable', 'comparable', 'searchable', 'fragmentable', 'absentValue',
				'type' ]);
		});

		it ("Produces FLOAT complete template from some defined fields, explicit format", () => {
			let atr = new Attribute({
				name: 'foo',
				type: Types.FLOAT(),
				notNull: true,
				primary: false,
				check: 'foo.length > 10',
				enumerable: true,
				comparable: true
			});
			let res = atr.toCompleteTemplate("explicit");
			assert.fieldValues(res, {
				name: 'foo',
				type: 'FLOAT()',
				notNull: true,
				primary: false,
				unique: false,
				check: 'foo.length > 10',
				foreign: null,
				enumerable: true,
				comparable: true,
				searchable: false,
				fragmentable: false,
				absentValue: null
			});
			assert.allowedFields(res, [ 'name', 'type', 'notNull', 'primary', 'unique', 'check',
				'foreign', 'enumerable', 'comparable', 'searchable', 'fragmentable', 'absentValue',
				'type' ]);
		});

		it ("Produces FLOAT complete template from some defined fields, object format", () => {
			let atr = new Attribute({
				name: 'foo',
				type: Types.FLOAT(),
				notNull: true,
				primary: false,
				check: 'foo.length > 10',
				enumerable: true,
				comparable: true
			});
			let res = atr.toCompleteTemplate("object");
			assert.fieldValues(res, {
				name: 'foo',
				type: 'Types.FLOAT()',
				notNull: true,
				primary: false,
				unique: false,
				check: 'foo.length > 10',
				foreign: null,
				enumerable: true,
				comparable: true,
				searchable: false,
				fragmentable: false,
				absentValue: null
			});
			assert.allowedFields(res, [ 'name', 'type', 'notNull', 'primary', 'unique', 'check',
				'foreign', 'enumerable', 'comparable', 'searchable', 'fragmentable', 'absentValue',
				'type' ]);
		});

		it ("Produces FLOAT complete template from all defined fields, internal format", () => {
			let atr = new Attribute({
				name: 'foo',
				type: Types.FLOAT(),
				notNull: true,
				primary: false,
				unique: true,
				check: 'foo.length > 10',
				foreign: 'foo_table',
				enumerable: true,
				comparable: true,
				searchable: true,
				fragmentable: false,
				absentValue: 0
			});
			let res = atr.toCompleteTemplate("internal");
			assert.fieldValues(res, {
				name: 'foo',
				type: 'FLOAT/FLOAT/number {"min":null,"max":null,"mul":1}',
				notNull: true,
				primary: false,
				unique: true,
				check: 'foo.length > 10',
				foreign: 'foo_table',
				enumerable: true,
				comparable: true,
				searchable: true,
				fragmentable: false,
				absentValue: 0
			});
			assert.allowedFields(res, [ 'name', 'type', 'notNull', 'primary', 'unique', 'check',
				'foreign', 'enumerable', 'comparable', 'searchable', 'fragmentable', 'absentValue',
				'type' ]);
		});

		it ("Produces FLOAT complete template from all defined fields, explicit format", () => {
			let atr = new Attribute({
				name: 'foo',
				type: Types.FLOAT(),
				notNull: true,
				primary: false,
				unique: true,
				check: 'foo.length > 10',
				foreign: 'foo_table',
				enumerable: true,
				comparable: true,
				searchable: true,
				fragmentable: false,
				absentValue: 0
			});
			let res = atr.toCompleteTemplate("explicit");
			assert.fieldValues(res, {
				name: 'foo',
				type: 'FLOAT()',
				notNull: true,
				primary: false,
				unique: true,
				check: 'foo.length > 10',
				foreign: 'foo_table',
				enumerable: true,
				comparable: true,
				searchable: true,
				fragmentable: false,
				absentValue: 0
			});
			assert.allowedFields(res, [ 'name', 'type', 'notNull', 'primary', 'unique', 'check',
				'foreign', 'enumerable', 'comparable', 'searchable', 'fragmentable', 'absentValue',
				'type' ]);
		});

		it ("Produces FLOAT complete template from all defined fields, object format", () => {
			let atr = new Attribute({
				name: 'foo',
				type: Types.FLOAT(),
				notNull: true,
				primary: false,
				unique: true,
				check: 'foo.length > 10',
				foreign: 'foo_table',
				enumerable: true,
				comparable: true,
				searchable: true,
				fragmentable: false,
				absentValue: 0
			});
			let res = atr.toCompleteTemplate("object");
			assert.fieldValues(res, {
				name: 'foo',
				type: 'Types.FLOAT()',
				notNull: true,
				primary: false,
				unique: true,
				check: 'foo.length > 10',
				foreign: 'foo_table',
				enumerable: true,
				comparable: true,
				searchable: true,
				fragmentable: false,
				absentValue: 0
			});
			assert.allowedFields(res, [ 'name', 'type', 'notNull', 'primary', 'unique', 'check',
				'foreign', 'enumerable', 'comparable', 'searchable', 'fragmentable', 'absentValue',
				'type' ]);
		});

		it ("Produces REAL minimal template from only type field, internal format", () => {
			let atr = new Attribute({
				type: Types.REAL()
			});
			let res = atr.toMinimalTemplate("internal");
			assert.fieldValues(res, {
				type: 'REAL/REAL/number {"min":null,"max":null,"mul":1}'
			});
			assert.allowedFields(res, [ 'type', 'type' ]);
		});

		it ("Produces REAL minimal template from only type field, explicit format", () => {
			let atr = new Attribute({
				type: Types.REAL()
			});
			let res = atr.toMinimalTemplate("explicit");
			assert.fieldValues(res, {
				type: 'REAL()'
			});
			assert.allowedFields(res, [ 'type', 'type' ]);
		});

		it ("Produces REAL minimal template from only type field, object format", () => {
			let atr = new Attribute({
				type: Types.REAL()
			});
			let res = atr.toMinimalTemplate("object");
			assert.fieldValues(res, {
				type: 'Types.REAL()'
			});
			assert.allowedFields(res, [ 'type', 'type' ]);
		});

		it ("Produces REAL minimal template from some defined fields, internal format", () => {
			let atr = new Attribute({
				name: 'foo',
				type: Types.REAL(),
				notNull: true,
				primary: false,
				check: 'foo.length > 10',
				enumerable: true,
				comparable: true
			});
			let res = atr.toMinimalTemplate("internal");
			assert.fieldValues(res, {
				name: 'foo',
				type: 'REAL/REAL/number {"min":null,"max":null,"mul":1}',
				notNull: true,
				check: 'foo.length > 10',
				enumerable: true
			});
			assert.allowedFields(res, [ 'name', 'type', 'notNull', 'check', 'enumerable', 'type' ]);
		});

		it ("Produces REAL minimal template from some defined fields, explicit format", () => {
			let atr = new Attribute({
				name: 'foo',
				type: Types.REAL(),
				notNull: true,
				primary: false,
				check: 'foo.length > 10',
				enumerable: true,
				comparable: true
			});
			let res = atr.toMinimalTemplate("explicit");
			assert.fieldValues(res, {
				name: 'foo',
				type: 'REAL()',
				notNull: true,
				check: 'foo.length > 10',
				enumerable: true
			});
			assert.allowedFields(res, [ 'name', 'type', 'notNull', 'check', 'enumerable', 'type' ]);
		});

		it ("Produces REAL minimal template from some defined fields, object format", () => {
			let atr = new Attribute({
				name: 'foo',
				type: Types.REAL(),
				notNull: true,
				primary: false,
				check: 'foo.length > 10',
				enumerable: true,
				comparable: true
			});
			let res = atr.toMinimalTemplate("object");
			assert.fieldValues(res, {
				name: 'foo',
				type: 'Types.REAL()',
				notNull: true,
				check: 'foo.length > 10',
				enumerable: true
			});
			assert.allowedFields(res, [ 'name', 'type', 'notNull', 'check', 'enumerable', 'type' ]);
		});

		it ("Produces REAL minimal template from all defined fields, internal format", () => {
			let atr = new Attribute({
				name: 'foo',
				type: Types.REAL(),
				notNull: true,
				primary: false,
				unique: true,
				check: 'foo.length > 10',
				foreign: 'foo_table',
				enumerable: true,
				comparable: true,
				searchable: true,
				fragmentable: false,
				absentValue: 0
			});
			let res = atr.toMinimalTemplate("internal");
			assert.fieldValues(res, {
				name: 'foo',
				type: 'REAL/REAL/number {"min":null,"max":null,"mul":1}',
				notNull: true,
				unique: true,
				check: 'foo.length > 10',
				foreign: 'foo_table',
				enumerable: true,
				searchable: true,
				absentValue: 0
			});
			assert.allowedFields(res, [ 'name', 'type', 'notNull', 'unique', 'check', 'foreign',
				'enumerable', 'searchable', 'absentValue', 'type' ]);
		});

		it ("Produces REAL minimal template from all defined fields, explicit format", () => {
			let atr = new Attribute({
				name: 'foo',
				type: Types.REAL(),
				notNull: true,
				primary: false,
				unique: true,
				check: 'foo.length > 10',
				foreign: 'foo_table',
				enumerable: true,
				comparable: true,
				searchable: true,
				fragmentable: false,
				absentValue: 0
			});
			let res = atr.toMinimalTemplate("explicit");
			assert.fieldValues(res, {
				name: 'foo',
				type: 'REAL()',
				notNull: true,
				unique: true,
				check: 'foo.length > 10',
				foreign: 'foo_table',
				enumerable: true,
				searchable: true,
				absentValue: 0
			});
			assert.allowedFields(res, [ 'name', 'type', 'notNull', 'unique', 'check', 'foreign',
				'enumerable', 'searchable', 'absentValue', 'type' ]);
		});

		it ("Produces REAL minimal template from all defined fields, object format", () => {
			let atr = new Attribute({
				name: 'foo',
				type: Types.REAL(),
				notNull: true,
				primary: false,
				unique: true,
				check: 'foo.length > 10',
				foreign: 'foo_table',
				enumerable: true,
				comparable: true,
				searchable: true,
				fragmentable: false,
				absentValue: 0
			});
			let res = atr.toMinimalTemplate("object");
			assert.fieldValues(res, {
				name: 'foo',
				type: 'Types.REAL()',
				notNull: true,
				unique: true,
				check: 'foo.length > 10',
				foreign: 'foo_table',
				enumerable: true,
				searchable: true,
				absentValue: 0
			});
			assert.allowedFields(res, [ 'name', 'type', 'notNull', 'unique', 'check', 'foreign',
				'enumerable', 'searchable', 'absentValue', 'type' ]);
		});

		it ("Produces REAL complete template from only type field, internal format", () => {
			let atr = new Attribute({
				type: Types.REAL()
			});
			let res = atr.toCompleteTemplate("internal");
			assert.fieldValues(res, {
				type: 'REAL/REAL/number {"min":null,"max":null,"mul":1}',
				notNull: false,
				primary: false,
				unique: false,
				check: null,
				foreign: null,
				enumerable: false,
				comparable: true,
				searchable: false,
				fragmentable: false,
				absentValue: null
			});
			assert.allowedFields(res, [ 'type', 'notNull', 'primary', 'unique', 'check', 'foreign',
				'enumerable', 'comparable', 'searchable', 'fragmentable', 'absentValue', 'type' ]);
		});

		it ("Produces REAL complete template from only type field, explicit format", () => {
			let atr = new Attribute({
				type: Types.REAL()
			});
			let res = atr.toCompleteTemplate("explicit");
			assert.fieldValues(res, {
				type: 'REAL()',
				notNull: false,
				primary: false,
				unique: false,
				check: null,
				foreign: null,
				enumerable: false,
				comparable: true,
				searchable: false,
				fragmentable: false,
				absentValue: null
			});
			assert.allowedFields(res, [ 'type', 'notNull', 'primary', 'unique', 'check', 'foreign',
				'enumerable', 'comparable', 'searchable', 'fragmentable', 'absentValue', 'type' ]);
		});

		it ("Produces REAL complete template from only type field, object format", () => {
			let atr = new Attribute({
				type: Types.REAL()
			});
			let res = atr.toCompleteTemplate("object");
			assert.fieldValues(res, {
				type: 'Types.REAL()',
				notNull: false,
				primary: false,
				unique: false,
				check: null,
				foreign: null,
				enumerable: false,
				comparable: true,
				searchable: false,
				fragmentable: false,
				absentValue: null
			});
			assert.allowedFields(res, [ 'type', 'notNull', 'primary', 'unique', 'check', 'foreign',
				'enumerable', 'comparable', 'searchable', 'fragmentable', 'absentValue', 'type' ]);
		});

		it ("Produces REAL complete template from some defined fields, internal format", () => {
			let atr = new Attribute({
				name: 'foo',
				type: Types.REAL(),
				notNull: true,
				primary: false,
				check: 'foo.length > 10',
				enumerable: true,
				comparable: true
			});
			let res = atr.toCompleteTemplate("internal");
			assert.fieldValues(res, {
				name: 'foo',
				type: 'REAL/REAL/number {"min":null,"max":null,"mul":1}',
				notNull: true,
				primary: false,
				unique: false,
				check: 'foo.length > 10',
				foreign: null,
				enumerable: true,
				comparable: true,
				searchable: false,
				fragmentable: false,
				absentValue: null
			});
			assert.allowedFields(res, [ 'name', 'type', 'notNull', 'primary', 'unique', 'check',
				'foreign', 'enumerable', 'comparable', 'searchable', 'fragmentable', 'absentValue',
				'type' ]);
		});

		it ("Produces REAL complete template from some defined fields, explicit format", () => {
			let atr = new Attribute({
				name: 'foo',
				type: Types.REAL(),
				notNull: true,
				primary: false,
				check: 'foo.length > 10',
				enumerable: true,
				comparable: true
			});
			let res = atr.toCompleteTemplate("explicit");
			assert.fieldValues(res, {
				name: 'foo',
				type: 'REAL()',
				notNull: true,
				primary: false,
				unique: false,
				check: 'foo.length > 10',
				foreign: null,
				enumerable: true,
				comparable: true,
				searchable: false,
				fragmentable: false,
				absentValue: null
			});
			assert.allowedFields(res, [ 'name', 'type', 'notNull', 'primary', 'unique', 'check',
				'foreign', 'enumerable', 'comparable', 'searchable', 'fragmentable', 'absentValue',
				'type' ]);
		});

		it ("Produces REAL complete template from some defined fields, object format", () => {
			let atr = new Attribute({
				name: 'foo',
				type: Types.REAL(),
				notNull: true,
				primary: false,
				check: 'foo.length > 10',
				enumerable: true,
				comparable: true
			});
			let res = atr.toCompleteTemplate("object");
			assert.fieldValues(res, {
				name: 'foo',
				type: 'Types.REAL()',
				notNull: true,
				primary: false,
				unique: false,
				check: 'foo.length > 10',
				foreign: null,
				enumerable: true,
				comparable: true,
				searchable: false,
				fragmentable: false,
				absentValue: null
			});
			assert.allowedFields(res, [ 'name', 'type', 'notNull', 'primary', 'unique', 'check',
				'foreign', 'enumerable', 'comparable', 'searchable', 'fragmentable', 'absentValue',
				'type' ]);
		});

		it ("Produces REAL complete template from all defined fields, internal format", () => {
			let atr = new Attribute({
				name: 'foo',
				type: Types.REAL(),
				notNull: true,
				primary: false,
				unique: true,
				check: 'foo.length > 10',
				foreign: 'foo_table',
				enumerable: true,
				comparable: true,
				searchable: true,
				fragmentable: false,
				absentValue: 0
			});
			let res = atr.toCompleteTemplate("internal");
			assert.fieldValues(res, {
				name: 'foo',
				type: 'REAL/REAL/number {"min":null,"max":null,"mul":1}',
				notNull: true,
				primary: false,
				unique: true,
				check: 'foo.length > 10',
				foreign: 'foo_table',
				enumerable: true,
				comparable: true,
				searchable: true,
				fragmentable: false,
				absentValue: 0
			});
			assert.allowedFields(res, [ 'name', 'type', 'notNull', 'primary', 'unique', 'check',
				'foreign', 'enumerable', 'comparable', 'searchable', 'fragmentable', 'absentValue',
				'type' ]);
		});

		it ("Produces REAL complete template from all defined fields, explicit format", () => {
			let atr = new Attribute({
				name: 'foo',
				type: Types.REAL(),
				notNull: true,
				primary: false,
				unique: true,
				check: 'foo.length > 10',
				foreign: 'foo_table',
				enumerable: true,
				comparable: true,
				searchable: true,
				fragmentable: false,
				absentValue: 0
			});
			let res = atr.toCompleteTemplate("explicit");
			assert.fieldValues(res, {
				name: 'foo',
				type: 'REAL()',
				notNull: true,
				primary: false,
				unique: true,
				check: 'foo.length > 10',
				foreign: 'foo_table',
				enumerable: true,
				comparable: true,
				searchable: true,
				fragmentable: false,
				absentValue: 0
			});
			assert.allowedFields(res, [ 'name', 'type', 'notNull', 'primary', 'unique', 'check',
				'foreign', 'enumerable', 'comparable', 'searchable', 'fragmentable', 'absentValue',
				'type' ]);
		});

		it ("Produces REAL complete template from all defined fields, object format", () => {
			let atr = new Attribute({
				name: 'foo',
				type: Types.REAL(),
				notNull: true,
				primary: false,
				unique: true,
				check: 'foo.length > 10',
				foreign: 'foo_table',
				enumerable: true,
				comparable: true,
				searchable: true,
				fragmentable: false,
				absentValue: 0
			});
			let res = atr.toCompleteTemplate("object");
			assert.fieldValues(res, {
				name: 'foo',
				type: 'Types.REAL()',
				notNull: true,
				primary: false,
				unique: true,
				check: 'foo.length > 10',
				foreign: 'foo_table',
				enumerable: true,
				comparable: true,
				searchable: true,
				fragmentable: false,
				absentValue: 0
			});
			assert.allowedFields(res, [ 'name', 'type', 'notNull', 'primary', 'unique', 'check',
				'foreign', 'enumerable', 'comparable', 'searchable', 'fragmentable', 'absentValue',
				'type' ]);
		});

		it ("Produces DOUBLE minimal template from only type field, internal format", () => {
			let atr = new Attribute({
				type: Types.DOUBLE()
			});
			let res = atr.toMinimalTemplate("internal");
			assert.fieldValues(res, {
				type: 'DOUBLE/DOUBLE/number {"min":null,"max":null,"mul":1}'
			});
			assert.allowedFields(res, [ 'type', 'type' ]);
		});

		it ("Produces DOUBLE minimal template from only type field, explicit format", () => {
			let atr = new Attribute({
				type: Types.DOUBLE()
			});
			let res = atr.toMinimalTemplate("explicit");
			assert.fieldValues(res, {
				type: 'DOUBLE()'
			});
			assert.allowedFields(res, [ 'type', 'type' ]);
		});

		it ("Produces DOUBLE minimal template from only type field, object format", () => {
			let atr = new Attribute({
				type: Types.DOUBLE()
			});
			let res = atr.toMinimalTemplate("object");
			assert.fieldValues(res, {
				type: 'Types.DOUBLE()'
			});
			assert.allowedFields(res, [ 'type', 'type' ]);
		});

		it ("Produces DOUBLE minimal template from some defined fields, internal format", () => {
			let atr = new Attribute({
				name: 'foo',
				type: Types.DOUBLE(),
				notNull: true,
				primary: false,
				check: 'foo.length > 10',
				enumerable: true,
				comparable: true
			});
			let res = atr.toMinimalTemplate("internal");
			assert.fieldValues(res, {
				name: 'foo',
				type: 'DOUBLE/DOUBLE/number {"min":null,"max":null,"mul":1}',
				notNull: true,
				check: 'foo.length > 10',
				enumerable: true
			});
			assert.allowedFields(res, [ 'name', 'type', 'notNull', 'check', 'enumerable', 'type' ]);
		});

		it ("Produces DOUBLE minimal template from some defined fields, explicit format", () => {
			let atr = new Attribute({
				name: 'foo',
				type: Types.DOUBLE(),
				notNull: true,
				primary: false,
				check: 'foo.length > 10',
				enumerable: true,
				comparable: true
			});
			let res = atr.toMinimalTemplate("explicit");
			assert.fieldValues(res, {
				name: 'foo',
				type: 'DOUBLE()',
				notNull: true,
				check: 'foo.length > 10',
				enumerable: true
			});
			assert.allowedFields(res, [ 'name', 'type', 'notNull', 'check', 'enumerable', 'type' ]);
		});

		it ("Produces DOUBLE minimal template from some defined fields, object format", () => {
			let atr = new Attribute({
				name: 'foo',
				type: Types.DOUBLE(),
				notNull: true,
				primary: false,
				check: 'foo.length > 10',
				enumerable: true,
				comparable: true
			});
			let res = atr.toMinimalTemplate("object");
			assert.fieldValues(res, {
				name: 'foo',
				type: 'Types.DOUBLE()',
				notNull: true,
				check: 'foo.length > 10',
				enumerable: true
			});
			assert.allowedFields(res, [ 'name', 'type', 'notNull', 'check', 'enumerable', 'type' ]);
		});

		it ("Produces DOUBLE minimal template from all defined fields, internal format", () => {
			let atr = new Attribute({
				name: 'foo',
				type: Types.DOUBLE(),
				notNull: true,
				primary: false,
				unique: true,
				check: 'foo.length > 10',
				foreign: 'foo_table',
				enumerable: true,
				comparable: true,
				searchable: true,
				fragmentable: false,
				absentValue: 0
			});
			let res = atr.toMinimalTemplate("internal");
			assert.fieldValues(res, {
				name: 'foo',
				type: 'DOUBLE/DOUBLE/number {"min":null,"max":null,"mul":1}',
				notNull: true,
				unique: true,
				check: 'foo.length > 10',
				foreign: 'foo_table',
				enumerable: true,
				searchable: true,
				absentValue: 0
			});
			assert.allowedFields(res, [ 'name', 'type', 'notNull', 'unique', 'check', 'foreign',
				'enumerable', 'searchable', 'absentValue', 'type' ]);
		});

		it ("Produces DOUBLE minimal template from all defined fields, explicit format", () => {
			let atr = new Attribute({
				name: 'foo',
				type: Types.DOUBLE(),
				notNull: true,
				primary: false,
				unique: true,
				check: 'foo.length > 10',
				foreign: 'foo_table',
				enumerable: true,
				comparable: true,
				searchable: true,
				fragmentable: false,
				absentValue: 0
			});
			let res = atr.toMinimalTemplate("explicit");
			assert.fieldValues(res, {
				name: 'foo',
				type: 'DOUBLE()',
				notNull: true,
				unique: true,
				check: 'foo.length > 10',
				foreign: 'foo_table',
				enumerable: true,
				searchable: true,
				absentValue: 0
			});
			assert.allowedFields(res, [ 'name', 'type', 'notNull', 'unique', 'check', 'foreign',
				'enumerable', 'searchable', 'absentValue', 'type' ]);
		});

		it ("Produces DOUBLE minimal template from all defined fields, object format", () => {
			let atr = new Attribute({
				name: 'foo',
				type: Types.DOUBLE(),
				notNull: true,
				primary: false,
				unique: true,
				check: 'foo.length > 10',
				foreign: 'foo_table',
				enumerable: true,
				comparable: true,
				searchable: true,
				fragmentable: false,
				absentValue: 0
			});
			let res = atr.toMinimalTemplate("object");
			assert.fieldValues(res, {
				name: 'foo',
				type: 'Types.DOUBLE()',
				notNull: true,
				unique: true,
				check: 'foo.length > 10',
				foreign: 'foo_table',
				enumerable: true,
				searchable: true,
				absentValue: 0
			});
			assert.allowedFields(res, [ 'name', 'type', 'notNull', 'unique', 'check', 'foreign',
				'enumerable', 'searchable', 'absentValue', 'type' ]);
		});

		it ("Produces DOUBLE complete template from only type field, internal format", () => {
			let atr = new Attribute({
				type: Types.DOUBLE()
			});
			let res = atr.toCompleteTemplate("internal");
			assert.fieldValues(res, {
				type: 'DOUBLE/DOUBLE/number {"min":null,"max":null,"mul":1}',
				notNull: false,
				primary: false,
				unique: false,
				check: null,
				foreign: null,
				enumerable: false,
				comparable: true,
				searchable: false,
				fragmentable: false,
				absentValue: null
			});
			assert.allowedFields(res, [ 'type', 'notNull', 'primary', 'unique', 'check', 'foreign',
				'enumerable', 'comparable', 'searchable', 'fragmentable', 'absentValue', 'type' ]);
		});

		it ("Produces DOUBLE complete template from only type field, explicit format", () => {
			let atr = new Attribute({
				type: Types.DOUBLE()
			});
			let res = atr.toCompleteTemplate("explicit");
			assert.fieldValues(res, {
				type: 'DOUBLE()',
				notNull: false,
				primary: false,
				unique: false,
				check: null,
				foreign: null,
				enumerable: false,
				comparable: true,
				searchable: false,
				fragmentable: false,
				absentValue: null
			});
			assert.allowedFields(res, [ 'type', 'notNull', 'primary', 'unique', 'check', 'foreign',
				'enumerable', 'comparable', 'searchable', 'fragmentable', 'absentValue', 'type' ]);
		});

		it ("Produces DOUBLE complete template from only type field, object format", () => {
			let atr = new Attribute({
				type: Types.DOUBLE()
			});
			let res = atr.toCompleteTemplate("object");
			assert.fieldValues(res, {
				type: 'Types.DOUBLE()',
				notNull: false,
				primary: false,
				unique: false,
				check: null,
				foreign: null,
				enumerable: false,
				comparable: true,
				searchable: false,
				fragmentable: false,
				absentValue: null
			});
			assert.allowedFields(res, [ 'type', 'notNull', 'primary', 'unique', 'check', 'foreign',
				'enumerable', 'comparable', 'searchable', 'fragmentable', 'absentValue', 'type' ]);
		});

		it ("Produces DOUBLE complete template from some defined fields, internal format", () => {
			let atr = new Attribute({
				name: 'foo',
				type: Types.DOUBLE(),
				notNull: true,
				primary: false,
				check: 'foo.length > 10',
				enumerable: true,
				comparable: true
			});
			let res = atr.toCompleteTemplate("internal");
			assert.fieldValues(res, {
				name: 'foo',
				type: 'DOUBLE/DOUBLE/number {"min":null,"max":null,"mul":1}',
				notNull: true,
				primary: false,
				unique: false,
				check: 'foo.length > 10',
				foreign: null,
				enumerable: true,
				comparable: true,
				searchable: false,
				fragmentable: false,
				absentValue: null
			});
			assert.allowedFields(res, [ 'name', 'type', 'notNull', 'primary', 'unique', 'check',
				'foreign', 'enumerable', 'comparable', 'searchable', 'fragmentable', 'absentValue',
				'type' ]);
		});

		it ("Produces DOUBLE complete template from some defined fields, explicit format", () => {
			let atr = new Attribute({
				name: 'foo',
				type: Types.DOUBLE(),
				notNull: true,
				primary: false,
				check: 'foo.length > 10',
				enumerable: true,
				comparable: true
			});
			let res = atr.toCompleteTemplate("explicit");
			assert.fieldValues(res, {
				name: 'foo',
				type: 'DOUBLE()',
				notNull: true,
				primary: false,
				unique: false,
				check: 'foo.length > 10',
				foreign: null,
				enumerable: true,
				comparable: true,
				searchable: false,
				fragmentable: false,
				absentValue: null
			});
			assert.allowedFields(res, [ 'name', 'type', 'notNull', 'primary', 'unique', 'check',
				'foreign', 'enumerable', 'comparable', 'searchable', 'fragmentable', 'absentValue',
				'type' ]);
		});

		it ("Produces DOUBLE complete template from some defined fields, object format", () => {
			let atr = new Attribute({
				name: 'foo',
				type: Types.DOUBLE(),
				notNull: true,
				primary: false,
				check: 'foo.length > 10',
				enumerable: true,
				comparable: true
			});
			let res = atr.toCompleteTemplate("object");
			assert.fieldValues(res, {
				name: 'foo',
				type: 'Types.DOUBLE()',
				notNull: true,
				primary: false,
				unique: false,
				check: 'foo.length > 10',
				foreign: null,
				enumerable: true,
				comparable: true,
				searchable: false,
				fragmentable: false,
				absentValue: null
			});
			assert.allowedFields(res, [ 'name', 'type', 'notNull', 'primary', 'unique', 'check',
				'foreign', 'enumerable', 'comparable', 'searchable', 'fragmentable', 'absentValue',
				'type' ]);
		});

		it ("Produces DOUBLE complete template from all defined fields, internal format", () => {
			let atr = new Attribute({
				name: 'foo',
				type: Types.DOUBLE(),
				notNull: true,
				primary: false,
				unique: true,
				check: 'foo.length > 10',
				foreign: 'foo_table',
				enumerable: true,
				comparable: true,
				searchable: true,
				fragmentable: false,
				absentValue: 0
			});
			let res = atr.toCompleteTemplate("internal");
			assert.fieldValues(res, {
				name: 'foo',
				type: 'DOUBLE/DOUBLE/number {"min":null,"max":null,"mul":1}',
				notNull: true,
				primary: false,
				unique: true,
				check: 'foo.length > 10',
				foreign: 'foo_table',
				enumerable: true,
				comparable: true,
				searchable: true,
				fragmentable: false,
				absentValue: 0
			});
			assert.allowedFields(res, [ 'name', 'type', 'notNull', 'primary', 'unique', 'check',
				'foreign', 'enumerable', 'comparable', 'searchable', 'fragmentable', 'absentValue',
				'type' ]);
		});

		it ("Produces DOUBLE complete template from all defined fields, explicit format", () => {
			let atr = new Attribute({
				name: 'foo',
				type: Types.DOUBLE(),
				notNull: true,
				primary: false,
				unique: true,
				check: 'foo.length > 10',
				foreign: 'foo_table',
				enumerable: true,
				comparable: true,
				searchable: true,
				fragmentable: false,
				absentValue: 0
			});
			let res = atr.toCompleteTemplate("explicit");
			assert.fieldValues(res, {
				name: 'foo',
				type: 'DOUBLE()',
				notNull: true,
				primary: false,
				unique: true,
				check: 'foo.length > 10',
				foreign: 'foo_table',
				enumerable: true,
				comparable: true,
				searchable: true,
				fragmentable: false,
				absentValue: 0
			});
			assert.allowedFields(res, [ 'name', 'type', 'notNull', 'primary', 'unique', 'check',
				'foreign', 'enumerable', 'comparable', 'searchable', 'fragmentable', 'absentValue',
				'type' ]);
		});

		it ("Produces DOUBLE complete template from all defined fields, object format", () => {
			let atr = new Attribute({
				name: 'foo',
				type: Types.DOUBLE(),
				notNull: true,
				primary: false,
				unique: true,
				check: 'foo.length > 10',
				foreign: 'foo_table',
				enumerable: true,
				comparable: true,
				searchable: true,
				fragmentable: false,
				absentValue: 0
			});
			let res = atr.toCompleteTemplate("object");
			assert.fieldValues(res, {
				name: 'foo',
				type: 'Types.DOUBLE()',
				notNull: true,
				primary: false,
				unique: true,
				check: 'foo.length > 10',
				foreign: 'foo_table',
				enumerable: true,
				comparable: true,
				searchable: true,
				fragmentable: false,
				absentValue: 0
			});
			assert.allowedFields(res, [ 'name', 'type', 'notNull', 'primary', 'unique', 'check',
				'foreign', 'enumerable', 'comparable', 'searchable', 'fragmentable', 'absentValue',
				'type' ]);
		});

		it ("Produces DATETIME minimal template from only type field, internal format", () => {
			let atr = new Attribute({
				type: Types.DATETIME()
			});
			let res = atr.toMinimalTemplate("internal");
			assert.fieldValues(res, {
				type: 'DATETIME/DATETIME/date {"date":true,"time":true}'
			});
			assert.allowedFields(res, [ 'type', 'type' ]);
		});

		it ("Produces DATETIME minimal template from only type field, explicit format", () => {
			let atr = new Attribute({
				type: Types.DATETIME()
			});
			let res = atr.toMinimalTemplate("explicit");
			assert.fieldValues(res, {
				type: 'DATETIME()'
			});
			assert.allowedFields(res, [ 'type', 'type' ]);
		});

		it ("Produces DATETIME minimal template from only type field, object format", () => {
			let atr = new Attribute({
				type: Types.DATETIME()
			});
			let res = atr.toMinimalTemplate("object");
			assert.fieldValues(res, {
				type: 'Types.DATETIME()'
			});
			assert.allowedFields(res, [ 'type', 'type' ]);
		});

		it ("Produces DATETIME minimal template from some defined fields, internal format", () => {
			let atr = new Attribute({
				name: 'foo',
				type: Types.DATETIME(),
				notNull: true,
				primary: false,
				check: 'foo.length > 10',
				enumerable: true,
				comparable: true
			});
			let res = atr.toMinimalTemplate("internal");
			assert.fieldValues(res, {
				name: 'foo',
				type: 'DATETIME/DATETIME/date {"date":true,"time":true}',
				notNull: true,
				check: 'foo.length > 10',
				enumerable: true
			});
			assert.allowedFields(res, [ 'name', 'type', 'notNull', 'check', 'enumerable', 'type' ]);
		});

		it ("Produces DATETIME minimal template from some defined fields, explicit format", () => {
			let atr = new Attribute({
				name: 'foo',
				type: Types.DATETIME(),
				notNull: true,
				primary: false,
				check: 'foo.length > 10',
				enumerable: true,
				comparable: true
			});
			let res = atr.toMinimalTemplate("explicit");
			assert.fieldValues(res, {
				name: 'foo',
				type: 'DATETIME()',
				notNull: true,
				check: 'foo.length > 10',
				enumerable: true
			});
			assert.allowedFields(res, [ 'name', 'type', 'notNull', 'check', 'enumerable', 'type' ]);
		});

		it ("Produces DATETIME minimal template from some defined fields, object format", () => {
			let atr = new Attribute({
				name: 'foo',
				type: Types.DATETIME(),
				notNull: true,
				primary: false,
				check: 'foo.length > 10',
				enumerable: true,
				comparable: true
			});
			let res = atr.toMinimalTemplate("object");
			assert.fieldValues(res, {
				name: 'foo',
				type: 'Types.DATETIME()',
				notNull: true,
				check: 'foo.length > 10',
				enumerable: true
			});
			assert.allowedFields(res, [ 'name', 'type', 'notNull', 'check', 'enumerable', 'type' ]);
		});

		it ("Produces DATETIME minimal template from all defined fields, internal format", () => {
			let atr = new Attribute({
				name: 'foo',
				type: Types.DATETIME(),
				notNull: true,
				primary: false,
				unique: true,
				check: 'foo.length > 10',
				foreign: 'foo_table',
				enumerable: true,
				comparable: true,
				searchable: false,
				fragmentable: false,
				absentValue: "2021-01-11T17:28:05.970Z"
			});
			let res = atr.toMinimalTemplate("internal");
			assert.fieldValues(res, {
				name: 'foo',
				type: 'DATETIME/DATETIME/date {"date":true,"time":true}',
				notNull: true,
				unique: true,
				check: 'foo.length > 10',
				foreign: 'foo_table',
				enumerable: true,
				searchable: false,
				absentValue: "2021-01-11T17:28:05.970Z"
			});
			assert.allowedFields(res, [ 'name', 'type', 'notNull', 'unique', 'check', 'foreign',
				'enumerable', 'searchable', 'absentValue', 'type' ]);
		});

		it ("Produces DATETIME minimal template from all defined fields, explicit format", () => {
			let atr = new Attribute({
				name: 'foo',
				type: Types.DATETIME(),
				notNull: true,
				primary: false,
				unique: true,
				check: 'foo.length > 10',
				foreign: 'foo_table',
				enumerable: true,
				comparable: true,
				searchable: false,
				fragmentable: false,
				absentValue: "2021-01-11T17:28:05.970Z"
			});
			let res = atr.toMinimalTemplate("explicit");
			assert.fieldValues(res, {
				name: 'foo',
				type: 'DATETIME()',
				notNull: true,
				unique: true,
				check: 'foo.length > 10',
				foreign: 'foo_table',
				enumerable: true,
				searchable: false,
				absentValue: "2021-01-11T17:28:05.970Z"
			});
			assert.allowedFields(res, [ 'name', 'type', 'notNull', 'unique', 'check', 'foreign',
				'enumerable', 'searchable', 'absentValue', 'type' ]);
		});

		it ("Produces DATETIME minimal template from all defined fields, object format", () => {
			let atr = new Attribute({
				name: 'foo',
				type: Types.DATETIME(),
				notNull: true,
				primary: false,
				unique: true,
				check: 'foo.length > 10',
				foreign: 'foo_table',
				enumerable: true,
				comparable: true,
				searchable: false,
				fragmentable: false,
				absentValue: "2021-01-11T17:28:05.970Z"
			});
			let res = atr.toMinimalTemplate("object");
			assert.fieldValues(res, {
				name: 'foo',
				type: 'Types.DATETIME()',
				notNull: true,
				unique: true,
				check: 'foo.length > 10',
				foreign: 'foo_table',
				enumerable: true,
				searchable: false,
				absentValue: "2021-01-11T17:28:05.970Z"
			});
			assert.allowedFields(res, [ 'name', 'type', 'notNull', 'unique', 'check', 'foreign',
				'enumerable', 'searchable', 'absentValue', 'type' ]);
		});

		it ("Produces DATETIME complete template from only type field, internal format", () => {
			let atr = new Attribute({
				type: Types.DATETIME()
			});
			let res = atr.toCompleteTemplate("internal");
			assert.fieldValues(res, {
				type: 'DATETIME/DATETIME/date {"date":true,"time":true}',
				notNull: false,
				primary: false,
				unique: false,
				check: null,
				foreign: null,
				enumerable: false,
				comparable: true,
				searchable: true,
				fragmentable: false,
				absentValue: null
			});
			assert.allowedFields(res, [ 'type', 'notNull', 'primary', 'unique', 'check', 'foreign',
				'enumerable', 'comparable', 'searchable', 'fragmentable', 'absentValue', 'type' ]);
		});

		it ("Produces DATETIME complete template from only type field, explicit format", () => {
			let atr = new Attribute({
				type: Types.DATETIME()
			});
			let res = atr.toCompleteTemplate("explicit");
			assert.fieldValues(res, {
				type: 'DATETIME()',
				notNull: false,
				primary: false,
				unique: false,
				check: null,
				foreign: null,
				enumerable: false,
				comparable: true,
				searchable: true,
				fragmentable: false,
				absentValue: null
			});
			assert.allowedFields(res, [ 'type', 'notNull', 'primary', 'unique', 'check', 'foreign',
				'enumerable', 'comparable', 'searchable', 'fragmentable', 'absentValue', 'type' ]);
		});

		it ("Produces DATETIME complete template from only type field, object format", () => {
			let atr = new Attribute({
				type: Types.DATETIME()
			});
			let res = atr.toCompleteTemplate("object");
			assert.fieldValues(res, {
				type: 'Types.DATETIME()',
				notNull: false,
				primary: false,
				unique: false,
				check: null,
				foreign: null,
				enumerable: false,
				comparable: true,
				searchable: true,
				fragmentable: false,
				absentValue: null
			});
			assert.allowedFields(res, [ 'type', 'notNull', 'primary', 'unique', 'check', 'foreign',
				'enumerable', 'comparable', 'searchable', 'fragmentable', 'absentValue', 'type' ]);
		});

		it ("Produces DATETIME complete template from some defined fields, internal format", () => {
			let atr = new Attribute({
				name: 'foo',
				type: Types.DATETIME(),
				notNull: true,
				primary: false,
				check: 'foo.length > 10',
				enumerable: true,
				comparable: true
			});
			let res = atr.toCompleteTemplate("internal");
			assert.fieldValues(res, {
				name: 'foo',
				type: 'DATETIME/DATETIME/date {"date":true,"time":true}',
				notNull: true,
				primary: false,
				unique: false,
				check: 'foo.length > 10',
				foreign: null,
				enumerable: true,
				comparable: true,
				searchable: true,
				fragmentable: false,
				absentValue: null
			});
			assert.allowedFields(res, [ 'name', 'type', 'notNull', 'primary', 'unique', 'check',
				'foreign', 'enumerable', 'comparable', 'searchable', 'fragmentable', 'absentValue',
				'type' ]);
		});

		it ("Produces DATETIME complete template from some defined fields, explicit format", () => {
			let atr = new Attribute({
				name: 'foo',
				type: Types.DATETIME(),
				notNull: true,
				primary: false,
				check: 'foo.length > 10',
				enumerable: true,
				comparable: true
			});
			let res = atr.toCompleteTemplate("explicit");
			assert.fieldValues(res, {
				name: 'foo',
				type: 'DATETIME()',
				notNull: true,
				primary: false,
				unique: false,
				check: 'foo.length > 10',
				foreign: null,
				enumerable: true,
				comparable: true,
				searchable: true,
				fragmentable: false,
				absentValue: null
			});
			assert.allowedFields(res, [ 'name', 'type', 'notNull', 'primary', 'unique', 'check',
				'foreign', 'enumerable', 'comparable', 'searchable', 'fragmentable', 'absentValue',
				'type' ]);
		});

		it ("Produces DATETIME complete template from some defined fields, object format", () => {
			let atr = new Attribute({
				name: 'foo',
				type: Types.DATETIME(),
				notNull: true,
				primary: false,
				check: 'foo.length > 10',
				enumerable: true,
				comparable: true
			});
			let res = atr.toCompleteTemplate("object");
			assert.fieldValues(res, {
				name: 'foo',
				type: 'Types.DATETIME()',
				notNull: true,
				primary: false,
				unique: false,
				check: 'foo.length > 10',
				foreign: null,
				enumerable: true,
				comparable: true,
				searchable: true,
				fragmentable: false,
				absentValue: null
			});
			assert.allowedFields(res, [ 'name', 'type', 'notNull', 'primary', 'unique', 'check',
				'foreign', 'enumerable', 'comparable', 'searchable', 'fragmentable', 'absentValue',
				'type' ]);
		});

		it ("Produces DATETIME complete template from all defined fields, internal format", () => {
			let atr = new Attribute({
				name: 'foo',
				type: Types.DATETIME(),
				notNull: true,
				primary: false,
				unique: true,
				check: 'foo.length > 10',
				foreign: 'foo_table',
				enumerable: true,
				comparable: true,
				searchable: false,
				fragmentable: false,
				absentValue: "2021-01-11T17:28:05.970Z"
			});
			let res = atr.toCompleteTemplate("internal");
			assert.fieldValues(res, {
				name: 'foo',
				type: 'DATETIME/DATETIME/date {"date":true,"time":true}',
				notNull: true,
				primary: false,
				unique: true,
				check: 'foo.length > 10',
				foreign: 'foo_table',
				enumerable: true,
				comparable: true,
				searchable: false,
				fragmentable: false,
				absentValue: "2021-01-11T17:28:05.970Z"
			});
			assert.allowedFields(res, [ 'name', 'type', 'notNull', 'primary', 'unique', 'check',
				'foreign', 'enumerable', 'comparable', 'searchable', 'fragmentable', 'absentValue',
				'type' ]);
		});

		it ("Produces DATETIME complete template from all defined fields, explicit format", () => {
			let atr = new Attribute({
				name: 'foo',
				type: Types.DATETIME(),
				notNull: true,
				primary: false,
				unique: true,
				check: 'foo.length > 10',
				foreign: 'foo_table',
				enumerable: true,
				comparable: true,
				searchable: false,
				fragmentable: false,
				absentValue: "2021-01-11T17:28:05.970Z"
			});
			let res = atr.toCompleteTemplate("explicit");
			assert.fieldValues(res, {
				name: 'foo',
				type: 'DATETIME()',
				notNull: true,
				primary: false,
				unique: true,
				check: 'foo.length > 10',
				foreign: 'foo_table',
				enumerable: true,
				comparable: true,
				searchable: false,
				fragmentable: false,
				absentValue: "2021-01-11T17:28:05.970Z"
			});
			assert.allowedFields(res, [ 'name', 'type', 'notNull', 'primary', 'unique', 'check',
				'foreign', 'enumerable', 'comparable', 'searchable', 'fragmentable', 'absentValue',
				'type' ]);
		});

		it ("Produces DATETIME complete template from all defined fields, object format", () => {
			let atr = new Attribute({
				name: 'foo',
				type: Types.DATETIME(),
				notNull: true,
				primary: false,
				unique: true,
				check: 'foo.length > 10',
				foreign: 'foo_table',
				enumerable: true,
				comparable: true,
				searchable: false,
				fragmentable: false,
				absentValue: "2021-01-11T17:28:05.970Z"
			});
			let res = atr.toCompleteTemplate("object");
			assert.fieldValues(res, {
				name: 'foo',
				type: 'Types.DATETIME()',
				notNull: true,
				primary: false,
				unique: true,
				check: 'foo.length > 10',
				foreign: 'foo_table',
				enumerable: true,
				comparable: true,
				searchable: false,
				fragmentable: false,
				absentValue: "2021-01-11T17:28:05.970Z"
			});
			assert.allowedFields(res, [ 'name', 'type', 'notNull', 'primary', 'unique', 'check',
				'foreign', 'enumerable', 'comparable', 'searchable', 'fragmentable', 'absentValue',
				'type' ]);
		});

		it ("Produces DATEONLY minimal template from only type field, internal format", () => {
			let atr = new Attribute({
				type: Types.DATEONLY()
			});
			let res = atr.toMinimalTemplate("internal");
			assert.fieldValues(res, {
				type: 'DATEONLY/DATEONLY/date {"date":true,"time":false}'
			});
			assert.allowedFields(res, [ 'type', 'type' ]);
		});

		it ("Produces DATEONLY minimal template from only type field, explicit format", () => {
			let atr = new Attribute({
				type: Types.DATEONLY()
			});
			let res = atr.toMinimalTemplate("explicit");
			assert.fieldValues(res, {
				type: 'DATEONLY()'
			});
			assert.allowedFields(res, [ 'type', 'type' ]);
		});

		it ("Produces DATEONLY minimal template from only type field, object format", () => {
			let atr = new Attribute({
				type: Types.DATEONLY()
			});
			let res = atr.toMinimalTemplate("object");
			assert.fieldValues(res, {
				type: 'Types.DATEONLY()'
			});
			assert.allowedFields(res, [ 'type', 'type' ]);
		});

		it ("Produces DATEONLY minimal template from some defined fields, internal format", () => {
			let atr = new Attribute({
				name: 'foo',
				type: Types.DATEONLY(),
				notNull: true,
				primary: false,
				check: 'foo.length > 10',
				enumerable: true,
				comparable: true
			});
			let res = atr.toMinimalTemplate("internal");
			assert.fieldValues(res, {
				name: 'foo',
				type: 'DATEONLY/DATEONLY/date {"date":true,"time":false}',
				notNull: true,
				check: 'foo.length > 10',
				enumerable: true
			});
			assert.allowedFields(res, [ 'name', 'type', 'notNull', 'check', 'enumerable', 'type' ]);
		});

		it ("Produces DATEONLY minimal template from some defined fields, explicit format", () => {
			let atr = new Attribute({
				name: 'foo',
				type: Types.DATEONLY(),
				notNull: true,
				primary: false,
				check: 'foo.length > 10',
				enumerable: true,
				comparable: true
			});
			let res = atr.toMinimalTemplate("explicit");
			assert.fieldValues(res, {
				name: 'foo',
				type: 'DATEONLY()',
				notNull: true,
				check: 'foo.length > 10',
				enumerable: true
			});
			assert.allowedFields(res, [ 'name', 'type', 'notNull', 'check', 'enumerable', 'type' ]);
		});

		it ("Produces DATEONLY minimal template from some defined fields, object format", () => {
			let atr = new Attribute({
				name: 'foo',
				type: Types.DATEONLY(),
				notNull: true,
				primary: false,
				check: 'foo.length > 10',
				enumerable: true,
				comparable: true
			});
			let res = atr.toMinimalTemplate("object");
			assert.fieldValues(res, {
				name: 'foo',
				type: 'Types.DATEONLY()',
				notNull: true,
				check: 'foo.length > 10',
				enumerable: true
			});
			assert.allowedFields(res, [ 'name', 'type', 'notNull', 'check', 'enumerable', 'type' ]);
		});

		it ("Produces DATEONLY minimal template from all defined fields, internal format", () => {
			let atr = new Attribute({
				name: 'foo',
				type: Types.DATEONLY(),
				notNull: true,
				primary: false,
				unique: true,
				check: 'foo.length > 10',
				foreign: 'foo_table',
				enumerable: true,
				comparable: true,
				searchable: false,
				fragmentable: false,
				absentValue: "2021-01-11T17:28:05.971Z"
			});
			let res = atr.toMinimalTemplate("internal");
			assert.fieldValues(res, {
				name: 'foo',
				type: 'DATEONLY/DATEONLY/date {"date":true,"time":false}',
				notNull: true,
				unique: true,
				check: 'foo.length > 10',
				foreign: 'foo_table',
				enumerable: true,
				searchable: false,
				absentValue: "2021-01-11T17:28:05.971Z"
			});
			assert.allowedFields(res, [ 'name', 'type', 'notNull', 'unique', 'check', 'foreign',
				'enumerable', 'searchable', 'absentValue', 'type' ]);
		});

		it ("Produces DATEONLY minimal template from all defined fields, explicit format", () => {
			let atr = new Attribute({
				name: 'foo',
				type: Types.DATEONLY(),
				notNull: true,
				primary: false,
				unique: true,
				check: 'foo.length > 10',
				foreign: 'foo_table',
				enumerable: true,
				comparable: true,
				searchable: false,
				fragmentable: false,
				absentValue: "2021-01-11T17:28:05.971Z"
			});
			let res = atr.toMinimalTemplate("explicit");
			assert.fieldValues(res, {
				name: 'foo',
				type: 'DATEONLY()',
				notNull: true,
				unique: true,
				check: 'foo.length > 10',
				foreign: 'foo_table',
				enumerable: true,
				searchable: false,
				absentValue: "2021-01-11T17:28:05.971Z"
			});
			assert.allowedFields(res, [ 'name', 'type', 'notNull', 'unique', 'check', 'foreign',
				'enumerable', 'searchable', 'absentValue', 'type' ]);
		});

		it ("Produces DATEONLY minimal template from all defined fields, object format", () => {
			let atr = new Attribute({
				name: 'foo',
				type: Types.DATEONLY(),
				notNull: true,
				primary: false,
				unique: true,
				check: 'foo.length > 10',
				foreign: 'foo_table',
				enumerable: true,
				comparable: true,
				searchable: false,
				fragmentable: false,
				absentValue: "2021-01-11T17:28:05.971Z"
			});
			let res = atr.toMinimalTemplate("object");
			assert.fieldValues(res, {
				name: 'foo',
				type: 'Types.DATEONLY()',
				notNull: true,
				unique: true,
				check: 'foo.length > 10',
				foreign: 'foo_table',
				enumerable: true,
				searchable: false,
				absentValue: "2021-01-11T17:28:05.971Z"
			});
			assert.allowedFields(res, [ 'name', 'type', 'notNull', 'unique', 'check', 'foreign',
				'enumerable', 'searchable', 'absentValue', 'type' ]);
		});

		it ("Produces DATEONLY complete template from only type field, internal format", () => {
			let atr = new Attribute({
				type: Types.DATEONLY()
			});
			let res = atr.toCompleteTemplate("internal");
			assert.fieldValues(res, {
				type: 'DATEONLY/DATEONLY/date {"date":true,"time":false}',
				notNull: false,
				primary: false,
				unique: false,
				check: null,
				foreign: null,
				enumerable: false,
				comparable: true,
				searchable: true,
				fragmentable: false,
				absentValue: null
			});
			assert.allowedFields(res, [ 'type', 'notNull', 'primary', 'unique', 'check', 'foreign',
				'enumerable', 'comparable', 'searchable', 'fragmentable', 'absentValue', 'type' ]);
		});

		it ("Produces DATEONLY complete template from only type field, explicit format", () => {
			let atr = new Attribute({
				type: Types.DATEONLY()
			});
			let res = atr.toCompleteTemplate("explicit");
			assert.fieldValues(res, {
				type: 'DATEONLY()',
				notNull: false,
				primary: false,
				unique: false,
				check: null,
				foreign: null,
				enumerable: false,
				comparable: true,
				searchable: true,
				fragmentable: false,
				absentValue: null
			});
			assert.allowedFields(res, [ 'type', 'notNull', 'primary', 'unique', 'check', 'foreign',
				'enumerable', 'comparable', 'searchable', 'fragmentable', 'absentValue', 'type' ]);
		});

		it ("Produces DATEONLY complete template from only type field, object format", () => {
			let atr = new Attribute({
				type: Types.DATEONLY()
			});
			let res = atr.toCompleteTemplate("object");
			assert.fieldValues(res, {
				type: 'Types.DATEONLY()',
				notNull: false,
				primary: false,
				unique: false,
				check: null,
				foreign: null,
				enumerable: false,
				comparable: true,
				searchable: true,
				fragmentable: false,
				absentValue: null
			});
			assert.allowedFields(res, [ 'type', 'notNull', 'primary', 'unique', 'check', 'foreign',
				'enumerable', 'comparable', 'searchable', 'fragmentable', 'absentValue', 'type' ]);
		});

		it ("Produces DATEONLY complete template from some defined fields, internal format", () => {
			let atr = new Attribute({
				name: 'foo',
				type: Types.DATEONLY(),
				notNull: true,
				primary: false,
				check: 'foo.length > 10',
				enumerable: true,
				comparable: true
			});
			let res = atr.toCompleteTemplate("internal");
			assert.fieldValues(res, {
				name: 'foo',
				type: 'DATEONLY/DATEONLY/date {"date":true,"time":false}',
				notNull: true,
				primary: false,
				unique: false,
				check: 'foo.length > 10',
				foreign: null,
				enumerable: true,
				comparable: true,
				searchable: true,
				fragmentable: false,
				absentValue: null
			});
			assert.allowedFields(res, [ 'name', 'type', 'notNull', 'primary', 'unique', 'check',
				'foreign', 'enumerable', 'comparable', 'searchable', 'fragmentable', 'absentValue',
				'type' ]);
		});

		it ("Produces DATEONLY complete template from some defined fields, explicit format", () => {
			let atr = new Attribute({
				name: 'foo',
				type: Types.DATEONLY(),
				notNull: true,
				primary: false,
				check: 'foo.length > 10',
				enumerable: true,
				comparable: true
			});
			let res = atr.toCompleteTemplate("explicit");
			assert.fieldValues(res, {
				name: 'foo',
				type: 'DATEONLY()',
				notNull: true,
				primary: false,
				unique: false,
				check: 'foo.length > 10',
				foreign: null,
				enumerable: true,
				comparable: true,
				searchable: true,
				fragmentable: false,
				absentValue: null
			});
			assert.allowedFields(res, [ 'name', 'type', 'notNull', 'primary', 'unique', 'check',
				'foreign', 'enumerable', 'comparable', 'searchable', 'fragmentable', 'absentValue',
				'type' ]);
		});

		it ("Produces DATEONLY complete template from some defined fields, object format", () => {
			let atr = new Attribute({
				name: 'foo',
				type: Types.DATEONLY(),
				notNull: true,
				primary: false,
				check: 'foo.length > 10',
				enumerable: true,
				comparable: true
			});
			let res = atr.toCompleteTemplate("object");
			assert.fieldValues(res, {
				name: 'foo',
				type: 'Types.DATEONLY()',
				notNull: true,
				primary: false,
				unique: false,
				check: 'foo.length > 10',
				foreign: null,
				enumerable: true,
				comparable: true,
				searchable: true,
				fragmentable: false,
				absentValue: null
			});
			assert.allowedFields(res, [ 'name', 'type', 'notNull', 'primary', 'unique', 'check',
				'foreign', 'enumerable', 'comparable', 'searchable', 'fragmentable', 'absentValue',
				'type' ]);
		});

		it ("Produces DATEONLY complete template from all defined fields, internal format", () => {
			let atr = new Attribute({
				name: 'foo',
				type: Types.DATEONLY(),
				notNull: true,
				primary: false,
				unique: true,
				check: 'foo.length > 10',
				foreign: 'foo_table',
				enumerable: true,
				comparable: true,
				searchable: false,
				fragmentable: false,
				absentValue: "2021-01-11T17:28:05.971Z"
			});
			let res = atr.toCompleteTemplate("internal");
			assert.fieldValues(res, {
				name: 'foo',
				type: 'DATEONLY/DATEONLY/date {"date":true,"time":false}',
				notNull: true,
				primary: false,
				unique: true,
				check: 'foo.length > 10',
				foreign: 'foo_table',
				enumerable: true,
				comparable: true,
				searchable: false,
				fragmentable: false,
				absentValue: "2021-01-11T17:28:05.971Z"
			});
			assert.allowedFields(res, [ 'name', 'type', 'notNull', 'primary', 'unique', 'check',
				'foreign', 'enumerable', 'comparable', 'searchable', 'fragmentable', 'absentValue',
				'type' ]);
		});

		it ("Produces DATEONLY complete template from all defined fields, explicit format", () => {
			let atr = new Attribute({
				name: 'foo',
				type: Types.DATEONLY(),
				notNull: true,
				primary: false,
				unique: true,
				check: 'foo.length > 10',
				foreign: 'foo_table',
				enumerable: true,
				comparable: true,
				searchable: false,
				fragmentable: false,
				absentValue: "2021-01-11T17:28:05.971Z"
			});
			let res = atr.toCompleteTemplate("explicit");
			assert.fieldValues(res, {
				name: 'foo',
				type: 'DATEONLY()',
				notNull: true,
				primary: false,
				unique: true,
				check: 'foo.length > 10',
				foreign: 'foo_table',
				enumerable: true,
				comparable: true,
				searchable: false,
				fragmentable: false,
				absentValue: "2021-01-11T17:28:05.971Z"
			});
			assert.allowedFields(res, [ 'name', 'type', 'notNull', 'primary', 'unique', 'check',
				'foreign', 'enumerable', 'comparable', 'searchable', 'fragmentable', 'absentValue',
				'type' ]);
		});

		it ("Produces DATEONLY complete template from all defined fields, object format", () => {
			let atr = new Attribute({
				name: 'foo',
				type: Types.DATEONLY(),
				notNull: true,
				primary: false,
				unique: true,
				check: 'foo.length > 10',
				foreign: 'foo_table',
				enumerable: true,
				comparable: true,
				searchable: false,
				fragmentable: false,
				absentValue: "2021-01-11T17:28:05.971Z"
			});
			let res = atr.toCompleteTemplate("object");
			assert.fieldValues(res, {
				name: 'foo',
				type: 'Types.DATEONLY()',
				notNull: true,
				primary: false,
				unique: true,
				check: 'foo.length > 10',
				foreign: 'foo_table',
				enumerable: true,
				comparable: true,
				searchable: false,
				fragmentable: false,
				absentValue: "2021-01-11T17:28:05.971Z"
			});
			assert.allowedFields(res, [ 'name', 'type', 'notNull', 'primary', 'unique', 'check',
				'foreign', 'enumerable', 'comparable', 'searchable', 'fragmentable', 'absentValue',
				'type' ]);
		});

		it ("Produces TIMEONLY minimal template from only type field, internal format", () => {
			let atr = new Attribute({
				type: Types.TIMEONLY()
			});
			let res = atr.toMinimalTemplate("internal");
			assert.fieldValues(res, {
				type: 'TIMEONLY/TIMEONLY/date {"date":false,"time":true}'
			});
			assert.allowedFields(res, [ 'type', 'type' ]);
		});

		it ("Produces TIMEONLY minimal template from only type field, explicit format", () => {
			let atr = new Attribute({
				type: Types.TIMEONLY()
			});
			let res = atr.toMinimalTemplate("explicit");
			assert.fieldValues(res, {
				type: 'TIMEONLY()'
			});
			assert.allowedFields(res, [ 'type', 'type' ]);
		});

		it ("Produces TIMEONLY minimal template from only type field, object format", () => {
			let atr = new Attribute({
				type: Types.TIMEONLY()
			});
			let res = atr.toMinimalTemplate("object");
			assert.fieldValues(res, {
				type: 'Types.TIMEONLY()'
			});
			assert.allowedFields(res, [ 'type', 'type' ]);
		});

		it ("Produces TIMEONLY minimal template from some defined fields, internal format", () => {
			let atr = new Attribute({
				name: 'foo',
				type: Types.TIMEONLY(),
				notNull: true,
				primary: false,
				check: 'foo.length > 10',
				enumerable: true,
				comparable: true
			});
			let res = atr.toMinimalTemplate("internal");
			assert.fieldValues(res, {
				name: 'foo',
				type: 'TIMEONLY/TIMEONLY/date {"date":false,"time":true}',
				notNull: true,
				check: 'foo.length > 10',
				enumerable: true
			});
			assert.allowedFields(res, [ 'name', 'type', 'notNull', 'check', 'enumerable', 'type' ]);
		});

		it ("Produces TIMEONLY minimal template from some defined fields, explicit format", () => {
			let atr = new Attribute({
				name: 'foo',
				type: Types.TIMEONLY(),
				notNull: true,
				primary: false,
				check: 'foo.length > 10',
				enumerable: true,
				comparable: true
			});
			let res = atr.toMinimalTemplate("explicit");
			assert.fieldValues(res, {
				name: 'foo',
				type: 'TIMEONLY()',
				notNull: true,
				check: 'foo.length > 10',
				enumerable: true
			});
			assert.allowedFields(res, [ 'name', 'type', 'notNull', 'check', 'enumerable', 'type' ]);
		});

		it ("Produces TIMEONLY minimal template from some defined fields, object format", () => {
			let atr = new Attribute({
				name: 'foo',
				type: Types.TIMEONLY(),
				notNull: true,
				primary: false,
				check: 'foo.length > 10',
				enumerable: true,
				comparable: true
			});
			let res = atr.toMinimalTemplate("object");
			assert.fieldValues(res, {
				name: 'foo',
				type: 'Types.TIMEONLY()',
				notNull: true,
				check: 'foo.length > 10',
				enumerable: true
			});
			assert.allowedFields(res, [ 'name', 'type', 'notNull', 'check', 'enumerable', 'type' ]);
		});

		it ("Produces TIMEONLY minimal template from all defined fields, internal format", () => {
			let atr = new Attribute({
				name: 'foo',
				type: Types.TIMEONLY(),
				notNull: true,
				primary: false,
				unique: true,
				check: 'foo.length > 10',
				foreign: 'foo_table',
				enumerable: true,
				comparable: true,
				searchable: false,
				fragmentable: false,
				absentValue: "2021-01-11T17:28:05.973Z"
			});
			let res = atr.toMinimalTemplate("internal");
			assert.fieldValues(res, {
				name: 'foo',
				type: 'TIMEONLY/TIMEONLY/date {"date":false,"time":true}',
				notNull: true,
				unique: true,
				check: 'foo.length > 10',
				foreign: 'foo_table',
				enumerable: true,
				searchable: false,
				absentValue: "2021-01-11T17:28:05.973Z"
			});
			assert.allowedFields(res, [ 'name', 'type', 'notNull', 'unique', 'check', 'foreign',
				'enumerable', 'searchable', 'absentValue', 'type' ]);
		});

		it ("Produces TIMEONLY minimal template from all defined fields, explicit format", () => {
			let atr = new Attribute({
				name: 'foo',
				type: Types.TIMEONLY(),
				notNull: true,
				primary: false,
				unique: true,
				check: 'foo.length > 10',
				foreign: 'foo_table',
				enumerable: true,
				comparable: true,
				searchable: false,
				fragmentable: false,
				absentValue: "2021-01-11T17:28:05.973Z"
			});
			let res = atr.toMinimalTemplate("explicit");
			assert.fieldValues(res, {
				name: 'foo',
				type: 'TIMEONLY()',
				notNull: true,
				unique: true,
				check: 'foo.length > 10',
				foreign: 'foo_table',
				enumerable: true,
				searchable: false,
				absentValue: "2021-01-11T17:28:05.973Z"
			});
			assert.allowedFields(res, [ 'name', 'type', 'notNull', 'unique', 'check', 'foreign',
				'enumerable', 'searchable', 'absentValue', 'type' ]);
		});

		it ("Produces TIMEONLY minimal template from all defined fields, object format", () => {
			let atr = new Attribute({
				name: 'foo',
				type: Types.TIMEONLY(),
				notNull: true,
				primary: false,
				unique: true,
				check: 'foo.length > 10',
				foreign: 'foo_table',
				enumerable: true,
				comparable: true,
				searchable: false,
				fragmentable: false,
				absentValue: "2021-01-11T17:28:05.973Z"
			});
			let res = atr.toMinimalTemplate("object");
			assert.fieldValues(res, {
				name: 'foo',
				type: 'Types.TIMEONLY()',
				notNull: true,
				unique: true,
				check: 'foo.length > 10',
				foreign: 'foo_table',
				enumerable: true,
				searchable: false,
				absentValue: "2021-01-11T17:28:05.973Z"
			});
			assert.allowedFields(res, [ 'name', 'type', 'notNull', 'unique', 'check', 'foreign',
				'enumerable', 'searchable', 'absentValue', 'type' ]);
		});

		it ("Produces TIMEONLY complete template from only type field, internal format", () => {
			let atr = new Attribute({
				type: Types.TIMEONLY()
			});
			let res = atr.toCompleteTemplate("internal");
			assert.fieldValues(res, {
				type: 'TIMEONLY/TIMEONLY/date {"date":false,"time":true}',
				notNull: false,
				primary: false,
				unique: false,
				check: null,
				foreign: null,
				enumerable: false,
				comparable: true,
				searchable: true,
				fragmentable: false,
				absentValue: null
			});
			assert.allowedFields(res, [ 'type', 'notNull', 'primary', 'unique', 'check', 'foreign',
				'enumerable', 'comparable', 'searchable', 'fragmentable', 'absentValue', 'type' ]);
		});

		it ("Produces TIMEONLY complete template from only type field, explicit format", () => {
			let atr = new Attribute({
				type: Types.TIMEONLY()
			});
			let res = atr.toCompleteTemplate("explicit");
			assert.fieldValues(res, {
				type: 'TIMEONLY()',
				notNull: false,
				primary: false,
				unique: false,
				check: null,
				foreign: null,
				enumerable: false,
				comparable: true,
				searchable: true,
				fragmentable: false,
				absentValue: null
			});
			assert.allowedFields(res, [ 'type', 'notNull', 'primary', 'unique', 'check', 'foreign',
				'enumerable', 'comparable', 'searchable', 'fragmentable', 'absentValue', 'type' ]);
		});

		it ("Produces TIMEONLY complete template from only type field, object format", () => {
			let atr = new Attribute({
				type: Types.TIMEONLY()
			});
			let res = atr.toCompleteTemplate("object");
			assert.fieldValues(res, {
				type: 'Types.TIMEONLY()',
				notNull: false,
				primary: false,
				unique: false,
				check: null,
				foreign: null,
				enumerable: false,
				comparable: true,
				searchable: true,
				fragmentable: false,
				absentValue: null
			});
			assert.allowedFields(res, [ 'type', 'notNull', 'primary', 'unique', 'check', 'foreign',
				'enumerable', 'comparable', 'searchable', 'fragmentable', 'absentValue', 'type' ]);
		});

		it ("Produces TIMEONLY complete template from some defined fields, internal format", () => {
			let atr = new Attribute({
				name: 'foo',
				type: Types.TIMEONLY(),
				notNull: true,
				primary: false,
				check: 'foo.length > 10',
				enumerable: true,
				comparable: true
			});
			let res = atr.toCompleteTemplate("internal");
			assert.fieldValues(res, {
				name: 'foo',
				type: 'TIMEONLY/TIMEONLY/date {"date":false,"time":true}',
				notNull: true,
				primary: false,
				unique: false,
				check: 'foo.length > 10',
				foreign: null,
				enumerable: true,
				comparable: true,
				searchable: true,
				fragmentable: false,
				absentValue: null
			});
			assert.allowedFields(res, [ 'name', 'type', 'notNull', 'primary', 'unique', 'check',
				'foreign', 'enumerable', 'comparable', 'searchable', 'fragmentable', 'absentValue',
				'type' ]);
		});

		it ("Produces TIMEONLY complete template from some defined fields, explicit format", () => {
			let atr = new Attribute({
				name: 'foo',
				type: Types.TIMEONLY(),
				notNull: true,
				primary: false,
				check: 'foo.length > 10',
				enumerable: true,
				comparable: true
			});
			let res = atr.toCompleteTemplate("explicit");
			assert.fieldValues(res, {
				name: 'foo',
				type: 'TIMEONLY()',
				notNull: true,
				primary: false,
				unique: false,
				check: 'foo.length > 10',
				foreign: null,
				enumerable: true,
				comparable: true,
				searchable: true,
				fragmentable: false,
				absentValue: null
			});
			assert.allowedFields(res, [ 'name', 'type', 'notNull', 'primary', 'unique', 'check',
				'foreign', 'enumerable', 'comparable', 'searchable', 'fragmentable', 'absentValue',
				'type' ]);
		});

		it ("Produces TIMEONLY complete template from some defined fields, object format", () => {
			let atr = new Attribute({
				name: 'foo',
				type: Types.TIMEONLY(),
				notNull: true,
				primary: false,
				check: 'foo.length > 10',
				enumerable: true,
				comparable: true
			});
			let res = atr.toCompleteTemplate("object");
			assert.fieldValues(res, {
				name: 'foo',
				type: 'Types.TIMEONLY()',
				notNull: true,
				primary: false,
				unique: false,
				check: 'foo.length > 10',
				foreign: null,
				enumerable: true,
				comparable: true,
				searchable: true,
				fragmentable: false,
				absentValue: null
			});
			assert.allowedFields(res, [ 'name', 'type', 'notNull', 'primary', 'unique', 'check',
				'foreign', 'enumerable', 'comparable', 'searchable', 'fragmentable', 'absentValue',
				'type' ]);
		});

		it ("Produces TIMEONLY complete template from all defined fields, internal format", () => {
			let atr = new Attribute({
				name: 'foo',
				type: Types.TIMEONLY(),
				notNull: true,
				primary: false,
				unique: true,
				check: 'foo.length > 10',
				foreign: 'foo_table',
				enumerable: true,
				comparable: true,
				searchable: false,
				fragmentable: false,
				absentValue: "2021-01-11T17:28:05.973Z"
			});
			let res = atr.toCompleteTemplate("internal");
			assert.fieldValues(res, {
				name: 'foo',
				type: 'TIMEONLY/TIMEONLY/date {"date":false,"time":true}',
				notNull: true,
				primary: false,
				unique: true,
				check: 'foo.length > 10',
				foreign: 'foo_table',
				enumerable: true,
				comparable: true,
				searchable: false,
				fragmentable: false,
				absentValue: "2021-01-11T17:28:05.973Z"
			});
			assert.allowedFields(res, [ 'name', 'type', 'notNull', 'primary', 'unique', 'check',
				'foreign', 'enumerable', 'comparable', 'searchable', 'fragmentable', 'absentValue',
				'type' ]);
		});

		it ("Produces TIMEONLY complete template from all defined fields, explicit format", () => {
			let atr = new Attribute({
				name: 'foo',
				type: Types.TIMEONLY(),
				notNull: true,
				primary: false,
				unique: true,
				check: 'foo.length > 10',
				foreign: 'foo_table',
				enumerable: true,
				comparable: true,
				searchable: false,
				fragmentable: false,
				absentValue: "2021-01-11T17:28:05.973Z"
			});
			let res = atr.toCompleteTemplate("explicit");
			assert.fieldValues(res, {
				name: 'foo',
				type: 'TIMEONLY()',
				notNull: true,
				primary: false,
				unique: true,
				check: 'foo.length > 10',
				foreign: 'foo_table',
				enumerable: true,
				comparable: true,
				searchable: false,
				fragmentable: false,
				absentValue: "2021-01-11T17:28:05.973Z"
			});
			assert.allowedFields(res, [ 'name', 'type', 'notNull', 'primary', 'unique', 'check',
				'foreign', 'enumerable', 'comparable', 'searchable', 'fragmentable', 'absentValue',
				'type' ]);
		});

		it ("Produces TIMEONLY complete template from all defined fields, object format", () => {
			let atr = new Attribute({
				name: 'foo',
				type: Types.TIMEONLY(),
				notNull: true,
				primary: false,
				unique: true,
				check: 'foo.length > 10',
				foreign: 'foo_table',
				enumerable: true,
				comparable: true,
				searchable: false,
				fragmentable: false,
				absentValue: "2021-01-11T17:28:05.973Z"
			});
			let res = atr.toCompleteTemplate("object");
			assert.fieldValues(res, {
				name: 'foo',
				type: 'Types.TIMEONLY()',
				notNull: true,
				primary: false,
				unique: true,
				check: 'foo.length > 10',
				foreign: 'foo_table',
				enumerable: true,
				comparable: true,
				searchable: false,
				fragmentable: false,
				absentValue: "2021-01-11T17:28:05.973Z"
			});
			assert.allowedFields(res, [ 'name', 'type', 'notNull', 'primary', 'unique', 'check',
				'foreign', 'enumerable', 'comparable', 'searchable', 'fragmentable', 'absentValue',
				'type' ]);
		});

		it ("Produces BOOLEAN minimal template from only type field, internal format", () => {
			let atr = new Attribute({
				type: Types.BOOLEAN()
			});
			let res = atr.toMinimalTemplate("internal");
			assert.fieldValues(res, {
				type: 'BOOLEAN/BOOLEAN/boolean'
			});
			assert.allowedFields(res, [ 'type', 'type' ]);
		});

		it ("Produces BOOLEAN minimal template from only type field, explicit format", () => {
			let atr = new Attribute({
				type: Types.BOOLEAN()
			});
			let res = atr.toMinimalTemplate("explicit");
			assert.fieldValues(res, {
				type: 'BOOLEAN()'
			});
			assert.allowedFields(res, [ 'type', 'type' ]);
		});

		it ("Produces BOOLEAN minimal template from only type field, object format", () => {
			let atr = new Attribute({
				type: Types.BOOLEAN()
			});
			let res = atr.toMinimalTemplate("object");
			assert.fieldValues(res, {
				type: 'Types.BOOLEAN()'
			});
			assert.allowedFields(res, [ 'type', 'type' ]);
		});

		it ("Produces BOOLEAN minimal template from some defined fields, internal format", () => {
			let atr = new Attribute({
				name: 'foo',
				type: Types.BOOLEAN(),
				notNull: true,
				primary: false,
				check: 'foo.length > 10',
				enumerable: false,
				comparable: false
			});
			let res = atr.toMinimalTemplate("internal");
			assert.fieldValues(res, {
				name: 'foo',
				type: 'BOOLEAN/BOOLEAN/boolean',
				notNull: true,
				check: 'foo.length > 10',
				enumerable: false
			});
			assert.allowedFields(res, [ 'name', 'type', 'notNull', 'check', 'enumerable', 'type' ]);
		});

		it ("Produces BOOLEAN minimal template from some defined fields, explicit format", () => {
			let atr = new Attribute({
				name: 'foo',
				type: Types.BOOLEAN(),
				notNull: true,
				primary: false,
				check: 'foo.length > 10',
				enumerable: false,
				comparable: false
			});
			let res = atr.toMinimalTemplate("explicit");
			assert.fieldValues(res, {
				name: 'foo',
				type: 'BOOLEAN()',
				notNull: true,
				check: 'foo.length > 10',
				enumerable: false
			});
			assert.allowedFields(res, [ 'name', 'type', 'notNull', 'check', 'enumerable', 'type' ]);
		});

		it ("Produces BOOLEAN minimal template from some defined fields, object format", () => {
			let atr = new Attribute({
				name: 'foo',
				type: Types.BOOLEAN(),
				notNull: true,
				primary: false,
				check: 'foo.length > 10',
				enumerable: false,
				comparable: false
			});
			let res = atr.toMinimalTemplate("object");
			assert.fieldValues(res, {
				name: 'foo',
				type: 'Types.BOOLEAN()',
				notNull: true,
				check: 'foo.length > 10',
				enumerable: false
			});
			assert.allowedFields(res, [ 'name', 'type', 'notNull', 'check', 'enumerable', 'type' ]);
		});

		it ("Produces BOOLEAN minimal template from all defined fields, internal format", () => {
			let atr = new Attribute({
				name: 'foo',
				type: Types.BOOLEAN(),
				notNull: true,
				primary: false,
				unique: true,
				check: 'foo.length > 10',
				foreign: 'foo_table',
				enumerable: false,
				comparable: false,
				searchable: true,
				fragmentable: false,
				absentValue: false
			});
			let res = atr.toMinimalTemplate("internal");
			assert.fieldValues(res, {
				name: 'foo',
				type: 'BOOLEAN/BOOLEAN/boolean',
				notNull: true,
				unique: true,
				check: 'foo.length > 10',
				foreign: 'foo_table',
				enumerable: false,
				searchable: true,
				absentValue: false
			});
			assert.allowedFields(res, [ 'name', 'type', 'notNull', 'unique', 'check', 'foreign',
				'enumerable', 'searchable', 'absentValue', 'type' ]);
		});

		it ("Produces BOOLEAN minimal template from all defined fields, explicit format", () => {
			let atr = new Attribute({
				name: 'foo',
				type: Types.BOOLEAN(),
				notNull: true,
				primary: false,
				unique: true,
				check: 'foo.length > 10',
				foreign: 'foo_table',
				enumerable: false,
				comparable: false,
				searchable: true,
				fragmentable: false,
				absentValue: false
			});
			let res = atr.toMinimalTemplate("explicit");
			assert.fieldValues(res, {
				name: 'foo',
				type: 'BOOLEAN()',
				notNull: true,
				unique: true,
				check: 'foo.length > 10',
				foreign: 'foo_table',
				enumerable: false,
				searchable: true,
				absentValue: false
			});
			assert.allowedFields(res, [ 'name', 'type', 'notNull', 'unique', 'check', 'foreign',
				'enumerable', 'searchable', 'absentValue', 'type' ]);
		});

		it ("Produces BOOLEAN minimal template from all defined fields, object format", () => {
			let atr = new Attribute({
				name: 'foo',
				type: Types.BOOLEAN(),
				notNull: true,
				primary: false,
				unique: true,
				check: 'foo.length > 10',
				foreign: 'foo_table',
				enumerable: false,
				comparable: false,
				searchable: true,
				fragmentable: false,
				absentValue: false
			});
			let res = atr.toMinimalTemplate("object");
			assert.fieldValues(res, {
				name: 'foo',
				type: 'Types.BOOLEAN()',
				notNull: true,
				unique: true,
				check: 'foo.length > 10',
				foreign: 'foo_table',
				enumerable: false,
				searchable: true,
				absentValue: false
			});
			assert.allowedFields(res, [ 'name', 'type', 'notNull', 'unique', 'check', 'foreign',
				'enumerable', 'searchable', 'absentValue', 'type' ]);
		});

		it ("Produces BOOLEAN complete template from only type field, internal format", () => {
			let atr = new Attribute({
				type: Types.BOOLEAN()
			});
			let res = atr.toCompleteTemplate("internal");
			assert.fieldValues(res, {
				type: 'BOOLEAN/BOOLEAN/boolean',
				notNull: false,
				primary: false,
				unique: false,
				check: null,
				foreign: null,
				enumerable: true,
				comparable: false,
				searchable: false,
				fragmentable: false,
				absentValue: null
			});
			assert.allowedFields(res, [ 'type', 'notNull', 'primary', 'unique', 'check', 'foreign',
				'enumerable', 'comparable', 'searchable', 'fragmentable', 'absentValue', 'type' ]);
		});

		it ("Produces BOOLEAN complete template from only type field, explicit format", () => {
			let atr = new Attribute({
				type: Types.BOOLEAN()
			});
			let res = atr.toCompleteTemplate("explicit");
			assert.fieldValues(res, {
				type: 'BOOLEAN()',
				notNull: false,
				primary: false,
				unique: false,
				check: null,
				foreign: null,
				enumerable: true,
				comparable: false,
				searchable: false,
				fragmentable: false,
				absentValue: null
			});
			assert.allowedFields(res, [ 'type', 'notNull', 'primary', 'unique', 'check', 'foreign',
				'enumerable', 'comparable', 'searchable', 'fragmentable', 'absentValue', 'type' ]);
		});

		it ("Produces BOOLEAN complete template from only type field, object format", () => {
			let atr = new Attribute({
				type: Types.BOOLEAN()
			});
			let res = atr.toCompleteTemplate("object");
			assert.fieldValues(res, {
				type: 'Types.BOOLEAN()',
				notNull: false,
				primary: false,
				unique: false,
				check: null,
				foreign: null,
				enumerable: true,
				comparable: false,
				searchable: false,
				fragmentable: false,
				absentValue: null
			});
			assert.allowedFields(res, [ 'type', 'notNull', 'primary', 'unique', 'check', 'foreign',
				'enumerable', 'comparable', 'searchable', 'fragmentable', 'absentValue', 'type' ]);
		});

		it ("Produces BOOLEAN complete template from some defined fields, internal format", () => {
			let atr = new Attribute({
				name: 'foo',
				type: Types.BOOLEAN(),
				notNull: true,
				primary: false,
				check: 'foo.length > 10',
				enumerable: false,
				comparable: false
			});
			let res = atr.toCompleteTemplate("internal");
			assert.fieldValues(res, {
				name: 'foo',
				type: 'BOOLEAN/BOOLEAN/boolean',
				notNull: true,
				primary: false,
				unique: false,
				check: 'foo.length > 10',
				foreign: null,
				enumerable: false,
				comparable: false,
				searchable: false,
				fragmentable: false,
				absentValue: null
			});
			assert.allowedFields(res, [ 'name', 'type', 'notNull', 'primary', 'unique', 'check',
				'foreign', 'enumerable', 'comparable', 'searchable', 'fragmentable', 'absentValue',
				'type' ]);
		});

		it ("Produces BOOLEAN complete template from some defined fields, explicit format", () => {
			let atr = new Attribute({
				name: 'foo',
				type: Types.BOOLEAN(),
				notNull: true,
				primary: false,
				check: 'foo.length > 10',
				enumerable: false,
				comparable: false
			});
			let res = atr.toCompleteTemplate("explicit");
			assert.fieldValues(res, {
				name: 'foo',
				type: 'BOOLEAN()',
				notNull: true,
				primary: false,
				unique: false,
				check: 'foo.length > 10',
				foreign: null,
				enumerable: false,
				comparable: false,
				searchable: false,
				fragmentable: false,
				absentValue: null
			});
			assert.allowedFields(res, [ 'name', 'type', 'notNull', 'primary', 'unique', 'check',
				'foreign', 'enumerable', 'comparable', 'searchable', 'fragmentable', 'absentValue',
				'type' ]);
		});

		it ("Produces BOOLEAN complete template from some defined fields, object format", () => {
			let atr = new Attribute({
				name: 'foo',
				type: Types.BOOLEAN(),
				notNull: true,
				primary: false,
				check: 'foo.length > 10',
				enumerable: false,
				comparable: false
			});
			let res = atr.toCompleteTemplate("object");
			assert.fieldValues(res, {
				name: 'foo',
				type: 'Types.BOOLEAN()',
				notNull: true,
				primary: false,
				unique: false,
				check: 'foo.length > 10',
				foreign: null,
				enumerable: false,
				comparable: false,
				searchable: false,
				fragmentable: false,
				absentValue: null
			});
			assert.allowedFields(res, [ 'name', 'type', 'notNull', 'primary', 'unique', 'check',
				'foreign', 'enumerable', 'comparable', 'searchable', 'fragmentable', 'absentValue',
				'type' ]);
		});

		it ("Produces BOOLEAN complete template from all defined fields, internal format", () => {
			let atr = new Attribute({
				name: 'foo',
				type: Types.BOOLEAN(),
				notNull: true,
				primary: false,
				unique: true,
				check: 'foo.length > 10',
				foreign: 'foo_table',
				enumerable: false,
				comparable: false,
				searchable: true,
				fragmentable: false,
				absentValue: false
			});
			let res = atr.toCompleteTemplate("internal");
			assert.fieldValues(res, {
				name: 'foo',
				type: 'BOOLEAN/BOOLEAN/boolean',
				notNull: true,
				primary: false,
				unique: true,
				check: 'foo.length > 10',
				foreign: 'foo_table',
				enumerable: false,
				comparable: false,
				searchable: true,
				fragmentable: false,
				absentValue: false
			});
			assert.allowedFields(res, [ 'name', 'type', 'notNull', 'primary', 'unique', 'check',
				'foreign', 'enumerable', 'comparable', 'searchable', 'fragmentable', 'absentValue',
				'type' ]);
		});

		it ("Produces BOOLEAN complete template from all defined fields, explicit format", () => {
			let atr = new Attribute({
				name: 'foo',
				type: Types.BOOLEAN(),
				notNull: true,
				primary: false,
				unique: true,
				check: 'foo.length > 10',
				foreign: 'foo_table',
				enumerable: false,
				comparable: false,
				searchable: true,
				fragmentable: false,
				absentValue: false
			});
			let res = atr.toCompleteTemplate("explicit");
			assert.fieldValues(res, {
				name: 'foo',
				type: 'BOOLEAN()',
				notNull: true,
				primary: false,
				unique: true,
				check: 'foo.length > 10',
				foreign: 'foo_table',
				enumerable: false,
				comparable: false,
				searchable: true,
				fragmentable: false,
				absentValue: false
			});
			assert.allowedFields(res, [ 'name', 'type', 'notNull', 'primary', 'unique', 'check',
				'foreign', 'enumerable', 'comparable', 'searchable', 'fragmentable', 'absentValue',
				'type' ]);
		});

		it ("Produces BOOLEAN complete template from all defined fields, object format", () => {
			let atr = new Attribute({
				name: 'foo',
				type: Types.BOOLEAN(),
				notNull: true,
				primary: false,
				unique: true,
				check: 'foo.length > 10',
				foreign: 'foo_table',
				enumerable: false,
				comparable: false,
				searchable: true,
				fragmentable: false,
				absentValue: false
			});
			let res = atr.toCompleteTemplate("object");
			assert.fieldValues(res, {
				name: 'foo',
				type: 'Types.BOOLEAN()',
				notNull: true,
				primary: false,
				unique: true,
				check: 'foo.length > 10',
				foreign: 'foo_table',
				enumerable: false,
				comparable: false,
				searchable: true,
				fragmentable: false,
				absentValue: false
			});
			assert.allowedFields(res, [ 'name', 'type', 'notNull', 'primary', 'unique', 'check',
				'foreign', 'enumerable', 'comparable', 'searchable', 'fragmentable', 'absentValue',
				'type' ]);
		});

		it ("Produces BLOB minimal template from only type field, internal format", () => {
			let atr = new Attribute({
				type: Types.BLOB()
			});
			let res = atr.toMinimalTemplate("internal");
			assert.fieldValues(res, {
				type: 'BLOB/undefined/string {"maxLen":65535}'
			});
			assert.allowedFields(res, [ 'type', 'type' ]);
		});

		it ("Produces BLOB minimal template from only type field, explicit format", () => {
			let atr = new Attribute({
				type: Types.BLOB()
			});
			let res = atr.toMinimalTemplate("explicit");
			assert.fieldValues(res, {
				type: 'BLOB()'
			});
			assert.allowedFields(res, [ 'type', 'type' ]);
		});

		it ("Produces BLOB minimal template from only type field, object format", () => {
			let atr = new Attribute({
				type: Types.BLOB()
			});
			let res = atr.toMinimalTemplate("object");
			assert.fieldValues(res, {
				type: 'Types.BLOB()'
			});
			assert.allowedFields(res, [ 'type', 'type' ]);
		});

		it ("Produces BLOB minimal template from some defined fields, internal format", () => {
			let atr = new Attribute({
				name: 'foo',
				type: Types.BLOB(),
				notNull: true,
				primary: false,
				check: 'foo.length > 10',
				enumerable: false,
				comparable: true
			});
			let res = atr.toMinimalTemplate("internal");
			assert.fieldValues(res, {
				name: 'foo',
				type: 'BLOB/undefined/string {"maxLen":65535}',
				notNull: true,
				check: 'foo.length > 10',
				enumerable: false
			});
			assert.allowedFields(res, [ 'name', 'type', 'notNull', 'check', 'enumerable', 'type' ]);
		});

		it ("Produces BLOB minimal template from some defined fields, explicit format", () => {
			let atr = new Attribute({
				name: 'foo',
				type: Types.BLOB(),
				notNull: true,
				primary: false,
				check: 'foo.length > 10',
				enumerable: false,
				comparable: true
			});
			let res = atr.toMinimalTemplate("explicit");
			assert.fieldValues(res, {
				name: 'foo',
				type: 'BLOB()',
				notNull: true,
				check: 'foo.length > 10',
				enumerable: false
			});
			assert.allowedFields(res, [ 'name', 'type', 'notNull', 'check', 'enumerable', 'type' ]);
		});

		it ("Produces BLOB minimal template from some defined fields, object format", () => {
			let atr = new Attribute({
				name: 'foo',
				type: Types.BLOB(),
				notNull: true,
				primary: false,
				check: 'foo.length > 10',
				enumerable: false,
				comparable: true
			});
			let res = atr.toMinimalTemplate("object");
			assert.fieldValues(res, {
				name: 'foo',
				type: 'Types.BLOB()',
				notNull: true,
				check: 'foo.length > 10',
				enumerable: false
			});
			assert.allowedFields(res, [ 'name', 'type', 'notNull', 'check', 'enumerable', 'type' ]);
		});

		it ("Produces BLOB minimal template from all defined fields, internal format", () => {
			let atr = new Attribute({
				name: 'foo',
				type: Types.BLOB(),
				notNull: true,
				primary: false,
				unique: true,
				check: 'foo.length > 10',
				foreign: 'foo_table',
				enumerable: false,
				comparable: true,
				searchable: false,
				fragmentable: true,
				absentValue: ""
			});
			let res = atr.toMinimalTemplate("internal");
			assert.fieldValues(res, {
				name: 'foo',
				type: 'BLOB/undefined/string {"maxLen":65535}',
				notNull: true,
				unique: true,
				check: 'foo.length > 10',
				foreign: 'foo_table',
				enumerable: false,
				searchable: false,
				absentValue: ""
			});
			assert.allowedFields(res, [ 'name', 'type', 'notNull', 'unique', 'check', 'foreign',
				'enumerable', 'searchable', 'absentValue', 'type' ]);
		});

		it ("Produces BLOB minimal template from all defined fields, explicit format", () => {
			let atr = new Attribute({
				name: 'foo',
				type: Types.BLOB(),
				notNull: true,
				primary: false,
				unique: true,
				check: 'foo.length > 10',
				foreign: 'foo_table',
				enumerable: false,
				comparable: true,
				searchable: false,
				fragmentable: true,
				absentValue: ""
			});
			let res = atr.toMinimalTemplate("explicit");
			assert.fieldValues(res, {
				name: 'foo',
				type: 'BLOB()',
				notNull: true,
				unique: true,
				check: 'foo.length > 10',
				foreign: 'foo_table',
				enumerable: false,
				searchable: false,
				absentValue: ""
			});
			assert.allowedFields(res, [ 'name', 'type', 'notNull', 'unique', 'check', 'foreign',
				'enumerable', 'searchable', 'absentValue', 'type' ]);
		});

		it ("Produces BLOB minimal template from all defined fields, object format", () => {
			let atr = new Attribute({
				name: 'foo',
				type: Types.BLOB(),
				notNull: true,
				primary: false,
				unique: true,
				check: 'foo.length > 10',
				foreign: 'foo_table',
				enumerable: false,
				comparable: true,
				searchable: false,
				fragmentable: true,
				absentValue: ""
			});
			let res = atr.toMinimalTemplate("object");
			assert.fieldValues(res, {
				name: 'foo',
				type: 'Types.BLOB()',
				notNull: true,
				unique: true,
				check: 'foo.length > 10',
				foreign: 'foo_table',
				enumerable: false,
				searchable: false,
				absentValue: ""
			});
			assert.allowedFields(res, [ 'name', 'type', 'notNull', 'unique', 'check', 'foreign',
				'enumerable', 'searchable', 'absentValue', 'type' ]);
		});

		it ("Produces BLOB complete template from only type field, internal format", () => {
			let atr = new Attribute({
				type: Types.BLOB()
			});
			let res = atr.toCompleteTemplate("internal");
			assert.fieldValues(res, {
				type: 'BLOB/undefined/string {"maxLen":65535}',
				notNull: false,
				primary: false,
				unique: false,
				check: null,
				foreign: null,
				enumerable: true,
				comparable: true,
				searchable: true,
				fragmentable: true,
				absentValue: null
			});
			assert.allowedFields(res, [ 'type', 'notNull', 'primary', 'unique', 'check', 'foreign',
				'enumerable', 'comparable', 'searchable', 'fragmentable', 'absentValue', 'type' ]);
		});

		it ("Produces BLOB complete template from only type field, explicit format", () => {
			let atr = new Attribute({
				type: Types.BLOB()
			});
			let res = atr.toCompleteTemplate("explicit");
			assert.fieldValues(res, {
				type: 'BLOB()',
				notNull: false,
				primary: false,
				unique: false,
				check: null,
				foreign: null,
				enumerable: true,
				comparable: true,
				searchable: true,
				fragmentable: true,
				absentValue: null
			});
			assert.allowedFields(res, [ 'type', 'notNull', 'primary', 'unique', 'check', 'foreign',
				'enumerable', 'comparable', 'searchable', 'fragmentable', 'absentValue', 'type' ]);
		});

		it ("Produces BLOB complete template from only type field, object format", () => {
			let atr = new Attribute({
				type: Types.BLOB()
			});
			let res = atr.toCompleteTemplate("object");
			assert.fieldValues(res, {
				type: 'Types.BLOB()',
				notNull: false,
				primary: false,
				unique: false,
				check: null,
				foreign: null,
				enumerable: true,
				comparable: true,
				searchable: true,
				fragmentable: true,
				absentValue: null
			});
			assert.allowedFields(res, [ 'type', 'notNull', 'primary', 'unique', 'check', 'foreign',
				'enumerable', 'comparable', 'searchable', 'fragmentable', 'absentValue', 'type' ]);
		});

		it ("Produces BLOB complete template from some defined fields, internal format", () => {
			let atr = new Attribute({
				name: 'foo',
				type: Types.BLOB(),
				notNull: true,
				primary: false,
				check: 'foo.length > 10',
				enumerable: false,
				comparable: true
			});
			let res = atr.toCompleteTemplate("internal");
			assert.fieldValues(res, {
				name: 'foo',
				type: 'BLOB/undefined/string {"maxLen":65535}',
				notNull: true,
				primary: false,
				unique: false,
				check: 'foo.length > 10',
				foreign: null,
				enumerable: false,
				comparable: true,
				searchable: true,
				fragmentable: true,
				absentValue: null
			});
			assert.allowedFields(res, [ 'name', 'type', 'notNull', 'primary', 'unique', 'check',
				'foreign', 'enumerable', 'comparable', 'searchable', 'fragmentable', 'absentValue',
				'type' ]);
		});

		it ("Produces BLOB complete template from some defined fields, explicit format", () => {
			let atr = new Attribute({
				name: 'foo',
				type: Types.BLOB(),
				notNull: true,
				primary: false,
				check: 'foo.length > 10',
				enumerable: false,
				comparable: true
			});
			let res = atr.toCompleteTemplate("explicit");
			assert.fieldValues(res, {
				name: 'foo',
				type: 'BLOB()',
				notNull: true,
				primary: false,
				unique: false,
				check: 'foo.length > 10',
				foreign: null,
				enumerable: false,
				comparable: true,
				searchable: true,
				fragmentable: true,
				absentValue: null
			});
			assert.allowedFields(res, [ 'name', 'type', 'notNull', 'primary', 'unique', 'check',
				'foreign', 'enumerable', 'comparable', 'searchable', 'fragmentable', 'absentValue',
				'type' ]);
		});

		it ("Produces BLOB complete template from some defined fields, object format", () => {
			let atr = new Attribute({
				name: 'foo',
				type: Types.BLOB(),
				notNull: true,
				primary: false,
				check: 'foo.length > 10',
				enumerable: false,
				comparable: true
			});
			let res = atr.toCompleteTemplate("object");
			assert.fieldValues(res, {
				name: 'foo',
				type: 'Types.BLOB()',
				notNull: true,
				primary: false,
				unique: false,
				check: 'foo.length > 10',
				foreign: null,
				enumerable: false,
				comparable: true,
				searchable: true,
				fragmentable: true,
				absentValue: null
			});
			assert.allowedFields(res, [ 'name', 'type', 'notNull', 'primary', 'unique', 'check',
				'foreign', 'enumerable', 'comparable', 'searchable', 'fragmentable', 'absentValue',
				'type' ]);
		});

		it ("Produces BLOB complete template from all defined fields, internal format", () => {
			let atr = new Attribute({
				name: 'foo',
				type: Types.BLOB(),
				notNull: true,
				primary: false,
				unique: true,
				check: 'foo.length > 10',
				foreign: 'foo_table',
				enumerable: false,
				comparable: true,
				searchable: false,
				fragmentable: true,
				absentValue: ""
			});
			let res = atr.toCompleteTemplate("internal");
			assert.fieldValues(res, {
				name: 'foo',
				type: 'BLOB/undefined/string {"maxLen":65535}',
				notNull: true,
				primary: false,
				unique: true,
				check: 'foo.length > 10',
				foreign: 'foo_table',
				enumerable: false,
				comparable: true,
				searchable: false,
				fragmentable: true,
				absentValue: ""
			});
			assert.allowedFields(res, [ 'name', 'type', 'notNull', 'primary', 'unique', 'check',
				'foreign', 'enumerable', 'comparable', 'searchable', 'fragmentable', 'absentValue',
				'type' ]);
		});

		it ("Produces BLOB complete template from all defined fields, explicit format", () => {
			let atr = new Attribute({
				name: 'foo',
				type: Types.BLOB(),
				notNull: true,
				primary: false,
				unique: true,
				check: 'foo.length > 10',
				foreign: 'foo_table',
				enumerable: false,
				comparable: true,
				searchable: false,
				fragmentable: true,
				absentValue: ""
			});
			let res = atr.toCompleteTemplate("explicit");
			assert.fieldValues(res, {
				name: 'foo',
				type: 'BLOB()',
				notNull: true,
				primary: false,
				unique: true,
				check: 'foo.length > 10',
				foreign: 'foo_table',
				enumerable: false,
				comparable: true,
				searchable: false,
				fragmentable: true,
				absentValue: ""
			});
			assert.allowedFields(res, [ 'name', 'type', 'notNull', 'primary', 'unique', 'check',
				'foreign', 'enumerable', 'comparable', 'searchable', 'fragmentable', 'absentValue',
				'type' ]);
		});

		it ("Produces BLOB complete template from all defined fields, object format", () => {
			let atr = new Attribute({
				name: 'foo',
				type: Types.BLOB(),
				notNull: true,
				primary: false,
				unique: true,
				check: 'foo.length > 10',
				foreign: 'foo_table',
				enumerable: false,
				comparable: true,
				searchable: false,
				fragmentable: true,
				absentValue: ""
			});
			let res = atr.toCompleteTemplate("object");
			assert.fieldValues(res, {
				name: 'foo',
				type: 'Types.BLOB()',
				notNull: true,
				primary: false,
				unique: true,
				check: 'foo.length > 10',
				foreign: 'foo_table',
				enumerable: false,
				comparable: true,
				searchable: false,
				fragmentable: true,
				absentValue: ""
			});
			assert.allowedFields(res, [ 'name', 'type', 'notNull', 'primary', 'unique', 'check',
				'foreign', 'enumerable', 'comparable', 'searchable', 'fragmentable', 'absentValue',
				'type' ]);
		});

		it ("Produces TINYBLOB minimal template from only type field, internal format", () => {
			let atr = new Attribute({
				type: Types.TINYBLOB()
			});
			let res = atr.toMinimalTemplate("internal");
			assert.fieldValues(res, {
				type: 'TINYBLOB/undefined/string {"maxLen":65535}'
			});
			assert.allowedFields(res, [ 'type', 'type' ]);
		});

		it ("Produces TINYBLOB minimal template from only type field, explicit format", () => {
			let atr = new Attribute({
				type: Types.TINYBLOB()
			});
			let res = atr.toMinimalTemplate("explicit");
			assert.fieldValues(res, {
				type: 'TINYBLOB()'
			});
			assert.allowedFields(res, [ 'type', 'type' ]);
		});

		it ("Produces TINYBLOB minimal template from only type field, object format", () => {
			let atr = new Attribute({
				type: Types.TINYBLOB()
			});
			let res = atr.toMinimalTemplate("object");
			assert.fieldValues(res, {
				type: 'Types.TINYBLOB()'
			});
			assert.allowedFields(res, [ 'type', 'type' ]);
		});

		it ("Produces TINYBLOB minimal template from some defined fields, internal format", () => {
			let atr = new Attribute({
				name: 'foo',
				type: Types.TINYBLOB(),
				notNull: true,
				primary: false,
				check: 'foo.length > 10',
				enumerable: false,
				comparable: true
			});
			let res = atr.toMinimalTemplate("internal");
			assert.fieldValues(res, {
				name: 'foo',
				type: 'TINYBLOB/undefined/string {"maxLen":65535}',
				notNull: true,
				check: 'foo.length > 10',
				enumerable: false
			});
			assert.allowedFields(res, [ 'name', 'type', 'notNull', 'check', 'enumerable', 'type' ]);
		});

		it ("Produces TINYBLOB minimal template from some defined fields, explicit format", () => {
			let atr = new Attribute({
				name: 'foo',
				type: Types.TINYBLOB(),
				notNull: true,
				primary: false,
				check: 'foo.length > 10',
				enumerable: false,
				comparable: true
			});
			let res = atr.toMinimalTemplate("explicit");
			assert.fieldValues(res, {
				name: 'foo',
				type: 'TINYBLOB()',
				notNull: true,
				check: 'foo.length > 10',
				enumerable: false
			});
			assert.allowedFields(res, [ 'name', 'type', 'notNull', 'check', 'enumerable', 'type' ]);
		});

		it ("Produces TINYBLOB minimal template from some defined fields, object format", () => {
			let atr = new Attribute({
				name: 'foo',
				type: Types.TINYBLOB(),
				notNull: true,
				primary: false,
				check: 'foo.length > 10',
				enumerable: false,
				comparable: true
			});
			let res = atr.toMinimalTemplate("object");
			assert.fieldValues(res, {
				name: 'foo',
				type: 'Types.TINYBLOB()',
				notNull: true,
				check: 'foo.length > 10',
				enumerable: false
			});
			assert.allowedFields(res, [ 'name', 'type', 'notNull', 'check', 'enumerable', 'type' ]);
		});

		it ("Produces TINYBLOB minimal template from all defined fields, internal format", () => {
			let atr = new Attribute({
				name: 'foo',
				type: Types.TINYBLOB(),
				notNull: true,
				primary: false,
				unique: true,
				check: 'foo.length > 10',
				foreign: 'foo_table',
				enumerable: false,
				comparable: true,
				searchable: false,
				fragmentable: true,
				absentValue: ""
			});
			let res = atr.toMinimalTemplate("internal");
			assert.fieldValues(res, {
				name: 'foo',
				type: 'TINYBLOB/undefined/string {"maxLen":65535}',
				notNull: true,
				unique: true,
				check: 'foo.length > 10',
				foreign: 'foo_table',
				enumerable: false,
				searchable: false,
				absentValue: ""
			});
			assert.allowedFields(res, [ 'name', 'type', 'notNull', 'unique', 'check', 'foreign',
				'enumerable', 'searchable', 'absentValue', 'type' ]);
		});

		it ("Produces TINYBLOB minimal template from all defined fields, explicit format", () => {
			let atr = new Attribute({
				name: 'foo',
				type: Types.TINYBLOB(),
				notNull: true,
				primary: false,
				unique: true,
				check: 'foo.length > 10',
				foreign: 'foo_table',
				enumerable: false,
				comparable: true,
				searchable: false,
				fragmentable: true,
				absentValue: ""
			});
			let res = atr.toMinimalTemplate("explicit");
			assert.fieldValues(res, {
				name: 'foo',
				type: 'TINYBLOB()',
				notNull: true,
				unique: true,
				check: 'foo.length > 10',
				foreign: 'foo_table',
				enumerable: false,
				searchable: false,
				absentValue: ""
			});
			assert.allowedFields(res, [ 'name', 'type', 'notNull', 'unique', 'check', 'foreign',
				'enumerable', 'searchable', 'absentValue', 'type' ]);
		});

		it ("Produces TINYBLOB minimal template from all defined fields, object format", () => {
			let atr = new Attribute({
				name: 'foo',
				type: Types.TINYBLOB(),
				notNull: true,
				primary: false,
				unique: true,
				check: 'foo.length > 10',
				foreign: 'foo_table',
				enumerable: false,
				comparable: true,
				searchable: false,
				fragmentable: true,
				absentValue: ""
			});
			let res = atr.toMinimalTemplate("object");
			assert.fieldValues(res, {
				name: 'foo',
				type: 'Types.TINYBLOB()',
				notNull: true,
				unique: true,
				check: 'foo.length > 10',
				foreign: 'foo_table',
				enumerable: false,
				searchable: false,
				absentValue: ""
			});
			assert.allowedFields(res, [ 'name', 'type', 'notNull', 'unique', 'check', 'foreign',
				'enumerable', 'searchable', 'absentValue', 'type' ]);
		});

		it ("Produces TINYBLOB complete template from only type field, internal format", () => {
			let atr = new Attribute({
				type: Types.TINYBLOB()
			});
			let res = atr.toCompleteTemplate("internal");
			assert.fieldValues(res, {
				type: 'TINYBLOB/undefined/string {"maxLen":65535}',
				notNull: false,
				primary: false,
				unique: false,
				check: null,
				foreign: null,
				enumerable: true,
				comparable: true,
				searchable: true,
				fragmentable: true,
				absentValue: null
			});
			assert.allowedFields(res, [ 'type', 'notNull', 'primary', 'unique', 'check', 'foreign',
				'enumerable', 'comparable', 'searchable', 'fragmentable', 'absentValue', 'type' ]);
		});

		it ("Produces TINYBLOB complete template from only type field, explicit format", () => {
			let atr = new Attribute({
				type: Types.TINYBLOB()
			});
			let res = atr.toCompleteTemplate("explicit");
			assert.fieldValues(res, {
				type: 'TINYBLOB()',
				notNull: false,
				primary: false,
				unique: false,
				check: null,
				foreign: null,
				enumerable: true,
				comparable: true,
				searchable: true,
				fragmentable: true,
				absentValue: null
			});
			assert.allowedFields(res, [ 'type', 'notNull', 'primary', 'unique', 'check', 'foreign',
				'enumerable', 'comparable', 'searchable', 'fragmentable', 'absentValue', 'type' ]);
		});

		it ("Produces TINYBLOB complete template from only type field, object format", () => {
			let atr = new Attribute({
				type: Types.TINYBLOB()
			});
			let res = atr.toCompleteTemplate("object");
			assert.fieldValues(res, {
				type: 'Types.TINYBLOB()',
				notNull: false,
				primary: false,
				unique: false,
				check: null,
				foreign: null,
				enumerable: true,
				comparable: true,
				searchable: true,
				fragmentable: true,
				absentValue: null
			});
			assert.allowedFields(res, [ 'type', 'notNull', 'primary', 'unique', 'check', 'foreign',
				'enumerable', 'comparable', 'searchable', 'fragmentable', 'absentValue', 'type' ]);
		});

		it ("Produces TINYBLOB complete template from some defined fields, internal format", () => {
			let atr = new Attribute({
				name: 'foo',
				type: Types.TINYBLOB(),
				notNull: true,
				primary: false,
				check: 'foo.length > 10',
				enumerable: false,
				comparable: true
			});
			let res = atr.toCompleteTemplate("internal");
			assert.fieldValues(res, {
				name: 'foo',
				type: 'TINYBLOB/undefined/string {"maxLen":65535}',
				notNull: true,
				primary: false,
				unique: false,
				check: 'foo.length > 10',
				foreign: null,
				enumerable: false,
				comparable: true,
				searchable: true,
				fragmentable: true,
				absentValue: null
			});
			assert.allowedFields(res, [ 'name', 'type', 'notNull', 'primary', 'unique', 'check',
				'foreign', 'enumerable', 'comparable', 'searchable', 'fragmentable', 'absentValue',
				'type' ]);
		});

		it ("Produces TINYBLOB complete template from some defined fields, explicit format", () => {
			let atr = new Attribute({
				name: 'foo',
				type: Types.TINYBLOB(),
				notNull: true,
				primary: false,
				check: 'foo.length > 10',
				enumerable: false,
				comparable: true
			});
			let res = atr.toCompleteTemplate("explicit");
			assert.fieldValues(res, {
				name: 'foo',
				type: 'TINYBLOB()',
				notNull: true,
				primary: false,
				unique: false,
				check: 'foo.length > 10',
				foreign: null,
				enumerable: false,
				comparable: true,
				searchable: true,
				fragmentable: true,
				absentValue: null
			});
			assert.allowedFields(res, [ 'name', 'type', 'notNull', 'primary', 'unique', 'check',
				'foreign', 'enumerable', 'comparable', 'searchable', 'fragmentable', 'absentValue',
				'type' ]);
		});

		it ("Produces TINYBLOB complete template from some defined fields, object format", () => {
			let atr = new Attribute({
				name: 'foo',
				type: Types.TINYBLOB(),
				notNull: true,
				primary: false,
				check: 'foo.length > 10',
				enumerable: false,
				comparable: true
			});
			let res = atr.toCompleteTemplate("object");
			assert.fieldValues(res, {
				name: 'foo',
				type: 'Types.TINYBLOB()',
				notNull: true,
				primary: false,
				unique: false,
				check: 'foo.length > 10',
				foreign: null,
				enumerable: false,
				comparable: true,
				searchable: true,
				fragmentable: true,
				absentValue: null
			});
			assert.allowedFields(res, [ 'name', 'type', 'notNull', 'primary', 'unique', 'check',
				'foreign', 'enumerable', 'comparable', 'searchable', 'fragmentable', 'absentValue',
				'type' ]);
		});

		it ("Produces TINYBLOB complete template from all defined fields, internal format", () => {
			let atr = new Attribute({
				name: 'foo',
				type: Types.TINYBLOB(),
				notNull: true,
				primary: false,
				unique: true,
				check: 'foo.length > 10',
				foreign: 'foo_table',
				enumerable: false,
				comparable: true,
				searchable: false,
				fragmentable: true,
				absentValue: ""
			});
			let res = atr.toCompleteTemplate("internal");
			assert.fieldValues(res, {
				name: 'foo',
				type: 'TINYBLOB/undefined/string {"maxLen":65535}',
				notNull: true,
				primary: false,
				unique: true,
				check: 'foo.length > 10',
				foreign: 'foo_table',
				enumerable: false,
				comparable: true,
				searchable: false,
				fragmentable: true,
				absentValue: ""
			});
			assert.allowedFields(res, [ 'name', 'type', 'notNull', 'primary', 'unique', 'check',
				'foreign', 'enumerable', 'comparable', 'searchable', 'fragmentable', 'absentValue',
				'type' ]);
		});

		it ("Produces TINYBLOB complete template from all defined fields, explicit format", () => {
			let atr = new Attribute({
				name: 'foo',
				type: Types.TINYBLOB(),
				notNull: true,
				primary: false,
				unique: true,
				check: 'foo.length > 10',
				foreign: 'foo_table',
				enumerable: false,
				comparable: true,
				searchable: false,
				fragmentable: true,
				absentValue: ""
			});
			let res = atr.toCompleteTemplate("explicit");
			assert.fieldValues(res, {
				name: 'foo',
				type: 'TINYBLOB()',
				notNull: true,
				primary: false,
				unique: true,
				check: 'foo.length > 10',
				foreign: 'foo_table',
				enumerable: false,
				comparable: true,
				searchable: false,
				fragmentable: true,
				absentValue: ""
			});
			assert.allowedFields(res, [ 'name', 'type', 'notNull', 'primary', 'unique', 'check',
				'foreign', 'enumerable', 'comparable', 'searchable', 'fragmentable', 'absentValue',
				'type' ]);
		});

		it ("Produces TINYBLOB complete template from all defined fields, object format", () => {
			let atr = new Attribute({
				name: 'foo',
				type: Types.TINYBLOB(),
				notNull: true,
				primary: false,
				unique: true,
				check: 'foo.length > 10',
				foreign: 'foo_table',
				enumerable: false,
				comparable: true,
				searchable: false,
				fragmentable: true,
				absentValue: ""
			});
			let res = atr.toCompleteTemplate("object");
			assert.fieldValues(res, {
				name: 'foo',
				type: 'Types.TINYBLOB()',
				notNull: true,
				primary: false,
				unique: true,
				check: 'foo.length > 10',
				foreign: 'foo_table',
				enumerable: false,
				comparable: true,
				searchable: false,
				fragmentable: true,
				absentValue: ""
			});
			assert.allowedFields(res, [ 'name', 'type', 'notNull', 'primary', 'unique', 'check',
				'foreign', 'enumerable', 'comparable', 'searchable', 'fragmentable', 'absentValue',
				'type' ]);
		});

		it ("Produces UUID minimal template from only type field, internal format", () => {
			let atr = new Attribute({
				type: Types.UUID()
			});
			let res = atr.toMinimalTemplate("internal");
			assert.fieldValues(res, {
				type: 'UUID/UUID/string {"maxLen":128}'
			});
			assert.allowedFields(res, [ 'type', 'type' ]);
		});

		it ("Produces UUID minimal template from only type field, explicit format", () => {
			let atr = new Attribute({
				type: Types.UUID()
			});
			let res = atr.toMinimalTemplate("explicit");
			assert.fieldValues(res, {
				type: 'UUID()'
			});
			assert.allowedFields(res, [ 'type', 'type' ]);
		});

		it ("Produces UUID minimal template from only type field, object format", () => {
			let atr = new Attribute({
				type: Types.UUID()
			});
			let res = atr.toMinimalTemplate("object");
			assert.fieldValues(res, {
				type: 'Types.UUID()'
			});
			assert.allowedFields(res, [ 'type', 'type' ]);
		});

		it ("Produces UUID minimal template from some defined fields, internal format", () => {
			let atr = new Attribute({
				name: 'foo',
				type: Types.UUID(),
				notNull: true,
				primary: false,
				check: 'foo.length > 10',
				enumerable: false,
				comparable: true
			});
			let res = atr.toMinimalTemplate("internal");
			assert.fieldValues(res, {
				name: 'foo',
				type: 'UUID/UUID/string {"maxLen":128}',
				notNull: true,
				check: 'foo.length > 10',
				enumerable: false
			});
			assert.allowedFields(res, [ 'name', 'type', 'notNull', 'check', 'enumerable', 'type' ]);
		});

		it ("Produces UUID minimal template from some defined fields, explicit format", () => {
			let atr = new Attribute({
				name: 'foo',
				type: Types.UUID(),
				notNull: true,
				primary: false,
				check: 'foo.length > 10',
				enumerable: false,
				comparable: true
			});
			let res = atr.toMinimalTemplate("explicit");
			assert.fieldValues(res, {
				name: 'foo',
				type: 'UUID()',
				notNull: true,
				check: 'foo.length > 10',
				enumerable: false
			});
			assert.allowedFields(res, [ 'name', 'type', 'notNull', 'check', 'enumerable', 'type' ]);
		});

		it ("Produces UUID minimal template from some defined fields, object format", () => {
			let atr = new Attribute({
				name: 'foo',
				type: Types.UUID(),
				notNull: true,
				primary: false,
				check: 'foo.length > 10',
				enumerable: false,
				comparable: true
			});
			let res = atr.toMinimalTemplate("object");
			assert.fieldValues(res, {
				name: 'foo',
				type: 'Types.UUID()',
				notNull: true,
				check: 'foo.length > 10',
				enumerable: false
			});
			assert.allowedFields(res, [ 'name', 'type', 'notNull', 'check', 'enumerable', 'type' ]);
		});

		it ("Produces UUID minimal template from all defined fields, internal format", () => {
			let atr = new Attribute({
				name: 'foo',
				type: Types.UUID(),
				notNull: true,
				primary: false,
				unique: true,
				check: 'foo.length > 10',
				foreign: 'foo_table',
				enumerable: false,
				comparable: true,
				searchable: false,
				fragmentable: true,
				absentValue: "a9b383c2-8e09-4690-893c-ac7bbb29dcc1"
			});
			let res = atr.toMinimalTemplate("internal");
			assert.fieldValues(res, {
				name: 'foo',
				type: 'UUID/UUID/string {"maxLen":128}',
				notNull: true,
				unique: true,
				check: 'foo.length > 10',
				foreign: 'foo_table',
				enumerable: false,
				searchable: false,
				absentValue: "a9b383c2-8e09-4690-893c-ac7bbb29dcc1"
			});
			assert.allowedFields(res, [ 'name', 'type', 'notNull', 'unique', 'check', 'foreign',
				'enumerable', 'searchable', 'absentValue', 'type' ]);
		});

		it ("Produces UUID minimal template from all defined fields, explicit format", () => {
			let atr = new Attribute({
				name: 'foo',
				type: Types.UUID(),
				notNull: true,
				primary: false,
				unique: true,
				check: 'foo.length > 10',
				foreign: 'foo_table',
				enumerable: false,
				comparable: true,
				searchable: false,
				fragmentable: true,
				absentValue: "8eee3b7c-f660-4c6c-a4fd-e3f1aaacfb6f"
			});
			let res = atr.toMinimalTemplate("explicit");
			assert.fieldValues(res, {
				name: 'foo',
				type: 'UUID()',
				notNull: true,
				unique: true,
				check: 'foo.length > 10',
				foreign: 'foo_table',
				enumerable: false,
				searchable: false,
				absentValue: "8eee3b7c-f660-4c6c-a4fd-e3f1aaacfb6f"
			});
			assert.allowedFields(res, [ 'name', 'type', 'notNull', 'unique', 'check', 'foreign',
				'enumerable', 'searchable', 'absentValue', 'type' ]);
		});

		it ("Produces UUID minimal template from all defined fields, object format", () => {
			let atr = new Attribute({
				name: 'foo',
				type: Types.UUID(),
				notNull: true,
				primary: false,
				unique: true,
				check: 'foo.length > 10',
				foreign: 'foo_table',
				enumerable: false,
				comparable: true,
				searchable: false,
				fragmentable: true,
				absentValue: "30dbe139-6a1c-408a-9f02-315202f822c8"
			});
			let res = atr.toMinimalTemplate("object");
			assert.fieldValues(res, {
				name: 'foo',
				type: 'Types.UUID()',
				notNull: true,
				unique: true,
				check: 'foo.length > 10',
				foreign: 'foo_table',
				enumerable: false,
				searchable: false,
				absentValue: "30dbe139-6a1c-408a-9f02-315202f822c8"
			});
			assert.allowedFields(res, [ 'name', 'type', 'notNull', 'unique', 'check', 'foreign',
				'enumerable', 'searchable', 'absentValue', 'type' ]);
		});

		it ("Produces UUID complete template from only type field, internal format", () => {
			let atr = new Attribute({
				type: Types.UUID()
			});
			let res = atr.toCompleteTemplate("internal");
			assert.fieldValues(res, {
				type: 'UUID/UUID/string {"maxLen":128}',
				notNull: false,
				primary: false,
				unique: false,
				check: null,
				foreign: null,
				enumerable: true,
				comparable: true,
				searchable: true,
				fragmentable: true,
				absentValue: null
			});
			assert.allowedFields(res, [ 'type', 'notNull', 'primary', 'unique', 'check', 'foreign',
				'enumerable', 'comparable', 'searchable', 'fragmentable', 'absentValue', 'type' ]);
		});

		it ("Produces UUID complete template from only type field, explicit format", () => {
			let atr = new Attribute({
				type: Types.UUID()
			});
			let res = atr.toCompleteTemplate("explicit");
			assert.fieldValues(res, {
				type: 'UUID()',
				notNull: false,
				primary: false,
				unique: false,
				check: null,
				foreign: null,
				enumerable: true,
				comparable: true,
				searchable: true,
				fragmentable: true,
				absentValue: null
			});
			assert.allowedFields(res, [ 'type', 'notNull', 'primary', 'unique', 'check', 'foreign',
				'enumerable', 'comparable', 'searchable', 'fragmentable', 'absentValue', 'type' ]);
		});

		it ("Produces UUID complete template from only type field, object format", () => {
			let atr = new Attribute({
				type: Types.UUID()
			});
			let res = atr.toCompleteTemplate("object");
			assert.fieldValues(res, {
				type: 'Types.UUID()',
				notNull: false,
				primary: false,
				unique: false,
				check: null,
				foreign: null,
				enumerable: true,
				comparable: true,
				searchable: true,
				fragmentable: true,
				absentValue: null
			});
			assert.allowedFields(res, [ 'type', 'notNull', 'primary', 'unique', 'check', 'foreign',
				'enumerable', 'comparable', 'searchable', 'fragmentable', 'absentValue', 'type' ]);
		});

		it ("Produces UUID complete template from some defined fields, internal format", () => {
			let atr = new Attribute({
				name: 'foo',
				type: Types.UUID(),
				notNull: true,
				primary: false,
				check: 'foo.length > 10',
				enumerable: false,
				comparable: true
			});
			let res = atr.toCompleteTemplate("internal");
			assert.fieldValues(res, {
				name: 'foo',
				type: 'UUID/UUID/string {"maxLen":128}',
				notNull: true,
				primary: false,
				unique: false,
				check: 'foo.length > 10',
				foreign: null,
				enumerable: false,
				comparable: true,
				searchable: true,
				fragmentable: true,
				absentValue: null
			});
			assert.allowedFields(res, [ 'name', 'type', 'notNull', 'primary', 'unique', 'check',
				'foreign', 'enumerable', 'comparable', 'searchable', 'fragmentable', 'absentValue',
				'type' ]);
		});

		it ("Produces UUID complete template from some defined fields, explicit format", () => {
			let atr = new Attribute({
				name: 'foo',
				type: Types.UUID(),
				notNull: true,
				primary: false,
				check: 'foo.length > 10',
				enumerable: false,
				comparable: true
			});
			let res = atr.toCompleteTemplate("explicit");
			assert.fieldValues(res, {
				name: 'foo',
				type: 'UUID()',
				notNull: true,
				primary: false,
				unique: false,
				check: 'foo.length > 10',
				foreign: null,
				enumerable: false,
				comparable: true,
				searchable: true,
				fragmentable: true,
				absentValue: null
			});
			assert.allowedFields(res, [ 'name', 'type', 'notNull', 'primary', 'unique', 'check',
				'foreign', 'enumerable', 'comparable', 'searchable', 'fragmentable', 'absentValue',
				'type' ]);
		});

		it ("Produces UUID complete template from some defined fields, object format", () => {
			let atr = new Attribute({
				name: 'foo',
				type: Types.UUID(),
				notNull: true,
				primary: false,
				check: 'foo.length > 10',
				enumerable: false,
				comparable: true
			});
			let res = atr.toCompleteTemplate("object");
			assert.fieldValues(res, {
				name: 'foo',
				type: 'Types.UUID()',
				notNull: true,
				primary: false,
				unique: false,
				check: 'foo.length > 10',
				foreign: null,
				enumerable: false,
				comparable: true,
				searchable: true,
				fragmentable: true,
				absentValue: null
			});
			assert.allowedFields(res, [ 'name', 'type', 'notNull', 'primary', 'unique', 'check',
				'foreign', 'enumerable', 'comparable', 'searchable', 'fragmentable', 'absentValue',
				'type' ]);
		});

		it ("Produces UUID complete template from all defined fields, internal format", () => {
			let atr = new Attribute({
				name: 'foo',
				type: Types.UUID(),
				notNull: true,
				primary: false,
				unique: true,
				check: 'foo.length > 10',
				foreign: 'foo_table',
				enumerable: false,
				comparable: true,
				searchable: false,
				fragmentable: true,
				absentValue: "ca88b3bc-7b0d-4a44-a25a-3258767373df"
			});
			let res = atr.toCompleteTemplate("internal");
			assert.fieldValues(res, {
				name: 'foo',
				type: 'UUID/UUID/string {"maxLen":128}',
				notNull: true,
				primary: false,
				unique: true,
				check: 'foo.length > 10',
				foreign: 'foo_table',
				enumerable: false,
				comparable: true,
				searchable: false,
				fragmentable: true,
				absentValue: "ca88b3bc-7b0d-4a44-a25a-3258767373df"
			});
			assert.allowedFields(res, [ 'name', 'type', 'notNull', 'primary', 'unique', 'check',
				'foreign', 'enumerable', 'comparable', 'searchable', 'fragmentable', 'absentValue',
				'type' ]);
		});

		it ("Produces UUID complete template from all defined fields, explicit format", () => {
			let atr = new Attribute({
				name: 'foo',
				type: Types.UUID(),
				notNull: true,
				primary: false,
				unique: true,
				check: 'foo.length > 10',
				foreign: 'foo_table',
				enumerable: false,
				comparable: true,
				searchable: false,
				fragmentable: true,
				absentValue: "68ed7195-9a15-45a9-842c-06ba1c860379"
			});
			let res = atr.toCompleteTemplate("explicit");
			assert.fieldValues(res, {
				name: 'foo',
				type: 'UUID()',
				notNull: true,
				primary: false,
				unique: true,
				check: 'foo.length > 10',
				foreign: 'foo_table',
				enumerable: false,
				comparable: true,
				searchable: false,
				fragmentable: true,
				absentValue: "68ed7195-9a15-45a9-842c-06ba1c860379"
			});
			assert.allowedFields(res, [ 'name', 'type', 'notNull', 'primary', 'unique', 'check',
				'foreign', 'enumerable', 'comparable', 'searchable', 'fragmentable', 'absentValue',
				'type' ]);
		});

		it ("Produces UUID complete template from all defined fields, object format", () => {
			let atr = new Attribute({
				name: 'foo',
				type: Types.UUID(),
				notNull: true,
				primary: false,
				unique: true,
				check: 'foo.length > 10',
				foreign: 'foo_table',
				enumerable: false,
				comparable: true,
				searchable: false,
				fragmentable: true,
				absentValue: "a54a8141-0240-4869-8886-932fa4b98ba2"
			});
			let res = atr.toCompleteTemplate("object");
			assert.fieldValues(res, {
				name: 'foo',
				type: 'Types.UUID()',
				notNull: true,
				primary: false,
				unique: true,
				check: 'foo.length > 10',
				foreign: 'foo_table',
				enumerable: false,
				comparable: true,
				searchable: false,
				fragmentable: true,
				absentValue: "a54a8141-0240-4869-8886-932fa4b98ba2"
			});
			assert.allowedFields(res, [ 'name', 'type', 'notNull', 'primary', 'unique', 'check',
				'foreign', 'enumerable', 'comparable', 'searchable', 'fragmentable', 'absentValue',
				'type' ]);
		});

		it ("Produces CIDR minimal template from only type field, internal format", () => {
			let atr = new Attribute({
				type: Types.CIDR()
			});
			let res = atr.toMinimalTemplate("internal");
			assert.fieldValues(res, {
				type: 'CIDR/CIDR/string {"maxLen":128}'
			});
			assert.allowedFields(res, [ 'type', 'type' ]);
		});

		it ("Produces CIDR minimal template from only type field, explicit format", () => {
			let atr = new Attribute({
				type: Types.CIDR()
			});
			let res = atr.toMinimalTemplate("explicit");
			assert.fieldValues(res, {
				type: 'CIDR()'
			});
			assert.allowedFields(res, [ 'type', 'type' ]);
		});

		it ("Produces CIDR minimal template from only type field, object format", () => {
			let atr = new Attribute({
				type: Types.CIDR()
			});
			let res = atr.toMinimalTemplate("object");
			assert.fieldValues(res, {
				type: 'Types.CIDR()'
			});
			assert.allowedFields(res, [ 'type', 'type' ]);
		});

		it ("Produces CIDR minimal template from some defined fields, internal format", () => {
			let atr = new Attribute({
				name: 'foo',
				type: Types.CIDR(),
				notNull: true,
				primary: false,
				check: 'foo.length > 10',
				enumerable: false,
				comparable: true
			});
			let res = atr.toMinimalTemplate("internal");
			assert.fieldValues(res, {
				name: 'foo',
				type: 'CIDR/CIDR/string {"maxLen":128}',
				notNull: true,
				check: 'foo.length > 10',
				enumerable: false
			});
			assert.allowedFields(res, [ 'name', 'type', 'notNull', 'check', 'enumerable', 'type' ]);
		});

		it ("Produces CIDR minimal template from some defined fields, explicit format", () => {
			let atr = new Attribute({
				name: 'foo',
				type: Types.CIDR(),
				notNull: true,
				primary: false,
				check: 'foo.length > 10',
				enumerable: false,
				comparable: true
			});
			let res = atr.toMinimalTemplate("explicit");
			assert.fieldValues(res, {
				name: 'foo',
				type: 'CIDR()',
				notNull: true,
				check: 'foo.length > 10',
				enumerable: false
			});
			assert.allowedFields(res, [ 'name', 'type', 'notNull', 'check', 'enumerable', 'type' ]);
		});

		it ("Produces CIDR minimal template from some defined fields, object format", () => {
			let atr = new Attribute({
				name: 'foo',
				type: Types.CIDR(),
				notNull: true,
				primary: false,
				check: 'foo.length > 10',
				enumerable: false,
				comparable: true
			});
			let res = atr.toMinimalTemplate("object");
			assert.fieldValues(res, {
				name: 'foo',
				type: 'Types.CIDR()',
				notNull: true,
				check: 'foo.length > 10',
				enumerable: false
			});
			assert.allowedFields(res, [ 'name', 'type', 'notNull', 'check', 'enumerable', 'type' ]);
		});

		it ("Produces CIDR minimal template from all defined fields, internal format", () => {
			let atr = new Attribute({
				name: 'foo',
				type: Types.CIDR(),
				notNull: true,
				primary: false,
				unique: true,
				check: 'foo.length > 10',
				foreign: 'foo_table',
				enumerable: false,
				comparable: true,
				searchable: false,
				fragmentable: true,
				absentValue: ""
			});
			let res = atr.toMinimalTemplate("internal");
			assert.fieldValues(res, {
				name: 'foo',
				type: 'CIDR/CIDR/string {"maxLen":128}',
				notNull: true,
				unique: true,
				check: 'foo.length > 10',
				foreign: 'foo_table',
				enumerable: false,
				searchable: false,
				absentValue: ""
			});
			assert.allowedFields(res, [ 'name', 'type', 'notNull', 'unique', 'check', 'foreign',
				'enumerable', 'searchable', 'absentValue', 'type' ]);
		});

		it ("Produces CIDR minimal template from all defined fields, explicit format", () => {
			let atr = new Attribute({
				name: 'foo',
				type: Types.CIDR(),
				notNull: true,
				primary: false,
				unique: true,
				check: 'foo.length > 10',
				foreign: 'foo_table',
				enumerable: false,
				comparable: true,
				searchable: false,
				fragmentable: true,
				absentValue: ""
			});
			let res = atr.toMinimalTemplate("explicit");
			assert.fieldValues(res, {
				name: 'foo',
				type: 'CIDR()',
				notNull: true,
				unique: true,
				check: 'foo.length > 10',
				foreign: 'foo_table',
				enumerable: false,
				searchable: false,
				absentValue: ""
			});
			assert.allowedFields(res, [ 'name', 'type', 'notNull', 'unique', 'check', 'foreign',
				'enumerable', 'searchable', 'absentValue', 'type' ]);
		});

		it ("Produces CIDR minimal template from all defined fields, object format", () => {
			let atr = new Attribute({
				name: 'foo',
				type: Types.CIDR(),
				notNull: true,
				primary: false,
				unique: true,
				check: 'foo.length > 10',
				foreign: 'foo_table',
				enumerable: false,
				comparable: true,
				searchable: false,
				fragmentable: true,
				absentValue: ""
			});
			let res = atr.toMinimalTemplate("object");
			assert.fieldValues(res, {
				name: 'foo',
				type: 'Types.CIDR()',
				notNull: true,
				unique: true,
				check: 'foo.length > 10',
				foreign: 'foo_table',
				enumerable: false,
				searchable: false,
				absentValue: ""
			});
			assert.allowedFields(res, [ 'name', 'type', 'notNull', 'unique', 'check', 'foreign',
				'enumerable', 'searchable', 'absentValue', 'type' ]);
		});

		it ("Produces CIDR complete template from only type field, internal format", () => {
			let atr = new Attribute({
				type: Types.CIDR()
			});
			let res = atr.toCompleteTemplate("internal");
			assert.fieldValues(res, {
				type: 'CIDR/CIDR/string {"maxLen":128}',
				notNull: false,
				primary: false,
				unique: false,
				check: null,
				foreign: null,
				enumerable: true,
				comparable: true,
				searchable: true,
				fragmentable: true,
				absentValue: null
			});
			assert.allowedFields(res, [ 'type', 'notNull', 'primary', 'unique', 'check', 'foreign',
				'enumerable', 'comparable', 'searchable', 'fragmentable', 'absentValue', 'type' ]);
		});

		it ("Produces CIDR complete template from only type field, explicit format", () => {
			let atr = new Attribute({
				type: Types.CIDR()
			});
			let res = atr.toCompleteTemplate("explicit");
			assert.fieldValues(res, {
				type: 'CIDR()',
				notNull: false,
				primary: false,
				unique: false,
				check: null,
				foreign: null,
				enumerable: true,
				comparable: true,
				searchable: true,
				fragmentable: true,
				absentValue: null
			});
			assert.allowedFields(res, [ 'type', 'notNull', 'primary', 'unique', 'check', 'foreign',
				'enumerable', 'comparable', 'searchable', 'fragmentable', 'absentValue', 'type' ]);
		});

		it ("Produces CIDR complete template from only type field, object format", () => {
			let atr = new Attribute({
				type: Types.CIDR()
			});
			let res = atr.toCompleteTemplate("object");
			assert.fieldValues(res, {
				type: 'Types.CIDR()',
				notNull: false,
				primary: false,
				unique: false,
				check: null,
				foreign: null,
				enumerable: true,
				comparable: true,
				searchable: true,
				fragmentable: true,
				absentValue: null
			});
			assert.allowedFields(res, [ 'type', 'notNull', 'primary', 'unique', 'check', 'foreign',
				'enumerable', 'comparable', 'searchable', 'fragmentable', 'absentValue', 'type' ]);
		});

		it ("Produces CIDR complete template from some defined fields, internal format", () => {
			let atr = new Attribute({
				name: 'foo',
				type: Types.CIDR(),
				notNull: true,
				primary: false,
				check: 'foo.length > 10',
				enumerable: false,
				comparable: true
			});
			let res = atr.toCompleteTemplate("internal");
			assert.fieldValues(res, {
				name: 'foo',
				type: 'CIDR/CIDR/string {"maxLen":128}',
				notNull: true,
				primary: false,
				unique: false,
				check: 'foo.length > 10',
				foreign: null,
				enumerable: false,
				comparable: true,
				searchable: true,
				fragmentable: true,
				absentValue: null
			});
			assert.allowedFields(res, [ 'name', 'type', 'notNull', 'primary', 'unique', 'check',
				'foreign', 'enumerable', 'comparable', 'searchable', 'fragmentable', 'absentValue',
				'type' ]);
		});

		it ("Produces CIDR complete template from some defined fields, explicit format", () => {
			let atr = new Attribute({
				name: 'foo',
				type: Types.CIDR(),
				notNull: true,
				primary: false,
				check: 'foo.length > 10',
				enumerable: false,
				comparable: true
			});
			let res = atr.toCompleteTemplate("explicit");
			assert.fieldValues(res, {
				name: 'foo',
				type: 'CIDR()',
				notNull: true,
				primary: false,
				unique: false,
				check: 'foo.length > 10',
				foreign: null,
				enumerable: false,
				comparable: true,
				searchable: true,
				fragmentable: true,
				absentValue: null
			});
			assert.allowedFields(res, [ 'name', 'type', 'notNull', 'primary', 'unique', 'check',
				'foreign', 'enumerable', 'comparable', 'searchable', 'fragmentable', 'absentValue',
				'type' ]);
		});

		it ("Produces CIDR complete template from some defined fields, object format", () => {
			let atr = new Attribute({
				name: 'foo',
				type: Types.CIDR(),
				notNull: true,
				primary: false,
				check: 'foo.length > 10',
				enumerable: false,
				comparable: true
			});
			let res = atr.toCompleteTemplate("object");
			assert.fieldValues(res, {
				name: 'foo',
				type: 'Types.CIDR()',
				notNull: true,
				primary: false,
				unique: false,
				check: 'foo.length > 10',
				foreign: null,
				enumerable: false,
				comparable: true,
				searchable: true,
				fragmentable: true,
				absentValue: null
			});
			assert.allowedFields(res, [ 'name', 'type', 'notNull', 'primary', 'unique', 'check',
				'foreign', 'enumerable', 'comparable', 'searchable', 'fragmentable', 'absentValue',
				'type' ]);
		});

		it ("Produces CIDR complete template from all defined fields, internal format", () => {
			let atr = new Attribute({
				name: 'foo',
				type: Types.CIDR(),
				notNull: true,
				primary: false,
				unique: true,
				check: 'foo.length > 10',
				foreign: 'foo_table',
				enumerable: false,
				comparable: true,
				searchable: false,
				fragmentable: true,
				absentValue: ""
			});
			let res = atr.toCompleteTemplate("internal");
			assert.fieldValues(res, {
				name: 'foo',
				type: 'CIDR/CIDR/string {"maxLen":128}',
				notNull: true,
				primary: false,
				unique: true,
				check: 'foo.length > 10',
				foreign: 'foo_table',
				enumerable: false,
				comparable: true,
				searchable: false,
				fragmentable: true,
				absentValue: ""
			});
			assert.allowedFields(res, [ 'name', 'type', 'notNull', 'primary', 'unique', 'check',
				'foreign', 'enumerable', 'comparable', 'searchable', 'fragmentable', 'absentValue',
				'type' ]);
		});

		it ("Produces CIDR complete template from all defined fields, explicit format", () => {
			let atr = new Attribute({
				name: 'foo',
				type: Types.CIDR(),
				notNull: true,
				primary: false,
				unique: true,
				check: 'foo.length > 10',
				foreign: 'foo_table',
				enumerable: false,
				comparable: true,
				searchable: false,
				fragmentable: true,
				absentValue: ""
			});
			let res = atr.toCompleteTemplate("explicit");
			assert.fieldValues(res, {
				name: 'foo',
				type: 'CIDR()',
				notNull: true,
				primary: false,
				unique: true,
				check: 'foo.length > 10',
				foreign: 'foo_table',
				enumerable: false,
				comparable: true,
				searchable: false,
				fragmentable: true,
				absentValue: ""
			});
			assert.allowedFields(res, [ 'name', 'type', 'notNull', 'primary', 'unique', 'check',
				'foreign', 'enumerable', 'comparable', 'searchable', 'fragmentable', 'absentValue',
				'type' ]);
		});

		it ("Produces CIDR complete template from all defined fields, object format", () => {
			let atr = new Attribute({
				name: 'foo',
				type: Types.CIDR(),
				notNull: true,
				primary: false,
				unique: true,
				check: 'foo.length > 10',
				foreign: 'foo_table',
				enumerable: false,
				comparable: true,
				searchable: false,
				fragmentable: true,
				absentValue: ""
			});
			let res = atr.toCompleteTemplate("object");
			assert.fieldValues(res, {
				name: 'foo',
				type: 'Types.CIDR()',
				notNull: true,
				primary: false,
				unique: true,
				check: 'foo.length > 10',
				foreign: 'foo_table',
				enumerable: false,
				comparable: true,
				searchable: false,
				fragmentable: true,
				absentValue: ""
			});
			assert.allowedFields(res, [ 'name', 'type', 'notNull', 'primary', 'unique', 'check',
				'foreign', 'enumerable', 'comparable', 'searchable', 'fragmentable', 'absentValue',
				'type' ]);
		});

		it ("Produces INET minimal template from only type field, internal format", () => {
			let atr = new Attribute({
				type: Types.INET()
			});
			let res = atr.toMinimalTemplate("internal");
			assert.fieldValues(res, {
				type: 'INET/INET/string {"maxLen":128}'
			});
			assert.allowedFields(res, [ 'type', 'type' ]);
		});

		it ("Produces INET minimal template from only type field, explicit format", () => {
			let atr = new Attribute({
				type: Types.INET()
			});
			let res = atr.toMinimalTemplate("explicit");
			assert.fieldValues(res, {
				type: 'INET()'
			});
			assert.allowedFields(res, [ 'type', 'type' ]);
		});

		it ("Produces INET minimal template from only type field, object format", () => {
			let atr = new Attribute({
				type: Types.INET()
			});
			let res = atr.toMinimalTemplate("object");
			assert.fieldValues(res, {
				type: 'Types.INET()'
			});
			assert.allowedFields(res, [ 'type', 'type' ]);
		});

		it ("Produces INET minimal template from some defined fields, internal format", () => {
			let atr = new Attribute({
				name: 'foo',
				type: Types.INET(),
				notNull: true,
				primary: false,
				check: 'foo.length > 10',
				enumerable: false,
				comparable: true
			});
			let res = atr.toMinimalTemplate("internal");
			assert.fieldValues(res, {
				name: 'foo',
				type: 'INET/INET/string {"maxLen":128}',
				notNull: true,
				check: 'foo.length > 10',
				enumerable: false
			});
			assert.allowedFields(res, [ 'name', 'type', 'notNull', 'check', 'enumerable', 'type' ]);
		});

		it ("Produces INET minimal template from some defined fields, explicit format", () => {
			let atr = new Attribute({
				name: 'foo',
				type: Types.INET(),
				notNull: true,
				primary: false,
				check: 'foo.length > 10',
				enumerable: false,
				comparable: true
			});
			let res = atr.toMinimalTemplate("explicit");
			assert.fieldValues(res, {
				name: 'foo',
				type: 'INET()',
				notNull: true,
				check: 'foo.length > 10',
				enumerable: false
			});
			assert.allowedFields(res, [ 'name', 'type', 'notNull', 'check', 'enumerable', 'type' ]);
		});

		it ("Produces INET minimal template from some defined fields, object format", () => {
			let atr = new Attribute({
				name: 'foo',
				type: Types.INET(),
				notNull: true,
				primary: false,
				check: 'foo.length > 10',
				enumerable: false,
				comparable: true
			});
			let res = atr.toMinimalTemplate("object");
			assert.fieldValues(res, {
				name: 'foo',
				type: 'Types.INET()',
				notNull: true,
				check: 'foo.length > 10',
				enumerable: false
			});
			assert.allowedFields(res, [ 'name', 'type', 'notNull', 'check', 'enumerable', 'type' ]);
		});

		it ("Produces INET minimal template from all defined fields, internal format", () => {
			let atr = new Attribute({
				name: 'foo',
				type: Types.INET(),
				notNull: true,
				primary: false,
				unique: true,
				check: 'foo.length > 10',
				foreign: 'foo_table',
				enumerable: false,
				comparable: true,
				searchable: false,
				fragmentable: true,
				absentValue: ""
			});
			let res = atr.toMinimalTemplate("internal");
			assert.fieldValues(res, {
				name: 'foo',
				type: 'INET/INET/string {"maxLen":128}',
				notNull: true,
				unique: true,
				check: 'foo.length > 10',
				foreign: 'foo_table',
				enumerable: false,
				searchable: false,
				absentValue: ""
			});
			assert.allowedFields(res, [ 'name', 'type', 'notNull', 'unique', 'check', 'foreign',
				'enumerable', 'searchable', 'absentValue', 'type' ]);
		});

		it ("Produces INET minimal template from all defined fields, explicit format", () => {
			let atr = new Attribute({
				name: 'foo',
				type: Types.INET(),
				notNull: true,
				primary: false,
				unique: true,
				check: 'foo.length > 10',
				foreign: 'foo_table',
				enumerable: false,
				comparable: true,
				searchable: false,
				fragmentable: true,
				absentValue: ""
			});
			let res = atr.toMinimalTemplate("explicit");
			assert.fieldValues(res, {
				name: 'foo',
				type: 'INET()',
				notNull: true,
				unique: true,
				check: 'foo.length > 10',
				foreign: 'foo_table',
				enumerable: false,
				searchable: false,
				absentValue: ""
			});
			assert.allowedFields(res, [ 'name', 'type', 'notNull', 'unique', 'check', 'foreign',
				'enumerable', 'searchable', 'absentValue', 'type' ]);
		});

		it ("Produces INET minimal template from all defined fields, object format", () => {
			let atr = new Attribute({
				name: 'foo',
				type: Types.INET(),
				notNull: true,
				primary: false,
				unique: true,
				check: 'foo.length > 10',
				foreign: 'foo_table',
				enumerable: false,
				comparable: true,
				searchable: false,
				fragmentable: true,
				absentValue: ""
			});
			let res = atr.toMinimalTemplate("object");
			assert.fieldValues(res, {
				name: 'foo',
				type: 'Types.INET()',
				notNull: true,
				unique: true,
				check: 'foo.length > 10',
				foreign: 'foo_table',
				enumerable: false,
				searchable: false,
				absentValue: ""
			});
			assert.allowedFields(res, [ 'name', 'type', 'notNull', 'unique', 'check', 'foreign',
				'enumerable', 'searchable', 'absentValue', 'type' ]);
		});

		it ("Produces INET complete template from only type field, internal format", () => {
			let atr = new Attribute({
				type: Types.INET()
			});
			let res = atr.toCompleteTemplate("internal");
			assert.fieldValues(res, {
				type: 'INET/INET/string {"maxLen":128}',
				notNull: false,
				primary: false,
				unique: false,
				check: null,
				foreign: null,
				enumerable: true,
				comparable: true,
				searchable: true,
				fragmentable: true,
				absentValue: null
			});
			assert.allowedFields(res, [ 'type', 'notNull', 'primary', 'unique', 'check', 'foreign',
				'enumerable', 'comparable', 'searchable', 'fragmentable', 'absentValue', 'type' ]);
		});

		it ("Produces INET complete template from only type field, explicit format", () => {
			let atr = new Attribute({
				type: Types.INET()
			});
			let res = atr.toCompleteTemplate("explicit");
			assert.fieldValues(res, {
				type: 'INET()',
				notNull: false,
				primary: false,
				unique: false,
				check: null,
				foreign: null,
				enumerable: true,
				comparable: true,
				searchable: true,
				fragmentable: true,
				absentValue: null
			});
			assert.allowedFields(res, [ 'type', 'notNull', 'primary', 'unique', 'check', 'foreign',
				'enumerable', 'comparable', 'searchable', 'fragmentable', 'absentValue', 'type' ]);
		});

		it ("Produces INET complete template from only type field, object format", () => {
			let atr = new Attribute({
				type: Types.INET()
			});
			let res = atr.toCompleteTemplate("object");
			assert.fieldValues(res, {
				type: 'Types.INET()',
				notNull: false,
				primary: false,
				unique: false,
				check: null,
				foreign: null,
				enumerable: true,
				comparable: true,
				searchable: true,
				fragmentable: true,
				absentValue: null
			});
			assert.allowedFields(res, [ 'type', 'notNull', 'primary', 'unique', 'check', 'foreign',
				'enumerable', 'comparable', 'searchable', 'fragmentable', 'absentValue', 'type' ]);
		});

		it ("Produces INET complete template from some defined fields, internal format", () => {
			let atr = new Attribute({
				name: 'foo',
				type: Types.INET(),
				notNull: true,
				primary: false,
				check: 'foo.length > 10',
				enumerable: false,
				comparable: true
			});
			let res = atr.toCompleteTemplate("internal");
			assert.fieldValues(res, {
				name: 'foo',
				type: 'INET/INET/string {"maxLen":128}',
				notNull: true,
				primary: false,
				unique: false,
				check: 'foo.length > 10',
				foreign: null,
				enumerable: false,
				comparable: true,
				searchable: true,
				fragmentable: true,
				absentValue: null
			});
			assert.allowedFields(res, [ 'name', 'type', 'notNull', 'primary', 'unique', 'check',
				'foreign', 'enumerable', 'comparable', 'searchable', 'fragmentable', 'absentValue',
				'type' ]);
		});

		it ("Produces INET complete template from some defined fields, explicit format", () => {
			let atr = new Attribute({
				name: 'foo',
				type: Types.INET(),
				notNull: true,
				primary: false,
				check: 'foo.length > 10',
				enumerable: false,
				comparable: true
			});
			let res = atr.toCompleteTemplate("explicit");
			assert.fieldValues(res, {
				name: 'foo',
				type: 'INET()',
				notNull: true,
				primary: false,
				unique: false,
				check: 'foo.length > 10',
				foreign: null,
				enumerable: false,
				comparable: true,
				searchable: true,
				fragmentable: true,
				absentValue: null
			});
			assert.allowedFields(res, [ 'name', 'type', 'notNull', 'primary', 'unique', 'check',
				'foreign', 'enumerable', 'comparable', 'searchable', 'fragmentable', 'absentValue',
				'type' ]);
		});

		it ("Produces INET complete template from some defined fields, object format", () => {
			let atr = new Attribute({
				name: 'foo',
				type: Types.INET(),
				notNull: true,
				primary: false,
				check: 'foo.length > 10',
				enumerable: false,
				comparable: true
			});
			let res = atr.toCompleteTemplate("object");
			assert.fieldValues(res, {
				name: 'foo',
				type: 'Types.INET()',
				notNull: true,
				primary: false,
				unique: false,
				check: 'foo.length > 10',
				foreign: null,
				enumerable: false,
				comparable: true,
				searchable: true,
				fragmentable: true,
				absentValue: null
			});
			assert.allowedFields(res, [ 'name', 'type', 'notNull', 'primary', 'unique', 'check',
				'foreign', 'enumerable', 'comparable', 'searchable', 'fragmentable', 'absentValue',
				'type' ]);
		});

		it ("Produces INET complete template from all defined fields, internal format", () => {
			let atr = new Attribute({
				name: 'foo',
				type: Types.INET(),
				notNull: true,
				primary: false,
				unique: true,
				check: 'foo.length > 10',
				foreign: 'foo_table',
				enumerable: false,
				comparable: true,
				searchable: false,
				fragmentable: true,
				absentValue: ""
			});
			let res = atr.toCompleteTemplate("internal");
			assert.fieldValues(res, {
				name: 'foo',
				type: 'INET/INET/string {"maxLen":128}',
				notNull: true,
				primary: false,
				unique: true,
				check: 'foo.length > 10',
				foreign: 'foo_table',
				enumerable: false,
				comparable: true,
				searchable: false,
				fragmentable: true,
				absentValue: ""
			});
			assert.allowedFields(res, [ 'name', 'type', 'notNull', 'primary', 'unique', 'check',
				'foreign', 'enumerable', 'comparable', 'searchable', 'fragmentable', 'absentValue',
				'type' ]);
		});

		it ("Produces INET complete template from all defined fields, explicit format", () => {
			let atr = new Attribute({
				name: 'foo',
				type: Types.INET(),
				notNull: true,
				primary: false,
				unique: true,
				check: 'foo.length > 10',
				foreign: 'foo_table',
				enumerable: false,
				comparable: true,
				searchable: false,
				fragmentable: true,
				absentValue: ""
			});
			let res = atr.toCompleteTemplate("explicit");
			assert.fieldValues(res, {
				name: 'foo',
				type: 'INET()',
				notNull: true,
				primary: false,
				unique: true,
				check: 'foo.length > 10',
				foreign: 'foo_table',
				enumerable: false,
				comparable: true,
				searchable: false,
				fragmentable: true,
				absentValue: ""
			});
			assert.allowedFields(res, [ 'name', 'type', 'notNull', 'primary', 'unique', 'check',
				'foreign', 'enumerable', 'comparable', 'searchable', 'fragmentable', 'absentValue',
				'type' ]);
		});

		it ("Produces INET complete template from all defined fields, object format", () => {
			let atr = new Attribute({
				name: 'foo',
				type: Types.INET(),
				notNull: true,
				primary: false,
				unique: true,
				check: 'foo.length > 10',
				foreign: 'foo_table',
				enumerable: false,
				comparable: true,
				searchable: false,
				fragmentable: true,
				absentValue: ""
			});
			let res = atr.toCompleteTemplate("object");
			assert.fieldValues(res, {
				name: 'foo',
				type: 'Types.INET()',
				notNull: true,
				primary: false,
				unique: true,
				check: 'foo.length > 10',
				foreign: 'foo_table',
				enumerable: false,
				comparable: true,
				searchable: false,
				fragmentable: true,
				absentValue: ""
			});
			assert.allowedFields(res, [ 'name', 'type', 'notNull', 'primary', 'unique', 'check',
				'foreign', 'enumerable', 'comparable', 'searchable', 'fragmentable', 'absentValue',
				'type' ]);
		});

		it ("Produces MACADDR minimal template from only type field, internal format", () => {
			let atr = new Attribute({
				type: Types.MACADDR()
			});
			let res = atr.toMinimalTemplate("internal");
			assert.fieldValues(res, {
				type: 'MACADDR/MACADDR/string {"maxLen":128}'
			});
			assert.allowedFields(res, [ 'type', 'type' ]);
		});

		it ("Produces MACADDR minimal template from only type field, explicit format", () => {
			let atr = new Attribute({
				type: Types.MACADDR()
			});
			let res = atr.toMinimalTemplate("explicit");
			assert.fieldValues(res, {
				type: 'MACADDR()'
			});
			assert.allowedFields(res, [ 'type', 'type' ]);
		});

		it ("Produces MACADDR minimal template from only type field, object format", () => {
			let atr = new Attribute({
				type: Types.MACADDR()
			});
			let res = atr.toMinimalTemplate("object");
			assert.fieldValues(res, {
				type: 'Types.MACADDR()'
			});
			assert.allowedFields(res, [ 'type', 'type' ]);
		});

		it ("Produces MACADDR minimal template from some defined fields, internal format", () => {
			let atr = new Attribute({
				name: 'foo',
				type: Types.MACADDR(),
				notNull: true,
				primary: false,
				check: 'foo.length > 10',
				enumerable: false,
				comparable: true
			});
			let res = atr.toMinimalTemplate("internal");
			assert.fieldValues(res, {
				name: 'foo',
				type: 'MACADDR/MACADDR/string {"maxLen":128}',
				notNull: true,
				check: 'foo.length > 10',
				enumerable: false
			});
			assert.allowedFields(res, [ 'name', 'type', 'notNull', 'check', 'enumerable', 'type' ]);
		});

		it ("Produces MACADDR minimal template from some defined fields, explicit format", () => {
			let atr = new Attribute({
				name: 'foo',
				type: Types.MACADDR(),
				notNull: true,
				primary: false,
				check: 'foo.length > 10',
				enumerable: false,
				comparable: true
			});
			let res = atr.toMinimalTemplate("explicit");
			assert.fieldValues(res, {
				name: 'foo',
				type: 'MACADDR()',
				notNull: true,
				check: 'foo.length > 10',
				enumerable: false
			});
			assert.allowedFields(res, [ 'name', 'type', 'notNull', 'check', 'enumerable', 'type' ]);
		});

		it ("Produces MACADDR minimal template from some defined fields, object format", () => {
			let atr = new Attribute({
				name: 'foo',
				type: Types.MACADDR(),
				notNull: true,
				primary: false,
				check: 'foo.length > 10',
				enumerable: false,
				comparable: true
			});
			let res = atr.toMinimalTemplate("object");
			assert.fieldValues(res, {
				name: 'foo',
				type: 'Types.MACADDR()',
				notNull: true,
				check: 'foo.length > 10',
				enumerable: false
			});
			assert.allowedFields(res, [ 'name', 'type', 'notNull', 'check', 'enumerable', 'type' ]);
		});

		it ("Produces MACADDR minimal template from all defined fields, internal format", () => {
			let atr = new Attribute({
				name: 'foo',
				type: Types.MACADDR(),
				notNull: true,
				primary: false,
				unique: true,
				check: 'foo.length > 10',
				foreign: 'foo_table',
				enumerable: false,
				comparable: true,
				searchable: false,
				fragmentable: true,
				absentValue: ""
			});
			let res = atr.toMinimalTemplate("internal");
			assert.fieldValues(res, {
				name: 'foo',
				type: 'MACADDR/MACADDR/string {"maxLen":128}',
				notNull: true,
				unique: true,
				check: 'foo.length > 10',
				foreign: 'foo_table',
				enumerable: false,
				searchable: false,
				absentValue: ""
			});
			assert.allowedFields(res, [ 'name', 'type', 'notNull', 'unique', 'check', 'foreign',
				'enumerable', 'searchable', 'absentValue', 'type' ]);
		});

		it ("Produces MACADDR minimal template from all defined fields, explicit format", () => {
			let atr = new Attribute({
				name: 'foo',
				type: Types.MACADDR(),
				notNull: true,
				primary: false,
				unique: true,
				check: 'foo.length > 10',
				foreign: 'foo_table',
				enumerable: false,
				comparable: true,
				searchable: false,
				fragmentable: true,
				absentValue: ""
			});
			let res = atr.toMinimalTemplate("explicit");
			assert.fieldValues(res, {
				name: 'foo',
				type: 'MACADDR()',
				notNull: true,
				unique: true,
				check: 'foo.length > 10',
				foreign: 'foo_table',
				enumerable: false,
				searchable: false,
				absentValue: ""
			});
			assert.allowedFields(res, [ 'name', 'type', 'notNull', 'unique', 'check', 'foreign',
				'enumerable', 'searchable', 'absentValue', 'type' ]);
		});

		it ("Produces MACADDR minimal template from all defined fields, object format", () => {
			let atr = new Attribute({
				name: 'foo',
				type: Types.MACADDR(),
				notNull: true,
				primary: false,
				unique: true,
				check: 'foo.length > 10',
				foreign: 'foo_table',
				enumerable: false,
				comparable: true,
				searchable: false,
				fragmentable: true,
				absentValue: ""
			});
			let res = atr.toMinimalTemplate("object");
			assert.fieldValues(res, {
				name: 'foo',
				type: 'Types.MACADDR()',
				notNull: true,
				unique: true,
				check: 'foo.length > 10',
				foreign: 'foo_table',
				enumerable: false,
				searchable: false,
				absentValue: ""
			});
			assert.allowedFields(res, [ 'name', 'type', 'notNull', 'unique', 'check', 'foreign',
				'enumerable', 'searchable', 'absentValue', 'type' ]);
		});

		it ("Produces MACADDR complete template from only type field, internal format", () => {
			let atr = new Attribute({
				type: Types.MACADDR()
			});
			let res = atr.toCompleteTemplate("internal");
			assert.fieldValues(res, {
				type: 'MACADDR/MACADDR/string {"maxLen":128}',
				notNull: false,
				primary: false,
				unique: false,
				check: null,
				foreign: null,
				enumerable: true,
				comparable: true,
				searchable: true,
				fragmentable: true,
				absentValue: null
			});
			assert.allowedFields(res, [ 'type', 'notNull', 'primary', 'unique', 'check', 'foreign',
				'enumerable', 'comparable', 'searchable', 'fragmentable', 'absentValue', 'type' ]);
		});

		it ("Produces MACADDR complete template from only type field, explicit format", () => {
			let atr = new Attribute({
				type: Types.MACADDR()
			});
			let res = atr.toCompleteTemplate("explicit");
			assert.fieldValues(res, {
				type: 'MACADDR()',
				notNull: false,
				primary: false,
				unique: false,
				check: null,
				foreign: null,
				enumerable: true,
				comparable: true,
				searchable: true,
				fragmentable: true,
				absentValue: null
			});
			assert.allowedFields(res, [ 'type', 'notNull', 'primary', 'unique', 'check', 'foreign',
				'enumerable', 'comparable', 'searchable', 'fragmentable', 'absentValue', 'type' ]);
		});

		it ("Produces MACADDR complete template from only type field, object format", () => {
			let atr = new Attribute({
				type: Types.MACADDR()
			});
			let res = atr.toCompleteTemplate("object");
			assert.fieldValues(res, {
				type: 'Types.MACADDR()',
				notNull: false,
				primary: false,
				unique: false,
				check: null,
				foreign: null,
				enumerable: true,
				comparable: true,
				searchable: true,
				fragmentable: true,
				absentValue: null
			});
			assert.allowedFields(res, [ 'type', 'notNull', 'primary', 'unique', 'check', 'foreign',
				'enumerable', 'comparable', 'searchable', 'fragmentable', 'absentValue', 'type' ]);
		});

		it ("Produces MACADDR complete template from some defined fields, internal format", () => {
			let atr = new Attribute({
				name: 'foo',
				type: Types.MACADDR(),
				notNull: true,
				primary: false,
				check: 'foo.length > 10',
				enumerable: false,
				comparable: true
			});
			let res = atr.toCompleteTemplate("internal");
			assert.fieldValues(res, {
				name: 'foo',
				type: 'MACADDR/MACADDR/string {"maxLen":128}',
				notNull: true,
				primary: false,
				unique: false,
				check: 'foo.length > 10',
				foreign: null,
				enumerable: false,
				comparable: true,
				searchable: true,
				fragmentable: true,
				absentValue: null
			});
			assert.allowedFields(res, [ 'name', 'type', 'notNull', 'primary', 'unique', 'check',
				'foreign', 'enumerable', 'comparable', 'searchable', 'fragmentable', 'absentValue',
				'type' ]);
		});

		it ("Produces MACADDR complete template from some defined fields, explicit format", () => {
			let atr = new Attribute({
				name: 'foo',
				type: Types.MACADDR(),
				notNull: true,
				primary: false,
				check: 'foo.length > 10',
				enumerable: false,
				comparable: true
			});
			let res = atr.toCompleteTemplate("explicit");
			assert.fieldValues(res, {
				name: 'foo',
				type: 'MACADDR()',
				notNull: true,
				primary: false,
				unique: false,
				check: 'foo.length > 10',
				foreign: null,
				enumerable: false,
				comparable: true,
				searchable: true,
				fragmentable: true,
				absentValue: null
			});
			assert.allowedFields(res, [ 'name', 'type', 'notNull', 'primary', 'unique', 'check',
				'foreign', 'enumerable', 'comparable', 'searchable', 'fragmentable', 'absentValue',
				'type' ]);
		});

		it ("Produces MACADDR complete template from some defined fields, object format", () => {
			let atr = new Attribute({
				name: 'foo',
				type: Types.MACADDR(),
				notNull: true,
				primary: false,
				check: 'foo.length > 10',
				enumerable: false,
				comparable: true
			});
			let res = atr.toCompleteTemplate("object");
			assert.fieldValues(res, {
				name: 'foo',
				type: 'Types.MACADDR()',
				notNull: true,
				primary: false,
				unique: false,
				check: 'foo.length > 10',
				foreign: null,
				enumerable: false,
				comparable: true,
				searchable: true,
				fragmentable: true,
				absentValue: null
			});
			assert.allowedFields(res, [ 'name', 'type', 'notNull', 'primary', 'unique', 'check',
				'foreign', 'enumerable', 'comparable', 'searchable', 'fragmentable', 'absentValue',
				'type' ]);
		});

		it ("Produces MACADDR complete template from all defined fields, internal format", () => {
			let atr = new Attribute({
				name: 'foo',
				type: Types.MACADDR(),
				notNull: true,
				primary: false,
				unique: true,
				check: 'foo.length > 10',
				foreign: 'foo_table',
				enumerable: false,
				comparable: true,
				searchable: false,
				fragmentable: true,
				absentValue: ""
			});
			let res = atr.toCompleteTemplate("internal");
			assert.fieldValues(res, {
				name: 'foo',
				type: 'MACADDR/MACADDR/string {"maxLen":128}',
				notNull: true,
				primary: false,
				unique: true,
				check: 'foo.length > 10',
				foreign: 'foo_table',
				enumerable: false,
				comparable: true,
				searchable: false,
				fragmentable: true,
				absentValue: ""
			});
			assert.allowedFields(res, [ 'name', 'type', 'notNull', 'primary', 'unique', 'check',
				'foreign', 'enumerable', 'comparable', 'searchable', 'fragmentable', 'absentValue',
				'type' ]);
		});

		it ("Produces MACADDR complete template from all defined fields, explicit format", () => {
			let atr = new Attribute({
				name: 'foo',
				type: Types.MACADDR(),
				notNull: true,
				primary: false,
				unique: true,
				check: 'foo.length > 10',
				foreign: 'foo_table',
				enumerable: false,
				comparable: true,
				searchable: false,
				fragmentable: true,
				absentValue: ""
			});
			let res = atr.toCompleteTemplate("explicit");
			assert.fieldValues(res, {
				name: 'foo',
				type: 'MACADDR()',
				notNull: true,
				primary: false,
				unique: true,
				check: 'foo.length > 10',
				foreign: 'foo_table',
				enumerable: false,
				comparable: true,
				searchable: false,
				fragmentable: true,
				absentValue: ""
			});
			assert.allowedFields(res, [ 'name', 'type', 'notNull', 'primary', 'unique', 'check',
				'foreign', 'enumerable', 'comparable', 'searchable', 'fragmentable', 'absentValue',
				'type' ]);
		});

		it ("Produces MACADDR complete template from all defined fields, object format", () => {
			let atr = new Attribute({
				name: 'foo',
				type: Types.MACADDR(),
				notNull: true,
				primary: false,
				unique: true,
				check: 'foo.length > 10',
				foreign: 'foo_table',
				enumerable: false,
				comparable: true,
				searchable: false,
				fragmentable: true,
				absentValue: ""
			});
			let res = atr.toCompleteTemplate("object");
			assert.fieldValues(res, {
				name: 'foo',
				type: 'Types.MACADDR()',
				notNull: true,
				primary: false,
				unique: true,
				check: 'foo.length > 10',
				foreign: 'foo_table',
				enumerable: false,
				comparable: true,
				searchable: false,
				fragmentable: true,
				absentValue: ""
			});
			assert.allowedFields(res, [ 'name', 'type', 'notNull', 'primary', 'unique', 'check',
				'foreign', 'enumerable', 'comparable', 'searchable', 'fragmentable', 'absentValue',
				'type' ]);
		});

	});

});
