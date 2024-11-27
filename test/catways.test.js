const request = require('supertest');
require('dotenv').config({ path: './env/.env' });
const jwt = require('jsonwebtoken');
const Catway = require('../models/catways');
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


describe('POST catways', () => {
    it('should add a catway', (done) => {
        request(app)
        .post('/catways')
        .set('Cookie', `token=${token}`)
        .send({
            catwayNumber: 1,
            type: 'short',
            catwayState: 'parfait'
        })
        .expect(201, done);
    });
});


describe('PUT catways/:id', () => {
    it('should replace catway', (done) => {
        var data = {
            catwayNumber: 2,
            type: 'long',
            catwayState: 'Taches de peinture'
        };
        let catway = new Catway(data);
        catway.save().then(() => {
            request(app)
                .put('/catways/'+ catway._id)
                .set('Cookie', `token=${token}`)
                .send({
                    catwayNumber: 3,
                    type: 'short',
                    catwayState: 'Neuf'
                })
                .expect(204, done);
        });
    });
});


describe('PATCH catways/:id', () => {
    it('should edit catway state', (done) => {
        var data = {
            catwayNumber: 2,
            type: 'short',
            catwayState: 'bien'
        };
        let catway = new Catway(data);
        catway.save().then(() => {
            request(app)
                .patch('/catways/'+ catway._id)
                .set('Cookie', `token=${token}`)
                .send({
                    catwayState: "Taquet d'amarrage cassé"
                })
                .expect(204, done);
        });
    });
});


describe('DELETE catways/:id', () => {
    it('should delete catway', (done) => {
        var data = {
            catwayNumber: 4,
            type: 'long',
            catwayState: 'cassé'
        };
        let catway = new Catway(data);
        catway.save().then(() => {
            request(app)
                .delete('/catways/'+ catway._id)
                .set('Cookie', `token=${token}`)
                .expect(204, done);
        });
    });
});


describe('GET catways', () => {
    it('should get catway list', (done) => {
        request(app)
            .get('/catways')
            .set('Cookie', `token=${token}`)
            .expect(200, done);
    });
});


describe('GET catways/:id', () => {
    it('should get catway by id', (done) => {
        var data = {
            catwayNumber: 5,
            type: 'short',
            catwayState: 'neuf'
        };
        let catway = new Catway(data);
        catway.save().then(() => {
            request(app)
                .get('/catways/'+ catway._id)
                .set('Cookie', `token=${token}`)
                .expect(200, done);
        });
    });
});