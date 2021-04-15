import React, { useState } from 'react';
import { isMobile } from "react-device-detect";
import classNames from 'classnames';
import { DateTime } from 'luxon';

import { Team } from 'components_fa/index'
import styles from './Match.module.scss';

import { TMatch } from 'store/matches/types';

const Match = ({
    id,
    timestamp,
    status,
    away,
    home
}: TMatch) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [currentTimestamp, setCurrentTimestamp] = useState(DateTime.now().toMillis());

    setInterval(() => {
        setCurrentTimestamp(Date.now());
    }, 30000); //30s

    const matchStatusClass = classNames({
        [styles.notStarted]: currentTimestamp < timestamp, // not started
        [styles.started]: currentTimestamp >= timestamp, // has started
        [styles.ended]: currentTimestamp >= timestamp && status === 'final', // match has ended

    });

    const borderClass = classNames({
        [styles.greenBorder]: currentTimestamp >= timestamp, // bullseye
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
            <>
                <Team {...away} isExpanded={isExpanded} />
                <Team {...home} isExpanded={isExpanded} />
            </>
        )
    };

    const renderExpandedTeams = () => {
        return (
            <div className={styles.teamsContainer}>
                {renderTeams()}
            </div>
        )
    };

    const renderBets = () => {
        return (
            <div className={styles.betContainer}>
                <div className={styles.column}>
                    <div className={styles.header}>
                        Fácil
                    </div>
                    <p>Felipe</p>
                </div>
                <div className={styles.column}>
                    <div className={styles.header}>
                        Difícil
                    </div>
                    <p>Motta</p>
                </div>
                <div className={styles.column}>
                    <div className={styles.header}>
                        Difícil
                    </div>
                    <p>Thigo</p>
                </div>
                <div className={styles.column}>
                    <div className={styles.header}>
                        Fácil
                    </div>
                    <p>Phetor</p>
                </div>
            </div>
        )
    }

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
            {isExpanded ? renderExpandedTeams() : renderTeams()}
            {isExpanded && renderBets()}
        </div>
    );
};

export default Match;
