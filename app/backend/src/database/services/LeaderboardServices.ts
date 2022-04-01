import Clubs from '../models/Clubs';
import Matchs from '../models/Matchs';

export const countTeams = async () => {
  const teams = await Clubs.findAll();
  return teams;
};

export const getAllMatchsInProgress = async (boolean: boolean) => {
  const matchs = await Matchs.findAll({ where: { inProgress: boolean } });

  return matchs;
};

export const organizeTeams = () => {
  console.log();
};
