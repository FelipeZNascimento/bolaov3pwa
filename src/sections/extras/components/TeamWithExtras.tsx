import React from 'react';
import classNames from 'classnames';

import { TeamMini } from 'components_fa/index'
import {
    Icon,
    Tooltip
} from '@material-ui/core';

import {
    TExtraBets,
    TUserExtraBets
} from 'store/bets/types';
import { TMatchTeam } from 'store/matches/types';
import { EXTRA_BETS_VALUES } from 'constants/bets';
import styles from './styles.module.scss';

type TProps = {
    extraBets: TUserExtraBets[];
    extraType: number;
    extraBetsResults: TExtraBets | null;
    isExpanded: boolean;
    isVisible: boolean;
    team: TMatchTeam;
    wildcardExtraType?: number | null;
}

const TeamWithExtras = ({
    extraBets,
    extraBetsResults,
    extraType,
    isExpanded,
    isVisible,
    wildcardExtraType = null,
    team,
}: TProps) => {
    const renderBets = (
        teamId: number,
        extraType: number
    ) => {
        return extraBets.map((user) => {
            if (extraType === wildcardExtraType) {
                const wildcardBets = user.bets[extraType] as number[];
                if (wildcardBets.find((bet) => bet === teamId)) {
                    return (
                        <Tooltip title={`${user.username} (WC)`} arrow>
                            <Icon classes={{ root: styles.iconSmall }} fontSize="small" className={`${user.icon} color-grey1`} />
                        </Tooltip>
                    )
                }
            } else if (user.bets[extraType] === teamId) {
                return (
                    <Tooltip title={user.username} arrow>
                        <Icon classes={{ root: styles.iconSmall }} fontSize="small" className={user.icon} style={{ color: user.color }} />
                    </Tooltip>
                )
            }
            return null;
        })
    };

    let isChampion = false;
    let isWildcard = false;
    const isPlayoffBets = extraType === EXTRA_BETS_VALUES.AFC
        || extraType === EXTRA_BETS_VALUES.NFC
        || extraType === EXTRA_BETS_VALUES.SUPERBOWL;

    if (extraBetsResults !== null && wildcardExtraType !== null) {
        const wildcardResults = extraBetsResults[wildcardExtraType] as number[];

        isChampion = extraBetsResults[extraType] === team.id;
        isWildcard = wildcardResults.find((result) => result === team.id) !== undefined;
    }

    if (isChampion && !team.name.includes('Champion')) {
        team.name += ' (Division Champion)';
    }
    if (isWildcard && !team.name.includes('Wildcard')) {
        team.name += ' (Wildcard)';
    }

    const teamClass = classNames({
        [styles.hidden]: !isVisible,
        [styles.teamContainerWinner]: isChampion,
        [styles.teamContainerWildcard]: isWildcard,
        [styles.teamContainer]: !isWildcard && !isChampion,
    });

    const extraBetsClass = classNames({
        [styles.extraBetsNone]: !isExpanded,
        [styles.extraBets]: isExpanded,
    });

    return (
        <div className={teamClass}>
            <TeamMini {...team} />
            <div className={extraBetsClass}>
                {renderBets(team.id, extraType)}
                {!isPlayoffBets && wildcardExtraType && renderBets(team.id, wildcardExtraType)}
            </div>
        </div>
    )
};

export default TeamWithExtras;
