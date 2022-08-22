import { Request, Response } from 'express';
// import jwtService from '../services/jwtService';
import ValidateLogin from '../middlewares/ValidateLogin';
import LoginService from '../services/LoginService';

export default class LoginController {
  constructor(private loginService: LoginService) {}

  async login(req: Request, res: Response) {
    const { email, password } = await ValidateLogin.validateBody(req.body);

    const token = await this.loginService.login(email, password);
    return res.status(200).json({ token });
  }

  static async validateLogin(req: Request, res: Response) {
    const { authorization } = req.headers;
    console.log(authorization);

    if (!authorization) {
      const error = new Error('Token not found');
      error.name = 'UnauthorizedError';
      throw error;
    }

    const role = await LoginService.validateLogin(authorization);
    return res.status(200).json({ role });
  }
}
