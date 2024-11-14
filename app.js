const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const { initClientConnection } = require('./db/mongo');
const bodyParser = require('body-parser');

const indexRouter = require('./routes/index');

const app = express();

initClientConnection()

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/', indexRouter);

app.use((req, res, next) => {
    res.status(404).json({ name: 'API', version: '1.0', status: 404, message: 'introuvable'});
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Erreur serveur !');
});

module.exports = app;
