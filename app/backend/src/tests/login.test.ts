import * as sinon from 'sinon'; // Faz o stub do método
import * as chai from 'chai';
import * as bcryptjs from 'bcryptjs';
import chaiHttp = require('chai-http'); // Simula requisições

import { app } from '../app';
import Users from '../database/models/Users';

import { Response } from 'superagent';
import { mockReturnLogin, mockResponseLogin } from './mocks'

chai.use(chaiHttp);

const { expect } = chai;

describe('Testando a rota POST /login', () => {
  describe('Quando não são enviadas username e password', () => {
    
    let response: Response;
    
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

    let response: Response;

    before(async () => {
      
      sinon.stub(Users, "findOne").resolves(mockResponseLogin as Users);

      response = await chai
        .request(app)
        .post('/login')
        .send({
          email: '',
          password: '',
        });
    });

    after(() => {
      (Users.findOne as sinon.SinonStub).restore();
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

    let response: Response;

    before(async () => {

      sinon.stub(Users, 'findOne').resolves(mockResponseLogin as Users);
      sinon.stub(bcryptjs, "compare").resolves(true);

      response = await chai
        .request(app)
        .post('/login')
        .send({
          email: 'admin@admin.com',
          password: 'password',
        });
    });

    after(() => {
      (Users.findOne as sinon.SinonStub).restore();
    });

    it('Retorna Status 200', () => {
      expect(response.status).to.be.equal(200);
    });

    it('Retorna os dados do usuário', () => {
      expect(response.body).to.be.equal(mockReturnLogin);
    });
  });
});
