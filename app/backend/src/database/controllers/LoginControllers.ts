import { Request, Response } from 'express';
import * as UserServices from '../services/UserServices';

export const userLogin = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const { status, message } = await UserServices.getUser(email, password);
    return res.status(status).json(message);
  } catch {
    res.status(500).json({ message: 'Something is wrong' });
  }
};

export const userValidate = async (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization;
    if (token !== undefined) {
      const { status, data } = await UserServices.validateToken(token);
      return res.status(status).json(data);
    }

    return res.status(401).json({ message: 'Token not found' });
  } catch {
    res.status(500).json({ message: 'Something is wrong' });
  }
};
