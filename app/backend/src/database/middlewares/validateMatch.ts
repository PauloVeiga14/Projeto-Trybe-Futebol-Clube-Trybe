import { Request, Response, NextFunction } from 'express';
import Clubs from '../models/Clubs';

const validateMatch = async (req: Request, res: Response, next: NextFunction) => {
  const { homeTeam, awayTeam } = req.body;

  const homeClub = await Clubs.findOne({ where: { id: homeTeam } });

  if (!homeClub) {
    return res.status(401).json({ message: 'There is no team with such id!' });
  }

  const awayClub = await Clubs.findOne({ where: { id: awayTeam } });

  if (!awayClub) {
    return res.status(401).json({ message: 'There is no team with such id!' });
  }

  if (homeTeam === awayTeam) {
    return res.status(401).json(
      { message: 'It is not possible to create a match with two equal teams' },
    );
  }
  next();
};

export default validateMatch;
