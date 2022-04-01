import Clubs from '../models/Clubs';

export const countTeams = async () => {
  const teams = await Clubs.findAll();
  return teams;
};

export const organizeTeams = () => {
  console.log();
};
