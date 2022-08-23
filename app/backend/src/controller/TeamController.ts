import { Request, Response } from 'express';
import TeamsService from '../services/TeamService';

export default class TeamController {
  constructor(private teamService: TeamsService) {}

  async listAll(req: Request, res: Response): Promise<Response> {
    const listTeams = await this.teamService.listAll();
    return res.status(200).json(listTeams);
  }

  async getById(req: Request, res: Response): Promise<Response> {
    const id = parseInt(req.params.id, 10);
    const teamId = await this.teamService.getById(id);
    return res.status(200).json(teamId);
  }
}
