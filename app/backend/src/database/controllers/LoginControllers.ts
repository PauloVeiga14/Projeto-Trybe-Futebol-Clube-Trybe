import { Request, Response } from 'express';
import * as bcryptjs from 'bcryptjs';
import * as fs from 'fs';
import * as jwt from 'jsonwebtoken';
import Users from '../models/Users';

const userLogin = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await Users.findOne({ where: { email } });

  if (!user) {
    return res.status(401).json({ message: 'Incorrect email or password' });
  }

  const cryptoPassword = await bcryptjs.compare(password, user.password); // https://www.npmjs.com/package/bcryptjs

  if (cryptoPassword === false) {
    return res.status(401).json({ message: 'Incorrect email or password' });
  }

  const userFormat = {
    id: user.id,
    username: user.username,
    role: user.role,
    email: user.email,
  };

  const secret = fs.readFileSync('jwt.evaluation.key');
  const token = jwt.sign({ data: email }, secret);

  const userReturn = {
    user: userFormat, token,
  };

  return res.status(200).json(userReturn);
};

export default userLogin;
