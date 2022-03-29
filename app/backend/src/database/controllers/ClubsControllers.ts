import { Request, Response } from 'express';
import Clubs from '../models/Clubs';

export const getAllClubs = async (_req: Request, res: Response) => {
  const listOfClubs = await Clubs.findAll();
  return res.status(200).json(listOfClubs);
};

export const getClubById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const club = await Clubs.findOne({ where: { id } });

  if (club !== null) {
    return res.status(200).json(club);
  }

  return res.status(400).json({ message: 'This Id do not exist' });
};
