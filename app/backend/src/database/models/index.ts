// Aqui está sendo feita a conexão do Sequelize com o banco de dados.

import { Sequelize } from 'sequelize';

const databaseConfig = require('../config/database');

// Testando a inclusão de um autenticador. Caso dê erro, retornar para o export default new Sequelize.

const sequelize = new Sequelize(databaseConfig);

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

export default sequelize;