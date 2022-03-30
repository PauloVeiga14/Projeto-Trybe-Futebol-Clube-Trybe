import { Request, Response } from 'express';
import { getAllMatchs, getAllMatchsInProgress } from '../services/MatchServices';

export const getAll = async (req: Request, res: Response) => {
  const { inProgress } = req.query;

  if (inProgress === undefined) {
    const { status, data } = await getAllMatchs();
    return res.status(status).json(data);
  }

  if (inProgress === 'true') {
    const { status, data } = await getAllMatchsInProgress(1);
    return res.status(status).json(data);
  }

  if (inProgress === 'false') {
    const { status, data } = await getAllMatchsInProgress(0);
    return res.status(status).json(data);
  }

  return {};
};

export const getInProgressTrue = () => {
  console.log();
};

export const getInProgressFalse = () => {
  console.log();
};
