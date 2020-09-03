const express = require("express");
const controller = require('./controller');
const router = express.Router();
const response = require('./../../network/response');

router.post('/', (req, res) => {
    controller.addChat(req.body.users).then(data => {
        response.success(req, res, data, 201);
    })
    .catch(err => {
        response.error(req, res, 'Internal error', 500, err);
    });
});

router.get('/:userId', (req, res) => {
    controller.listChats(req.params.userId).then(chats => {
        response.success(req, res, chats, 200);
    })
    .catch(err => {
        response.error(req, res, err, 500, err);
    })
});

module.exports = router;