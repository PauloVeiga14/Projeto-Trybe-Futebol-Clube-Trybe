import { Model, DataTypes } from 'sequelize';
import db from '.';
import Matchs from './Matchs';

class Clubs extends Model {
  public id: number;

  public clubName: string;
}

Clubs.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  clubName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  sequelize: db,
  underscored: true,
  timestamps: false,
});

Clubs.hasMany(Matchs, { foreignKey: 'homeTeam', sourceKey: 'clubName' });
Clubs.hasMany(Matchs, { foreignKey: 'awayTeam', sourceKey: 'clubName' });

Matchs.belongsTo(Clubs, { foreignKey: 'homeTeam', targetKey: 'clubName' });
Matchs.belongsTo(Clubs, { foreignKey: 'awayTeam', targetKey: 'clubName' });

export default Clubs;
