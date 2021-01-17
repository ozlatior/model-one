const Types = require("../src/types.js").Types;
const Relationship = require("../src/relationship.js");

module.exports = {
	name: "role",
	ownership: {
		target: "access_group",
		type: Relationship.MANY_TO_ONE
	},
	id: {
		type: Types.UUID()
	},
	attributes: {
		name: {
			type: Types.STRING()
		}
	},
	relationships: {
		permission: {
			target: "permission",
			type: Relationship.ONE_TO_MANY
		}
	}
};
