// export const apiBaseUrl = 'http://localhost:63768/bolaonfl';
export const apiBaseUrl = 'https://api.omegafox.me/bolaonfl';

export const config = () => `${apiBaseUrl}/initialize/`;

// User
export const register = () => `${apiBaseUrl}/user/register/`;
export const login = () => `${apiBaseUrl}/user/login/`;
export const logout = () => `${apiBaseUrl}/user/logout/`;
export const userUpdate = () => `${apiBaseUrl}/user/update/`;
export const userUpdatePreferences = () =>
  `${apiBaseUrl}/user/updatePreferences/`;

// Bet
export const userBets = (season: number, week: number) =>
  `${apiBaseUrl}/bet/list/${season}/${week}`;
export const updateRegularBet = () => `${apiBaseUrl}/bet/update/`;

// Extra Bet
export const extraBets = (season: number) =>
  `${apiBaseUrl}/extrabet/list/${season}`;
export const updateExtraBets = () => `${apiBaseUrl}/extrabet/update/`;

// Match
export const matches = (season: number, week: number) =>
  `${apiBaseUrl}/match/list/${season}/${week}`;

// Ranking
export const ranking = (season: number, week: number) =>
  `${apiBaseUrl}/ranking/list/${season}/${week}`;
export const seasonRanking = (season: number) =>
  `${apiBaseUrl}/ranking/season/${season}`;

// Records
export const records = () => `${apiBaseUrl}/record/list/`;
