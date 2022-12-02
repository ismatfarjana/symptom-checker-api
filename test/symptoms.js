process.env.NODE_ENV = 'test';
const Symptom = require('../database/collections/symptoms');


//Require the dev-dependencies
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');

const { expect } = chai;
chai.use(chaiHttp);

describe('Symptoms', () => {
  beforeEach((done) => {
    Symptom.deleteOne
  })
})