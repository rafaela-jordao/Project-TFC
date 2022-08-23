import { Router } from 'express';
import MatcheController from '../controller/MatcheController';
import MatcheService from '../services/MatcheService';

const matcheService = new MatcheService();
const matcheController = new MatcheController(matcheService);

const router = Router();

router.get('/matches', (req, res) => matcheController.listAll(req, res));

export default router;
