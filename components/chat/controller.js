const store = require('./store');

const addChat = (users) => {
    if (!users || !Array.isArray(users)) return Promise.reject('Invlaid user list');

    const chat = {
        users
    };

    return store.addChat(chat);
};

const listChats = (userId) => {
    return store.listChats(userId);
};

module.exports = {
    addChat,
    listChats
};