/*
 * Main index file
 */

const Attribute = require("./src/attribute.js");
const Model = require("./src/model.js");
const ModelOne = require("./src/modelone.js");
const Relationship = require("./src/relationship.js");
const Types = require("./src/types.js").Types;

module.exports = ModelOne;
module.exports.Model = Model;
module.exports.Attribute = Attribute;
module.exports.Relationship = Relationship;
module.exports.Types = Types;
