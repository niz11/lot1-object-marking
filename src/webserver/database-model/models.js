const express = require('express');
const router = express.Router();
const Model = require('./Model');

router.get('/test', (req, res) => {
	res.json({ msg: 'Users works' });
});

router.get('/', (req, res) => {
	Model.find()
		.then((models) => {
			for (let model of models) {
				model.user = null;
			}
			res.json(models);
		})
		.catch((err) => {
			console.log(err);
			res.status(404).json({ noModels: 'No models found' });
		});
});

router.post('/user', (req, res) => {
	if (!req.body.userId) {
		return res.status(404).json('Please first login and privide a userId');
	}
	Model.find({ user: req.body.userId })
		.then((models) => res.json(models))
		.catch((err) => res.status(404).json({ noModels: 'No models found' }));
});

router.post('/add-model', async (req, res) => {
	if (!req.body.userId) {
		return res.status(404).json('Please first login and privide a userId');
	}
	if (!req.body.src || !req.body.modelName) {
		return res.status(404).json('Missing params: src, model name');
	}

	modelCheck = await Model.find({ src: req.body.src, user: req.body.userId });
	// Need also to add here the user. If the user has already a model with that name
	if (modelCheck.modelName === req.body.modelName) {
		return res.status(404).json('User already has a model with the input model name');
	}

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
				latitude: req.body.latitude ? req.body.latitude : 0,
				longitude: req.body.longitude ? req.body.longitude : 0
			},
			marker: {
				distance: req.body.distance ? req.body.distance : 0,
				rotation: req.body.rotation ? req.body.rotation : 0,
				scaling: req.body.scaling ? req.body.scaling : 0,
				group: req.body.group ? req.body.group : 0,
				markerId: req.body.markerId ? req.body.markerId : 0
			},
			user: req.body.userId
		});
		let marker = await getGroupID(newModel);
		newModel.marker.group = marker.group;
		newModel.marker.markerId = marker.id;

		newModel.save().then((post) => res.json(post));
	} else {
		res.status(404).json('User already has a model with input src');
	}
});

// Update model, need to send to rout the whle models data
router.post('/update-model', async (req, res) => {
	if (!req.body.userId) {
		return res.status(404).json('Please first login and privide a userId');
	}
	if (!req.body.src || !req.body.newSrc) {
		return res.status(404).json('Missing params: src and model name');
	}
	// Find model
	model = await Model.find({ src: req.body.src, user: req.body.userId });
	if (model.length === 1) {
		let hotspots;
		// Add hostspots
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
		model[0].modelName = req.body.modelName;
		model[0].src = req.body.newSrc ? req.body.newSrc : req.body.src;
		model[0].alt = req.body.alt ? req.body.alt : '';
		model[0].hotspots = hotspots ? hotspots : [];
		model[0].location = {
			latitude: req.body.latitude,
			longitude: req.body.longitude
		};
		model[0].marker = {
			distance: req.body.distance,
			rotation: req.body.rotation,
			scaling: req.body.scaling
		};

		let marker = await getGroupID(model[0]);
		model[0].marker.group = marker.group;
		model[0].marker.markerId = marker.id;

		model[0].save().then((model) => res.json(model));
	} else {
		res.status(404).json('No Model with input src exists');
	}
});

// Need to add here users data.
router.delete('/remove-model', async (req, res) => {
	if (!req.body.userId) {
		return res.status(404).json('Please first login and privide a userId');
	}
	if (!req.body.src) {
		return res.status(404).json('Missing params: src');
	}
	model = await Model.find({ src: req.body.src, user: req.body.userId });
	if (model.length === 1) {
		model[0].remove().then(() => res.json(`Model with src: ${model[0].src}, was removed`));
	} else {
		res.status(404).json('No Model with input src exists');
	}
});

router.post('/add-hospot', async (req, res) => {
	if (!req.body.userId) {
		return res.status(404).json('Please first login and privide a userId');
	}
	if (!req.body.src || !req.body.position || !req.body.normal || !req.body.text) {
		return res.status(404).json('Missing params: src, position, normal or text');
	}
	model = await Model.find({ src: req.body.src, user: req.body.userId });
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
	if (!req.body.userId) {
		return res.status(404).json('Please first login and privide a userId');
	}
	if (!req.body.src || !req.body.text) {
		return res.status(404).json('Missing params: src, position, normal or text');
	}
	model = await Model.find({ src: req.body.src, user: req.body.userId });
	if (model.length === 1) {
		const exist = model[0].hotspots.filter((hotspot) => {
			return hotspot.text === req.body.text;
		});
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
	if (!req.body.userId) {
		return res.status(404).json('Please first login and privide a userId');
	}
	if (!req.body.src || !req.body.latitude || !req.body.longitude) {
		return res.status(404).json('Missing params: src, latitude or longitude');
	}
	model = await Model.find({ src: req.body.src, user: req.body.userId });
	if (model.length === 1) {
		model[0].modelName = req.body.modelName ? req.body.modelName : model[0].modelName;
		model[0].location.latitude = req.body.latitude;
		model[0].location.longitude = req.body.longitude;
		let marker = await getGroupID(model[0]);
		model[0].marker.group = marker.group;
		model[0].marker.markerId = marker.id;
		model[0].save().then((model) => res.json(model));
	} else {
		res.status(404).json('No Model with input src exists');
	}
});

router.post('/update-marker', async (req, res) => {
	if (!req.body.userId) {
		return res.status(404).json('Please first login and privide a userId');
	}
	if (!req.body.src || !req.body.distance || !req.body.rotation || !req.body.scaling) {
		return res.status(404).json('Missing params: src, distance, rotation  or scaling');
	}
	model = await Model.find({ src: req.body.src, user: req.body.userId });
	if (model.length === 1) {
		model[0].marker.distance = req.body.distance;
		model[0].marker.rotation = req.body.rotation;
		model[0].marker.scaling = req.body.scaling;
		model[0].save().then((model) => res.json(model));
	} else {
		res.status(404).json('No Model with input src exists');
	}
});

async function getGroupID(thisModel) {
	let models = await Model.find();

	let largestGroup = models.reduce(
		(acc, m) => (m.marker != null ? (m.marker.group != null ? Math.max(acc, +m.marker.group) : acc) : acc),
		0
	);

	let undefinedMarkerModels = models.filter((model) => model.marker == null);
	for (let model of undefinedMarkerModels) {
		model.marker = {
			distance: '0',
			rotation: '0',
			scaling: '0',
			group: '' + ++largestGroup,
			markerId: '0'
		};
		await model.save();
	}

	models = await Model.find();

	undefinedMarkerModels = models.filter((model) => model.marker.group == null);
	for (let model of undefinedMarkerModels) {
		model.marker.group = '' + ++largestGroup;
		model.marker.markerId = '0';

		await model.save();
	}

	models = await Model.find();

	undefinedMarkerModels = models.filter((model) => model.marker.markerId == null);
	for (let model of undefinedMarkerModels) {
		model.marker.markerId = '0';
		await model.save();
	}

	models = await Model.find();

	let nearModels = models.filter(
		(model) =>
			getDistance(
				model.location.latitude,
				model.location.longitude,
				thisModel.location.latitude,
				thisModel.location.longitude
			) < 500
	);

	let groups = Array.from(new Set(nearModels.map((m) => m.marker.group)));
	if (groups.length > 1) {
		await merge(groups[0], groups[1]);
		return await getGroupID(thisModel);
	} else if (groups.length === 1) {
		let curGroup = groups[0];

		let freeId = -1;
		for (let i = 0; i < 50; ++i) {
			if (nearModels.filter((model) => model.marker.markerId === i && model !== thisModel).length === 0) {
				freeId = i;
				break;
			}
		}

		return { group: curGroup, id: freeId };
	}

	largestGroup = models.reduce(
		(acc, m) => (m.marker != null ? (m.marker.group != null ? Math.max(acc, +m.marker.group) : acc) : acc),
		0
	);

	return { group: largestGroup + 1, id: 0 };
}

async function merge(group1, group2) {
	let models = await Model.find();

	let modelsG1 = models.filter((m) => m.marker.group === group1);
	let modelsG2 = models.filter((m) => m.marker.group === group2);

	for (let m of modelsG2) {
		m.marker.group = '' + group1;
		let freeId = -1;
		for (let i = 0; i < 50; ++i) {
			if (modelsG1.filter((model) => model.marker.markerId === i).length === 0) {
				freeId = i;
				break;
			}
		}
		m.marker.markerId = '' + freeId;
		await m.save();
		modelsG1.push(m);
	}
}

function getDistance(objectLatitude, objectLongitude, usersLatitude, usersLongitude) {
	const dLat = (usersLatitude - objectLatitude) * Math.PI / 180;
	const dLon = (usersLongitude - objectLongitude) * Math.PI / 180;
	const a =
		0.5 -
		Math.cos(dLat) / 2 +
		Math.cos(objectLatitude * Math.PI / 180) * Math.cos(usersLatitude * Math.PI / 180) * (1 - Math.cos(dLon)) / 2;
	return Math.round(6371000 * 2 * Math.asin(Math.sqrt(a)));
}

module.exports = router;
