const request = require('supertest');
require('dotenv').config({ path: './env/.env' });
const jwt = require('jsonwebtoken');
const Catway = require('../models/catways');
const Reservation = require('../models/reservations');
const app = require('../app');

const token = jwt.sign(
    {
        _id: '123', locale: 'fr'
    },
    process.env.SECRET_KEY,
    {
        expiresIn: 1 * 60 * 60
    }
);

describe('POST catways/:id/reservations', () => {
    it('should create reservation', (done) => {
        Catway.findOne({catwayNumber: 13}).then((catway) => {
            request(app)
                .post('/catways/'+ catway._id + '/reservations')
                .set('Cookie', `token=${token}`)
                .send({
                    catwayNumber: 13,
                    clientName: 'client',
                    boatName: 'bateau',
                    checkIn: '2025-01-01',
                    checkOut: '2025-05-30'
                })
                .expect(201, done);
        });
    });
});

describe('DELETE catways/:id/reservations/:idReservation', () => {
    it('should delete reservation', (done) => {
        Catway.findOne({catwayNumber: 13}).then((catway) => {
            var data = {
                catwayNumber: 13,
                clientName: 'client',
                boatName: 'bateau',
                checkIn: '2025-06-15T06:00:00Z',
                checkOut: '2025-12-15T06:00:00Z' 
            };
            let reservation = new Reservation(data);
            reservation.save().then(() => {
                request(app)
                    .delete('/catways/'+ catway._id +'/reservations/'+ reservation._id)
                    .set('Cookie', `token=${token}`)
                    .expect(204, done);
            });
        });
    });
});

describe('GET catways/:id/reservations', () => {
    it('should get reservations list by catway id', (done) => {
        Catway.findOne({catwayNumber: 13}).then((catway) => {
            request(app)
                .get('/catways/'+ catway._id +'/reservations')
                .set('Cookie', `token=${token}`)
                .expect(200, done);
        });
    });
});

describe('GET catways/:id/reservations/:idReservation', () => {
    it('should get reservation by id', (done) => {
        Catway.findOne({catwayNumber: 13}).then((catway) => {
            var data = {
                catwayNumber: 13,
                clientName: 'client',
                boatName: 'bateau',
                checkIn: '2026-01-01:00:00Z',
                checkOut: '2026-01-02:00:00Z' 
            };
            let reservation = new Reservation(data);
            reservation.save().then(() => {
                request(app)
                    .get('/catways/'+ catway._id +'/reservations/'+ reservation._id)
                    .set('Cookie', `token=${token}`)
                    .expect(200, done);
            });
        });
    });
});

describe('GET catways/board/:idReservation', () => {
    it('should get reservation by id from userboard page', (done) => {
        var data = {
            catwayNumber: 13,
            clientName: 'client',
            boatName: 'bateau',
            checkIn: '2026-02-01:00:00Z',
            checkOut: '2026-02-02:00:00Z' 
        };
        let reservation = new Reservation(data);
        reservation.save().then(() => {
            request(app)
                .get('/catways/board/'+ reservation._id)
                .set('Cookie', `token=${token}`)
                .expect(302, done);
        });
    });
});

describe('DELETE catways/board/:idReservation', () => {
    it('should delete reservation by id from userboard page', (done) => {
        var data = {
            catwayNumber: 13,
            clientName: 'client',
            boatName: 'bateau',
            checkIn: '2026-03-01:00:00Z',
            checkOut: '2026-03-02:00:00Z' 
        };
        let reservation = new Reservation(data);
        reservation.save().then(() => {
            request(app)
                .delete('/catways/board/'+ reservation._id)
                .set('Cookie', `token=${token}`)
                .expect(204, done);
        });
    });
});