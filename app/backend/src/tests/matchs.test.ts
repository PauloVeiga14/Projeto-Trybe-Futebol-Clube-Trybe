import * as sinon from 'sinon'; // Faz o stub do método
import * as chai from 'chai';
import chaiHttp = require('chai-http'); // Simula requisições

import { app } from '../app';
import Users from '../database/models/Users';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

// Contratos:
// 1) A rota get /matchs retorna um array de objetos com o id, homeTeam, homeTeamGoals,
//  awayTeam, inProgress, um objeto homeCLub com chave clubName e um objeto awayClub
//  com a chave clubName.
// 2) A rota get /matchs?inProgress=true retorna as partidas em andamento.
// 3) A rota get /matchs?inProgress=false retorna as partidas finalizadas.

describe('Testa a rota GET /matchs', () => {

  let response: Response;

  describe('Testa o retorno correto da requisição', () => {

    it('Retorna o status 200', () => {
      expect(response.status).to.be.equal(200);
    });

    it('Retorna o array com objetos', () => {
    
    });
  });

  describe('Testa o a falha na requisição', () => {
      
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

      it('Retorna o status 200', () => {
        expect(response.status).to.be.equal(200);
      });

      it('Retorna o array de objetos', () => {

      });
    });

    describe('Testa a falha no retorno', () => {

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

      it('Retorna o status 200', () => {
        expect(response.status).to.be.equal(200);
      });

      it('Retorna o array de objetos', () => {

      });
    });

    describe('Testa a falha no retorno', () => {

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