const Model = require("./model.js");
const Relationship = require("./relationship.js");

class ModelOneError extends Error {

	constructor (message) {
		super(message);
		this.name = "ModelOneError";
	}

}

/*
 * ModelOne Environment Class
 * The ModelOne Environment operates with Model objects and Relationship objects
 *
 * Main ModelOne Environment Class Properties
 * - `models`: object, named mapping of Model objects by their respective name
 * - `relationships`: array, list of Relationship objects
 */

class ModelOne {

	/*
	 * Creates ModelOne object from model templates
	 * `modelTemplates`: array of Model objects, the templates to load into this model initially
	 *                   (optional)
	 */
	constructor (modelTemplates) {
		this.models = {};
		this.relationships = [];

		if (modelTemplates instanceof Array)
			this.loadModelTemplateBulk(modelTemplates);
	}

	/*
	 * Normalizing internal method for getting a member model
	 * `model`: string or Model object, model to retrieve
	 * Returns: Model object: if the argument is `string`, the method looks up the model and returns
	 * it if found. If the argument is a model object, the method checks if it's a member of the
	 * environment before returning it.
	 */
	_getMemberModel (model) {
		if (!model)
			throw new ModelOneError("Missing model argument");
		if (typeof(model) === "string") {
			model = this.models[model];
			if (!model)
				throw new ModelOneError("No such model `" + model + "'");
		}
		if (!this.isMemberModel(model))
			throw new ModelOneError("Model is not part of this environment");
		return model;
	}

	/*
	 * Load model object into this environment
	 * `model`: Model object, model to load
	 * `noUpdate`: boolean, if this is set to true no updates will be performed on relationships
	 * The model object will be loaded into the environment and all new relationships will be
	 * automatically created
	 */
	loadModel (model, noUpdate) {
		let name = model.getName();
		if (this.models[name] !== undefined)
			throw new ModelOneError("This environment already has a model named '" + name + "'");
		model.setEnv(this);
		this.models[name] = model;
		let ownership = model.getOwnershipTemplate();
		if (ownership)
			this.loadRelationshipTemplate(ownership);
		this.loadRelationshipTemplatesBulk(model.getRelationships(), true);
		if (noUpdate !== true)
			this.performUpdate();
	}

	/*
	 * Load multiple model objects into this environment
	 * `models`: array of Model objects, models to load
	 * `noUpdate`: boolean, if this is set to true no updates will be performed on relationships
	 * The model objects will be loaded into the environment and all new relationships will be
	 * automatically created
	 */
	loadModelsBulk (models, noUpdate) {
		if (!(models instanceof Array))
			throw new ModelOneError("Expected array argument");
		models.map((model) => this.loadModel(model, true));
		if (noUpdate !== true)
			this.performUpdate();
	}

	/*
	 * Load new model from template
	 * `template`: object, template to load
	 * `noUpdate`: boolean, if this is set to true no updates will be performed on relationships
	 * A model object will be created from template and loaded into the environment; all new
	 * relationships will be automatically created
	 */
	loadModelTemplate (template, noUpdate) {
		let model = new Model(template);
		this.loadModel(model, noUpdate);
	}

	/*
	 * Load multiple models from templates
	 * `templates`: array of objects, templates to load
	 * `noUpdate`: boolean, if this is set to true no updates will be performed on relationships
	 * The model objects will be created from template and loaded into the environment; all new
	 * relationships will be automatically created
	 */
	loadModelTemplatesBulk (templates, noUpdate) {
		if (!(templates instanceof Array))
			throw new ModelOneError("Expected array argument");
		templates.map((template) => this.loadModelTemplate(template, true));
		if (noUpdate !== true)
			this.performUpdate();
	}

	/*
	 * Load relationship object into this environment
	 * `relationship`: Relationship object, relationship to load
	 * `noUpdate`: boolean, if this is set to true no updates will be performed on relationships
	 * The relationship object will be loaded into the environment and the reverse relationship will be
	 * automatically created; references to existing objects will be added
	 */
	loadRelationship (relationship, noUpdate) {
		if (this.getRelationshipsBySourceAndTargetAlias(
			relationship.getSourceAlias(), relationship.getTargetAlias()).length > 0)
			throw new ModelOneError("A relationship between '" + relationship.getSourceName() + "' " + 
				"as '" + relationship.getSourceAlias() + "' and '" + relationship.getTargetName() + "' " +
				"as '" + relationship.getTargetAlias() + "' already exists");
		relationship.setEnv(this);
		this.relationships.push(relationship);
		if (relationship.isForward())
			this.relationships.push(relationship.getReverseRelationship());
		else
			this.relationships.push(relationship.getForwardRelationship());
	}

	/*
	 * Load multiple relationship objects into this environment
	 * `relationships`: array of Relationship objects, relationships to load
	 * `noUpdate`: boolean, if this is set to true no updates will be performed on relationships
	 * The relationship objects will be loaded into the environment and all reverse relationships will be
	 * automatically created; references to existing objects will be created
	 */
	loadRelationshipsBulk (relationships, noUpdate) {
		if (!(templates instanceof Array))
			throw new ModelOneError("Expected array argument");
		relationships.map((relationship) => this.loadRelationship(relationship, true));
	}

	/*
	 * Load new relationship from template
	 * `template`: object, template to load
	 * `noUpdate`: boolean, if this is set to true no updates will be performed on relationships
	 * A relationship object will be created from template and loaded into the environment; reverse
	 * relationship will be automatically created; references to existing objects will be added
	 */
	loadRelationshipTemplate (template, noUpdate) {
		let rel = new Relationship(template);
		this.loadRelationship(rel);
	}

	/*
	 * Load multiple relationships from templates
	 * `templates`: array of objects, templates to load
	 * `noUpdate`: boolean, if this is set to true no updates will be performed on relationships
	 * The relationship objects will be created from template and loaded into the environment; reverse
	 * relationships will be automatically created; references to existing objects will be added
	 */
	loadRelationshipTemplatesBulk (templates, noUpdate) {
		if (!(templates instanceof Array))
			throw new ModelOneError("Expected array argument");
		templates.map((template) => this.loadRelationshipTemplate(template, true));
	}

	/*
	 * Retrieve all relationships by source name
	 * `name`: string, source name
	 * `direction`: number, bitwise of `Relationship.FORWARD` and `Relationship.REVERSE`, optional direction of
	 *              relationships to consider; defaults to both (`Relationship.FORWARD | Relationship.REVERSE`)
	 * Returns: array of Relationship objects, all relationships that meet the criteria; actual source names will
	 * be considered even if aliases differ
	 */
	getRelationshipsBySource (name, direction) {
		if (direction === undefined)
			direction = Relationship.FORWARD | Relationship.REVERSE;
		let ret = [];
		this.relationships.map((relationship) => {
			if (relationship.getSourceName() !== name)
				return;
			if (relationship.getDirection() & direction === 0)
				return;
			ret.push(relationship);
		});
		return ret;
	}

	/*
	 * Retrieve all relationships by target name
	 * `name`: string, target name
	 * `direction`: number, bitwise of `Relationship.FORWARD` and `Relationship.REVERSE`, optional direction of
	 *              relationships to consider; defaults to both (`Relationship.FORWARD | Relationship.REVERSE`)
	 * Returns: array of Relationship objects, all relationships that meet the criteria; actual target names will
	 * be considered even if aliases differ
	 */
	getRelationshipsByTarget (name, direction) {
		if (direction === undefined)
			direction = Relationship.FORWARD | Relationship.REVERSE;
		let ret = [];
		this.relationships.map((relationship) => {
			if (relationship.getTargetName() !== name)
				return;
			if (relationship.getDirection() & direction === 0)
				return;
			ret.push(relationship);
		});
		return ret;
	}

	/*
	 * Retrieve all relationships by source and target name
	 * `source`: string, source name
	 * `target`: string, target name
	 * `direction`: number, bitwise of `Relationship.FORWARD` and `Relationship.REVERSE`, optional direction of
	 *              relationships to consider; defaults to both (`Relationship.FORWARD | Relationship.REVERSE`)
	 * Returns: array of Relationship objects, all relationships that meet the criteria; actual entity names will
	 * be considered even if aliases differ
	 */
	getRelationshipsBySourceAndTarget (source, target, direction) {
		if (direction === undefined)
			direction = Relationship.FORWARD | Relationship.REVERSE;
		let ret = [];
		this.relationships.map((relationship) => {
			if (relationship.getSourceName() !== source)
				return;
			if (relationship.getTargetName() !== target)
				return;
			if (relationship.getDirection() & direction === 0)
				return;
			ret.push(relationship);
		});
		return ret;
	}

	/*
	 * Retrieve a model by name or null if model not found
	 * `name`: string, model name to look for
	 * Returns: Model object, the model if found or null otherwise
	 */
	getModelByName (name) {
		let ret = this.models[name];
		if (ret)
			return ret;
		return null;
	}

	/*
	 * Check that a model belongs to this environment
	 * `model`: Model object, model to check
	 * Returns: boolean, true if model is found in environment, false otherwise
	 */
	isMemberModel (model) {
		for (let i in this.models)
			if (this.models[i] === model)
				return true;
		return false;
	}

	/*
	 * Retrieve all relationships by source alias
	 * `alias`: string, source alias
	 * `direction`: number, bitwise of `Relationship.FORWARD` and `Relationship.REVERSE`, optional direction of
	 *              relationships to consider; defaults to both (`Relationship.FORWARD | Relationship.REVERSE`)
	 * Returns: array of Relationship objects, all relationships that meet the criteria; source aliases will
	 * be considered (which can be the same as the names or different)
	 */
	getRelationshipsBySourceAlias (alias, direction) {
		if (direction === undefined)
			direction = Relationship.FORWARD | Relationship.REVERSE;
		let ret = [];
		this.relationships.map((relationship) => {
			if (relationship.getSourceAlias() !== alias)
				return;
			if (relationship.getDirection() & direction === 0)
				return;
			ret.push(relationship);
		});
		return ret;
	}

	/*
	 * Retrieve all relationships by target alias
	 * `alias`: string, target alias
	 * `direction`: number, bitwise of `Relationship.FORWARD` and `Relationship.REVERSE`, optional direction of
	 *              relationships to consider; defaults to both (`Relationship.FORWARD | Relationship.REVERSE`)
	 * Returns: array of Relationship objects, all relationships that meet the criteria; target aliases will
	 * be considered (which can be the same as the names or different)
	 */
	getRelationshipsByTargetAlias (alias, direction) {
		if (direction === undefined)
			direction = Relationship.FORWARD | Relationship.REVERSE;
		let ret = [];
		this.relationships.map((relationship) => {
			if (relationship.getTargetAlias() !== alias)
				return;
			if (relationship.getDirection() & direction === 0)
				return;
			ret.push(relationship);
		});
		return ret;
	}

	/*
	 * Retrieve all relationships by source and target aliases
	 * `sourceAlias`: string, source alias
	 * `targetAlias`: string, target alias
	 * `direction`: number, bitwise of `Relationship.FORWARD` and `Relationship.REVERSE`, optional direction of
	 *              relationships to consider; defaults to both (`Relationship.FORWARD | Relationship.REVERSE`)
	 * Returns: array of Relationship objects, all relationships that meet the criteria; source and target aliases
	 * will be considered (which can be the same as the names or different)
	 */
	getRelationshipsBySourceAndTargetAlias (sourceAlias, targetAlias, direction) {
		if (direction === undefined)
			direction = Relationship.FORWARD | Relationship.REVERSE;
		let ret = [];
		this.relationships.map((relationship) => {
			if (relationship.getSourceAlias() !== sourceAlias)
				return;
			if (relationship.getTargetAlias() !== targetAlias)
				return;
			if (relationship.getDirection() & direction === 0)
				return;
			ret.push(relationship);
		});
		return ret;
	}

	/*
	 * Retrieve all relationships by source reference
	 * `source`: Model object, source reference
	 * `direction`: number, bitwise of `Relationship.FORWARD` and `Relationship.REVERSE`, optional direction of
	 *              relationships to consider; defaults to both (`Relationship.FORWARD | Relationship.REVERSE`)
	 * Returns: array of Relationship objects, all relationships that meet the criteria
	 */
	getRelationshipsBySourceReference (source, direction) {
		if (direction === undefined)
			direction = Relationship.FORWARD | Relationship.REVERSE;
		let ret = [];
		this.relationships.map((relationship) => {
			if (relationship.getSource() !== source)
				return;
			if (relationship.getDirection() & direction === 0)
				return;
			ret.push(relationship);
		});
		return ret;
	}

	/*
	 * Retrieve all relationships by target reference
	 * `target`: Model object, target reference
	 * `direction`: number, bitwise of `Relationship.FORWARD` and `Relationship.REVERSE`, optional direction of
	 *              relationships to consider; defaults to both (`Relationship.FORWARD | Relationship.REVERSE`)
	 * Returns: array of Relationship objects, all relationships that meet the criteria
	 */
	getRelationshipsByTargetReference (target, direction) {
		if (direction === undefined)
			direction = Relationship.FORWARD | Relationship.REVERSE;
		let ret = [];
		this.relationships.map((relationship) => {
			if (relationship.getTarget() !== target)
				return;
			if (relationship.getDirection() & direction === 0)
				return;
			ret.push(relationship);
		});
		return ret;
	}

	/*
	 * Retrieve all relationships by source and target references
	 * `sourceReference`: string, source reference
	 * `targetReference`: string, target reference
	 * `direction`: number, bitwise of `Relationship.FORWARD` and `Relationship.REVERSE`, optional direction of
	 *              relationships to consider; defaults to both (`Relationship.FORWARD | Relationship.REVERSE`)
	 * Returns: array of Relationship objects, all relationships that meet the criteria
	 */
	getRelationshipsBySourceAndTargetReference (sourceReference, targetReference, direction) {
		if (direction === undefined)
			direction = Relationship.FORWARD | Relationship.REVERSE;
		let ret = [];
		this.relationships.map((relationship) => {
			if (relationship.getSource() !== sourceReference)
				return;
			if (relationship.getTarget() !== targetReference)
				return;
			if (relationship.getDirection() & direction === 0)
				return;
			ret.push(relationship);
		});
		return ret;
	}

	/*
	 * Get a list of models
	 *
	 * Returns: array of Model objects, list of models
	 */
	getModels () {
		let ret = [];
		for (let i in this.models)
			ret.push(this.models[i]);
		return ret;
	}

	/*
	 * Get a list of model names
	 *
	 * Returns: array of strings, list of model names
	 */
	getModelNames () {
		let ret = [];
		for (let i in this.models)
			ret.push(i);
		return ret;
	}

	/*
	 * Get a relationship "table" of all defined relationships
	 *
	 * Returns: array of objects, each entry represents a relationship:
	 * - `source`: string, source name
	 * - `sourceAlias`: string, source alias (or name if no alias is defined)
	 * - `target`: string, target name
	 * - `targetAlias`: string, target alias (or name if no alias is defined)
	 * - `type`: number, relationship type as defined in the Relationship class
	 * - `typeString`: string, relationship type string (`ONE_TO_MANY` etc)
	 * - `direction`: string, `forward` or `reverse`
	 * - `chain`: boolean, true if this is a "chained" relationship
	 * - `name`: string, name for this relationship if any is defined
	 */
	getRelationshipTable () {
		return this.relationships.map((relationship) => {
			let ret = {
				source:			relationship.getSourceName(),
				sourceAlias:	relationship.getSourceAlias(),
				target:			relationship.getTargetName(),
				targetAlias:	relationship.getTargetAlias(),
				type:			relationship.getType(),
				typeString:		relationship.getTypeString(),
				direction:		relationship.isForward() ? "forward" : "reverse",
				chain:			relationship.isChained()
			};
			if (relationship.getName())
				ret.name = relationship.getName();
			return ret;
		});
	}

	/*
	 * Get a list of missing models based on relationships
	 *
	 * Returns: array of objects, each entry represents a missing model entry
	 * - `name`: string, missing model name
	 * - `sourceFor`: string, model name that uses this as a relationship source
	 * - `targetFor`: string, model name that uses this as a relationship target
	 * - `sourceAlias`: string, source alias (or name if no alias is defined)
	 * - `targetAlias`: string, target alias (or name if no alias is defined)
	 * - `type`: number, relationship type as defined in the Relationship class
	 * - `typeString`: string, relationship type string (`ONE_TO_MANY` etc)
	 * - `direction`: string, `forward` or `reverse`
	 * - `chain`: boolean, true if this is a "chained" relationship
	 * - `relationshipName`: string, name for this relationship if any is defined
	 */
	getMissingModels () {
		let ret = [];
		for (let i=0; i<this.relationships.length; i++) {
			let rel = this.relationships[i];
			let source = rel.getSourceName();
			let target = rel.getTargetName();
			if (this.models[source] === undefined) {
				let el = {
					name: source,
					sourceFor:		rel.getTargetName(),
					sourceAlias:	rel.getSourceAlias(),
					targetAlias:	rel.getTargetAlias(),
					type:			rel.getType(),
					typeString:		rel.getTypeString(),
					direction:		rel.isForward() ? "forward" : "reverse",
					chain:			rel.isChained()
				};
				if (rel.getName())
					el.relationshipName = rel.getName();
				ret.push(el);
			}
			if (this.models[target] === undefined) {
				let el = {
					name: target,
					targetFor:		rel.getSourceName(),
					sourceAlias:	rel.getSourceAlias(),
					targetAlias:	rel.getTargetAlias(),
					type:			rel.getType(),
					typeString:		rel.getTypeString(),
					direction:		rel.isForward() ? "forward" : "reverse",
					chain:			rel.isChained()
				};
				if (rel.getName())
					el.relationshipName = rel.getName();
				ret.push(el);
			}
		}
		return ret;
	}

	/*
	 * Get a list of unlinked models based on relationships
	 *
	 * Returns: array of objects, each entry represents an unlinked model entry
	 * - `name`: string, unlinked model name
	 * - `sourceFor`: string, model name that uses this as a relationship source
	 * - `targetFor`: string, model name that uses this as a relationship target
	 * - `sourceAlias`: string, source alias (or name if no alias is defined)
	 * - `targetAlias`: string, target alias (or name if no alias is defined)
	 * - `type`: number, relationship type as defined in the Relationship class
	 * - `typeString`: string, relationship type string (`ONE_TO_MANY` etc)
	 * - `direction`: string, `forward` or `reverse`
	 * - `chain`: boolean, true if this is a "chained" relationship
	 * - `relationshipName`: string, name for this relationship if any is defined
	 */
	getUnlinkedModels () {
		let ret = [];
		for (let i=0; i<this.relationships.length; i++) {
			let rel = this.relationships[i];
			let source = rel.getSourceName();
			let target = rel.getTargetName();
			if (!rel.getSource()) {
				let el = {
					name: source,
					sourceFor:		rel.getTargetName(),
					sourceAlias:	rel.getSourceAlias(),
					targetAlias:	rel.getTargetAlias(),
					type:			rel.getType(),
					typeString:		rel.getTypeString(),
					direction:		rel.isForward() ? "forward" : "reverse",
					chain:			rel.isChained()
				};
				if (rel.getName())
					el.relationshipName = rel.getName();
				ret.push(el);
			}
			if (!rel.getTarget()) {
				let el = {
					name: target,
					targetFor:		rel.getSourceName(),
					sourceAlias:	rel.getSourceAlias(),
					targetAlias:	rel.getTargetAlias(),
					type:			rel.getType(),
					typeString:		rel.getTypeString(),
					direction:		rel.isForward() ? "forward" : "reverse",
					chain:			rel.isChained()
				};
				if (rel.getName())
					el.relationshipName = rel.getName();
				ret.push(el);
			}
		}
		return ret;
	}

	/*
	 * Run updates after adding new entity models
	 *
	 * Updates being run by this method:
	 * - new links (relationships to models)
	 *
	 * Returns: true if anything changed, false otherwise
	 */
	performUpdate () {
		let ret = false;
		ret |= this.linkModelsAndRelationships();
		return ret;
	}

	/*
	 * Link Models and Relationships
	 *
	 * Each Relationship object has reference properties to source and target models. This method
	 * runs through all relationships and updates the references if the respective models exist
	 *
	 * Returns: true if anything changed, false otherwise
	 */
	linkModelsAndRelationships () {
		let ret = false;
		for (let i=0; i<this.relationships.length; i++) {
			let rel = this.relationships[i];
			if (rel.getSource() === null) {
				let source = this.models[rel.getSourceName()];
				if (source !== undefined) {
					rel.setSource(source);
					ret = true;
				}
			}
			if (rel.getTarget() === null) {
				let target = this.models[rel.getTargetName()];
				if (target !== undefined) {
					rel.setTarget(target);
					ret = true;
				}
			}
		}
		return ret;
	}

	/*
	 * Check that the environment is complete
	 *
	 * A complete environment has no missing links between relationships and models
	 * and no missing models
	 *
	 * Returns: true if complete, false otherwise
	 */
	isComplete () {
		if (this.getMissingModels().length > 0)
			return false;
		if (this.getUnlinkedModels().length > 0)
			return false;
		return true;
	}

	/*
	 * Assert that the environment is complete
	 *
	 * A complete environment has no missing links between relationships and models
	 * and no missing models
	 *
	 * Throws ModelOneError if either missing links or missing models are found
	 */
	assertComplete() {
		let res;
		res = this.getMissingModels().length;
		if (res)
			throw new ModelOneError(
				"Model incomplete. Found " + res + " missing models. Call getMissingModels() for details");
		res = this.getUnlinkedModels().length;
		if (res)
			throw new ModelOneError(
				"Model incomplete. Found " + res + " unlinked models. Call getUnlinkedModels() for details");
	}

	/*
	 * Get connected (contiguous) domains
	 *
	 * A contiguous domain is a subset of the entity models that have relationship paths to one-another
	 *
	 * Returns: array of arrays of Model objects, entity models grouped by connectivity
	 */
	getConnectedDomains () {
		let ret = [];
		let visited = [];
		for (let i in this.models) {
			if (visited.indexOf(this.models[i]) !== -1)
				continue;
			let domain = this.getConnectedModels(this.models[i]);
			ret.push(domain);
			visited = visited.concat(domain);
		}
		return ret;
	}

	/*
	 * Get connected (contiguous) domains model names
	 *
	 * A contiguous domain is a subset of the entity models that have relationship paths to one-another
	 *
	 * Returns: array of arrays of strings, entity model names grouped by connectivity
	 */
	getConnectedDomainNames () {
		return this.getConnectedDomains().map((domain) => domain.map((model) => model.getName()));
	}

	/*
	 * Get connected (contiguous) entities for a specific entity
	 * `model`: Model object or string, the initial entity model for this operation
	 *
	 * A contiguous domain is a subset of the entity models that have relationship paths to one-another
	 *
	 * Returns: array of Model objects, entities connected to given entity
	 */
	getConnectedModels (model) {
		model = this._getMemberModel(model);
		let ret = [];
		let queue = [ model ];
		while (queue.length > 0) {
			let next = queue.shift();
			if (ret.indexOf(next) !== -1)
				continue;
			let neighbors = this.getNeighborModels(next);
			ret.push(next);
			queue = queue.concat(neighbors);
		}
		return ret;
	}

	/*
	 * Get connected (contiguous) entity model names for a specific entity
	 * `model`: Model object or string, the initial entity model for this operation
	 *
	 * A contiguous domain is a subset of the entity models that have relationship paths to one-another
	 *
	 * Returns: array of strings, names of entities connected to given entity
	 */
	getConnectedModelNames (model) {
		return this.getConnectedModels(model).map((model) => model.getName());
	}

	/*
	 * Get neighbor models
	 * `model`: Model object or string, the initial entity model for this operation
	 * Returns: array of Model objects, all entity models directly connected to given model
	 */
	getNeighborModels (model) {
		model = this._getMemberModel(model);
		let ret = [];
		let rel = this.getRelationshipsBySourceReference(model);
		for (let i=0; i<rel.length; i++)
			ret.push(rel[i].getTarget());
		return ret;
	}

	/*
	 * Get neighbor model names
	 * `model`: Model object or string, the initial entity model for this operation
	 * Returns: array of strings, all entity model names directly connected to given model
	 */
	getNeighborModelNames (model) {
		return this.getNeighborModels(model).map((model) => model.getName());
	}

	/*
	 * Get neighbor model paths
	 * `model`: Model object or string, the name of the initial entity model for this operation
	 * `options`: object, options for this operation (optional)
	 * - `depth`: number, maximum path depth (defaults to zero, unlimited)
	 * - `fullObjects`: boolean, use full objects instead of names in returned paths (defaults to false)
	 * `parentNode`: object, this will be set as parent node (optional, defaults to null)
	 * Returns: array of objects, each containing
	 * - `target`: string, neighboring model object name
	 * - `many`: boolean, true if this is a one-to-many relationship
	 * - `sourceAlias`: string, this model's name in the relationship
	 * - `targetAlias`: string, other model's name in the relationship
	 * - `direction`: string, `forward` or `reverse`
	 * - `chain`: boolean, true if this is a chained relationship
	 * - `relationshipName`: string, relationship name if one is defined
	 */
	getNeighborModelPaths (model, fullObjects) {
		model = this._getMemberModel(model);
		let rel = this.getRelationshipsBySourceReference(model);
		return rel.map((r) => {
			let ret = {
				target: fullObjects ? r.getTarget() : r.getTargetName(),
				many: r.getType() === Relationship.ONE_TO_MANY || r.getType() === Relationship.MANY_TO_MANY,
				sourceAlias: r.getSourceAlias(),
				targetAlias: r.getTargetAlias(),
				direction: r.isForward() ? "forward" : "reverse",
				chain: r.isChained()
			};
			if (r.getName())
				ret.relationshipName = r.getName();
			return ret;
		});
	}

	/*
	 * Get outgoing tree for model
	 * `model`: Model object or string, the name of the initial entity model for this operation
	 * `options`: object, options for this operation (optional)
	 * - `depth`: number, maximum path depth (defaults to zero, unlimited)
	 * - `fullObjects`: boolean, use full objects instead of names in returned paths (defaults to false)
	 * `parentNode`: object, this will be set as parent node (optional, defaults to null)
	 * Returns: tree of objects, each representing a relationship path starting with initial model; Path
	 * elements are objects with fields:
	 * - `prev`: parent tree element
	 * - `next`: array of children objects
	 * - `target`: object or string, neighboring model object or string
	 * - `many`: boolean, true if this is a one-to-many relationship
	 * - `sourceAlias`: string, this model's name in the relationship
	 * - `targetAlias`: string, other model's name in the relationship
	 * - `direction`: string, `forward` or `reverse`
	 * - `chain`: boolean, true if this is a chained relationship
	 * - `relationshipName`: string, relationship name if one is defined
	 */
	getOutgoingModelTree (model, options, parentNode) {
		model = this._getMemberModel(model);
		let ret = [];
		let rel = this.getRelationshipsBySourceReference(model);
		if (options === undefined)
			options = {};
		let fullObjects = options.fullObjects ? true : false;
		let maxDepth = options.depth ? options.depth : 0;
		let depth = parentNode && parentNode._depth ? parentNode._depth + 1 : 1;
		for (let i=0; i<rel.length; i++) {
			// check for loop condition (we are processing the same relationship or its reverse twice)
			let looping = false;
			let current = parentNode;
			while (current) {
				if (rel[i] === current._rel || rel[i] === current._rel.getMirrorRelationship()) {
					looping = true;
					break;
				}
				current = current.prev;
			}
			if (looping)
				continue;
			let toPush = {
				_rel: rel[i],
				_depth: depth,
				prev: parentNode ? parentNode : null,
				next: [],
				target: fullObjects ? rel[i].getTarget() : rel[i].getTargetName(),
				many: rel[i].getType() === Relationship.ONE_TO_MANY || rel[i].getType() === Relationship.MANY_TO_MANY,
				sourceAlias: rel[i].getSourceAlias(),
				targetAlias: rel[i].getTargetAlias(),
				direction: rel[i].isForward() ? "forward" : "reverse",
				chain: rel[i].isChained()
			};
			if (rel[i].getName())
				toPush.relationshipName = rel[i].getName();
			if (maxDepth === 0 || depth < maxDepth)
				toPush.next = this.getOutgoingModelTree(rel[i].getTarget(), options, toPush);
			delete toPush._rel;
			delete toPush._depth;
			ret.push(toPush);
		}
		return ret;
	}

	/*
	 * Get outgoing paths for model
	 * `model`: Model object or string, the name of the initial entity model for this operation
	 * `options`: object, options for this operation (optional)
	 * - `depth`: number, maximum path depth (defaults to zero, unlimited)
	 * - `fullObjects`: boolean, use full objects instead of names in returned paths (defaults to false)
	 * - `depthFirst`: boolean, go to the end of each branch first (defaults to true)
	 * Returns: array of arrays, each representing a relationship path starting with initial model; Path
	 * elements are objects with fields:
	 * - `target`: object or string, neighboring model object or string
	 * - `many`: boolean, true if this is a one-to-many relationship
	 * - `sourceAlias`: string, this model's name in the relationship
	 * - `targetAlias`: string, other model's name in the relationship
	 * - `direction`: string, `forward` or `reverse`
	 * - `chain`: boolean, true if this is a chained relationship
	 * - `relationshipName`: string, relationship name if one is defined
	 */
	getOutgoingModelPaths (model, options) {
		model = this._getMemberModel(model);
		let ret = [];
		let tree = this.getOutgoingModelTree(model, options);
		// first make a list of all nodes in the tree
		let nodes = [];
		let queue = tree.slice(0);
		let depthFirst = options && options.depthFirst !== undefined ? options.depthFirst : true;
		while (queue.length) {
			let node = queue.shift();
			if (nodes.indexOf(node) === -1)
				nodes.push(node);
			if (depthFirst)
				queue = node.next.slice(0).concat(queue);
			else
				queue = queue.concat(node.next);
		}
		// now, for each node run through the tree upwards and store all nodes in an array
		for (let i=0; i<nodes.length; i++) {
			let toPush = [];
			let current = nodes[i];
			while (current) {
				toPush.unshift(current);
				current = current.prev;
			}
			ret.push(toPush);
		}
		return ret;
	}

}

module.exports = ModelOne;
