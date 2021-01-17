const Types = require("../src/types.js").Types;

module.exports = {
	name: "user",
	id: {
		type: Types.UUID()
	},
	attributes: {
		username: {
			type: Types.STRING()
		},
		email: {
			type: Types.STRING()
		},
		active: {
			type: Types.BOOLEAN()
		},
		enabled: {
			type: Types.BOOLEAN()
		}
	}
};
