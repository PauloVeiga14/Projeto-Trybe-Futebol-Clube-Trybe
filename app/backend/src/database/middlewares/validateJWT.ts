import { Request, Response, NextFunction } from 'express';
import * as fs from 'fs';
import * as jwt from 'jsonwebtoken';

const validateJWT = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'Token not found' });
  }

  try {
    const secret = fs.readFileSync('jwt.evaluation.key');

    const decoded = jwt.verify(token, secret);

    if (!decoded) {
      return res.status(401).json({ message: 'Expired or invalid token.' });
    }

    next();
  } catch (err) {
    return res.status(401).json({ message: 'Expired or invalid token' });
  }
};

export default validateJWT;
