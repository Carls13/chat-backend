const express = require("express");
const app = express();
const server = require("http").Server(app);

const config = require('./config');

const cors = require("cors");
const bodyParser = require("body-parser");
const db = require('./db');
const router = require('./network/routes');
const socket = require('./socket');

db(config.dbUrl);

app.use(cors());

app.use(bodyParser.json());
app.use('/app', express.static('public/'));

socket.connect(server);

router(app);

server.listen(config.port, () => {
    console.log('Escuchando en puerto ' + config.port);
});