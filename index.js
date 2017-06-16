const express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    morgan = require('morgan'),
    mongoose = require('mongoose'),
    config = require('./config/main'),
    router = require('./router'),
    socketEvents = require('./socketEvents'),
    socket = require('socket.io'),
    cors = require('cors');

let server = app.listen(config.port);

mongoose.connect(config.database);
socketEvents(socket.listen(server));

app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(morgan('dev'));

app.get('/', function (req, res) {
    res.send('Hello!');
});

router(app);

module.exports = server;
console.log('Server started http://localhost:' + config.port);