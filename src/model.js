const assert = require("assert-one");
const Attribute = require("./attribute.js");
const Relationship = require("./relationship.js");

const util = require("./util.js");

class ModelError extends Error {

	constructor (message) {
		super(message);
		this.name = "ModelError";
	}

}

const SCHEMA = {
	TEMPLATE_FIELDS_T: {
		name: "string", id: "object"
	},
	TEMPLATE_OPTIONAL_T: {
		ownership: "object", attributes: "object", relationships: "object", env: "object"
	}
};

/*
 * Model Class
 * Model objects store and operate with information about entity models
 *
 * Main Model Object properties:
 * - `name`: string, the name for this model; this is the name used by relationships and attributes
 *           and will also be reflected in any exported or generated elements; it should be unique,
 * - `id`: Attribute object, the `id` attribute is handled separately from the other attributes and
 *         every model shiuld have one; `id` Attributes have, by default, the `unique` and `primary`
 *         constraints
 * - `ownership`: object, the ownership relationship template for the represented entity;
 *                ownership is propagated, meaning if Entity A is owned by Entity B and Entity B is
 *                owned by Entity C, Entity C also owns Entity A, hence ownership is handled separately
 *                from the other relationships;
 *                The actual Relationship object will be created in the Environment object
 * - `attributes`: object, map of Attribute objects: each value in this object represents an Attribute,
 *                 while the keys represent the names for the attributes (names are unique)
 * - `relationships`: array of objects: each value in this array represents a relationship
 *                    for this entity; actual Relationship objects will be created in the Environment object
 *
 * All models can be part of an "environment" object. If that's the case, this object can be used to
 * determine ownership chains, relationship graphs and references to any relationships and linked
 * objects.
 */

class Model {

	/*
	 * Creates Model object from template properties (also creates Attribute and Relationship member objects)
	 * `template`: template object, properties for the Model object, attributes and relationships
	 * - `name`: string, name of this model (optional, default: null)
	 * - `id`: object, template for id Attribute object creation
	 * - `ownership`: object, template for ownership Relationship object creation (optional)
	 * - `attributes`: object, key-value pairs of attribute templates (creates named Attribute objects, optional)
	 * - `relationships`: array of objects, relationship templates for Relationship object creation (optional)
	 * - `env`: object, reference to `ModelOne` environment object (optional)
	 * `name`: string, if this is set, us this as the name instead of the one in the template (optional)
	 */
	constructor (template, name) {
		assert.type(template, "object", ModelError, "template", "constructor");
		assert.fieldTypes(template, SCHEMA.TEMPLATE_FIELDS_T, ModelError, "template", "constructor");
		assert.optionalFieldTypes(template, SCHEMA.TEMPLATE_OPTIONAL_T, ModelError, "template", "constructor");

		this.name = template.name;
		if (name)
			this.name = name;
		if (!this.name)
			throw new ModelError("Cannot create a model without a name");

		this.id = new Attribute(template.id, "id");
		this.ownership = template.ownership ? this.attachRelationshipAsSource(template.ownership, null, "owner") : null;
		if (this.ownership) {
			this.ownership.chain = true;
			this.ownership.name = "ownership";
		}

		this.attributes = {};
		if (template.attributes) {
			for (let i in template.attributes)
				this.attributes[i] = new Attribute(template.attributes[i], i);
		}

		this.relationships = [];
		if (template.relationships) {
			for (let i in template.relationships)
				this.relationships.push(this.attachRelationshipAsSource(template.relationships[i]));
		}

		this.env = template.env ? template.env : null;
	}

	/*
	 * Set the environment object for this Model
	 * `env`: ModelOne environment, reference to environment object
	 */
	setEnv (env) {
		this.env = env;
	}

	/*
	 * Get the environment object for this Model
	 *
	 * Return: ModelOne environment, reference to the environment object or null if not set
	 */
	getEnv () {
		return this.env;
	}

	/*
	 * Get the name of this Model
	 *
	 * Return: string, the set name of this Model
	 */
	getName () {
		return this.name;
	}

	/*
	 * Get the id Attribute for this Model
	 *
	 * Return: Attribute object, reference to the `id` attribute for this model
	 */
	getId () {
		return this.id;
	}

	/*
	 * Get the ownership template for this Model
	 *
	 * Return: object, copy of the ownership template or null if no ownership template is set
	 */
	getOwnershipTemplate () {
		return this.ownership ? JSON.parse(JSON.stringify(this.ownership)) : null;
	}

	/*
	 * Get attribute list for this Model
	 *
	 * Return: array of strings, a list of all attribute names defined for this Model
	 */
	getAttributeList () {
		let ret = [];
		for (let i in this.attributes)
			ret.push(this.attributes[i].getName());
		return ret;
	}

	/*
	 * Get all attributes for this Model
	 *
	 * Return: array, all Attribute objects defined for this model
	 */
	getAttributes () {
		let ret = [];
		for (let i in this.attributes)
			ret.push(this.attributes[i]);
		return ret;
	}

	/*
	 * Get attribute by name
	 *
	 * Return: Attribute object, the attribute if found or null otherwise
	 */
	getAttributeByName (name) {
		if (this.attributes[name])
			return this.attributes[name];
		return null;
	}

	/*
	 * Get relationship list for this Model
	 *
	 * Return: array, a list of relationship templates for this Model
	 */
	getRelationships () {
		return JSON.parse(JSON.stringify(this.relationships));
	}

	/*
	 * Get relationships by target name for this Model
	 * `name`: string, name to look for
	 *
	 * Return: array, a list of all relationship templates having specified name as target
	 */
	getRelationshipsByTargetName (name) {
		let ret = [];
		for (let i=0; i<this.relationships.length; i++) {
			if (this.relationships[i].target === name)
				ret.push(this.relationships[i]);
		}
		return ret;
	}

	/*
	 * Get relationships by source alias for this Model
	 * `name`: string, name to look for
	 *
	 * Return: array, a list of all relationship templates having specified name as source alias
	 */
	getRelationshipsBySourceAlias (name) {
		let ret = [];
		for (let i=0; i<this.relationships.length; i++) {
			if (this.relationships[i].sourceAs === name)
				ret.push(this.relationships[i]);
		}
		return ret;
	}

	/*
	 * Get relationships by target alias for this Model
	 * `name`: string, name to look for
	 *
	 * Return: array, a list of all relationship templates having specified name as target alias
	 */
	getRelationshipsByTargetAlias (name) {
		let ret = [];
		for (let i=0; i<this.relationships.length; i++) {
			if (this.relationships[i].targetAs === name)
				ret.push(this.relationships[i]);
		}
		return ret;
	}

	/*
	 * Get a relationship template object attached to this Model as source
	 * `template`: object, the original relationship template (will be left untouched)
	 * `alias`: string, alias for this relationship source (optional)
	 * `targetAlias`: string, alias for this relationship target (optional)
	 *
	 * Returns: object, a new relationship template object with `source` field set to the name
	 * of this Model and the `sourceAs` and `targetAs` fields set to the aliases, if specified
	 */
	attachRelationshipAsSource (template, alias, targetAlias) {
		template = JSON.parse(JSON.stringify(template));
		template.source = this.name;
		if (alias)
			template.sourceAs = alias;
		if (targetAlias)
			template.targetAs = targetAlias;
		return template;
	}

	/*
	 * Get a relationship template object attached to this Model as target
	 * `template`: object, the original relationship template (will be left untouched)
	 * `alias`: string, alias for this relationship target (optional)
	 * `sourceAlias`: string, alias for this relationship source (optional)
	 *
	 * Returns: object, a new relationship template object with `target` field set to the name
	 * of this Model and the `sourceAs` and `targetAs` field set to the aliases, if specified
	 */
	attachRelationshipAsTarget (template, alias, sourceAlias) {
		template = JSON.parse(JSON.stringify(template));
		template.target = this.name;
		if (alias)
			template.targetAs = alias;
		if (sourceAlias)
			template.sourceAs = sourceAlias;
		return template;
	}

	/*
	 * Export this Model object as a template object with as little fields as possible
	 * `format`: string, format to use for library-specific values, such as data type
	 * - `explicit`: use string format, such as `STRING()`
	 * - `internal`: use internal representation, usually a number or serialized string
	 * - `object`: use object representation (for export), such as `Types.STRING()`
	 * `options`: object, additional options for this operation:
	 * - `name`: boolean, wether to include the model name or not (defaults to true)
	 * - `attributeNames`: boolean, wether to include the attribute names or not (defaults to false);
	 *                     attribute names are, by default, included as keys of the attributes object
	 * - `relationshipSources`: boolean, wether to include the relationship source or not; if this is
	 *                         set to false, any relationship source that is the same as this model's
	 *                         name will not be included in the produced template (defaults to false)
	 * - `ownershipAlias`: boolean, wether to include the default `owner` alias or not in the ownership
	 *                     relationship template (defaults to false)
	 * - `ownershipName`:  boolean, wether to include the default `ownership` name in the ownership
	 *                     relationship template (defaults to false)
	 * - `ownershipChain`: boolean, wether to include the default `chain: true` property in the ownership
	 *                     relationship template (defaults to false)
	 * - `emptyObjects`: boolean, wether to includ empty `attributes` and `relationships` lists; if this
	 *                   is set to true, they will be included as empty objects / arrays (defaults to false)
	 * Returns a template object with only the strictly required values
	 */
	toMinimalTemplate (format, options) {
		let ret = {};

		if (options === undefined)
			options = {};

		if (options.name !== false)
			ret.name = this.name;

		ret.id = this.id.toMinimalTemplate(format);
		if (options.attributeNames !== true)
			delete ret.id.name;

		if (this.ownership) {
			ret.ownership = (new Relationship(this.ownership)).toMinimalTemplate(format);
			if (options.relationshipSources !== true)
				delete ret.ownership.source;
			if (options.ownershipAlias !== true && ret.ownership.targetAs === "owner")
				delete ret.ownership.targetAs;
			if (options.ownershipName !== true && ret.ownership.name === "ownership")
				delete ret.ownership.name;
			if (options.ownershipChain !== true && ret.ownership.chain === true)
				delete ret.ownership.chain;
		}

		if (this.getAttributeList().length > 0 || options.emptyObjects === true)
			ret.attributes = {};
		for (let i in this.attributes) {
			ret.attributes[i] = this.attributes[i].toMinimalTemplate(format);
			if (options.attributeNames !== true)
				delete ret.attributes[i].name;
		}

		if (this.relationships.length || options.emptyObjects === true)
			ret.relationships = [];
		for (let i=0; i<this.relationships.length; i++) {
			ret.relationships[i] = (new Relationship(this.relationships[i])).toMinimalTemplate(format);
			if (options.relationshipSources !== true)
				delete ret.relationships[i].source;
		}

		return ret;
	}

	/*
	 * Export this Model object as a template object with all redundant fields specified
	 * `format`: string, format to use for library-specific values, such as relationship type
	 * - `explicit`: use string format, such as `STRING()`
	 * - `internal`: use internal representation, usually a number
	 * - `object`: use object representation (for export), such as `Relationship.ONE_TO_ONE`
	 * `options`: object, additional options for this operation:
	 * - `name`: boolean, wether to include the model name or not (defaults to true)
	 * - `attributeNames`: boolean, wether to include the attribute names or not (defaults to false);
	 *                     attribute names are, by default, included as keys of the attributes object
	 * - `relationshipSources`: boolean, wether to include the relationship source or not; if this is
	 *                         set to true, any relationship source that is the same as this model's
	 *                         name will not be included in the produced template
	 * - `ownershipAlias`: boolean, wether to include the default `owner` alias or not in the ownership
	 *                     relationship template (defaults to false)
	 * - `ownershipName`:  boolean, wether to include the default `ownership` name in the ownership
	 *                     relationship template (defaults to false)
	 * - `ownershipChain`: boolean, wether to include the default `chain: true` property in the ownership
	 *                     relationship template (defaults to false)
	 * - `emptyObjects`: boolean, wether to includ empty `attributes` and `relationships` lists; if this
	 *                   is set to true, they will be included as empty objects / arrays (defaults to false)
	 * Returns a template object with all possibly defined values
	 */
	toCompleteTemplate (format, options) {
		let ret = {};

		if (options === undefined)
			options = {};

		if (options.name !== false)
			ret.name = this.name;

		ret.id = this.id.toCompleteTemplate(format);
		if (options.attributeNames !== true)
			delete ret.id.name;

		if (this.ownership) {
			ret.ownership = (new Relationship(this.ownership)).toCompleteTemplate(format);
			if (options.relationshipSources !== true) {
				delete ret.ownership.source;
				if (ret.ownership.sourceAs === this.name)
					delete ret.ownership.sourceAs;
			}
			if (options.ownershipAlias !== true && ret.ownership.targetAs === "owner")
				delete ret.ownership.targetAs;
			if (options.ownershipName !== true && ret.ownership.name === "ownership")
				delete ret.ownership.name;
			if (options.ownershipChain !== true && ret.ownership.chain === true)
				delete ret.ownership.chain;
		}

		if (this.getAttributeList().length > 0 || options.emptyObjects === true)
			ret.attributes = {};
		for (let i in this.attributes) {
			ret.attributes[i] = this.attributes[i].toCompleteTemplate(format);
			if (options.attributeNames !== true)
				delete ret.attributes[i].name;
		}

		if (this.relationships.length || options.emptyObjects === true)
			ret.relationships = [];
		for (let i=0; i<this.relationships.length; i++) {
			ret.relationships[i] = (new Relationship(this.relationships[i])).toCompleteTemplate(format);
			if (options.relationshipSources !== true) {
				delete ret.relationships[i].source;
				if (ret.relationships[i].sourceAs === this.name)
					delete ret.relationships[i].sourceAs;
			}
		}

		return ret;
	}

	/*
	 * Export this Model object as a template string (for file output)
	 * `complete`: boolean, if `true` also export redundant fields
	 * `name`: boolean, wether to include the model name or not (defaults to true)
	 * `attributeNames`: boolean, wether to include the attribute names or not (defaults to false);
	 *                   attribute names are, by default, included as keys of the attributes object
	 * `relationshipSources`: boolean, wether to include the relationship source or not; if this is
	 *                        set to true, any relationship source that is the same as this model's
	 *                        name will not be included in the produced template
	 * `ownershipAlias`: boolean, wether to include the default `owner` alias or not in the ownership
	 *                   relationship template (defaults to false)
	 * `ownershipName`:  boolean, wether to include the default `ownership` name in the ownership
	 *                   relationship template (defaults to false)
	 * `ownershipChain`: boolean, wether to include the default `chain: true` property in the ownership
	 *                   relationship template (defaults to false)
	 * `emptyObjects`: boolean, wether to includ empty `attributes` and `relationships` lists; if this
	 *                 is set to true, they will be included as empty objects / arrays (defaults to false)
	 * `newLine`: boolean, if `true` format object data using new line (default: `true`)
	 * `indentation`: number, for `newLine` formatting, indentation length for output string (default: 4)
	 * `depth`: number, for `newLine` formatting, indentation depth to start from (default: 0)
	 * `format`: string, format to use for defined types (relationships and data types), defaults to "explicit"
	 * - `explicit`: use string format, such as `STRING(42)`
	 * - `internal`: use internal representation, usually a number or string
	 * - `object`: use object representation (for export), such as `Relationship.ONE_TO_ONE`
	 * Returns a string containing the template representation (for file export, for instance)
	 */
	toTemplateString (options) {
		if (options === undefined)
			options = {};
		let com = options.complete === undefined ? false : options.complete;
		let nln = options.newLine === undefined ? true : options.newLine;
		let ind = options.indentation === undefined ? 4 : options.indentation;
		let dpt = options.depth === undefined ? 0 : options.depth;
		let fmt = options.format === undefined ? "explicit" : options.format;
		let ia = util.indentationArray(ind);
		let opt = {
			name: options.name,
			attributeNames: options.attributeNames,
			relationshipSources: options.relationshipSources,
			ownershipAlias: options.ownershipAlias,
			ownershipName: options.ownershipName,
			ownershipChain: options.ownershipChain,
			emptyObjects: options.emptyObjects
		};

		let ret = [];

		let obj;
		if (com)
			obj = this.toCompleteTemplate(fmt, opt);
		else
			obj = this.toMinimalTemplate(fmt, opt);

		return util.stringify(obj, {
			indentation: ia[1],
			newLine: nln,
			depth: dpt
		});
	}

}

module.exports = Model;
