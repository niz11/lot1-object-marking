const express = require('express');
const path = require('path');
const fs = require('fs');
const https = require('https');

const app = express();
const PORT = process.env.PORT || 3000;

const certOptions = {
	key: fs.readFileSync(path.resolve('server.key')),
	cert: fs.readFileSync(path.resolve('server.crt'))
};
const server = https.createServer(certOptions, app);
app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, '/static/index.html'));
});

app.get('/ex2', (req, res) => {
	res.sendFile(path.join(__dirname, '/static/ex2.html'));
});

// Serve the rest of the static folder. Need to improve with webpack or use a platform like React.
app.use(express.static(path.join(__dirname, 'static')));

server.listen(PORT, () => {
	console.log(`server is listening on ${PORT}`);
});
