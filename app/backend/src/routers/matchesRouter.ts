import { Router } from 'express';
import MatcheController from '../controller/MatcheController';
import MatcheService from '../services/MatcheService';
import ValidateToken from '../middlewares/ValidateToken';

const matcheService = new MatcheService();
const matcheController = new MatcheController(matcheService);

const router = Router();

router.get('/matches', (req, res) => matcheController.listAll(req, res));
router.post('/matches', ValidateToken.token, (req, res) => matcheController.create(req, res));
router.patch('/matches/:id', (req, res) => matcheController.updateMatches(req, res));
router.patch('/matches/:id/finish', (req, res) => matcheController.update(req, res));

export default router;
