const { MongoMemoryServer } = require('mongodb-memory-server');
const mongoose = require('mongoose');

const TARGET = process.env.npm_lifecycle_event;

const clientOptions = {
    useNewUrlParser: true,
    dbName: 'Russell'
};

exports.initClientConnection = async () => {
    try {
        let database = process.env.URL_MONGO;
        if (TARGET === 'test') {
            const mongo = await MongoMemoryServer.create();
            database = mongo.getUri();
        }
        await mongoose.connect(database, clientOptions);
        if (TARGET === 'test') {
            console.log('Connexion à la base de donnée test réussie');
        }
        else {
            console.log('Connexion à MongoDB réussie');
        }
    } catch (error) {
        console.error('Erreur de connexion à MongoDB : ', error);
    }
};