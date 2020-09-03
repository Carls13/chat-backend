const db = require('mongoose');

db.Promise = global.Promise;

const connect = async (url) => {
    await db.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        dbName: 'chat_db'
    });
}

console.log('[db] conectada con éxito');

module.exports = connect;