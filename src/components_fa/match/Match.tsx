import React, { useState } from 'react';
import { isMobile } from "react-device-detect";
import classNames from 'classnames';
import { DateTime } from 'luxon';

import { Team } from 'components_fa/index'
import Bets from './components/Bets'
import { TMatch } from 'store/matches/types';
import { calculateCorrectBets } from 'constants/bets';
import styles from './Match.module.scss';

type TProps = TMatch & {
    isExpanded: boolean;
    onExpandClick: (id: number) => void;
};

const Match = ({
    away,
    bets,
    loggedUserBets = null,
    home,
    id,
    isExpanded = false,
    status,
    timestamp,
    onExpandClick,
}: TProps) => {
    const [currentTimestamp, setCurrentTimestamp] = useState(Math.floor(Date.now() / 1000));

    const correctBets = calculateCorrectBets(away.score || 0, home.score || 0);

    let isBullseyeBet, isHalfBet = false;
    if (loggedUserBets) {
        isBullseyeBet = correctBets.bullseye.find((correctBet) => correctBet === loggedUserBets.value) !== undefined;
        isHalfBet = correctBets.half.find((correctBet) => correctBet === loggedUserBets.value) !== undefined;
    }

    setInterval(() => {
        setCurrentTimestamp(Math.floor(Date.now() / 1000));
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

    const onClick = () => {
        // setIsExpanded
        onExpandClick(id);
    }

    const renderTime = () => {
        const date = isExpanded
            ? DateTime.fromSeconds(timestamp).setLocale('pt-Br').toFormat("EEE dd/LL, HH'h'mm")
            : DateTime.fromSeconds(timestamp).setLocale('pt-Br').toFormat("dd/LL, HH'h'mm");

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
                    <div className={styles.quarter}>
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
        [styles.betsContainerHidden]: !isExpanded || !bets || (bets.length === 0 && !loggedUserBets),
    });

    return (
        <div className={styles.container}>
            <div
                className={matchContainerClass}
                key={id}
                onClick={onClick}
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
