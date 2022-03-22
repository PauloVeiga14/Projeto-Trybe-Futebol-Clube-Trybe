// Aqui está sendo feita a conexão do Sequelize com o banco de dados.

import { Sequelize } from 'sequelize';

const databaseConfig = require('../config/database');

export default new Sequelize(databaseConfig);