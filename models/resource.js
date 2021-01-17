const Types = require("../src/types.js").Types;
const Relationship = require("../src/relationship.js");

module.exports = {
	name: "resource",
	ownership: {
		target: "user",
		type: Relationship.MANY_TO_MANY
	},
	id: {
		type: Types.UUID()
	},
	attributes: {
		name: {
			type: Types.STRING()
		},
		type: {
			type: Types.STRING()
		},
		location: {
			type: Types.STRING()
		}
	},
	relationships: {
		access_group: {
			target: "access_group",
			type: Relationship.MANY_TO_MANY
		}
	}
};
