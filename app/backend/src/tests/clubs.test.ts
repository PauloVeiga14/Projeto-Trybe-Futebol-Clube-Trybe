import * as sinon from 'sinon'; // Faz o stub do método
import * as chai from 'chai';
import * as bcryptjs from 'bcryptjs';
import chaiHttp = require('chai-http'); // Simula requisições

import { app } from '../app';
import Users from '../database/models/Users';

import { Response } from 'superagent';
// import { mockReturnLogin, mockResponseLogin } from './mocks'

chai.use(chaiHttp);

const { expect } = chai;

// Contratos:
// 1) Retorna um array de objetos com o id e o nome do clube
// 2) A rota clubs/:id retorna o id e o nome de um clube específico

describe('Testando a rota GET /clubs', () => {
  
})