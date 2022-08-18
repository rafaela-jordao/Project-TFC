import { compare } from 'bcryptjs';
import jwt = require('jsonwebtoken');
import User from '../database/models/User';

import 'dotenv/config';

const JWT_SECRET = 'minhaSuperSenha';

export default class UserService {
  public login = async (email: string, password: string) => {
    const user = await User.findOne({ where: { email } });

    if (!user || !password) {
      const e = new Error('Invalid fields');
      e.name = 'ValidationError';
      throw e;
    }
    const validPassword = await compare(password, user.password);
    if (!validPassword) {
      const e = new Error('Invalid fields');
      e.name = 'ValidationError';
      throw e;
    }
    const token = jwt.sign({ email }, JWT_SECRET); // process.env.JWT_SECRET (verificar pq não consegui usar dessa forma)
    return token;
  };
}
