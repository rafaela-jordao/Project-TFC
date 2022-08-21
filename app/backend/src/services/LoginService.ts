import { compare } from 'bcryptjs';
import User from '../database/models/User';
import jwtService from './jwtService';

export default class LoginService {
  public login = async (email: string, password: string) => {
    const user = await User.findOne({ where: { email } });

    if (!user || !password) {
      const e = new Error('All fields must be filled');
      e.name = 'ValidationError';
      throw e;
    }

    const validPassword = await compare(password, user.password);
    if (!validPassword) {
      const e = new Error('All fields must be filled');
      e.name = 'ValidationError';
      throw e;
    }

    const token = jwtService.createToken({ email, password });
    return token;
  };
}
