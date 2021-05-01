export const ROUTES = {
    HOME: {
        display: 'Home',
        url: '/home'
    },
    BETS: {
        display: 'Apostar',
        url: '/apostar',
        urlWithParams: (week: number) => `${ROUTES.BETS.url}/${week}`
    },
    RESULTS: {
        display: 'Resultados',
        url: '/resultados',
        urlWithParams: (week: number) => `${ROUTES.RESULTS.url}/${week}`
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
