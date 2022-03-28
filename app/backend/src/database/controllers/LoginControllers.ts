import { Request, Response } from 'express';
import * as UserServices from '../services/UserServices';

export const userLogin = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const { status, message } = await UserServices.getUser(email, password);

  return res.status(status).json(message);
};

export const userValidate = async (req: Request, res: Response) => {
  const token = req.headers.authorization;

  if (token !== undefined) {
    const { status, data } = await UserServices.validateToken(token);
    return res.status(status).json(data);
  }
  return '';
};
