import Teams from '../database/models/Teams';
import Matches from '../database/models/Matches';
import { calcPoints, checkScoreHome, efficiency,
  goalsNumber, sortTable } from '../utils/calculator';

export interface ITable {
  id: number,
  teamName: string,
  homeMatches: Matches[],
  awayMatches: Matches[],
}

export default class LeaderbordsService {
  private teamService = Teams;

  async table() {
    const teams = await this.teamService.findAll({ include: [
      { model: Matches, as: 'homeMatches', where: { inProgress: false } },
      { model: Matches, as: 'awayMatches', where: { inProgress: false } },
    ] });
    return teams as unknown as ITable[];
  }

  async tableHome() {
    const teamsAndMatches = await this.table();
    const classification = teamsAndMatches.map((item) => {
      const points = calcPoints(item.homeMatches);
      return {
        name: item.teamName,
        totalPoints: points.totalPoints,
        totalGames: item.homeMatches.length,
        totalVictories: checkScoreHome(item.homeMatches).victories,
        totalDraws: checkScoreHome(item.homeMatches).draws,
        totalLosses: checkScoreHome(item.homeMatches).losses,
        goalsFavor: goalsNumber(item.homeMatches).goalsFavor,
        goalsOwn: goalsNumber(item.homeMatches).goalsOwn,
        goalsBalance: goalsNumber(item.homeMatches).goalsBalance,
        efficiency: efficiency(points.totalPoints, item.homeMatches.length), // totalGames
      };
    });
    return sortTable(classification);
  }
}
