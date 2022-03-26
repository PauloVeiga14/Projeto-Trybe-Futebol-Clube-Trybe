import { Request, Response, NextFunction } from 'express';

const validateLoginInputs = (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(401).json({ message: 'All fields must be filled' });
  }

  if (password.length <= 6) {
    return res.status(401).json({ message: 'Incorrect email or password' });
  }

  next();
};

export default validateLoginInputs;
