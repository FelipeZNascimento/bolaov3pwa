// export const apiBaseUrl = 'http://localhost:8081/bolaonfl/';
export const apiBaseUrl = 'https://omega-cors-nfl.herokuapp.com/bolaonfl/';


export const config = () => `${apiBaseUrl}defaultConfig/`;
export const login = () => `${apiBaseUrl}login/`;
export const logout = () => `${apiBaseUrl}logout/`;
export const matches = (season: number, week: number) => `${apiBaseUrl}matches/${season}/${week}`;
export const ranking = (season: number, week: number) => `${apiBaseUrl}ranking/${season}/${week}`;