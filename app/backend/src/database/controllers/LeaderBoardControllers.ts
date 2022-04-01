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
import { countTeams } from '../services/ClubServices';
import { getAllMatchsInProgress } from '../services/MatchServices';

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

const getAllFinishedMatchs = async () => {
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
  return matchs.data;
};

export const getTeamInfo = (_req: Request, res: Response) => {
  const allTeams = getTeams();
  const allMatchs = getAllFinishedMatchs();


};
