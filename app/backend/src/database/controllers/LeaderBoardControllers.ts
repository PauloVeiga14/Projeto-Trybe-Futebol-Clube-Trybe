// 4) Ordenar os objetos pelo número de pontos e critérios de desempate. (PARTE DIFÍCIL).

import { Request, Response } from 'express';
import { countTeams, getAllMatchsInProgress } from '../services/LeaderboardServices';

type Match = {
  id: number,
  homeTeam: number,
  homeTeamGoals: number,
  awayTeam: number,
  awayTeamGoals: number,
  inProgress: boolean,
};

type Stats = {
  scoredGoals: number,
  ownGoals: number,
  victory: number,
  draws: number,
  losses: number,
};

type Teams = {
  id: number,
  clubName: string,
};

// type TeamStats = {
//   name: string,
//   totalPoints: number,
//   totalGames: number,
//   totalVictories: number,
//   totalDraws: number,
//   totalLosses: number,
//   goalsFavor: number,
//   goalsOwn: number,
//   goalsBalance: number,
//   efficiency: number,
// };

const getTeams = async () => {
  const teams = await countTeams();
  // [
  //   {
  //       "id": 1,
  //       "clubName": "Avaí/Kindermann"
  //   },
  // ]
  return teams;
};

export const getAllFinishedMatchs = async () => {
  const matchs = await getAllMatchsInProgress(false);
  // [
  //   {
  //       "id": 1,
  //       "homeTeam": 16,
  //       "homeTeamGoals": 7,
  //       "awayTeam": 8,
  //       "awayTeamGoals": 1,
  //       "inProgress": 0,
  //   },
  // ]
  return matchs;
};

const getTeamStats = (stats: Stats, getTeamMatchs: Match[], clubName: string) => {
  const points = (stats.victory * 3) + stats.draws;
  const balance = stats.scoredGoals - stats.ownGoals;
  const teamEfficiency = ((points / (getTeamMatchs.length * 3)) * 100).toFixed(2);
  const losses = getTeamMatchs.length - stats.victory - stats.draws;
  const teamStats = {
    name: clubName,
    totalPoints: points,
    totalGames: getTeamMatchs.length,
    totalVictories: stats.victory,
    totalDraws: stats.draws,
    totalLosses: losses,
    goalsFavor: stats.scoredGoals,
    goalsOwn: stats.ownGoals,
    goalsBalance: balance,
    efficiency: Number(teamEfficiency),
  };

  return teamStats;
};

const loopfunction = (allTeams: Teams[], allMatchs: Match[], stats: Stats) => {
  const { losses } = stats;
  const arrayOfTeams = [];
  for (let i = 0; i < allTeams.length; i += 1) {
    let { scoredGoals, ownGoals, victory, draws } = stats;
    const getTeamMatchs = allMatchs.filter((match: Match) => match.homeTeam === allTeams[i].id);
    for (let secI = 0; secI < getTeamMatchs.length; secI += 1) {
      scoredGoals += getTeamMatchs[secI].homeTeamGoals;
      ownGoals += getTeamMatchs[secI].awayTeamGoals;
      if (getTeamMatchs[secI].homeTeamGoals > getTeamMatchs[secI].awayTeamGoals) {
        victory += 1;
      } else if (getTeamMatchs[secI].homeTeamGoals === getTeamMatchs[secI].awayTeamGoals) {
        draws += 1;
      }
    }
    const myStats = { scoredGoals, ownGoals, victory, draws, losses };
    arrayOfTeams.push(getTeamStats(myStats, getTeamMatchs, allTeams[i].clubName));
  }
  return arrayOfTeams;
};

export const getTeamInfo = async () => {
  const allTeams = await getTeams();
  const allMatchs = await getAllFinishedMatchs();
  const stats = {
    scoredGoals: 0,
    ownGoals: 0,
    victory: 0,
    draws: 0,
    losses: 0,
  };
  const leaderboard = loopfunction(allTeams, allMatchs, stats);
  return leaderboard;
};

export const sortTeams = async (_req: Request, res: Response) => {
  const arrayForSort = await getTeamInfo();
  arrayForSort.sort((a, b) => {
    let tiebraker = b.totalPoints - a.totalPoints;
    if (tiebraker === 0) {
      tiebraker = b.goalsBalance - a.goalsBalance;
      if (tiebraker === 0) {
        tiebraker = b.goalsFavor - a.goalsFavor;
        if (tiebraker === 0) {
          tiebraker = a.goalsOwn - b.goalsOwn;
        }
      }
    }
    return tiebraker;
  });

  return res.status(200).json(arrayForSort);
};
