import { Router } from 'express';
import LeaderbordsController from '../controller/LeaderbordsController';
import LeaderbordsService from '../services/LeaderbordsService';

const bordsService = new LeaderbordsService();
const bordsController = new LeaderbordsController(bordsService);

const router = Router();

router.get('/leaderboard/home', (req, res) => bordsController.table(req, res));

export default router;
