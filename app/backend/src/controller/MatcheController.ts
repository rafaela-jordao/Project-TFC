import { Request, Response } from 'express';
import MatcheService from '../services/MatcheService';

export default class MatcheController {
  constructor(private matcheService: MatcheService) {}

  async listAll(req: Request, res: Response): Promise<Response> {
    const list = await this.matcheService.listAll();
    return res.status(200).json(list);
  }

  async create(req: Request, res: Response): Promise<Response> {
    const create = await this.matcheService.create(req.body);
    return res.status(201).json(create);
  }
}
