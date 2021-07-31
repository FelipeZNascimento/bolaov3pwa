export const ROUTES = {
    HOME: {
        display: 'Home',
        url: '/home'
    },
    BETS: {
        display: 'Apostar',
        url: '/apostar',
        urlWithParams: (week: number) => `${ROUTES.BETS.url}/${week}`,
        withCredentials: true
    },
    RESULTS: {
        display: 'Resultados',
        url: '/resultados',
        urlWithParams: (week: number) => `${ROUTES.RESULTS.url}/${week}`,
    },
    EXTRAS: {
        display: 'Extras',
        url: '/extras',
        withCredentials: true
    },
    RECORDS: {
        display: 'Records',
        url: '/records',
        urlWithParams: (recordsParam: string, weekParam?: string) => {
            if (weekParam !== undefined) {
                return `${ROUTES.RECORDS.url}/${recordsParam}/${weekParam}`
            }

            return `${ROUTES.RECORDS.url}/${recordsParam}/`;
        },
    },
    RANKING: {
        display: 'Ranking',
        url: '/ranking',
        urlWithParams: (week: number) => {
            return `${ROUTES.RANKING.url}/${week}/`;
        },
    },
    REGRAS: {
        display: 'Regras',
        url: '/regras'
    },
};

export default ROUTES;
