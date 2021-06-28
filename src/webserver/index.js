require('dotenv').config();
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const models = require('./database-model/models');
const bodyParser = require('body-parser');


const app = express();
const port = 3000;
const useMongoDB = true;

app.all('/', function(req, res, next) {
    res.header("Cross-Origin-Embedder-Policy", "require-corp");
    res.header("Cross-Origin-Opener-Policy", "same-origin");
    next();
});
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse application/json
app.use(bodyParser.json());
if (useMongoDB) {
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
}


app.use(express.static(path.join(__dirname,'static')));
app.use('/models', models);
app.set('trust proxy', 'loopback');
app.listen(port, 'localhost', () => {
    console.log(`server is listening on ${port}`);
});