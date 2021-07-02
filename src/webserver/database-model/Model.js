const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
// modelName && src should be unique within a users profile.
// Hotspot text should be unique within a model.
const ModelSchema = new Schema({
	modelName: {
		type: String,
		required: true
	},
	src: {
		type: String,
		required: true
	},
	alt: {
		type: String
	},
	hotspots: [
		{
			text: {
				type: String
			},
			position: {
				type: String
			},
			normal: {
				type: String
			}
		}
	],
	location: {
		latitude: {
			type: Number
		},
		longitude: {
			type: Number
		}
	},
	marker: {
		distance: {
			type: Number
		},
		rotation: {
			type: Number
		},
		scaling: {
			type: Number
		},
		group: {
			type: Number
		},
		markerId: {
			type: Number
		}
	},
	user: {
		type: Schema.Types.ObjectId,
		ref: 'users'
	},
	date: {
		type: Date,
		default: Date.now
	}
});

module.exports = Model = mongoose.model('model', ModelSchema);
