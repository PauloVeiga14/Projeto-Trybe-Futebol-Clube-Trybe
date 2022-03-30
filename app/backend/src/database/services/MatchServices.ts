import Clubs from '../models/Clubs';
import Matchs from '../models/Matchs';

export const getAllMatchs = async () => {
  const matchs = await Matchs.findAll({
    include: [
      { model: Clubs, as: 'homeClub', attributes: { exclude: ['id'] } },
      { model: Clubs, as: 'awayClub', attributes: { exclude: ['id'] } },
    ],
  });
  return { status: 200, data: matchs };
};

export const getAllMatchsInProgress = async (num: number) => {
  const matchs = await Matchs.findAll({ where: { inProgress: num },
    include: [
      { model: Clubs, as: 'homeClub', attributes: { exclude: ['id'] } },
      { model: Clubs, as: 'awayClub', attributes: { exclude: ['id'] } },
    ],
  });
  return { status: 200, data: matchs };
};
