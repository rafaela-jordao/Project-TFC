import { Router } from 'express';
import LoginController from '../controller/LoginController';
import LoginService from '../services/LoginService';

const loginService = new LoginService();
const loginController = new LoginController(loginService);

const router = Router();

router.post('/login', (req, res) => loginController.login(req, res));

export default router;
