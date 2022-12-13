process.env.NODE_ENV = 'test';
let mongoose = require('mongoose');

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');
const User = require('../models/users.model')

const { expect } = chai;
chai.use(chaiHttp);

describe('USERS APIs', () => {

  // before((done) => {
  //   mongoose.connect('mongodb+srv://syeda:syeda@symptomchecker.3ts6yel.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true });
  //   mongoose.connection
  //     .once('open', () => { done(); })
  //     .on('error', (error) => {
  //       console.warn('Warning', error);
  //     });
  // });

  // beforeEach((done) => {
  //   mongoose.connection.collections.requests.deleteOne(() => {
  //     done();
  //   });
  // });

  describe('/GET Users', () => {
    it('it should GET all users', (done) => {

      chai.request(server)
        .get('/userapi')
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res).to.be.an('object');
          expect(res.body).to.be.an('array')
          done();
        });
    });
  })

  describe('/POST one User', () => {
    it('it should not post a user without name field', (done) => {
      const user = {
        gender: 'female',
        yearOfBirth: '01.01.2000'
      }

      chai.request(server)
        .post('/userapi')
        .send(user)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res).to.be.an('object');
          expect(res.body).to.have.property('errors');
          expect(res.body.errors).to.have.property('name');
          // done();
        });
      chai.request(server)
        .delete('/userapi/' + user._id)
        .end(() => done())
    })

    it('it should post a user with all the fields', (done) => {
      const user = {
        name: 'test user',
        gender: 'female',
        yearOfBirth: '01.01.2000'
      }

      chai.request(server)
        .post('/userapi')
        .send(user)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res).to.be.an('object');
          expect(res.body).to.have.property('name');
          expect(res.body).to.have.property('gender');
          expect(res.body).to.have.property('yearOfBirth');
          // done();
        });
      // console.log("user 1:", user)
      chai.request(server)
        .delete('/userapi/' + user._id)
        .end(() => done())
    })
  })

  // describe('/GET one user by id', () => {
  //   it('should get one user by id', (done) => {
  //     const user = {
  //       _id: '123',
  //       name: 'test user',
  //       gender: 'female',
  //       yearOfBirth: '01.01.2000'
  //     }

  //     // user.save((err, user) => {
  //     chai.request(server)
  //       .post('/userapi/')
  //       .send(user)
  //       .end();

  //     console.log("user:", user)
  //     chai.request(server)
  //       .get('/userapi/' + user._id)
  //       .send(user)
  //       .end((err, res) => {
  //         expect(res).to.have.status(200);
  //         expect(res).to.be.an('object');

  //         console.log("res.body:", res.body)
  //         expect(res.body).to.have.property('name');
  //         expect(res.body).to.have.property('gender');
  //         expect(res.body).to.have.property('yearOfBirth');
  //       });
  //     chai.request(server)
  //       .delete('/userapi/' + user._id)
  //       .end()
  //     // })
  //   })
  // })
})