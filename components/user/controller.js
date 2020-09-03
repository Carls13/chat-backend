const store = require('./store');

const addUser = (name) => {
    if (!name) {
        return Promise.reject('Invalid data');
    }
    
    const user = {
        name
    };

    return store.add(user);
};

const getUsers = () => {
    return new Promise((resolve, reject) => {
        resolve(store.list());
    })
};

module.exports = {
    addUser,
    getUsers
};