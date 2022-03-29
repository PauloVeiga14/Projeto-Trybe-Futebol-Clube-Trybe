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
  {
    id: 4,
    clubName: "Corinthians"
  },
  {
    id: 5,
    clubName: "Cruzeiro"
  },
  {
    id: 6,
    clubName: "Ferroviária"
  },
  {
    id: 7,
    clubName: "Flamengo"
  },
  {
    id: 8,
    clubName: "Grêmio"
  },
  {
    id: 9,
    clubName: "Internacional"
  },
  {
    id: 10,
    clubName: "Minas Brasília"
  },
  {
    id: 11,
    clubName: "Napoli-SC"
  },
  {
    id: 12,
    clubName: "Palmeiras"
  },
  {
    id: 13,
    clubName: "Real Brasília"
  },
  {
    id: 14,
    clubName: "Santos"
  },
  {
    id: 15,
    clubName: "São José-SP"
  },
  {
    id: 16,
    clubName: "São Paulo"
  },
];

export const mockReturnClubById = {
  id: 7,
  clubName: "Flamengo"
}
