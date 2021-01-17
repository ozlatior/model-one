const Types = require("../src/types.js").Types;
const Relationship = require("../src/relationship.js");

module.exports = {
	name: "access_group",
	id: {
		type: Types.UUID()
	},
	ownership: {
		target: "user",
		type: Relationship.MANY_TO_ONE
	},
	attributes: {
		name: {
			type: Types.STRING()
		}
	},
	relationships: {
		user: {
			target: "user",
			type: Relationship.MANY_TO_MANY
		},
		role: {
			target: "role",
			type: Relationship.ONE_TO_ONE
		}
	}
};
