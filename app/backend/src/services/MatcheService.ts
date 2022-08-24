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

  async create({ homeTeam, awayTeam, homeTeamGoals, awayTeamGoals }: {
    homeTeam: number, awayTeam: number, homeTeamGoals: number, awayTeamGoals: number }) {
    const insertMatches = {
      homeTeam,
      awayTeam,
      homeTeamGoals,
      awayTeamGoals,
      inProgress: true,
    };
    // verifica se existe o time na tabela, se ele não existir não será possivel inserir uma partida.
    const homeTeamId = await Teams.findByPk(homeTeam);
    const awayTeamId = await Teams.findByPk(awayTeam);
    if (!homeTeamId || !awayTeamId) {
      const error = new Error('There is no team with such id!');
      error.name = 'NotFoundError';
      throw error;
    }

    const create = await this.matcheModel.create(insertMatches);
    return create;
  }

  // altera o status inProgress de uma partida para false no banco de dados
  async updateStatus(id: number): Promise<string> {
    await this.matcheModel.update({ inProgress: false }, { where: { id } });
    return 'Fineshed';
  }

  // altera partidas em andamento
  async updateMatches(id: number, homeTeamGoals: number, awayTeamGoals: number): Promise<string> {
    await this.matcheModel.update({ homeTeamGoals, awayTeamGoals }, {
      where: { id },
    });
    return 'successfully updated';
  }
}
