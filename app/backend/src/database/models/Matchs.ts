import { Model, DataTypes } from 'sequelize';
import db from '.';

class Matchs extends Model {
  public id: number;

  public homeTeam: string;

  public homeTeamGoals: number;

  public awayTeam: string;

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
    type: DataTypes.STRING,
  },
  homeTeamGoals: {
    type: DataTypes.INTEGER,
  },
  awayTeam: {
    type: DataTypes.STRING,
  },
  awayTeamGoals: {
    type: DataTypes.INTEGER,
  },
}, {
  sequelize: db,
  underscored: true,
  timestamps: false,
});

export default Matchs;
