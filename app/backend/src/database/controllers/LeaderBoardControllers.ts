// Leaderboards
// Para construir as classificação, elas devem seguir as seguintes regras de negócios

// Em que:

// Classificação: Posição na classificação;
// Time: Nome do time;
// P: Total de Pontos;
// J: Total de Jogos;
// V: Total de Vitórias;
// E: Total de Empates;
// D: Total de Derrotas;
// GP: Gols marcados a favor;
// GC: Gols marcados contra;
// SG: Saldo total de gols;
// %: Aproveitamento do time.

// Toda a regra de negócio e cálculos necessários deverão ser realizados no seu back-end. A aplicação front-end apenas renderizará essas informações;

// Para calcular o Total de Pontos você deve levar em consideração que:

// O time vitorioso: marcará +3 pontos;
// O time perdedor: marcará 0 pontos;
// Em caso de empate: ambos os times marcam +1 ponto.
// Para o campo Aproveitamento do time (%) que é a porcentagem de jogos ganhos, use a seguinte fórmula: P/(J*3)*100, onde:

// P: Total de Pontos;
// J: Total de Jogos.
// Obs.: O seu resultado deverá ser limitado a duas casas decimais.

// O resultado deverá ser ordenado sempre de forma decrescente, levando em consideração a quantidade de pontos que o time acumulou. Em caso de empate no Total de Pontos, você deve levar em consideração os seguintes critérios para desempate:

// Ordem para desempate

// 1º Total de Vitórias; 2º Saldo de gols; 3º Gols a favor; 4º Gols contra.

// warning Atenção: warning Por padrão, as respostas de todos os seus endpoints deverão estar em inglês, mesmo a renderização no front-end estando em português.

// Baby Steps:
// 1) Uma linha de código deve retornar a quantidade de clubes cadastrados. FEITO!
// 2) Criar um algoritmo que busque informações de um time em cada partida.
// 3) Salvar essas informações em um objeto e construir um array de objetos com todos os clubes.
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
    efficiency: teamEfficiency,
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

export const getTeamInfo = async (_req: Request, res: Response) => {
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
  return res.status(200).json(leaderboard);
};
