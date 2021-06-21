const express = require('express');
const router = express.Router();
const Model = require('./Model');

router.get('/test', (req, res) => {
	res.json({ msg: 'Users works' });
});

router.get('/', (req, res) => {
	Model.find()
		.then((models) => res.json(models))
		.catch((err) => res.status(404).json({ nopostsfound: 'No posts found' }));
});

router.post('/add-model', async (req, res) => {
	if (!req.body.src || !req.body.modelName || !req.body.latitude || !req.body.longitude) {
		return res.status(404).json('Missing params: src, model name, latitude or longitude');
	}
	modelCheck = await Model.find({ src: req.body.src });
	if (modelCheck.length === 0) {
		let hotspots;
		if (req.body.hotspots && Array.isArray(req.body.hotspots)) {
			hotspots = req.body.hotspots.map((hotspot) => {
				if (!hotspot.position || !hotspot.normal || !hotspot.text) {
					return res.status(404).json('One of the Hotspots is missing a position, a normal or a text');
				}
				return {
					position: hotspot.position,
					normal: hotspot.normal,
					text: hotspot.text
				};
			});
		}
		const newModel = new Model({
			modelName: req.body.modelName,
			src: req.body.src,
			alt: req.body.alt ? req.body.alt : '',
			hotspots: hotspots ? hotspots : [],
			location: {
				latitude: req.body.latitude,
				longitude: req.body.longitude
			},
			marker: {
				distance: req.body.distance,
				rotation: req.body.rotation,
				scaling: req.body.scaling
			}
		});

		newModel.save().then((post) => res.json(post));
	} else {
		res.status(404).json('Model already exsist in DB');
	}
});

// router.post('/update-model', async (req, res) => {
// 	if (!req.body.src || !req.body.modelName) {
// 		return res.status(404).json('Missing params: src and model name');
// 	}
// 	// Find model
// 	modelCheck = await Model.find({ src: req.body.src });
// 	if (modelCheck.length === 1) {
// 		let hotspots;
// 		// Add hostspots
// 		if (req.body.hotspots && Array.isArray(req.body.hotspots)) {
// 			hotspots = req.body.hotspots.map((hotspot) => {
// 				if (!hotspot.position || !hotspot.normal || !hotspot.text) {
// 					return res.status(404).json('One of the Hotspots is missing a position, a normal or a text');
// 				}
// 				return {
// 					position: hotspot.position,
// 					normal: hotspot.normal,
// 					text: hotspot.text
// 				};
// 			});
// 		}
// 		const newModel = new Model({
// 			modelName: req.body.modelName,
// 			src: req.body.src,
// 			alt: req.body.alt ? req.body.alt : '',
// 			hotspots: hotspots ? hotspots : [],
// 			location: {
// 				latitude: req.body.latitude,
// 				longitude: req.body.longitude
// 			},
// 			marker: {
// 				distance: req.body.distance,
// 				rotation: req.body.rotation,
// 				scaling: req.body.scaling
// 			}
// 		});

// 		newModel.save().then((post) => res.json(post));
// 	} else {
// 		res.status(404).json('Model already exsist in DB');
// 	}
// });

router.post('/add-hospot', async (req, res) => {
	console.log(req.body);
	if (!req.body.src || !req.body.position || !req.body.normal || !req.body.text) {
		return res.status(404).json('Missing params: src, position, normal or text');
	}
	model = await Model.find({ src: req.body.src });
	console.log(model);
	if (model.length === 1) {
		const exist = model[0].hotspots.filter((hotspot) => {
			return hotspot.text === req.body.text;
		});
		if (exist.length > 0) {
			res.status(404).json('Hotspot already exsist on Model');
		} else {
			let hotspot = {
				position: req.body.position,
				normal: req.body.normal,
				text: req.body.text
			};
			model[0].hotspots.push(hotspot);
			model[0].save().then((model) => res.json(model));
		}
	} else {
		res.status(404).json('No Model with input src exists');
	}
});

router.delete('/remove-hospot', async (req, res) => {
	if (!req.body.src || !req.body.text) {
		return res.status(404).json('Missing params: src, position, normal or text');
	}
	model = await Model.find({ src: req.body.src });
	if (model.length === 1) {
		const exist = model[0].hotspots.filter((hotspot) => {
			return hotspot.text === req.body.text;
		});
		console.log(exist);
		if (exist.length === 0) {
			res.status(404).json('No hotspot with input text exists');
		} else {
			const removeHotspot = model[0].hotspots.filter((hotspot) => {
				return hotspot.text !== req.body.text;
			});
			model[0].hotspots = removeHotspot;
			model[0].save().then((model) => res.json(model));
		}
	} else {
		res.status(404).json('No Model with input src exists');
	}
});

router.post('/update-location', async (req, res) => {
	if (!req.body.src || !req.body.latitude || !req.body.longitude) {
		return res.status(404).json('Missing params: src, latitude or longitude');
	}
	model = await Model.find({ src: req.body.src });
	if (model.length === 1) {
		model[0].location.latitude = req.body.latitude;
		model[0].location.longitude = req.body.longitude;
		model[0].save().then((model) => res.json(model));
	} else {
		res.status(404).json('No Model with input src exists');
	}
});

router.post('/update-marker', async (req, res) => {
	if (!req.body.src || !req.body.distance || !req.body.rotation || !req.body.scaling) {
		return res.status(404).json('Missing params: src, distance, rotation  or scaling');
	}
	model = await Model.find({ src: req.body.src });
	if (model.length === 1) {
		model[0].marker.distance = req.body.distance;
		model[0].marker.rotation = req.body.rotation;
		model[0].marker.scaling = req.body.scaling;
		model[0].save().then((model) => res.json(model));
	} else {
		res.status(404).json('No Model with input src exists');
	}
});

module.exports = router;
