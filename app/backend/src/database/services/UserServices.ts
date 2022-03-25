import * as bcryptjs from 'bcryptjs';
import * as fs from 'fs';
import * as jwt from 'jsonwebtoken';
import Users from '../models/Users';
import IgetUserValidate from '../interfaces/getUserValidate';

const getUser = async (email: string, password: string): Promise<IgetUserValidate> => {
  const user = await Users.findOne({ where: { email } });

  if (!user) { return { status: 401, message: 'Incorrect email or password' }; }

  const cryptoPassword = await bcryptjs.compare(password, user.password); // https://www.npmjs.com/package/bcryptjs

  if (cryptoPassword === false) { return { status: 401, message: 'Incorrect email or password' }; }

  const userFormat = {
    id: user.id,
    username: user.username,
    role: user.role,
    email: user.email,
  };

  const secret = fs.readFileSync('jwt.evaluation.key');
  const token = jwt.sign({ data: email }, secret);

  return {
    status: 200,
    message: { user: userFormat, token },
  };
};

export default getUser;
