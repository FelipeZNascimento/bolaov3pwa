export const apiBaseUrl = 'http://localhost:8081/bolaonfl/';
// export const apiBaseUrl = 'https://omega-cors-nfl.herokuapp.com/bolaonfl/';

export const config = () => `${apiBaseUrl}defaultConfig/`;
export const login = () => `${apiBaseUrl}login/`;
export const logout = () => `${apiBaseUrl}logout/`;

export const userBets = (season: number, week: number) => `${apiBaseUrl}bets/${season}/${week}`;
export const extraBets = (season: number) => `${apiBaseUrl}bets/extras/${season}`;
export const matches = (season: number, week: number) => `${apiBaseUrl}matches/${season}/${week}`;
export const ranking = (season: number, week: number) => `${apiBaseUrl}ranking/${season}/${week}`;
export const seasonRanking = (season: number) => `${apiBaseUrl}ranking/season/${season}`;