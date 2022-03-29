import * as sinon from 'sinon';
import * as chai from 'chai';
import chaiHttp = require('chai-http');

import { app } from '../app';
import Clubs from '../database/models/Clubs';

import { Response } from 'superagent';
import { mockReturnClubs, mockReturnClubById } from './mocks';

chai.use(chaiHttp);

const { expect } = chai;

// Contratos:
// 1) Retorna um array de objetos com o id e o nome do clube.
// 2) A rota clubs/:id retorna o id e o nome de um clube específico.
// 3) A rota clubs/:id retorna uma mensagem quando o id enviado não existe.

describe('Testando as rotas GET /clubs e /clubs/:id', () => {
  describe('Testa o retorno correto da rota /clubs', () => {

    let response: Response;

    before(async () => {
      sinon.stub(Clubs, 'findAll').resolves(mockReturnClubs as Clubs[]);
      response = await chai.request(app).get('/clubs');
    });

    after(() => {
      (Clubs.findAll as sinon.SinonStub).restore();
    });

    it('A rota retorna o status 200', () => {
      expect(response.status).to.be.equal(200);
    })

    it('A rota retorna um array com o id e o nome dos clubes', () => {
      expect(response.body).to.deep.equal(mockReturnClubs);
    })
  })

  describe('Testa o retorno correto da rota /clubs/:id', () => {

    let response: Response;
  
    before(async () => {
      sinon.stub(Clubs, 'findOne').resolves(mockReturnClubById as Clubs);
      response = await chai.request(app).get('/clubs/7');
    });
  
    after(() => {
      (Clubs.findOne as sinon.SinonStub).restore();
    });
  
    it('A rota retorna o status 200', () => {
      expect(response.status).to.be.equal(200);
    })
  
    it('A rota retorna um objeto com o id e o nome de um clube específico', () => {
      expect(response.body).to.deep.equal(mockReturnClubById);
    })
  })
    
  describe('Testa o retorno da rota com um id inexistente', () => {
    let response: Response;
  
    before(async () => {
      response = await chai.request(app).get('/clubs/700').send({})
    });

    it('A rota retorna o status 400', () => {
      expect(response.status).to.be.equal(400);
    })

    it('A rota retorna o uma mensagem de erro', () => {
      const message = 'This Id do not exist'
      expect(response.body.message).to.be.equal(message);
    })
  })
})