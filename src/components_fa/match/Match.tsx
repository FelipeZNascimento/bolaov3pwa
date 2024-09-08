import React, { useState } from 'react';

import { isMobile } from 'react-device-detect';
import classNames from 'classnames';

// Components
import { Icon } from '@mui/material';
import { Team } from 'components_fa/index';
import Bets from './components/Bets';
import Time from './components/Time';
import { TextBox } from 'components/index';

// Selectors

// Types & Constants
import { TMatch } from 'store/matches/types';
import { calculateCorrectBets } from 'constants/bets';
import MATCH_STATUS from 'constants/matches';
import styles from './Match.module.scss';

type TProps = TMatch & {
  isLoading?: boolean;
  isExpanded: boolean;
  onExpandClick: (id: number) => void;
};

const Match = ({
  away,
  bets,
  clock,
  home,
  homeTeamOdds,
  loggedUserBets = null,
  id,
  isLoading = false,
  isExpanded = false,
  status,
  timestamp,
  overUnder,
  onExpandClick
}: TProps) => {
  const [currentTimestamp, setCurrentTimestamp] = useState(
    Math.floor(Date.now() / 1000)
  );

  const correctBets = calculateCorrectBets(away.score || 0, home.score || 0);
  const hasMatchStarted = status !== MATCH_STATUS.NOT_STARTED;
  const hasMatchEnded =
    status === MATCH_STATUS.FINAL ||
    status === MATCH_STATUS.FINAL_OVERTIME ||
    status === MATCH_STATUS.CANCELLED;

  let isBullseyeBet,
    isHalfBet = false;
  if (loggedUserBets) {
    isBullseyeBet =
      correctBets.bullseye.find(
        (correctBet) => correctBet === loggedUserBets.value
      ) !== undefined;
    isHalfBet =
      correctBets.half.find(
        (correctBet) => correctBet === loggedUserBets.value
      ) !== undefined;
  }

  setInterval(() => {
    setCurrentTimestamp(Math.floor(Date.now() / 1000));
  }, 30000); //30s

  const borderClass = classNames({
    [styles.greenBorder]:
      loggedUserBets && isBullseyeBet && currentTimestamp >= timestamp, // bullseye
    [styles.blueBorder]:
      loggedUserBets && isHalfBet && currentTimestamp >= timestamp, // bullseye
    [styles.redBorder]:
      loggedUserBets &&
      !isBullseyeBet &&
      !isHalfBet &&
      currentTimestamp >= timestamp // bullseye
  });

  const onClick = () => {
    onExpandClick(id);
  };

  const renderTeams = () => {
    const teamsContainerClass = classNames(styles.teamsContainer, {
      [styles.teamsContainerLoading]: isLoading
    });

    let isHomeWinner,
      isAwayWinner = false;

    if (home.score !== undefined && away.score !== undefined) {
      isHomeWinner = home.score >= away.score;
      isAwayWinner = away.score >= home.score;
    }

    return (
      <div className={teamsContainerClass}>
        <Team
          {...away}
          displayOdd={overUnder}
          hasMatchEnded={hasMatchEnded}
          hasMatchStarted={hasMatchStarted}
          isExpanded={isExpanded}
          isWinner={isAwayWinner}
        />
        <Team
          {...home}
          isHome
          displayOdd={homeTeamOdds}
          hasMatchEnded={hasMatchEnded}
          hasMatchStarted={hasMatchStarted}
          isExpanded={isExpanded}
          isWinner={isHomeWinner}
        />
      </div>
    );
  };

  const matchContainerClass = classNames(borderClass, {
    [styles.matchContainer]: !isExpanded && !isMobile,
    [styles.matchContainerMobile]: isMobile,
    [styles.matchContainerExpanded]: isExpanded
  });

  const betsContainerClass = classNames(styles.betsContainer, {
    [styles.betsContainerHidden]: !isExpanded
  });

  const noBets = bets.length === 0 && loggedUserBets === null;
  return (
    <div className={styles.container}>
      <div className={matchContainerClass} key={id} onClick={onClick}>
        {!isMobile && (
          <div className={styles.collapsibleIcon}>
            {!isExpanded && (
              <Icon
                fontSize="small"
                classes={{ root: 'fas fa-plus color-grey2' }}
              />
            )}
            {isExpanded && (
              <Icon
                fontSize="small"
                classes={{ root: 'fas fa-minus color-grey2' }}
              />
            )}
          </div>
        )}
        <Time
          currentTimestamp={currentTimestamp}
          isLoading={isLoading}
          status={status}
          timestamp={timestamp}
          clock={clock}
        />
        {renderTeams()}
      </div>
      <div className={betsContainerClass}>
        {hasMatchStarted && (
          <Bets
            bets={bets}
            correctBets={correctBets}
            loggedUserBets={loggedUserBets}
          />
        )}
        {noBets && (
          <TextBox
            text={() => {
              if (!hasMatchStarted) {
                return 'Apostas estarão disponíveis após o início da partida.';
              } else {
                return 'Apostas não disponíveis.';
              }
            }}
          />
        )}
      </div>
    </div>
  );
};

export default Match;
