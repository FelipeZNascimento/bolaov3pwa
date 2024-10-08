import React from 'react';
import { isMobile } from 'react-device-detect';
import classNames from 'classnames';

import { TeamMini } from 'components_fa/index';
import { Icon, Tooltip } from '@mui/material';

import { TExtraBets, TUserExtraBets } from 'store/bets/types';
import { TMatchTeam } from 'store/matches/types';
import { EXTRA_BETS_VALUES } from 'constants/bets';
import styles from './styles.module.scss';

type TProps = {
  extraBets: TUserExtraBets[];
  extraType: number;
  extraBetsResults: TExtraBets | null;
  team: TMatchTeam;
  wildcardExtraType?: number | null;
};

const TeamWithExtras = ({
  extraBets,
  extraBetsResults,
  extraType,
  wildcardExtraType = null,
  team
}: TProps) => {
  const renderBets = (teamId: number, extraType: number) => {
    return extraBets.map((user) => {
      if (extraType === wildcardExtraType) {
        const wildcardBets = user.bets[extraType] as number[];
        if (wildcardBets.find((bet) => bet === teamId)) {
          return (
            <Tooltip title={`${user.username} (WC)`} arrow>
              <Icon
                classes={{ root: styles.iconSmall }}
                fontSize="small"
                className={user.icon}
                style={{ color: user.color }}
              />
            </Tooltip>
          );
        }
      } else if (user.bets[extraType] === teamId) {
        return (
          <Tooltip title={user.username} arrow>
            <Icon
              classes={{ root: styles.iconSmall }}
              fontSize="small"
              className={user.icon}
              style={{ color: user.color }}
            />
          </Tooltip>
        );
      }
      return null;
    });
  };

  let isChampion = false;
  let isWildcard = false;
  const isPlayoffBets =
    extraType === EXTRA_BETS_VALUES.AFC ||
    extraType === EXTRA_BETS_VALUES.NFC ||
    extraType === EXTRA_BETS_VALUES.SUPERBOWL;

  if (extraBetsResults !== null) {
    isChampion = extraBetsResults[extraType] === team.id;

    if (wildcardExtraType !== null) {
      const wildcardResults = extraBetsResults[wildcardExtraType] as number[];
      isWildcard =
        wildcardResults.find((result) => result === team.id) !== undefined;
    }
  }

  if (isChampion && !team.name.includes('Champion')) {
    team.name += ' (Division Champion)';
  }
  if (isWildcard && !team.name.includes('Wildcard')) {
    team.name += ' (Wildcard)';
  }

  const teamClass = classNames(styles.teamContainer, {
    'left-margin-s right-margin-l': !isMobile
  });

  const statusClass = classNames({
    [styles.teamContainerWinner]: isChampion,
    [styles.teamContainerWildcard]: isWildcard
  });

  const championsClass = classNames(styles.champions, {
    [styles.championsBorder]: !isPlayoffBets
  });

  const extraBetsClass = classNames(styles.extraBets, {
    [styles.extraBetsPlayoffs]: isPlayoffBets,
    [styles.extraBetsDivisions]: !isPlayoffBets
  });

  return (
    <div className={teamClass}>
      <span className={statusClass}>
        <TeamMini {...team} />
      </span>
      <div className={extraBetsClass}>
        <div className={championsClass}>
          {!isPlayoffBets && (
            <Tooltip title="Campeão de Divisão" arrow>
              <Icon
                classes={{ root: `fas fa-crown color-gold ${styles.iconLeft}` }}
              />
            </Tooltip>
          )}
          {renderBets(team.id, extraType)}
        </div>
        {!isPlayoffBets && wildcardExtraType && (
          <div className={styles.wildcards}>
            <Tooltip title="Wild Card" arrow>
              <Icon
                classes={{
                  root: `fas fa-running color-grey1 ${styles.iconRight}`
                }}
              />
            </Tooltip>
            {renderBets(team.id, wildcardExtraType)}
          </div>
        )}
      </div>
    </div>
  );
};

export default TeamWithExtras;
