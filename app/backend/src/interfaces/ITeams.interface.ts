import Teams from '../database/models/Teams';

export default interface ITeams {
  listAll(): Promise<Teams[]>
}
