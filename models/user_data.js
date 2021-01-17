const Types = require("../src/types.js").Types;
const Relationship = require("../src/relationship.js");

module.exports = {
	name: "user_data",
	ownership: {
		target: "user",
		type: Relationship.ONE_TO_ONE
	},
	id: {
		type: Types.UUID()
	},
	properties: {
		firstName: {
			type: Types.STRING()
		},
		lastName: {
			type: Types.STRING()
		}
	}
};
