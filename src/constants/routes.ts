export const ROUTES = {
    HOME: {
        display: 'Home',
        url: '/home'
    },
    BETS: {
        display: 'Apostar',
        url: '/apostar',
        urlWithParams: (season: number, week: number) => `${ROUTES.BETS.url}/${season}/${week}`
    },
    RESULTS: {
        display: 'Resultados',
        url: '/resultados',
        urlWithParams: (season: number, week: number) => `${ROUTES.RESULTS.url}/${season}/${week}`
    },
    EXTRAS: {
        display: 'Extras',
        url: '/extras'
    },
    RECORDS: {
        display: 'Records',
        url: '/records'
    },
    REGRAS: {
        display: 'Regras',
        url: '/regras'
    },
};

export default ROUTES;
