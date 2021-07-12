require('dotenv').config();
const express = require('express');
const path = require('path');
const fs = require('fs');
const fileUpload = require('express-fileupload');
const morgan = require('morgan');
const https = require('https');
const app = express();
const PORT = process.env.PORT || 3000;

const mongoose = require('mongoose');
const busboy = require('connect-busboy');  // Middleware to handle the file upload https://github.com/mscdex/connect-busboy
const models = require('./database-model/models');
const users = require('./database-model/users');

// enable files upload
app.use(fileUpload({
    createParentPath: true
}));

const bodyParser = require('body-parser');
const { truncate } = require('fs/promises');
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({limit: '50mb', extended: true, parameterLimit: 1000000 }));
// parse application/json
app.use(bodyParser.json());

app.use(morgan('dev'));
// module to manage upload of images, max 2MiB buffer --> images are directly written to disk
app.use(busboy({
	highWaterMark: 2 * 1024 * 1024, // Set 50MiB buffer
  }));

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
