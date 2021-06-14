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

module.exports = router;
