export const mockReturnLogin = {
  user: {
    id: 1,
    username: "Admin",
    role: "admin",
    email: "admin@admin.com",
  },
  token:
    `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.
    eyJlbWFpbCI6ImFkbWluQGFkbWluLmNvbSIsImlhdCI6MTY0ODU1ODI0MH0.
    79-XdpNlX0v3CNzgreQW7chSCJgopkXWLPhetCim0fA`,
};

export const mockResponseLogin = {
  id: 1,
  username: "Admin",
  role: "admin",
  password: "secret_admin",
  email: "admin@admin.com"
}

export const mockReturnClubs =
[ 
  {
    id: 1,
    clubName: "Avaí/Kindermann"
  },
  {
    id: 2,
    clubName: "Bahia"
  },
  {
    id: 3,
    clubName: "Botafogo"
  },
];

export const mockReturnClubById = {
  id: 7,
  clubName: "Flamengo"
}

export const mockReturnMatchs = [
  {
    "id": 1,
    "homeTeam": 16,
    "homeTeamGoals": 1,
    "awayTeam": 8,
    "awayTeamGoals": 1,
    "inProgress": false,
    "homeClub": {
      "clubName": "São Paulo"
    },
    "awayClub": {
      "clubName": "Grêmio"
    }
  },
  {
    "id": 2,
    "homeTeam": 16,
    "homeTeamGoals": 2,
    "awayTeam": 9,
    "awayTeamGoals": 0,
    "inProgress": true,
    "homeClub": {
      "clubName": "São Paulo"
    },
    "awayClub": {
      "clubName": "Internacional"
    }
  }
];

export const mockMatchsInProgressTrue = [
  {
    "id": 1,
    "homeTeam": 16,
    "homeTeamGoals": 2,
    "awayTeam": 9,
    "awayTeamGoals": 0,
    "inProgress": true,
    "homeClub": {
      "clubName": "São Paulo"
    },
    "awayClub": {
      "clubName": "Internacional"
    }
  },
  {
    "id": 2,
    "homeTeam": 6,
    "homeTeamGoals": 1,
    "awayTeam": 1,
    "awayTeamGoals": 0,
    "inProgress": true,
    "homeClub": {
      "clubName": "Ferroviária"
    },
    "awayClub": {
      "clubName": "Avaí/Kindermann"
    }
  }
];

export const mockMatchsInProgressFalse = [
  {
    "id": 1,
    "homeTeam": 16,
    "homeTeamGoals": 1,
    "awayTeam": 8,
    "awayTeamGoals": 1,
    "inProgress": false,
    "homeClub": {
      "clubName": "São Paulo"
    },
    "awayClub": {
      "clubName": "Grêmio"
    }
  },
  {
    "id": 2,
    "homeTeam": 9,
    "homeTeamGoals": 1,
    "awayTeam": 14,
    "awayTeamGoals": 1,
    "inProgress": false,
    "homeClub": {
      "clubName": "Internacional"
    },
    "awayClub": {
      "clubName": "Santos"
    }
  }
];