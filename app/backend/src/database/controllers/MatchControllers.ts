import { Request, Response } from 'express';
import Matchs from '../models/Matchs';
import Clubs from '../models/Clubs';

export const getAll = async (req: Request, res: Response) => {
  const { inProgress } = req.query;

  if (inProgress === undefined) {
    const matchs = await Matchs.findAll({
      include: [
        { model: Clubs, as: 'homeClub', attributes: { exclude: ['id'] } },
        { model: Clubs, as: 'awayClub', attributes: { exclude: ['id'] } },
      ],
    });
    return res.status(200).json(matchs);
  }

  // if (inProgress === 0) {
  //   const filter = inProgress;
  //   const matchs = await Matchs.findOne({ where: { inProgress: filter } });
  //   return res.status(200).json(matchs);
  // }

  return res.status(400).json({ message: `inProgress
  está definido e tem o valor de ${inProgress}` });
};

export const getInProgressTrue = () => {
  console.log();
};

export const getInProgressFalse = () => {
  console.log();
};
