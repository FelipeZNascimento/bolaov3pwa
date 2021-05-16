import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import { isMobile } from "react-device-detect";
import classNames from 'classnames';
import { DateTime } from 'luxon';

// Selectors
import { selectUser } from 'store/user/selector';

import {
    Icon
} from '@material-ui/core';

import {
    RadioButtonUnchecked as RadioButtonUncheckedIcon,
    // RadioButtonChecked as RadioButtonCheckedIcon,
} from '@material-ui/icons';

import { Team } from 'components_fa/index'
import { TMatch } from 'store/matches/types';
import { calculateCorrectBets } from 'constants/bets';
import styles from './BettableMatch.module.scss';
import { BETS_VALUES } from 'constants/bets';

type TProps = TMatch;

const BettableMatch = ({
    away,
    loggedUserBets = null,
    home,
    timestamp,
}: TProps) => {
    const [currentTimestamp, setCurrentTimestamp] = useState(DateTime.now().toMillis());
    const correctBets = calculateCorrectBets(away.score || 0, home.score || 0 );
    const loggedUser = useSelector(selectUser);

    let isBullseyeBet, isHalfBet = false;

    if (loggedUserBets) {
        isBullseyeBet = correctBets.bullseye.find((correctBet) => correctBet === loggedUserBets.value) !== undefined;
        isHalfBet = correctBets.half.find((correctBet) => correctBet === loggedUserBets.value) !== undefined;
    }

    setInterval(() => {
        setCurrentTimestamp(Date.now());
    }, 30000); //30s

    const borderClass = classNames({
        [styles.greenBorder]: isBullseyeBet && currentTimestamp >= timestamp, // bullseye
        [styles.blueBorder]: isHalfBet && currentTimestamp >= timestamp, // bullseye
        [styles.redBorder]: !isBullseyeBet && !isHalfBet && currentTimestamp >= timestamp, // bullseye
    });

    const renderBettingButton = (betValue: number) => {
        const buttonClass = classNames({
            [styles.betButtonDisabled]: currentTimestamp >= timestamp,
            [styles.betButton]: currentTimestamp < timestamp,
            [styles.betButtonCorrect]: correctBets.bullseye.find((correctBet) => correctBet === betValue) !== undefined
        });


        if (loggedUserBets?.value === betValue) {
            return (
                <div className={buttonClass}>
                    <Icon fontSize="small" className={loggedUser?.icon} style={{ color: loggedUser?.color }} />
                </div>
            );
        }

        return (
            <div className={buttonClass}>
                <RadioButtonUncheckedIcon fontSize="small" />
            </div>
        )
    };

    const renderBettingColumns = () => {
        return (
            <div className={styles.betContainer}>
                {renderBettingButton(BETS_VALUES.AWAY_EASY)}
                {renderBettingButton(BETS_VALUES.AWAY_HARD)}
                <div className={styles.atDivisor}>@</div>
                {renderBettingButton(BETS_VALUES.HOME_HARD)}
                {renderBettingButton(BETS_VALUES.HOME_EASY)}
            </div>
        )
    }

    const renderTeams = () => {
        return (
            <div className={styles.teamsContainer}>
                <Team {...away} isExpanded={false} />
                {renderBettingColumns()}
                <Team {...home} isExpanded={false} />
            </div>
        )
    };

    const containerClass = classNames(borderClass, {
        [styles.containerStandard]: !isMobile,
        [styles.containerMobile]: isMobile
    });

    if (isMobile) {
        return (
            <div className={containerClass}>
                <div className={styles.teamsContainer}>
                    <Team {...away} isExpanded={false} />
                    <Team {...home} isExpanded={false} />
                </div>
                {renderBettingColumns()}
            </div>
        )
    }
    return (
        <div className={containerClass}>
            {renderTeams()}
        </div>
    );
};

export default BettableMatch;
