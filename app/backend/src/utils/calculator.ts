import ILeaderbords from '../interfaces/ILeaderbords.interface';
import Matches from '../database/models/Matches';

const checkScoreHome = (homeMatches: Matches[]) => {
  let victories = 0;
  let draws = 0;
  let losses = 0;

  homeMatches.forEach((element) => {
    if (element.homeTeamGoals > element.awayTeamGoals) {
      victories += 1;
    } else if (element.homeTeamGoals === element.awayTeamGoals) {
      draws += 1;
    } else if (element.homeTeamGoals < element.awayTeamGoals) {
      losses += 1;
    }
  });
  return { victories, draws, losses };
};

const goalsNumber = (matches: Matches[]) => {
  let goalsFavor = 0;
  let goalsOwn = 0;

  matches.forEach((el) => {
    goalsFavor += el.homeTeamGoals;
    goalsOwn += el.awayTeamGoals;
  });
  return { goalsFavor, goalsOwn, goalsBalance: goalsFavor - goalsOwn };
};

const calcPoints = (matches: Matches[]) => {
  let totalPoints = 0;

  matches.forEach((el) => {
    if (el.homeTeamGoals > el.awayTeamGoals) {
      totalPoints += 3;
    } else if (el.homeTeamGoals === el.awayTeamGoals) {
      totalPoints += 1;
    } else if (el.homeTeamGoals < el.awayTeamGoals) {
      totalPoints += 0;
    }
  });
  return { totalPoints };
};

// Aproveitamento do time (%), que é a porcentagem de jogos ganhos.
const efficiency = (points: number, games: number) =>
  Number(((points / (games * 3)) * 100).toFixed(2));

const sortTable = (table: ILeaderbords[]) => {
  const order = table.sort((a, b) => b.totalPoints - a.totalPoints
  || b.totalVictories - a.totalVictories
  || b.goalsBalance - a.goalsBalance
  || b.goalsFavor - a.goalsFavor
  || a.goalsOwn - b.goalsFavor);

  return order;
};

export {
  checkScoreHome,
  goalsNumber,
  calcPoints,
  efficiency,
  sortTable,
};
