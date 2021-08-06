import React from 'react';
import { isMobile } from "react-device-detect";
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
        [`${styles.icon} ${styles.translucid}`]: !disabled,
        [styles.iconDisabled]: disabled,
        [`color-gold ${styles.bright}`]: currentlySelectedByUser[extraType] === team.id,
    });

    let selectedWildcards: number[] = [];
    if (wildcardExtraType) {
        selectedWildcards = currentlySelectedByUser[wildcardExtraType] as number[];
    }

    const wildCardIconClass = classNames({
        [`${styles.icon} ${styles.translucid}`]: !disabled,
        [styles.iconDisabled]: disabled,
        [`color-grey1 ${styles.bright}`]: selectedWildcards.find((wc) => wc === team.id)
    });

    const isSelected = currentlySelectedByUser[extraType] === team.id || selectedWildcards.find((wc) => wc === team.id);

    const containerClass = classNames(styles.teamContainer, {
        [styles.teamContainerWildcard]: isSelected,
        'color-grey1': isMobile
    });

    const teamContainerClass = classNames({
        [styles.translucid]: !isSelected,
        [styles.bright]: isSelected,
    });

    const onClick = (clickedTeam: TMatchTeam, clickedType: number) => {
        if (!disabled) {
            onSelect(clickedTeam, clickedType);
        }
    };

    return (
        <div className={containerClass}>
            <Tooltip title='Vencedor' arrow>
                <Icon classes={{ root: `fas fa-crown ${winnerIconClass}` }} onClick={() => onClick(team, extraType)} />
            </Tooltip>
            <div className={teamContainerClass}>
                <TeamMini {...team} />
            </div>
            {wildcardExtraType && <Tooltip title='Wildcard' arrow>
                <Icon classes={{ root: `fas fa-running ${wildCardIconClass}` }} onClick={() => onClick(team, wildcardExtraType)} />
            </Tooltip>}
        </div>
    )
};

export default BettableTeam;