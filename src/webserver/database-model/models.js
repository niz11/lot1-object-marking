const express = require('express');
const router = express.Router();
const Model = require('./Model');

router.get('/test', (req, res) => {
	res.json({ msg: 'Users works' });
});

router.get('/', (req, res) => {
	Model.find()
		.then((posts) => res.json(posts))
		.catch((err) => res.status(404).json({ nopostsfound: 'No posts found' }));
});

router.post('/add-model', (req, res) => {
	const newModel = new Model({
		modelName: 'Astrunaut',
		src: 'https://modelviewer.dev/shared-assets/models/Astronaut.glb',
		alt: 'A 3D model of a test cube',
		hotspots: [
			{
				position: '-0.5158334257401533m 0.8808310669112648m 00.12073262739521484m',
				normal: '-0.6055749170967261m -0.030052908207539756m 0.7952206250416061m',
				text: 'Hand Moon'
			},
			{
				position: '-0.011249673695200163m 1.7695722081445033m 0.34713028254276157m',
				normal: '-0.29259561389217825m 0.11383937564155769m 0.9494358342113489m',
				text: 'Head Space'
			}
		]
	});

	newModel.save().then((post) => res.json(post));
});

module.exports = router;
