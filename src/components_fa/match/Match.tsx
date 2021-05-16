import React, { useState } from 'react';
import { isMobile } from "react-device-detect";
import classNames from 'classnames';
import { DateTime } from 'luxon';

import { Team } from 'components_fa/index'
import Bets from './components/Bets'
import { TMatch } from 'store/matches/types';
import { calculateCorrectBets } from 'constants/bets';
import styles from './Match.module.scss';

type TProps = TMatch;

const Match = ({
    away,
    bets,
    loggedUserBets = null,
    home,
    id,
    status,
    timestamp,
}: TProps) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [currentTimestamp, setCurrentTimestamp] = useState(DateTime.now().toMillis());

    const correctBets = calculateCorrectBets(away.score || 0, home.score || 0);

    let isBullseyeBet, isHalfBet = false;
    if (loggedUserBets) {
        isBullseyeBet = correctBets.bullseye.find((correctBet) => correctBet === loggedUserBets.value) !== undefined;
        isHalfBet = correctBets.half.find((correctBet) => correctBet === loggedUserBets.value) !== undefined;
    }

    setInterval(() => {
        setCurrentTimestamp(Date.now());
    }, 30000); //30s

    const matchStatusClass = classNames({
        [styles.notStarted]: currentTimestamp < timestamp, // not started
        [styles.started]: currentTimestamp >= timestamp, // has started
        [styles.ended]: currentTimestamp >= timestamp && status === 'final', // match has ended
    });

    const borderClass = classNames({
        [styles.greenBorder]: loggedUserBets && isBullseyeBet && currentTimestamp >= timestamp, // bullseye
        [styles.blueBorder]: loggedUserBets && isHalfBet && currentTimestamp >= timestamp, // bullseye
        [styles.redBorder]: loggedUserBets && !isBullseyeBet && !isHalfBet && currentTimestamp >= timestamp, // bullseye
    });

    const renderTime = () => {
        const date = isExpanded
            ? DateTime.fromMillis(timestamp).setLocale('pt-Br').toFormat('(ZZZZ) cccc, T - dd/LL/yyyy')
            : DateTime.fromMillis(timestamp).setLocale('pt-Br').toFormat('dd/LL/yyyy');

        // if match hasn't started
        if (currentTimestamp < timestamp) {
            return <div className={`${matchStatusClass}`} style={{ background: `url(/match_layer.png), #9da4a7` }}>{date}</div>
        }

        // if match has ended
        if (currentTimestamp >= timestamp && status === 'final') {
            return <div className={`${matchStatusClass}`} style={{ background: `url(/match_layer.png), #9da4a7` }}>Encerrado</div>;
        }

        // if match has started
        if (currentTimestamp >= timestamp) {
            return (
                <div className={matchStatusClass}>
                    <div className={`${styles.quarter}`}>
                        1Q
                    </div>
                    <div className={styles.timeLeft}>
                        9:18
                    </div>
                </div>
            );
        }
    };

    const renderTeams = () => {
        return (
            <div className={styles.teamsContainer}>
                <Team {...away} isExpanded={isExpanded} />
                <Team {...home} isExpanded={isExpanded} />
            </div>
        )
    };

    const timeClass = classNames(
        [styles.time], {
        [styles.timeMobile]: isMobile,
    });

    const matchContainerClass = classNames(borderClass, {
        [styles.matchContainer]: !isExpanded && !isMobile,
        [styles.matchContainerMobile]: isMobile,
        [styles.matchContainerExpanded]: isExpanded,
    });

    const betsContainerClass = classNames(styles.betsContainer, {
        [styles.betsContainerHidden]: !isExpanded || !bets,
    });

    return (
        <div className={styles.container}>
            <div
                className={matchContainerClass}
                key={id}
                onClick={() => setIsExpanded(!isExpanded)}
            >
                <div className={timeClass}>
                    {renderTime()}
                </div>
                {renderTeams()}
            </div>
            <div className={betsContainerClass}>
                <Bets
                    bets={bets}
                    correctBets={correctBets}
                    loggedUserBets={loggedUserBets}
                />
            </div>
        </div>
    );
};

export default Match;
