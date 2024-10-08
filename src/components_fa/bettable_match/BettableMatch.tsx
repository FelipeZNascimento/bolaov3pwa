import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { isMobile } from 'react-device-detect';
import classNames from 'classnames';

// Actions
import { updateRegularBet, updateIsUpdatingBet } from 'store/bets/actions';

// Selectors
import { selectUser } from 'store/user/selector';
import { selectLastUpdatedMatch } from 'store/bets/selector';
import { selectCurrentWeek } from 'store/app/selector';

// Components
import { Icon } from '@mui/material';
import { Loading } from '@omegafox/components';

import Time from 'components_fa/match/components/Time';
import { Team } from 'components_fa/index';
import {
  RadioButtonUnchecked as RadioButtonUncheckedIcon,
  Block as BlockIcon
} from '@mui/icons-material';

import { TMatch } from 'store/matches/types';
import { calculateCorrectBets } from 'constants/bets';
import { BETS_VALUES } from 'constants/bets';
import MATCH_STATUS from 'constants/matches';
import styles from './BettableMatch.module.scss';
import logo from 'img/favicon.png';

type TProps = TMatch & {
  isLoading: boolean;
  onChange: (id: number, betValue: number) => void;
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
  const [currentTimestamp, setCurrentTimestamp] = useState(
    Math.floor(Date.now() / 1000)
  );
  const [currentBetValue, setCurrentBetValue] = useState<null | number>(null);
  const [isUpdatingBet, setIsUpdatingBet] = useState<boolean>(false);

  const currentWeek = useSelector(selectCurrentWeek);
  const correctBets = calculateCorrectBets(away.score || 0, home.score || 0);
  const loggedUser = useSelector(selectUser);
  const lastUpdatedMatch = useSelector(selectLastUpdatedMatch);

  const dispatch = useDispatch();
  const isBetBlocked =
    currentTimestamp >= timestamp ||
    (loggedUser && loggedUser.status === 0 && currentWeek !== 0);
  const hasMatchEnded =
    status === MATCH_STATUS.FINAL ||
    status === MATCH_STATUS.FINAL_OVERTIME ||
    status === MATCH_STATUS.CANCELLED;
  const hasMatchStarted = status !== MATCH_STATUS.NOT_STARTED;

  useEffect(() => {
    if (lastUpdatedMatch === id) {
      setIsUpdatingBet(false);
      dispatch(updateIsUpdatingBet(null) as any);
    }
  }, [lastUpdatedMatch]);

  useEffect(() => {
    if (loggedUserBets !== null) {
      setCurrentBetValue(loggedUserBets.value);
    }
  }, [loggedUserBets]);

  const updateBet = (betValue: number) => {
    if (!isBetBlocked) {
      dispatch(
        updateRegularBet(id, betValue, `${away.alias} @ ${home.alias}`) as any
      );
      setCurrentBetValue(betValue);
      setIsUpdatingBet(true);
      onChange(id, betValue);
    }
  };

  let isBullseyeBet,
    isHalfBet = false;

  if (loggedUserBets) {
    isBullseyeBet =
      correctBets.bullseye.find(
        (correctBet) => correctBet === currentBetValue
      ) !== undefined;
    isHalfBet =
      correctBets.half.find((correctBet) => correctBet === currentBetValue) !==
      undefined;
  }

  setInterval(() => {
    setCurrentTimestamp(Math.floor(Date.now() / 1000));
  }, 30000); //30s

  const borderClass = classNames({
    [styles.greenBorder]: isBullseyeBet && currentTimestamp >= timestamp, // bullseye
    [styles.blueBorder]: isHalfBet && currentTimestamp >= timestamp, // bullseye
    [styles.redBorder]:
      !isBullseyeBet && !isHalfBet && currentTimestamp >= timestamp // bullseye
  });

  const renderBettingButton = (betValue: number) => {
    const buttonClass = classNames({
      [styles.betButtonDisabled]: isBetBlocked,
      [styles.betButton]: currentTimestamp < timestamp,
      [styles.betButtonCorrect]:
        correctBets.bullseye.find((correctBet) => correctBet === betValue) !==
        undefined
    });

    const renderIcon = () => {
      if (isUpdatingBet) {
        return (
          <RadioButtonUncheckedIcon
            fontSize="small"
            style={{ cursor: 'wait' }}
          />
        );
      } else if (currentBetValue === betValue) {
        return (
          <Icon
            fontSize="small"
            className={loggedUser?.icon}
            style={{ color: loggedUser?.color }}
          />
        );
      } else if (currentTimestamp < timestamp && !isBetBlocked) {
        return <RadioButtonUncheckedIcon fontSize="small" />;
      }

      return <BlockIcon fontSize="small" />;
    };

    const renderDescription = () => {
      const description =
        betValue === BETS_VALUES.AWAY_EASY || betValue === BETS_VALUES.HOME_EASY
          ? 'Fácil'
          : 'Difícil';
      return <div className={styles.betDescription}>{description}</div>;
    };

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
    );
  };

  const renderLoadingState = () => {
    return <Loading size="small" image={logo} style="headbutt" />;
  };

  const renderBettingColumns = () => {
    return (
      <div className={styles.betContainer}>
        {isUpdatingBet && renderLoadingState()}
        {!isUpdatingBet && (
          <>
            {renderBettingButton(BETS_VALUES.AWAY_EASY)}
            {renderBettingButton(BETS_VALUES.AWAY_HARD)}
            <div
              className={styles.atDivisor}
              style={{ background: `url(/match_layer.png)` }}
            >
              @
            </div>
            {renderBettingButton(BETS_VALUES.HOME_HARD)}
            {renderBettingButton(BETS_VALUES.HOME_EASY)}
          </>
        )}
      </div>
    );
  };

  const renderTeams = () => {
    const teamsContainerClass = classNames(styles.teamsContainer, {
      [styles.teamsContainerLoading]: isLoading
    });

    return (
      <div className={teamsContainerClass}>
        {!isMobile && (
          <Time
            currentTimestamp={currentTimestamp}
            isLoading={isLoading}
            status={status}
            timestamp={timestamp}
            clock={clock}
          />
        )}
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
    );
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
    );
  }
  return <div className={containerClass}>{renderTeams()}</div>;
};

export default BettableMatch;
