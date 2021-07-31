import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { isMobile } from "react-device-detect";
import classNames from 'classnames';

// Actions
import { updateRegularBet } from 'store/bets/actions';

// Selectors
import { selectUser } from 'store/user/selector';
import { selectIsLoading } from 'store/bets/selector';

import {
    Icon
} from '@material-ui/core';

import {
    RadioButtonUnchecked as RadioButtonUncheckedIcon,
    Block as BlockIcon,
    // RadioButtonChecked as RadioButtonCheckedIcon,
} from '@material-ui/icons';

import { Team } from 'components_fa/index'
import { TMatch } from 'store/matches/types';
import { calculateCorrectBets } from 'constants/bets';
import styles from './BettableMatch.module.scss';
import { BETS_VALUES } from 'constants/bets';

type TProps = TMatch;

const BettableMatch = ({
    id,
    away,
    loggedUserBets = null,
    home,
    timestamp,
}: TProps) => {
    const [currentTimestamp, setCurrentTimestamp] = useState(Math.floor(Date.now() / 1000));
    const [currentBetValue, setCurrentBetValue] = useState<null | number>(null);
    const correctBets = calculateCorrectBets(away.score || 0, home.score || 0);
    const loggedUser = useSelector(selectUser);
    const isLoading = useSelector(selectIsLoading);

    const dispatch = useDispatch();

    useEffect(() => {
        if (loggedUserBets !== null) {
            setCurrentBetValue(loggedUserBets.value);
        }
    }, [loggedUserBets]);

    const updateBet = (betValue: number) => {
        if (currentTimestamp < timestamp) {
            dispatch(updateRegularBet(id, betValue));
            setCurrentBetValue(betValue);
        }
    };

    let isBullseyeBet, isHalfBet = false;

    if (loggedUserBets) {
        isBullseyeBet = correctBets.bullseye.find((correctBet) => correctBet === currentBetValue) !== undefined;
        isHalfBet = correctBets.half.find((correctBet) => correctBet === currentBetValue) !== undefined;
    }

    setInterval(() => {
        setCurrentTimestamp(Math.floor(Date.now() / 1000));
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

        const renderIcon = () => {
            if (currentBetValue === betValue) {
                return <Icon fontSize="small" className={loggedUser?.icon} style={{ color: loggedUser?.color }} />;
            } else if (currentTimestamp < timestamp) {
                return <RadioButtonUncheckedIcon fontSize="small" />;
            }

            return <BlockIcon fontSize="small" />;
        };

        const renderDescription = () => {
            const description = betValue === BETS_VALUES.AWAY_EASY || betValue === BETS_VALUES.HOME_EASY
                ? 'Fácil'
                : 'Difícil';
            return <div className={styles.betDescription}>{description}</div>;
        }

        return (
            <div className={buttonClass} onClick={() => updateBet(betValue)}>
                <div>
                    {renderIcon()}
                    {isMobile && renderDescription()}
                </div>
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
        const teamsContainerClass = classNames(styles.teamsContainer, {
            [styles.teamsContainerLoading]: isLoading
        });

        return (
            <div className={teamsContainerClass}>
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
