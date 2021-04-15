export const apiBaseUrl = 'http://localhost:8081/bolaonfl/';
// export const apiBaseUrl = 'https://omega-cors.herokuapp.com/shopping/';


export const matches = (season: number, week: number) => `${apiBaseUrl}matches/${season}/${week}`;