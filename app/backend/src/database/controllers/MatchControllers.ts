import { Request, Response } from 'express';
import { getAllMatchs, getAllMatchsInProgress, createMatch } from '../services/MatchServices';

export const getAll = async (req: Request, res: Response) => {
  try {
    const { inProgress } = req.query;

    if (inProgress === undefined) {
      const { status, data } = await getAllMatchs();
      return res.status(status).json(data);
    }

    if (inProgress === 'true') {
      const { status, data } = await getAllMatchsInProgress(true);
      return res.status(status).json(data);
    }

    if (inProgress === 'false') {
      const { status, data } = await getAllMatchsInProgress(false);
      return res.status(status).json(data);
    }
  } catch (e) {
    res.status(500).json({ message: 'Something is wrong' });
  }
};

export const create = async (req: Request, res: Response) => {
  try {
    const matchObject = req.body;
    const { status, data } = await createMatch(matchObject);
    res.status(status).json(data);
  } catch (e) {
    res.status(500).json({ message: 'Something is wrong' });
  }
};
