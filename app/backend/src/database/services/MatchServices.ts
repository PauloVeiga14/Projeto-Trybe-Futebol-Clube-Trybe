import Clubs from '../models/Clubs';
import Matchs from '../models/Matchs';

type MatchObject = {
  homeTeam: number,
  awayTeam: number,
  homeTeamGoals: number,
  awayTeamGoals: number,
  inProgress: boolean,
};

// Incluir possibilidades de erro.

export const getAllMatchs = async () => {
  const matchs = await Matchs.findAll({
    include: [
      { model: Clubs, as: 'homeClub', attributes: { exclude: ['id'] } },
      { model: Clubs, as: 'awayClub', attributes: { exclude: ['id'] } },
    ],
  });

  if (matchs.length === 0) {
    return { status: 404, data: { message: 'Sorry, there is no matchs' } };
  }

  return { status: 200, data: matchs };
};

export const getAllMatchsInProgress = async (boolean: boolean) => {
  const matchs = await Matchs.findAll({ where: { inProgress: boolean },
    include: [
      { model: Clubs, as: 'homeClub', attributes: { exclude: ['id'] } },
      { model: Clubs, as: 'awayClub', attributes: { exclude: ['id'] } },
    ],
  });

  if (matchs.length === 0) {
    return { status: 404, data: { message: 'Sorry, there is no matchs' } };
  }

  return { status: 200, data: matchs };
};

export const createMatch = async (matchObject: MatchObject) => {
  const { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals, inProgress } = matchObject;
  const data = await Matchs.create(
    { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals, inProgress },
  );
  return { status: 201, data };
};

export const finishMatch = async (id:string) => {
  const result = await Matchs.update({ inProgress: false }, { where: { id } });

  if (!result) {
    return { status: 404, message: { message: 'Match not found' } };
  }

  return { status: 200, message: { message: `Match ${id} successfully updated!` } };
};
