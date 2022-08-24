import { Request, Response } from 'express';
import MatcheService from '../services/MatcheService';

export default class MatcheController {
  constructor(private matcheService: MatcheService) {}

  async listAll(req: Request, res: Response): Promise<Response> {
    const list = await this.matcheService.listAll();
    return res.status(200).json(list);
  }

  async create(req: Request, res: Response): Promise<Response> {
    // verifica se os times são iguais, caso seja não será possível inserir uma partida.
    if (req.body.homeTeam === req.body.awayTeam) {
      const error = new Error('It is not possible to create a match with two equal teams');
      error.name = 'UnauthorizedError';
      throw error;
    }

    const create = await this.matcheService.create(req.body);
    return res.status(201).json(create);
  }

  async update(req: Request, res: Response): Promise<Response> {
    const id = parseInt(req.params.id, 10);
    await this.matcheService.updateStatus(id);
    return res.status(200).json({ message: 'Finished' });
  }

  async updateMatches(req: Request, res: Response): Promise<Response> {
    const { homeTeamGoals, awayTeamGoals } = req.body;
    const id = parseInt(req.params.id, 10);

    await this.matcheService.updateMatches(id, homeTeamGoals, awayTeamGoals);
    return res.status(200).json({ message: 'successfully updated' });
  }
}
