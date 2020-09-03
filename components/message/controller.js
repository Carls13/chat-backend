const store = require('./store');
const socket = require('../../socket').socket;
const config = require('./../../config');

const addMessage = (chat, user, message, file) => {
    return new Promise((resolve, reject) => {
        if (!user || !message) {
            console.error("[messageController] No hay usuario o mensaje");
            reject("Datos incorrectos");
            return false;
        }

        let fileUrl = '';
        if (file) {
            fileUrl = `http://localhost:${config.port}/app/files/${file.filename}`;
        }

        const fullMessage = {
            chat,
            user,
            message,
            date: new Date(),
            file: fileUrl
        }

        store.add(fullMessage);

        socket.io.emit("message", fullMessage);

        resolve({
            fullMessage
        });
    })
}

const getMessages = (filterUser) => {
    return new Promise((resolve, reject) => {
        resolve(store.list(filterUser));
    })
}

const updateMessage = (id, message) => {
    return new Promise(async (resolve, reject) => {
        if (!id || !message) {
            reject('Invalid data');
            return false;
        }
        const result = await store.updateText(id, message);
        resolve(result);
    })
}

const deleteMessage = (id) => {
    return new Promise((resolve, reject) => {
        if (!id) {
            reject("Invalid data");
            return false;
        };

        store.remove(id).then(() =>  resolve("Elemento eliminado")).catch(e => {
            reject(e);
        });
    })
}

module.exports = {
    addMessage,
    getMessages,
    updateMessage,
    deleteMessage
}