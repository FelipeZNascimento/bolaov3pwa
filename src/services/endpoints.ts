// export const apiBaseUrl = 'http://localhost:8081/bolaonfl/';
export const apiBaseUrl = 'https://omega-cors-nfl.herokuapp.com/bolaonfl/';


export const matches = (season: number, week: number) => `${apiBaseUrl}matches/${season}/${week}`;
export const config = () => `${apiBaseUrl}defaultConfig/`;