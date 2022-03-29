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
      const message = 'All fields must be filled'
      expect(response.body.message).to.be.equal(message);
    });
  });

  describe('Quando a senha enviada está incorreta', () => {

    let response: Response;

    before(async () => {

      sinon.stub(Users, 'findOne').resolves(mockResponseLogin as Users);
      sinon.stub(bcryptjs, "compare").resolves(false);

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
      (bcryptjs.compare as sinon.SinonStub).restore();
    });

    it('Retorna Status 401', () => {
      expect(response.status).to.be.equal(401);
    });

    it('Retorna os dados do usuário', () => {
      const message = 'Incorrect email or password'
      expect(response.body.message).to.be.equal(message);
    });  
  });

  describe('Quando a senha enviada possui menos de 6 caracteres', () => {

    let response: Response;

    before(async () => {

      sinon.stub(Users, 'findOne').resolves(mockResponseLogin as Users);

      response = await chai
        .request(app)
        .post('/login')
        .send({
          email: 'admin@admin.com',
          password: 'pass',
        });
    });

    after(() => {
      (Users.findOne as sinon.SinonStub).restore();
    });

    it('Retorna Status 401', () => {
      expect(response.status).to.be.equal(401);
    });

    it('Retorna os dados do usuário', () => {
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
      (bcryptjs.compare as sinon.SinonStub).restore();
    });

    it('Retorna Status 200', () => {
      expect(response.status).to.be.equal(200);
    });

    it('Retorna os dados do usuário', () => {
      expect(response.body).hasOwnProperty('token');
      expect(response.body.user.id).to.be.equal(mockReturnLogin.user.id)
      expect(response.body.user.username).to.be.equal(mockReturnLogin.user.username)
      expect(response.body.user.role).to.be.equal(mockReturnLogin.user.role)
    });  
  });
});

describe('Testando POST /login/validate', () => {
  describe('Testando o envio do token correto', () => {

    let response: Response;
    let authorization = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGFkbWluLmNvbSIsImlhdCI6MTY0ODU2Nzc4OH0.1LQ0012Dj9jpWKnLgA8RcOdst4-jhaUko-yk0i1BlYU"

    before(async () => {

      sinon.stub(Users, 'findOne').resolves(mockResponseLogin as Users);

      response = await chai
        .request(app)
        .get('/login/validate')
        .set('Authorization', authorization);
    });

    after(() => {
      (Users.findOne as sinon.SinonStub).restore();
    });

    it('Retorna o status 200', () => {
      expect(response.status).to.be.equal(200);
    });

    it('Retorna a função do usuário', () => {
      expect(response.body).to.be.equal('admin');
    });
  });
});
