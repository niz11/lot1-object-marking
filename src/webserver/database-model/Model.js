const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
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
				type: String,
				required: true
			},
			position: {
				type: String,
				required: true
			},
			normal: {
				type: String,
				required: true
			}
		}
	],
	location: {
		latitude: {
			type: Number,
			required: true
		},
		longitude: {
			type: Number,
			required: true
		}
	},
	date: {
		type: Date,
		default: Date.now
	}
});

module.exports = Model = mongoose.model('model', ModelSchema);
