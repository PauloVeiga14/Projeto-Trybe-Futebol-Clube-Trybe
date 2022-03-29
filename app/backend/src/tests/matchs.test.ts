import * as sinon from 'sinon'; // Faz o stub do método
import * as chai from 'chai';
import chaiHttp = require('chai-http'); // Simula requisições

import { app } from '../app';
import Matchs from '../database/models/Matchs';

import { Response } from 'superagent';
import { mockReturnMatchs, mockMatchsInProgressTrue, mockMatchsInProgressFalse } from './mocks';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testa a rota GET /matchs', () => {

  let response: Response;

  describe('Testa o retorno correto da requisição', () => {

    before(async () => {
      sinon.stub(Matchs, 'findAll').resolves(mockReturnMatchs as unknown as Matchs[]);
      response = await chai.request(app).get('/matchs');
    });

    after(() => {
      (Matchs.findAll as sinon.SinonStub).restore();
    });

    it('Retorna o status 200', () => {
      expect(response.status).to.be.equal(200);
    });

    it('Retorna o array com objetos', () => {
      expect(response.body).to.deep.equal(mockReturnMatchs);
    });
  });

  describe('Testa o a falha na requisição', () => {
      
    before(async () => {
      sinon.stub(Matchs, 'findAll').resolves([]);
      response = await chai.request(app).get('/matchs');
    });

    after(() => {
      (Matchs.findAll as sinon.SinonStub).restore();
    });

    it('Retorna o status 400', () => {
      expect(response.status).to.be.equal(400);
    });

    it('Retorna a mensagem de erro', () => {
      const message = 'Sorry, there is no matchs'
      expect(response.body.message).to.be.equal(message);
    });
  });
});

describe('Testa a rota GET /matchs?inProgress', () => {
  
  let response: Response;
  
  describe('Quando inProgress = true', () => {
    describe('Testa o retorno correto do array de objetos', () => {

      before(async () => {
        sinon.stub(Matchs, 'findAll').resolves(mockMatchsInProgressTrue as unknown as Matchs[]);
        response = await chai.request(app).get('/matchs?inProgress=true');
      });
  
      after(() => {
        (Matchs.findAll as sinon.SinonStub).restore();
      });

      it('Retorna o status 200', () => {
        expect(response.status).to.be.equal(200);
      });

      it('Retorna o array de objetos', () => {
        expect(response.body).to.deep.equal(mockMatchsInProgressTrue);
      });
    });

    describe('Testa a falha no retorno', () => {

      before(async () => {
        sinon.stub(Matchs, 'findAll').resolves([]);
        response = await chai.request(app).get('/matchs?inProgress=true');
      });
  
      after(() => {
        (Matchs.findAll as sinon.SinonStub).restore();
      });

      it('Retorna o status 400', () => {
        expect(response.status).to.be.equal(400);
      });

      it('Retorna a mensagem de erro', () => {
        const message = 'Sorry, there is no matchs'
        expect(response.body.message).to.be.equal(message);
      }); 
    });
  });

  describe('Quando inProgress = false', () => {
    describe('Testa o retorno correto do array de objetos', () => {

      before(async () => {
        sinon.stub(Matchs, 'findAll').resolves(mockMatchsInProgressFalse as unknown as Matchs[]);
        response = await chai.request(app).get('/matchs?inProgress=false');
      });
  
      after(() => {
        (Matchs.findAll as sinon.SinonStub).restore();
      });

      it('Retorna o status 200', () => {
        expect(response.status).to.be.equal(200);
      });

      it('Retorna o array de objetos', () => {
        expect(response.body).to.deep.equal(mockMatchsInProgressFalse);
      });
    });

    describe('Testa a falha no retorno', () => {

      before(async () => {
        sinon.stub(Matchs, 'findAll').resolves([]);
        response = await chai.request(app).get('/matchs?inProgress=false');
      });
  
      after(() => {
        (Matchs.findAll as sinon.SinonStub).restore();
      });

      it('Retorna o status 400', () => {
        expect(response.status).to.be.equal(400);
      });

      it('Retorna a mensagem de erro', () => {
        const message = 'Sorry, there is no matchs'
        expect(response.body.message).to.be.equal(message);
      }); 
    });
  });
});