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
			}
		});

		newModel.save().then((post) => res.json(post));
	} else {
		res.status(404).json('Model already exsist in DB');
	}
});

router.post('/add-hospot', async (req, res) => {
	if (!req.body.src || !req.body.position || !req.body.normal || !req.body.text) {
		return res.status(404).json('Missing params: src, position, normal or text');
	}
	model = await Model.find({ src: req.body.src });
	if (model.length !== 0) {
		const exist = model.hotspots.filter((hotspot) => {
			hotspot.text !== req.body.text;
		});
		if (exist.length !== 0) {
			res.status(404).json('Hotspot already exsist on Model');
		} else {
			let hotspot = {
				position: req.body.position,
				normal: req.body.normal,
				text: req.body.text
			};
			model.hotspots.push(hotspot);
			model.save().then((post) => res.json(hotspot));
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
	if (model.length !== 0) {
		const exist = model.hotspots.filter((hotspot) => {
			hotspot.text === req.body.text;
		});
		if (exist.length === 0) {
			res.status(404).json('No hotspot with input text exists');
		} else {
			const removeHotspot = model.hotspots.filter((hotspot) => {
				hotspot.text !== req.body.text;
			});
			model.hotspots = removeHotspot;
			model.save().then((hotspots) => res.json(hotspots));
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
	if (model.length !== 0) {
		model.location.latitude = req.body.latitude;
		model.location.latitude = req.body.longitude;
		model.save().then((model) => res.json(model));
	} else {
		res.status(404).json('No Model with input src exists');
	}
});

module.exports = router;
