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

		/* MACRO.HEADER */
		const types = require(path.join(__dirname, "../src/types.js"));
		const TOKENS = (type, minimal, all, format) => {
			let MIN = minimal ? "minimal" : "complete";
			let constructor = types.Types[type];
			let ALL = (all === "none") ? "only type field" : (all === "some") ? "some defined fields" : "all defined fields";
			if (constructor === null)
				return [];
			let fieldsIn = [];
			let fieldsOut = [];
			let allowed = [];
			let defaults = {
				enumerable: constructor().isEnumerable(),
				comparable: constructor().isComparable(),
				searchable: constructor().isSearchable(),
				fragmentable: constructor().isFragmentable(),
				absentValue: constructor().properties.absentValue,
				defaultValue: JSON.stringify(constructor().getDefault())
			};	
			if (all === "some" || all === "all") {
				fieldsIn.push("name: 'foo'");
				fieldsOut.push("name: 'foo'");
			}
			fieldsIn.push("type: Types." + type + "()");
			if (format === "internal")
				fieldsOut.push("type: '" + (constructor()).serialize() + "'");
			if (format === "explicit")
				fieldsOut.push("type: '" + type + "()'");
			if (format === "object")
				fieldsOut.push("type: 'Types." + type + "()'");
			if (all === "none" && !minimal) {
				fieldsOut.push("notNull: false");
				fieldsOut.push("primary: false");
			}
			if (all === "some" || all === "all") {
				fieldsIn.push("notNull: true");
				fieldsIn.push("primary: false");
				fieldsOut.push("notNull: true");
				if (!minimal)
					fieldsOut.push("primary: false");
			}
			if (all === "all") {
				fieldsIn.push("unique: true");
				fieldsOut.push("unique: true");
			}
			else if (!minimal)
				fieldsOut.push("unique: false");
			if (all === "some" || all === "all") {
				fieldsIn.push("check: 'foo.length > 10'");
				fieldsOut.push("check: 'foo.length > 10'");
			}
			else if (!minimal)
				fieldsOut.push("check: null");
			if (all === "all") {
				fieldsIn.push("foreign: 'foo_table'");
				fieldsOut.push("foreign: 'foo_table'");
			}
			else if (!minimal) {
				fieldsOut.push("foreign: null");
			}
			if (all === "some" || all === "all") {
				fieldsIn.push("enumerable: " + !defaults.enumerable);
				fieldsIn.push("comparable: " + defaults.comparable);
				fieldsOut.push("enumerable: " + !defaults.enumerable);
				if (!minimal)
					fieldsOut.push("comparable: " + defaults.comparable);
			}
			else if (!minimal) {
				fieldsOut.push("enumerable: " + defaults.enumerable);
				fieldsOut.push("comparable: " + defaults.comparable);
			}
			if (all === "all") {
				fieldsIn.push("searchable: " + !defaults.searchable);
				fieldsIn.push("fragmentable: " + defaults.fragmentable);
				fieldsIn.push("absentValue: " + defaults.defaultValue);
				fieldsOut.push("searchable: " + !defaults.searchable);
				if (!minimal) {
					fieldsOut.push("fragmentable: " + defaults.fragmentable);
				}
				fieldsOut.push("absentValue: " + defaults.defaultValue);
			}
			else if (!minimal) {
				fieldsOut.push("searchable: " + defaults.searchable);
				fieldsOut.push("fragmentable: " + defaults.fragmentable);
				fieldsOut.push("absentValue: null");
			}
			let al = [];
			for (let i in fieldsOut) {
				al.push("'" + fieldsOut[i].split(":")[0] + "'");
				if (al.length >= 6) {
					allowed.push(al);
					al = [];
				}
			}
			if (allowed.indexOf("type") === -1)
				al.push("'type'");
			allowed.push(al);
			let extras = "";
			return [ {
				MIN: MIN,
				TYPE: type,
				ALL: ALL,
				FORMAT: format,
				TEMPLATE_FN: minimal ? "toMinimalTemplate" : "toCompleteTemplate",
				FIELDS_IN: fieldsIn.join(",\n\t\t\t\t"),
				FIELDS_OUT: fieldsOut.join(",\n\t\t\t\t"),
				ALLOWED: allowed.map((el) => el.join(", ")).join(",\n\t\t\t\t"),
				EXTRAS: extras
			} ];
		};
		const RANGES = [
			{ keys: types.Types },
			{ values: [ true, false ] },
			{ values: [ "none", "some", "all" ] },
			{ values: [ "internal", "explicit", "object" ] }
		];
		/* MACRO.HEADER */
		/* MACRO.BODY */
		it ("Produces %TYPE% %MIN% template from %ALL%, %FORMAT% format", () => {
			let atr = new Attribute({
				%FIELDS_IN%
			});
			let res = atr.%TEMPLATE_FN%("%FORMAT%");
			assert.fieldValues(res, {
				%FIELDS_OUT%
			});
			assert.allowedFields(res, [ %ALLOWED% ]);%EXTRAS%
		});

		/* MACRO.BODY */
	});

});
