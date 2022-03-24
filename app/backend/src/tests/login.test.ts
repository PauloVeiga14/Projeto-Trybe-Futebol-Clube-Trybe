import * as sinon from 'sinon'; // Faz o stub do método
import * as chai from 'chai';
import chaiHttp = require('chai-http'); // Simula requisições
import { app } from '../app';
import { Response } from 'superagent';
import { mockLogin } from './mocks'

chai.use(chaiHttp);

const { expect } = chai;

// Contrato:
// 1) A rota é do tipo POST.
// 2) Se o login estiver correto, o retorno é o status 200.
// 3) Se o login estiver correto, enviar para página de jogos.
// 4) Se o login estiver errado, o retorno é o status 400.
// 5) Se não possuir token: status 401.

describe('Testa o Login', () => {

  
  // it('Essa requisição deve retornar status 200', () => {
  //   expect(response).to.have.status(200);
  // });
});
