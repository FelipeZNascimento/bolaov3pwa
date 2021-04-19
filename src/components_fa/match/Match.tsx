import React, { useState } from 'react';
import { isMobile } from "react-device-detect";
import classNames from 'classnames';
import { DateTime } from 'luxon';

import { Team } from 'components_fa/index'
import Bets from './components/Bets'
import { TMatch } from 'store/matches/types';
import { calculateCorrectBets } from 'constants/bets';
import styles from './Match.module.scss';

const Match = ({
    away,
    bets,
    loggedUserBets = null,
    home,
    id,
    status,
    timestamp,
}: TMatch) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [currentTimestamp, setCurrentTimestamp] = useState(DateTime.now().toMillis());
    const correctBets = calculateCorrectBets(away.score, home.score);

    let isBullseyeBet, isHalfBet = false;
    if(loggedUserBets) {
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
        [styles.greenBorder]: isBullseyeBet && currentTimestamp >= timestamp, // bullseye
        [styles.blueBorder]: isHalfBet && currentTimestamp >= timestamp, // bullseye
        [styles.redBorder]: !isBullseyeBet && !isHalfBet && currentTimestamp >= timestamp, // bullseye
    });

    const renderTime = () => {
        const date = isExpanded
            ? DateTime.fromMillis(timestamp).setLocale('pt-Br').toFormat('(ZZZZ) cccc, T - dd/LL/yyyy')
            : DateTime.fromMillis(timestamp).setLocale('pt-Br').toFormat('dd/LL/yyyy');

        // if match hasn't started
        if (currentTimestamp < timestamp) {
            return <div className={`${matchStatusClass} ${borderClass}`}>{date}</div>
        }

        // if match has ended
        if (currentTimestamp >= timestamp && status === 'final') {
            return <div className={`${matchStatusClass} ${borderClass}`}>Encerrado</div>;
        }

        // if match has started
        if (currentTimestamp >= timestamp) {
            return (
                <div className={matchStatusClass}>
                    <div className={`${styles.quarter} ${borderClass}`}>
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

    const containerClass = classNames({
        [styles.container]: !isExpanded && !isMobile,
        [styles.containerMobile]: isMobile,
        [styles.containerExpanded]: isExpanded,
    });

    return (
        <div className={containerClass} onClick={() => setIsExpanded(!isExpanded)}>
            <div className={timeClass}>
                {renderTime()}
            </div>
            {renderTeams()}
            {isExpanded
                && <Bets
                    bets={bets}
                    correctBets={correctBets}
                    loggedUserBets={loggedUserBets}
                />
            }
        </div>
    );
};

export default Match;
