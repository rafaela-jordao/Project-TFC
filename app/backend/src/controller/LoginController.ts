import { Request, Response } from 'express';
import ValidateLogin from '../middlewares/ValidateLogin';
import LoginService from '../services/LoginService';

export default class LoginController {
  constructor(private loginService: LoginService) {}

  async login(req: Request, res: Response) {
    const { email, password } = await ValidateLogin.validateBody(req.body);

    const token = await this.loginService.login(email, password);
    return res.status(200).json({ token });
  }
}
