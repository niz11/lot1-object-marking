require('dotenv').config();
const express = require('express');
const path = require('path');
const fs = require('fs');
const https = require('https');
const app = express();
const PORT = process.env.PORT || 3000;

const mongoose = require('mongoose');
const models = require('./database-model/models');
const users = require('./database-model/users');

const bodyParser = require('body-parser');
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse application/json
app.use(bodyParser.json());

const certOptions = {
	key: fs.readFileSync(path.resolve('server.key')),
	cert: fs.readFileSync(path.resolve('server.crt'))
};

mongoose.connect(
	process.env.MONGO_URI,
	{
		useUnifiedTopology: true
	},
	(err, client) => {
		if (err) return console.error(err);
		console.log('Connected to Database');
	}
);

const server = https.createServer(certOptions, app);
app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, '/static/index123.html'));
});

app.get('/ex2', (req, res) => {
	res.sendFile(path.join(__dirname, '/static/ex2.html'));
});

// Needs a url param of userId + modelName
// e.g: https://localhost:3000/showModelBasedOnLocation/?userId=1&modelName=Astrunaut
app.get('/showModelBasedOnLocation', (req, res) => {
	res.sendFile(path.join(__dirname, '/static/showModelBasedOnLocation.html'));
});

// Serve the rest of the static folder. Need to improve with webpack or use a platform like React.
app.use(express.static(path.join(__dirname, 'static')));
app.use('/models', models);
app.use('/users', users);

server.listen(PORT, () => {
	console.log(`server is listening on ${PORT}`);
});
