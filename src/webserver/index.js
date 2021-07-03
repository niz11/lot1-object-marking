require('dotenv').config();
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const models = require('./database-model/models');
const bodyParser = require('body-parser');
const users = require('./database-model/users');


const app = express();
const port = 3000;
const useMongoDB = true;

// app.all('/', function(req, res, next) {
//     res.header("Cross-Origin-Embedder-Policy", "require-corp");
//     res.header("Cross-Origin-Opener-Policy", "same-origin");
//     next();
// });
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
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/static/index123.html'));
});

app.use(express.static(path.join(__dirname,'static')));

app.use('/models', models);
app.use('/users', users);
app.set('trust proxy', 'loopback');
app.listen(port, 'localhost', () => {
    console.log(`server is listening on ${port}`);
});