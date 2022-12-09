process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');

const { expect } = chai;
chai.use(chaiHttp);

describe('USERS APIs', () => {
  describe('/GET Users', () => {
    it('it should GET all users', (done) => {

      chai.request(server)
        .get('/userapi')
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res).to.be.an('object');
          expect(res.body.users).to.be.an('string')
          done();
        });
    });
  })
})