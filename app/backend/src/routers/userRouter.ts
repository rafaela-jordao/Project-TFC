import { Router } from 'express';
import UserController from '../controller/UserController';
import UserService from '../services/UserService';

const userService = new UserService();
const userController = new UserController(userService);

const router = Router();

router.post('/', (req, res) => userController.login(req, res));

export default router;
