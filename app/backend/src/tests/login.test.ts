import * as sinon from 'sinon'; // Faz o stub do método
import * as chai from 'chai';
import * as bcryptjs from 'bcryptjs';
import chaiHttp = require('chai-http'); // Simula requisições
import { app } from '../app';
import Users from '../database/models'
import { Response } from 'superagent';
import { mockResponseLogin } from './mocks'

chai.use(chaiHttp);

const { expect } = chai;

describe('POST /Login', () => {
  describe('Quando não são enviadas username e password', () => {
    
    let response;
    
    before(async () => {
      response = await chai
        .request(app)
        .post('/login')
        .send({});
    });

    it('Retorna status 401', () => {
      expect(response.status).to.be.equal(401);
    });

    it('Retorna mensagem de erro', () => {
      const message = 'All fields must be filled'
      expect(response.body.message).to.be.equal(message);
    });
  });

  describe('Quando são enviadas credenciais erradas', () => {

    let response;

    before(async () => {

      sinon.stub(Users, 'findOne')
        .resolves({
          email: 'paulo@trybe.com',
          password: '12345',
        }); // Verificar qual é a resposta esperada

      response = await chai
        .request(app)
        .post('/login')
        .send({
          email: '',
          password: '',
        });
    });

    after(() => {
      Users.findOne.restore();
    });

    it('Retorna status 401', () => {
      expect(response.status).to.be.equal(401);
    });

    it('Retorna mensagem de erro', () => {
      const message = 'Incorrect email or password'
      expect(response.body.message).to.be.equal(message);
    });
  });

  describe('Quando as informações são enviadas corretamente', () => {

    let response;

    before(async () => {

      sinon.stub(Users, 'findOne').resolves({mockResponseLogin});
      sinon.stub(bcryptjs, "compare").resolves(true);

      response = await chai
        .request(app)
        .post('/login')
        .send({
          email: 'admin@admin.com',
          password: 'password',
        });
    });

    it('Retorna Status 200', () => {
      expect(response.status).to.be.equal(200);
    });

    it('Retorna os dados do usuário', () => {
      expect(response.body).to.be.equal(mockResponseLogin);
    });
  });
});
