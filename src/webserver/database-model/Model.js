const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
// modelName, src and hotspots text are unique.
const ModelSchema = new Schema({
	modelName: {
		type: String,
		required: true
	},
	src: {
		type: String,
		required: true,
		unique: true
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
		}
	},
	date: {
		type: Date,
		default: Date.now
	}
});

module.exports = Model = mongoose.model('model', ModelSchema);
