const BETS_VALUES = {
    AWAY_EASY: 0,
    AWAY_HARD: 1,
    HOME_HARD: 2,
    HOME_EASY: 3,
};

const calculateCorrectBets = (awayScore: number, homeScore: number) => {
    if (awayScore === homeScore) {
        return {
            bullseye: [],
            half: [BETS_VALUES.HOME_HARD, BETS_VALUES.AWAY_HARD]
        };
    }

    if (awayScore > homeScore) {
        if (awayScore - 7 > homeScore) {
            return {
                bullseye: [BETS_VALUES.AWAY_EASY],
                half: [BETS_VALUES.AWAY_HARD]
            };
        } else {
            return {
                bullseye: [BETS_VALUES.AWAY_HARD],
                half: [BETS_VALUES.AWAY_EASY]
            };
        }
    }

    if (awayScore < homeScore) {
        if (awayScore + 7 < homeScore) {
            return {
                bullseye: [BETS_VALUES.HOME_EASY],
                half: [BETS_VALUES.HOME_HARD]
            };
        } else {
            return {
                bullseye: [BETS_VALUES.HOME_HARD],
                half: [BETS_VALUES.HOME_EASY]
            };
        }
    }

    return {
        bullseye: [],
        half: [BETS_VALUES.HOME_HARD, BETS_VALUES.AWAY_HARD]
    };
}

export { calculateCorrectBets, BETS_VALUES };
