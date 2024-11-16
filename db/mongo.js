const mongoose = require('mongoose');
const URL_MONGO = process.env.URL_MONGO;

const clientOptions = {
    useNewUrlParser: true,
    dbName: 'Russell'
};

exports.initClientConnection = async () => {
    try {
        await mongoose.connect(URL_MONGO, clientOptions);
        console.log('Connexion à MongoDB réussie');
    } catch (error) {
        console.error('Erreur de connexion à MongoDB : ', error);
    }
};