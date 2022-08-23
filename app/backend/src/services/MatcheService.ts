import Matches from '../database/models/Matches';
import IMaches from '../interfaces/IMatches.interface';
import Teams from '../database/models/Teams';

export default class MatcheService implements IMaches {
  constructor(private matcheModel = Matches) {}

  async listAll(): Promise<Matches[]> {
    const list = await this.matcheModel.findAll({
      include: [
        { model: Teams, as: 'teamHome', attributes: ['teamName'] },
        { model: Teams, as: 'teamAway', attributes: ['teamName'] },
      ],
    });
    return list;
  }
}
