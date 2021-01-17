const Types = require("../src/types.js").Types;
const Relationship = require("../src/relationship.js");

module.exports = {
	name: "permission",
	ownership: {
		target: "role",
		type: Relationship.MANY_TO_ONE
	},
	id: {
		type: Types.UUID()
	},
	attributes: {
		resourceType: {
			type: Types.STRING()
		},
		resourceName: {
			type: Types.STRING()
		},
		ownership: {
			type: Types.STRING()
		},
		fields: {
			type: Types.STRING()
		},
		exclude: {
			type: Types.STRING()
		},
		action: {
			type: Types.STRING()
		}
	}
};
