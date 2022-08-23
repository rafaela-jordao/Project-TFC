import Matches from '../database/models/Matches';

export default interface IMaches {
  listAll(): Promise<Matches[]>
}
