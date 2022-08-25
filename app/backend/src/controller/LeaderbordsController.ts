import { Request, Response } from 'express';
import LeaderbordsService from '../services/LeaderbordsService';

export default class LeaderbordsController {
  constructor(private bordsService: LeaderbordsService) {}

  async table(req: Request, res: Response) {
    const teams = await this.bordsService.tableHome();
    res.status(200).json(teams);
  }
}
