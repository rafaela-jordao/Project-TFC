import ITeams from '../interfaces/ITeams.interface';
import Teams from '../database/models/Teams';

export default class TeamsService implements ITeams {
  constructor(private teamModel = Teams) {} // ajuda do Ivan (monitoria)

  async listAll(): Promise<Teams[]> {
    const teams = await this.teamModel.findAll();
    return teams;
  }
}
