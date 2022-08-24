import { Router } from 'express';
import MatcheController from '../controller/MatcheController';
import MatcheService from '../services/MatcheService';
import ValidateToken from '../middlewares/ValidateToken';

const matcheService = new MatcheService();
const matcheController = new MatcheController(matcheService);

const router = Router();

router.get('/matches', (req, res) => matcheController.listAll(req, res));
router.post('/matches', ValidateToken.token, (req, res) => matcheController.create(req, res));

export default router;
