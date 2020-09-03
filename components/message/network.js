const express = require("express");
const path = require("path");
const multer = require("multer");
const controller = require('./controller');
const router = express.Router();
const response = require('./../../network/response');

const storage = multer.diskStorage({
    destination: 'public/files/',
    filename : (req, file, cb) => {
        cb(null, file.fieldname + "-" + Date.now() + 
        path.extname(file.originalname))
    }
});

const upload = multer({ storage: storage });

router.get('/', (req, res) => {
    const filterMessages = req.query.user || null;
    controller.getMessages(filterMessages).then((messageList) => {
        response.success(req, res, messageList, 200);
    })
    .catch(e => {
        response.error(req, res, e.message, 500, e);
    })
});

router.post('/', upload.single('file'), (req, res) => {
    const { chat, user, message } = req.body;
    controller.addMessage(chat, user, message, req.file).then((fullMessage) => {
        response.success(req, res, fullMessage, 201);
    }).catch(e => {
        response.error(req, res, 'Información inválida', 400, e);
    })
    
});

router.patch('/:id', (req, res) => {
    controller.updateMessage(req.params.id, req.body.message).then((data) => {
        response.success(req, res, data, 200);
    })
    .catch(e => {
        response.error(req, red, 'Error interno', 500, e);
    })
});

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    controller.deleteMessage(id)
    .then(() => {
        response.success(req, res, `Mensaje ${id} eliminado`, 200);
    })
    .catch(e => {
        response.error(req, res, 'Error interno', 500, e);
    })
})

module.exports = router;