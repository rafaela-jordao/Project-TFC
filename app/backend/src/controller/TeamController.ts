import { Request, Response } from 'express';
import TeamsService from '../services/TeamService';

export default class TeamController {
  constructor(private teamService: TeamsService) {}

  async listAll(req: Request, res: Response): Promise<Response> {
    const listTeams = await this.teamService.listAll();
    return res.status(200).json(listTeams);
  }
}
