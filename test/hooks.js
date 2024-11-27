const User = require('../models/users');
const Catway = require('../models/catways');
const Reservation = require('../models/reservations');

exports.mochaHooks = {
    beforeEach(done) {
        User.create({
            name: 'userAdmin',
            email: 'admin@www.com',
            password: '123456' 
        });
        Catway.create({
            catwayNumber: 13,
            type: 'short',
            catwayState: 'bon état'
        })
        done();
    },
    afterEach(done) {
        User.find().deleteMany();
        Catway.find().deleteMany();
        Reservation.find().deleteMany();
        done();
    }, 
}