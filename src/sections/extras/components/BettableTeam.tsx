import React from 'react';
import classNames from 'classnames';

import { TeamMini } from 'components_fa/index'
import {
    Icon,
    Tooltip
} from '@material-ui/core';

import {
    TExtraBets
} from 'store/bets/types';
import { TMatchTeam } from 'store/matches/types';

import styles from './styles.module.scss';

type TProps = {
    currentlySelectedByUser: TExtraBets;
    disabled: boolean;
    extraType: number;
    team: TMatchTeam;
    wildcardExtraType?: number | null;
    onSelect: (team: TMatchTeam, type: number) => void;
}

const BettableTeam = ({
    currentlySelectedByUser,
    disabled = false,
    extraType,
    wildcardExtraType = null,
    team,
    onSelect
}: TProps) => {
    const winnerIconClass = classNames({
        [styles.icon]: !disabled,
        [styles.iconDisabled]: disabled,
        'color-gold': currentlySelectedByUser[extraType] === team.id,
    });

    let selectedWildcards: number[] = [];
    if (wildcardExtraType) {
        selectedWildcards = currentlySelectedByUser[wildcardExtraType] as number[];
    }

    const wildCardIconClass = classNames({
        [styles.icon]: !disabled,
        [styles.iconDisabled]: disabled,
        'color-grey1': selectedWildcards.find((wc) => wc === team.id)
    });

    const teamContainerClass = classNames(styles.teamContainer, {
        [styles.teamContainerWildcard]: currentlySelectedByUser[extraType] === team.id || selectedWildcards.find((wc) => wc === team.id),
    });

    const onClick = (clickedTeam: TMatchTeam, clickedType: number) => {
        if (!disabled) {
            onSelect(clickedTeam, clickedType);
        }
    };

    return (
        <div className={teamContainerClass}>
            <Tooltip title='Vencedor' arrow>
                <Icon classes={{ root: `fas fa-crown ${winnerIconClass}` }} onClick={() => onClick(team, extraType)} />
            </Tooltip>
            <TeamMini {...team} />
            {wildcardExtraType && <Tooltip title='Wildcard' arrow>
                <Icon classes={{ root: `fas fa-running ${wildCardIconClass}` }} onClick={() => onClick(team, wildcardExtraType)} />
            </Tooltip>}
        </div>
    )
};

export default BettableTeam;