const express = require('express');
const path = require('path');

const app = express();
const port = 3000;
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/static/index.html'));
});
app.set('trust proxy', 'loopback');
app.listen(port, 'localhost', () => {
    console.log(`server is listening on ${port}`);
});