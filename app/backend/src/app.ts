import * as express from 'express';
import * as cors from 'cors';
import * as Login from './database/controllers/LoginControllers';
import * as Clubs from './database/controllers/ClubsControllers';
import * as Matchs from './database/controllers/MatchControllers';
import validateLoginInputs from './database/middlewares/validateLogin';

class App {
  public app: express.Express;

  constructor() {
    this.app = express();
    this.config();
  }

  private config():void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT');
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };

    this.app.use(accessControl);
    this.app.use(express.json());
    this.app.use(cors());
    this.app.route('/login').post(validateLoginInputs, Login.userLogin);
    this.app.route('/login/validate').get(Login.userValidate);
    this.app.route('/clubs').get(Clubs.getAllClubs);
    this.app.route('/clubs/:id').get(Clubs.getClubById);
    this.app.route('/matchs').get(Matchs.getAll);
    this.app.route('/matchs').post(Matchs.create);
  }

  public start(PORT: string | number):void {
    this.app.listen(PORT, () => {
      console.log(`Rodando na porta ${PORT}`);
    });
  }
}

export { App };

// A execução dos testes de cobertura depende dessa exportação
export const { app } = new App();
