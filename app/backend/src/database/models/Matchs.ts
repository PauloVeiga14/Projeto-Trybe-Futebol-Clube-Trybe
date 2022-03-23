import { Model, DataTypes } from 'sequelize';
import db from '.';
import Clubs from './Clubs';

class Matchs extends Model {
  public id: number;

  public homeTeam: number;

  public homeTeamGoals: number;

  public awayTeam: number;

  public awayTeamGoals: number;

  public inProgress: number;
}

Matchs.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  homeTeam: {
    type: DataTypes.INTEGER,
  },
  homeTeamGoals: {
    type: DataTypes.INTEGER,
  },
  awayTeam: {
    type: DataTypes.INTEGER,
  },
  awayTeamGoals: {
    type: DataTypes.INTEGER,
  },
  inProgress: {
    type: DataTypes.INTEGER,
  },
}, {
  sequelize: db,
  underscored: true,
  timestamps: false,
});

Matchs.belongsTo(Clubs, { foreignKey: 'homeTeam', targetKey: 'clubName' });
Matchs.belongsTo(Clubs, { foreignKey: 'awayTeam', targetKey: 'clubName' });

export default Matchs;
