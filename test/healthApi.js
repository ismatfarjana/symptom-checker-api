process.env.NODE_ENV = 'test';
// const Symptom = require('../database/collections/symptoms');


//Require the dev-dependencies
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');

const { expect } = chai;
chai.use(chaiHttp);

describe('health apis', () => {

  describe('/GET symptoms', () => {
    it('it should GET all the symptoms', (done) => {

      chai.request(server)
        .get('/healthapi/symptoms')
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res).to.be.an('object');
          expect(res.body.symptomsDataset).to.be.an('array')
          done();
        });
    });
  })

  describe('/GET issues', () => {
    it('it should GET all the issues', (done) => {

      chai.request(server)
        .get('/healthapi/issues')
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res).to.be.an('object');
          expect(res.body.issuesDataset).to.be.an('array')
          done();
        });
    });
  })

  describe('/GET one issue', () => {
    it('it should GET one issue', (done) => {
      const issueId = '11'
      chai.request(server)
        .get('/healthapi/issues/' + issueId)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res).to.be.an('object');
          expect(res.body.issue).to.have.property('Description')
          expect(res.body.issue).to.be.an('object')
          done();
        });
    })
  })

  describe('/GET body locations', () => {
    it('it should GET all the body locations', (done) => {

      chai.request(server)
        .get('/healthapi/locations')
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res).to.be.an('object');
          expect(res.body.bodyLocations).to.be.an('array')
          done();
        });
    });
  })

  describe('/GET one body location', () => {
    it('it should GET one location', (done) => {
      const locationId = '11'
      chai.request(server)
        .get('/healthapi/locations/' + locationId)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res).to.be.an('object');
          expect(res.body.location).to.be.an('array')
          done();
        });
    })
  })


  // describe('/GET one diagnosis', () => {
  //   it('it should GET one diagnosis', (done) => {

  //     chai.request(server)
  //       .get('/healthapi/diagnosis?symptoms=[9,10,11]&gender=female&yearOfBirth=1990')
  //       .end((err, req, res) => {
  //         console.log(1)
  //         console.log(res)
  //         expect(res.status).to.equal(200);
  //         // expect(res).to.be.an('object');
  //         expect(req).to.have.param('symptoms');
  //         // expect(req).to.have.param('gender', 'yearOfBirth');
  //         // expect(req).to.not.have.param('id');

  //         done();
  //       });
  //   })
  // })
})