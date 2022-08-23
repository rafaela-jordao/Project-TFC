import { Router } from 'express';
import TeamController from '../controller/TeamController';
import TeamService from '../services/TeamService';

const teamService = new TeamService();
const teamController = new TeamController(teamService);

const router = Router();

router.get('/teams/:id', (req, res) => teamController.getById(req, res));
router.get('/teams', (req, res) => teamController.listAll(req, res));

export default router;
