const Types = require("../src/types.js").Types;
const Relationship = require("../src/relationship.js");

module.exports = {
	name: "item",
	id: {
		type: Types.UUID()
	},
	ownership: {
		target: "user",
		type: Relationship.ONE_TO_MANY
	},
	attributes: {
		name: {
			type: Types.STRING()
		},
		code: {
			type: Types.STRING()
		},
		price: {
			type: Types.FLOAT()
		},
		stock: {
			type: Types.INTEGER()
		},
		discount: {
			type: Types.FLOAT(),
			absentValue: 0
		},
		added: {
			type: Types.DATETIME()
		},
		discount_start: {
			type: Types.DATEONLY()
		},
		discount_end: {
			type: Types.DATEONLY()
		}
	}
};
