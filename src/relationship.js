const assert = require("assert-one");

const util = require("./util.js");

class RelationshipError extends Error {

	constructor (message) {
		super(message);
		this.name = "RelationshipError";
	}

}

const SCHEMA = {
	TEMPLATE_FIELDS_T: {
		source: "string", target: "string", type: [ "number", "string" ]
	},
	TEMPLATE_OPTIONAL_T: { 
		sourceAs: "string", targetAs: "string", name: "string", chain: "boolean", env: "object"
	},
	TEMPLATE_FIELDS_V: {
		type: [ "ONE_TO_ONE", "ONE_TO_MANY", "MANY_TO_ONE", "MANY_TO_MANY", 0, 1, 2, 3 ]
	}
};

/*
 * Relationship class
 * Relationship objects store and operate with information about entity relationships
 *
 * Properties
 * - `name`: string, name of this relationship (if any), eg. `ownership`
 * - `type`: number, takes one of the available relationship types (`ONE_TO_MANY`, etc)
 * - `chain`: boolean, if `true` relationship propagates up the Model tree (eg if A owns B and B owns C, A owns C)
 * - `sourceName`: string, name of the source model
 * - `targetName`: string, name of the target model
 * - `sourceAlias`: string, alias of the source model
 * - `targetAlias`: string, alias of the target model
 * - `source`: object, reference to source Model object
 * - `target`: object, reference to target Model object
 * - `env`: object, reference to ModelOne environment object
 * - `forward`: object, reference to forward Relationship object (if this is a reverse relationship)
 * - `reverse`: object, reference to reverse Relationship object (if this is a forward relationship)
 */

class Relationship {

	/*
	 * Creates Relationship object from template properties
	 * `template`: template object, properties for the relationship object
	 * - `source`: string, name of the source model
	 * - `target`: string, name of the target model
	 * - `sourceAs`: string, alias of the source model (optional)
	 * - `targetAs`: string, alias of the target model (optional)
	 * - `type`: string or Relationship.Type (`ONE_TO_MANY` etc)
	 * - `name`: string - name of this relationship (optional)
	 * - `chain`: boolean - if `true` the relationship propagates up the Model tree (optional)
	 * - `env`: object, reference to `ModelOne` environment object (optional)
	 * `forward`: Relationship object, if this is set, this will be a reverse relationship for `forward`
	 */
	constructor (template, forward) {
		assert.type(template, "object", RelationshipError, "template", "constructor");
		assert.fieldTypes(template, SCHEMA.TEMPLATE_FIELDS_T, RelationshipError, "template", "constructor");
		assert.optionalFieldTypes(template, SCHEMA.TEMPLATE_OPTIONAL_T, RelationshipError, "template", "constructor");
		assert.fieldValues(template, SCHEMA.TEMPLATE_FIELDS_V, RelationshipError, "template", "constructor");

		this.name = template.name;
		this.type = typeof(template.type) === "number" ? template.type : Relationship.getTypeId(template.type);
		this.chain = template.chain ? true : false;
		this.sourceName = template.source;
		this.targetName = template.target;
		this.sourceAlias = template.sourceAs;
		this.targetAlias = template.targetAs;
		this.source = null;
		this.target = null;
		this.env = template.env ? template.env : null;

		if (forward instanceof Relationship) {
			this.forward = forward;
			this.reverse = null;
		}
		else {
			this.forward = null;
			this.reverse = this._getReverseInstance();
		}
	}

	/*
	 * Return a new relationship object that's the mirror relationship of this
	 */
	_getReverseInstance () {
		return new Relationship({
			source: this.targetName,
			target: this.sourceName,
			sourceAs: this.targetAlias,
			targetAs: this.sourceAlias,
			type: Relationship.getReverseType(this.type),
			name: this.name ? this.name : undefined,
			chain: this.chain
		}, this);
	}

	/*
	 * Set source model
	 * `model`: Model object, source model
	 */
	setSource (model) {
		this.source = model;
	}

	/*
	 * Set target model
	 * `model`: Model object, target model
	 */
	setTarget (model) {
		this.target = model;
	}

	/*
	 * Set environment object
	 * `env`: ModelOne object, environment object
	 */
	setEnv (env) {
		this.env = env;
	}

	/*
	 * Get source model
	 *
	 * Returns: Model object, source model
	 */
	getSource () {
		return this.source;
	}

	/*
	 * Get target model
	 *
	 * Returns: Model object, target model
	 */
	getTarget () {
		return this.target;
	}

	/*
	 * Get forward relationship in case this is a reverse, null otherwise
	 */
	getForwardRelationship () {
		return this.forward;
	}

	/*
	 * Get reverse relationship in case this is a forward, null otherwise
	 */
	getReverseRelationship () {
		return this.reverse;
	}

	/*
	 * Check that this is a forward relationship
	 */
	isForward () {
		return this.reverse !== null;
	}

	/*
	 * Check that this is a reversed relationship
	 */
	isReverse () {
		return this.forward !== null;
	}

	/*
	 * Get relationship direction
	 * Returns either `Relationship.FORWARD (1)` or `Relationship.REVERSE (2)`
	 */
	getDirection () {
		if (this.reverse === null)
			return Relationship.REVERSE;
		return Relationship.FORWARD;
	}

	/*
	 * Get environment object
	 *
	 * Returns: ModelOne object, environment object
	 */
	getEnv () {
		return this.env;
	}

	getName () {
		return this.name;
	}

	getType () {
		return this.type;
	}

	getTypeString () {
		return Relationship.getTypeString(this.type);
	}

	isChained () {
		return this.chain === true;
	}

	getSourceName () {
		return this.sourceName;
	}

	getTargetName () {
		return this.targetName;
	}

	/*
	 * Get source alias; if no source alias is set, it returns the source name
	 */
	getSourceAlias () {
		if (this.sourceAlias)
			return this.sourceAlias;
		return this.sourceName;
	}

	/*
	 * Get target alias; if no target alias is set, it returns the target name
	 */
	getTargetAlias () {
		if (this.targetAlias)
			return this.targetAlias;
		return this.targetName;
	}

	/*
	 * Export this relationship object as a template object with as little fields as possible
	 * `format`: string, format to use for library-specific values, such as relationship type
	 * - `explicit`: use string format, such as `ONE_TO_ONE"
	 * - `internal`: use internal representation, usually a number
	 * - `object`: use object representation (for export), such as Relationship.ONE_TO_ONE
	 * Returns a template object with only the strictly required values
	 */
	toMinimalTemplate (format) {
		let ret = {
			source: this.sourceName,
			target: this.targetName
		};

		if (this.sourceAlias)
			ret.sourceAs = this.sourceAlias;
		if (this.targetAlias)
			ret.targetAs = this.targetAlias;

		ret.type = Relationship.formatType(this.type, format)

		if (this.name)
			ret.name = this.name;
		if (this.chain)
			ret.chain = this.chain;

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
		let ret = {
			source: this.sourceName,
			target: this.targetName,
			sourceAs: this.sourceAlias ? this.sourceAlias : this.sourceName,
			targetAs: this.targetAlias ? this.targetAlias : this.targetName,
			type: Relationship.formatType(this.type, format)
		};
		if (this.name)
			ret.name = this.name;
		if (this.chain !== undefined)
			ret.chain = this.chain;

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

		ret.push(ia[dpt+1] + util.kvPair("source", this.sourceName, false, true));
		ret.push(ia[dpt+1] + util.kvPair("target", this.targetName, false, true));

		if (com || (this.sourceAlias && this.sourceName !== this.sourceAlias))
			ret.push(ia[dpt+1] + util.kvPair("sourceAs", this.getSourceAlias(), false, true));
		if (com || (this.targetAlias && this.targetName !== this.targetAlias))
			ret.push(ia[dpt+1] + util.kvPair("targetAs", this.getTargetAlias(), false, true));

		ret.push(ia[dpt+1] + util.kvPair("type", Relationship.formatType(this.type, fmt), false, fmt === "explicit"));

		if (this.name)
			ret.push(ia[dpt+1] + util.kvPair("name", this.name, false, true));
		if (com || this.chain)
			ret.push(ia[dpt+1] + util.kvPair("chain", this.chain ? true : false, false, false));

		ret = "{" + nln + ret.join("," + nln) + nln + ia[dpt] + "}";

		return ret;
	}

}

Relationship.ONE_TO_ONE = 0;
Relationship.ONE_TO_MANY = 1;
Relationship.MANY_TO_ONE = 2;
Relationship.MANY_TO_MANY = 3;

Relationship.FORWARD = 1;
Relationship.REVERSE = 2;

/*
 * Get the string corresponding to a type id
 * `type`: number, type id (0, 1, 2 or 3)
 * Returns string, the corresponding string, eg "ONE_TO_ONE"
 */
Relationship.getTypeString = function (type) {
	switch (type) {
		case Relationship.ONE_TO_ONE:
			return "ONE_TO_ONE";
		case Relationship.ONE_TO_MANY:
			return "ONE_TO_MANY";
		case Relationship.MANY_TO_ONE:
			return "MANY_TO_ONE";
		case Relationship.MANY_TO_MANY:
			return "MANY_TO_MANY";
	}
	throw new RelationshipError("Unknown relationship type id " + type);
};

/*
 * Get the id corresponding to a relationship type string
 * `type`: string, type string (eg "ONE_TO_ONE")
 * Returns number, the corresponding id, eg 0
 */
Relationship.getTypeId = function (type) {
	switch (type) {
		case "ONE_TO_ONE":
			return Relationship.ONE_TO_ONE;
		case "ONE_TO_MANY":
			return Relationship.ONE_TO_MANY;
		case "MANY_TO_ONE":
			return Relationship.MANY_TO_ONE;
		case "MANY_TO_MANY":
			return Relationship.MANY_TO_MANY;
	}
	throw new RelationshipError("Unknown relationship type " + type);
};

/*
 * Get a formatted type in one of three formats
 * `type`: number, relationship type id
 * `format`: string, one of `explicit`, `internal` or `object` (defaults to `explicit`)
 * Returns a formatted string corresponding to the relationship type and format
 */
Relationship.formatType = function (type, format) {
	switch (format) {
		case "internal":
			return type;
		case "object":
			return "Relationship." + Relationship.getTypeString(type);
		case "explicit":
		default:
			return Relationship.getTypeString(type);
	}
	throw new RelationshipError("Unknown format " + format);
};

/*
 * Get the reverse type (target -> source) corresponding to a relationship type
 * `type`: number, relationship type id
 * Returns number, the corresponding reverse id
 */
Relationship.getReverseType = function (type) {
	switch (type) {
		case Relationship.ONE_TO_MANY:
			return Relationship.MANY_TO_ONE;
		case Relationship.MANY_TO_ONE:
			return Relationship.ONE_TO_MANY;
	}
	return type;
};

module.exports = Relationship;
