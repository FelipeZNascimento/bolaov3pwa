import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { isMobile } from "react-device-detect";
import classNames from 'classnames';

// Actions
import { updateRegularBet } from 'store/bets/actions';

// Selectors
import { selectUser } from 'store/user/selector';
import { selectCurrentWeek } from 'store/app/selector';

// Components
import { Icon } from '@material-ui/core';
import Time from 'components_fa/match/components/Time';
import { Team } from 'components_fa/index'
import {
    RadioButtonUnchecked as RadioButtonUncheckedIcon,
    Block as BlockIcon
} from '@material-ui/icons';

import { TMatch } from 'store/matches/types';
import { calculateCorrectBets } from 'constants/bets';
import { BETS_VALUES } from 'constants/bets';
import MATCH_STATUS from 'constants/matches';
import styles from './BettableMatch.module.scss';

type TProps = TMatch & {
    isLoading: boolean,
    onChange: (id: number, betValue: number) => void
};

const BettableMatch = ({
    away,
    clock,
    home,
    id,
    isLoading,
    loggedUserBets = null,
    overUnder,
    status,
    timestamp,
    homeTeamOdds,
    onChange
}: TProps) => {
    const [currentTimestamp, setCurrentTimestamp] = useState(Math.floor(Date.now() / 1000));
    const [currentBetValue, setCurrentBetValue] = useState<null | number>(null);
    const currentWeek = useSelector(selectCurrentWeek);
    const correctBets = calculateCorrectBets(away.score || 0, home.score || 0);
    const loggedUser = useSelector(selectUser);

    const dispatch = useDispatch();
    const isBetBlocked = currentTimestamp >= timestamp || (loggedUser && loggedUser.status === 0 && currentWeek !== 0);
    const hasMatchEnded = status === MATCH_STATUS.FINAL ||
        status === MATCH_STATUS.FINAL_OVERTIME ||
        status === MATCH_STATUS.CANCELLED;
    const hasMatchStarted = status !== MATCH_STATUS.NOT_STARTED;

    useEffect(() => {
        if (loggedUserBets !== null) {
            setCurrentBetValue(loggedUserBets.value);
        }
    }, [loggedUserBets]);

    const updateBet = (betValue: number) => {
        if (!isBetBlocked) {
            dispatch(updateRegularBet(id, betValue) as any);
            setCurrentBetValue(betValue);
            onChange(id, betValue);
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
            [styles.betButtonDisabled]: isBetBlocked,
            [styles.betButton]: currentTimestamp < timestamp,
            [styles.betButtonCorrect]: correctBets.bullseye.find((correctBet) => correctBet === betValue) !== undefined
        });

        const renderIcon = () => {
            if (currentBetValue === betValue) {
                return <Icon fontSize="small" className={loggedUser?.icon} style={{ color: loggedUser?.color }} />;
            } else if (currentTimestamp < timestamp && !isBetBlocked) {
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
            <div
                className={buttonClass}
                style={{ background: `url(/match_layer.png)` }}
                onClick={() => updateBet(betValue)}
            >
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
                <div className={styles.atDivisor} style={{ background: `url(/match_layer.png)` }}>@</div>
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
                {!isMobile
                    && <Time
                        currentTimestamp={currentTimestamp}
                        isLoading={isLoading}
                        status={status}
                        timestamp={timestamp}
                        clock={clock}
                    />
                }
                <Team
                    {...away}
                    hasMatchEnded={hasMatchEnded}
                    hasMatchStarted={hasMatchStarted}
                    isExpanded={false}
                    displayOdd={overUnder}
                />
                {renderBettingColumns()}
                <Team
                    {...home}
                    isHome
                    hasMatchEnded={hasMatchEnded}
                    hasMatchStarted={hasMatchStarted}
                    isExpanded={false}
                    displayOdd={homeTeamOdds}
                />
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
                    <Team
                        {...away}
                        hasMatchEnded={hasMatchEnded}
                        hasMatchStarted={hasMatchStarted}
                        isExpanded={false}
                        displayOdd={overUnder}
                    />
                    <Team
                        {...home}
                        isHome
                        hasMatchEnded={hasMatchEnded}
                        hasMatchStarted={hasMatchStarted}
                        isExpanded={false}
                        displayOdd={homeTeamOdds}
                    />
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
