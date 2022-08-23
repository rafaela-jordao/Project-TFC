import ITeams from '../interfaces/ITeams.interface';
import Teams from '../database/models/Teams';

export default class TeamsService implements ITeams {
  constructor(private teamModel = Teams) {} // ajuda do Ivan (monitoria)

  async listAll(): Promise<Teams[]> {
    const teams = await this.teamModel.findAll();
    return teams;
  }

  async getById(id: number): Promise<Teams> {
    const teamId = await this.teamModel.findByPk(id);
    return teamId as Teams;
  }
}
