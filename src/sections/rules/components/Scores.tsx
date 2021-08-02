import { Match } from 'components_fa/index';
import { guidGenerator } from 'services/helpers';

import styles from 'sections/rules/styles.module.scss';
import MATCH_STATUS from 'constants/matches';

const Scores = () => {
    const awayTeam = {
        id: 6,
        name: 'Chicago Losers',
        alias: 'Losers',
        code: 'CHI',
        possession: false,
        score: 3,
        background: '#00123f',
        foreground: '#f26522',
    };

    const homeTeam = {
        id: 12,
        name: 'Green Bay Packers',
        alias: 'Packers',
        code: 'GB',
        possession: true,
        score: 13,
        background: '#1e3630',
        foreground: '#feb60e',
    };

    const matchOne = {
        id: 0,
        timestamp: 1441945800,
        status: MATCH_STATUS.FINAL,
        away: awayTeam,
        home: homeTeam,
        bets: [],
        loggedUserBets: null
    };

    const matchTwo = {
        id: 0,
        timestamp: 1441945800,
        status: MATCH_STATUS.FINAL,
        away: { ...awayTeam, score: 13 },
        home: { ...homeTeam, score: 20 },
        bets: [],
        loggedUserBets: null
    };

    return (
        <div className={styles.internalRules}>
            <h3 className={styles.highlight}>Pontuação</h3>
            <div className={styles.text}>
                <span className={`${styles.highlight} color-mint`}>Acerto completo</span>: acertar o vencedor e a margem de vitória.<br />
                <span className={`${styles.highlight} color-blue`}>Acerto parcial</span>: acertar o vencedor mas errar a margem de vitória.<br /><br />
                Caso uma partida termine em empate, um acerto parcial é concedido a todos que apostaram em vitória difícil.<br />
                Errar o vencedor de uma partida é garantia de <span className={`${styles.highlight} color-red`}>zero pontos</span>.<br />
            </div>
            <div className={styles.internalRulesTable}>
                <h2 className={styles.highlight}>
                    Pontuações - Total | Parcial
                </h2>
                <div className={styles.internalRulesTableLine}>
                    <div className={styles.left}>
                        Temporada regular
                    </div>
                    <div className={styles.right}>
                        <span className='color-mint'>10</span> | <span className='color-blue'>05</span>
                    </div>
                </div>
                <div className={styles.internalRulesTableLine}>
                    <div className={styles.left}>
                        Wild Card e Divisional Round
                    </div>
                    <div className={styles.right}>
                        <span className='color-mint'>20</span> | <span className='color-blue'>10</span>
                    </div>
                </div>
                <div className={styles.internalRulesTableLine}>
                    <div className={styles.left}>
                        Conference Championships
                    </div>
                    <div className={styles.right}>
                        <span className='color-mint'>40</span> | <span className='color-blue'>20</span>
                    </div>
                </div>
                <div className={styles.internalRulesTableLine}>
                    <div className={styles.left}>
                        Superbowl
                    </div>
                    <div className={styles.right}>
                        <span className='color-mint'>80</span> | <span className='color-blue'>40</span>
                    </div>
                </div>
            </div>
            <div className={styles.examples}>
                <p>
                    Uma <span className={styles.highlight}>vitória fácil</span> é definida assim quando o vencedor tem <span className={styles.highlight}>mais de 7 pontos</span> de vantagem sobre o perdedor.<br />
                    No exemplo abaixo, os Packers tem 10 pontos de vantagem. Ou seja, uma vitória fácil.
                </p>
                <Match
                    key={guidGenerator()}
                    isExpanded={false}
                    onExpandClick={() => null}
                    {...matchOne}
                />
                <p>
                    Uma <span className={styles.highlight}>vitória difícil</span> acontece quando o time vencedor tem <span className={styles.highlight}>7 pontos ou menos</span> de vantagem sobre o perdedor.<br />
                    No exemplo abaixo, os Packers tem 7 pontos de vantagem. Ou seja, uma vitória difícil.
                </p>
                <Match
                    key={guidGenerator()}
                    isExpanded={false}
                    onExpandClick={() => null}
                    {...matchTwo}
                />
            </div>
        </div>
    )
};

export default Scores;