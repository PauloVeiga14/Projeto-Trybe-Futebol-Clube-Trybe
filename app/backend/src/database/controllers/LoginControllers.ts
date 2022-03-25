import { Request, Response } from 'express';
import * as UserServices from '../services/UserServices';

const userLogin = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const { status, message } = await UserServices.default(email, password);

  return res.status(status).json(message);
};

export default userLogin;
