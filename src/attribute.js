const assert = require("assert-one");
const DataType = require("type-one").DataType;
const Types = require("./types.js");

const util = require("./util.js");

class AttributeError extends Error {

	constructor (message) {
		super(message);
		this.name = "AttributeError";
	}

}

const SCHEMA = {
	TEMPLATE_FIELDS_T: {
		type: "object"
	},
	TEMPLATE_OPTIONAL_T: {
		name: "string", notNull: "boolean", primary: "boolean", unique: "boolean", check: "string",
		foreign: "string", enumerable: "boolean", comparable: "boolean", searchable: "boolean",
		fragmentable: "boolean"
	}
};

/*
 * Attribute class
 * Attribute objects store and operate with information about entity attributes
 *
 * Properties
 * - `name`: string, name of this attribute (if any, default `null`), eg. `price`
 * - `modelName`: string, name of the model for this attribute (if any, default `null`)
 * - `model`: Model object, reference to the model object for this attribute (if any, default `null`)
 * - `type`: type object, a type object for validating attribute values
 * - `notNull`: boolean, NOT NULL constraint (this value cannot be null)
 * - `primary`: boolean, PRIMARY constraint (this value is a primary key)
 * - `unique`: boolean, UNIQUE constraint (no other entity can be defined with this value)
 * - `check`: string, a boolean expression that this value must validate
 * - `foreign`: string, entity name this value references (by id)
 * - `env`: object, reference to ModelOne environment object
 */

class Attribute {

	/*
	 * Creates Attribute object from template properties or type
	 * `template`: template object or type object, properties for the relationship object
	 * `name`: string, if this is set, use this as the name instead of the one in the template (optional)
	 *
	 * If the argument is a type object, an attribute for this type will be created with default
	 * values (type properties specified by type object and default constraints)
	 *
	 * If the argument is a template, the following fields will be reflected in the created
	 * Attribute object:
	 * - `name`: string, name of this attribute (optional, default: null)
	 * - `model`: string, model name for this attribute (optional, default: null)
	 * - `type`: type object, the type object this attribute is built around
	 * - `notNull`: boolean, NOT NULL constraint (this value cannot be null) (optional, default: false)
	 * - `primary`: boolean, PRIMARY constraint (this value is a primary key) (optional, default: false)
	 * - `unique`: boolean, UNIQUE constraint (no other entity can be defined with this value) (optional, default: false)
	 * - `check`: string, a boolean expression that this value must validate (optional, default: null)
	 * - `foreign`: string, entity name this value references (by id) (optional, default: null)
	 * - `enumerable`: boolean, if this is set, override type default (optional)
	 * - `comparable`: boolean, if this is set, override type default (optional)
	 * - `searchable`: boolean, if this is set, override type default (optional)
	 * - `fragmentable`: boolean, if this is set, override type default (optional)
	 * - `absentValue`: any type, if this is set, override type default, null for no absent value (optional)
	 * - `env`: object, reference to `ModelOne` environment object (optional)
	 */
	constructor (template, name) {
		if (template instanceof DataType) {
			this.type = template;
			this.name = null;
			this.modelName = null;
			this.model = null;
			this.notNull = false;
			this.primary = false;
			this.unique = false;
			this.check = null;
			this.foreign = null;
			this.env = null;
		}
		else {
			assert.type(template, "object", AttributeError, "template", "constructor");
			assert.fieldTypes(template, SCHEMA.TEMPLATE_FIELDS_T, AttributeError, "template", "constructor");
			assert.optionalFieldTypes(template, SCHEMA.TEMPLATE_OPTIONAL_T, AttributeError, "template", "constructor");

			this.name = template.name ? template.name : null;
			this.modelName = template.model ? template.model : null;
			this.model = null;
			this.type = template.type;
			this.notNull = !!template.notNull;
			this.primary = !!template.primary;
			this.unique = !!template.unique;
			this.check = template.check ? template.check : null;
			this.foreign = template.foreign ? template.foreign : null;

			let typeProperties = {};
			[ "enumerable", "comparable", "searchable", "fragmentable", "absentValue" ].map((key) => {
				if (template[key] !== undefined)
					typeProperties[key] = template[key];
			});
			this.type.applyProperties(typeProperties);

			this.env = template.env ? template.env : null;
		}
	}

	/*
	 * Set the environment object for this Attribute
	 * `env`: ModelOne environment, reference to environment object
	 */
	setEnv (env) {
		this.env = env;
	}

	/*
	 * Get the environment object for this Attribute
	 *
	 * Return: ModelOne environment, reference to the environment object or null if not set
	 */
	getEnv () {
		return this.env;
	}

	/*
	 * Get the name of this Attribute
	 *
	 * Return: string, the set name of this Attribute or null if no name has been set
	 */
	getName () {
		return this.name;
	}

	/*
	 * Get the model name for this Attribute
	 *
	 * Return: string, the model name or null if no model name has been set
	 */
	getModelName () {
		return this.modelName;
	}

	/*
	 * Get the model reference for this Attribute
	 *
	 * Return: Model object, the model reference or null if no model reference has been set
	 */
	getModel () {
		return this.model;
	}

	/*
	 * Get the type object reference of this Attribute
	 *
	 * Return: DataType object, the type object reference for this Attribute
	 */
	getType () {
		return this.type;
	}

	/*
	 * Check wether this Attribute has the `not null` constraint or not
	 */
	hasNotNullConstraint () {
		return this.notNull;
	}

	/*
	 * Check wether this Attribute has the `primary` constraint or not
	 */
	hasPrimaryConstraint () {
		return this.primary;
	}

	/*
	 * Check wether this Attribute has the `unique` constraint or not
	 */
	hasUniqueConstraint () {
		return this.unique;
	}

	/*
	 * Get the `check` onstraint for this Attribute
	 *
	 * Return: string, the `check` constraint or `null` if none is set
	 */
	getCheckConstraint () {
		return this.check;
	}

	/*
	 * Get the `foreign key` constraint for this Attribute
	 *
	 * Return: string, the `foreign key` constraint or `null` if none is set
	 */
	getForeignKeyConstraint () {
		return this.foreign;
	}

	/*
	 * Check that the type of this Attribute is enumerable
	 */
	hasEnumerableType () {
		return this.type.isEnumerable();
	}

	/*
	 * Check that the type of this Attribute is searchable
	 */
	hasSearchableType () {
		return this.type.isSearchable();
	}

	/*
	 * Check that the type of this Attribute is comparable
	 */
	hasComparableType () {
		return this.type.isComparable();
	}

	/*
	 * Check that the type of this Attribute is fragmentable
	 */
	hasFragmentableType () {
		return this.type.isFragmentable();
	}

	/*
	 * Get the `absent value` for this Attribute type
	 *
	 * Return: any type, the absent value set for this type or null if none
	 */
	getTypeAbsentValue () {
		// TODO: replace with getter when implemented in library
		return this.type.properties.absentValue;
	}

	/*
	 * Export this attribute object as a template object with as little fields as possible
	 * `format`: string, format to use for library-specific values, such as data type
	 * - `explicit`: use string format, such as `STRING()`
	 * - `internal`: use internal representation, usually a number or string
	 * - `object`: use object representation (for export), such as `Types.STRING()`
	 * Returns a template object with only the strictly required values
	 */
	toMinimalTemplate (format) {
		let ret = {};

		if (this.name)
			ret.name = this.name;
		if (this.modelName)
			ret.model = this.modelName;

		ret.type = Attribute.formatType(this.type, format);
		if (this.notNull)
			ret.notNull = true;
		if (this.primary)
			ret.primary = true;
		if (this.unique)
			ret.unique = true;
		if (this.check !== null)
			ret.check = this.check;
		if (this.foreign !== null)
			ret.foreign = this.foreign;

		let defaultTypeObject = new this.type.constructor();
		if (this.type.isEnumerable() !== defaultTypeObject.isEnumerable())
			ret.enumerable = this.type.isEnumerable();
		if (this.type.isComparable() !== defaultTypeObject.isComparable())
			ret.comparable = this.type.isComparable();
		if (this.type.isSearchable() !== defaultTypeObject.isSearchable())
			ret.searchable = this.type.isSearchable();
		if (this.type.isFragmentable() !== defaultTypeObject.isFragmentable())
			ret.fragmentable = this.type.isFragmentable();
		// TODO: replace with getter when implemented in library
		if (this.type.properties.absentValue !== defaultTypeObject.properties.absentValue)
			ret.absentValue = this.type.properties.absentValue;

		return ret;
	}

	/*
	 * Export this relationship object as a template object with all redundant fields specified
	 * `format`: string, format to use for library-specific values, such as relationship type
	 * - `explicit`: use string format, such as `ONE_TO_ONE"
	 * - `internal`: use internal representation, usually a number
	 * - `object`: use object representation (for export), such as Relationship.ONE_TO_ONE
	 * Returns a template object with all possibly defined values
	 */
	toCompleteTemplate (format) {
		let ret = {};

		if (this.name)
			ret.name = this.name;
		if (this.modelName)
			ret.model = this.modelName;

		ret.type = Attribute.formatType(this.type, format);

		ret.notNull = this.notNull;
		ret.primary = this.primary;
		ret.unique = this.unique;
		ret.check = this.check;
		ret.foreign = this.foreign;
		ret.enumerable = this.type.isEnumerable();
		ret.comparable = this.type.isComparable();
		ret.searchable = this.type.isSearchable();
		ret.fragmentable = this.type.isFragmentable();
		// TODO: replace with getter when implemented in library
		ret.absentValue = this.type.properties.absentValue;

		return ret;
	}

	/*
	 * Export this relationship object as a template string (for file output)
	 * `complete`: boolean, if `true` also export redundant fields
	 * `newLine`: boolean, if `true` format object data using new line (default: `true`)
	 * `indentation`: number, for `newLine` formatting, indentation length for output string (default: 4)
	 * `depth`: number, for `newLine` formatting, indentation depth to start from (default: 0)
	 * `format`: string, format to use for defined types (relationships and data types), defaults to "explicit"
	 * - `explicit`: use string format, such as `ONE_TO_ONE"
	 * - `internal`: use internal representation, usually a number
	 * - `object`: use object representation (for export), such as Relationship.ONE_TO_ONE
	 * Returns a string containing the template representation (for file export, for instance)
	 */
	toTemplateString (options) {
		if (options === undefined)
			options = {};
		let com = options.complete === undefined ? false : options.complete;
		let nln = options.newLine === false ? " " : "\n";
		let ind = options.indentation === undefined ? 4 : options.indentation;
		let dpt = options.depth === undefined ? 0 : options.depth;
		let fmt = options.format === undefined ? "explicit" : options.format;
		let ia = util.indentationArray(ind);

		let ret = [];

		let obj;
		if (com)
			obj = this.toCompleteTemplate(fmt);
		else
			obj = this.toMinimalTemplate(fmt);

		for (let i in obj) {
			ret.push(ia[dpt+1] + util.kvPair(i, obj[i], false, typeof(obj[i]) === "string"));
		}

		ret = "{" + nln + ret.join("," + nln) + nln + ia[dpt] + "}";

		return ret;
	}

}

/*
 * Get the string corresponding to a type object
 * `type`: DataType object
 * Returns string, the corresponding string, eg "BOOLEAN()"
 */
Attribute.getTypeString = function (type) {
	try {
		return Types.getCall(type);
	}
	catch (e) {
		throw new AttributeError(e.message);
	}
};

/*
 * Get a formatted type in one of three formats
 * `type`: Type object, attribute type
 * `format`: string, one of `explicit`, `internal` or `object` (defaults to `explicit`)
 * Returns a formatted string corresponding to the attribute type and format
 */
Attribute.formatType = function (type, format) {
	switch (format) {
		case "internal":
			return type.serialize();
		case "object":
			return "Types." + Attribute.getTypeString(type);
		case "explicit":
		default:
			return Attribute.getTypeString(type);
	}
	throw new AttributeError("Unknown format " + format);
};

module.exports = Attribute;
module.exports.AttributeError = AttributeError;
