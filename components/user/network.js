const express = require("express");
const controller = require('./controller');
const router = express.Router();
const response = require('./../../network/response');

router.post('/', (req, res) => {
    controller.addUser(req.body.name).then(data => {
        response.success(req, res, data, 201);
    }).catch(e => {
        response.error(req, res, 'Internal error', 500, e);
    });
});

router.get('/', (req, res) => {
    controller.getUsers().then((data) => {
        response.success(req, res, data, 201);
    }).catch(e => {
        response.error(req, res, 'Internal error', 500, e);
    });
});

module.exports = router;