const request = require('supertest');
require('dotenv').config({ path: './env/.env'});
const jwt = require('jsonwebtoken');
const User = require('../models/users');
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

describe('POST users', () => {

    it('should authenticate user with valid credentials', (done) => {
        request(app)
            .post('/users')
            .send({
                email: 'admin@www.com',
                password: '123456'
            })
            .expect(302, done)
    });

    it('should not find user with invalid email', (done) => {
        request(app)
            .post('/users')
            .send({
                email: 'administrator@www.com',
                password: '123456'
            })
            .expect(404, done)
    });

    it('should not authenticate user with invalid password', (done) => {
        request(app)
            .post('/users')
            .send({
                email: 'admin@www.com',
                password: '1234567'
            })
            .expect(403, done)
    });
});


describe('PUT users/add', () => {
    it('should add a new user', (done) => {
        request(app)
            .put('/users/add')
            .set('Cookie', `token=${token}`)
            .send({
                name: 'usertoadd',
                email: 'usertoadd@www.com',
                password: '123456'
            })
            .expect(201, done);
    });
});
 

describe('PATCH users/:id', () => {
    it ('should edit user', (done) => {
        var data = {
            name: 'usertoedit', 
            email: 'usertoedit@www.com', 
            password: '123456'
        };
        let user = new User(data);
        user.save().then(() => {
          request(app)
            .patch('/users/'+ user._id)
            .set('Cookie', `token=${token}`)
            .send({
                name: 'useredited',
                email: 'useredited@www.com',
                password: 'abcdef'
            })
            .expect(204, done);
        }); 
    });
});


describe('DELETE users/:id', () => {
    it ('should delete user', (done) => {
        var data = {
            name: 'usertodel', 
            email: 'usertodel@www.com', 
            password: '123456'
        };
        let user = new User(data);
        user.save().then(() => {
          request(app)
            .delete('/users/'+ user._id)
            .set('Cookie', `token=${token}`)
            .expect(204, done);
        }); 
    });
});


describe('GET users', () => {
    it ('should get user list', (done) => {
        request(app)
        .get('/users')
        .set('Cookie', `token=${token}`)
        .expect(200, done);
    });
});


describe('GET users/:id', () => {
    it ('should get user by id', (done) => {
        var data = {
            name: 'usertoget', 
            email: 'usertoget@www.com', 
            password: '123456'
        };
        let user = new User(data);
        user.save().then(() => {
          request(app)
            .get('/users/'+ user._id)
            .set('Cookie', `token=${token}`)
            .expect(200, done);
        }); 
    });
});


describe('GET users/:id/userboard', () => {
    it ('should get user board', (done) => {
        var data = {
            name: 'userboard', 
            email: 'userboard@www.com', 
            password: '123456'
        };
        let user = new User(data);
        user.save().then(() => {
          request(app)
            .get('/users/'+ user._id +'/userboard')
            .set('Cookie', `token=${token}`)
            .expect(200, done);
        }); 
    });
});