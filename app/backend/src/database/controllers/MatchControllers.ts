import { Request, Response } from 'express';
import Matchs from '../models/Matchs';

export const getAll = async (req: Request, res: Response) => {
  const { inProgress } = req.query;
  if (inProgress === undefined) {
    const matchs = await Matchs.findAll();
    return res.status(200).json(matchs);
  }
  return res.status(400).json({ message: `inProgress
   está definido e tem o valor de ${inProgress}` });
};

export const getInProgressTrue = () => {
  console.log();
};

export const getInProgressFalse = () => {
  console.log();
};
