import { compare } from 'bcryptjs';
import User from '../database/models/User';
import jwtService from './jwtService';

export default class LoginService {
  public login = async (email: string, password: string) => {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      const e = new Error('Incorrect email or password'); // retorna mensagem de erro caso o email inserido não esteja no banco de dados
      e.name = 'UnauthorizedError';
      throw e;
    }

    const validPassword = await compare(password, user.password);
    if (!validPassword) {
      const e = new Error('Incorrect email or password');
      e.name = 'UnauthorizedError';
      throw e;
    }

    const token = jwtService.createToken({ email, password });
    return token;
  };

  static async validateLogin(token: string) {
    const { email } = jwtService.validateToken(token); // ajuda da Maiara (monitoria) para acessar o 'role'. Com o retorno do Jwtpayload (arquivo jwtService) foi possível desestruturar o email.

    const user = await User.findOne({ where: { email } });

    if (!user) {
      const e = new Error('unidentified user');
      e.name = 'UnauthorizedError';
      throw e;
    }
    return user.role;
  }
}
