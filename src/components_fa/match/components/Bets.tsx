import React from 'react';
import { isMobile } from "react-device-detect";
import classNames from 'classnames';

import {
    Icon
} from '@material-ui/core';

import { TMatchBet } from 'store/matches/types';
import { BETS_VALUES } from 'constants/bets';
import styles from './Bets.module.scss';

type TProps = {
    bets: TMatchBet[],
    correctBets: {
        bullseye: number[],
        half: number[]
    },
    loggedUserBets?: null | TMatchBet,
}
const Bets = ({
    bets,
    correctBets,
    loggedUserBets = null
}: TProps) => {
    const renderBetLine = (bet: TMatchBet) => (
        <div className={styles.betLine} key={`${bet.matchId}${bet.user.id}${bet.id}`}>
            {!isMobile && <Icon classes={{ root: styles.iconClass }} fontSize="small" className={bet.user.icon} style={{ color: bet.user.color }} />}
            <span className={styles.userName}>{bet.user.name}</span>
        </div>
    );

    const renderColumns = (columnBet: number, columnTitle: string) => {
        const isBullseyeColumn = correctBets.bullseye.find((correctBet) => correctBet === columnBet) !== undefined;
        const isHalfColumn = correctBets.half.find((correctBet) => correctBet === columnBet) !== undefined;

        const columnClass = classNames({
            [styles.columnBullseye]: isBullseyeColumn,
            [styles.column]: !isBullseyeColumn,
        });

        const columnHeaderClass = classNames({
            [styles.headerBullseye]: isBullseyeColumn,
            [styles.headerHalf]: isHalfColumn,
            [styles.headerZero]: !isHalfColumn && !isBullseyeColumn,
        });

        return (
            <div className={columnClass}>
                <div className={columnHeaderClass}>
                    {columnTitle}
                </div>
                {loggedUserBets && loggedUserBets.value === columnBet && renderBetLine(loggedUserBets)}
                {bets
                    .filter((bet) => bet.value === columnBet)
                    .map((bet) => renderBetLine(bet))
                }
            </div>
        )
    }

    return (
        <div className={styles.container}>
            {renderColumns(BETS_VALUES.AWAY_EASY, 'F??cil')}
            {renderColumns(BETS_VALUES.AWAY_HARD, 'Dif??cil')}
            {renderColumns(BETS_VALUES.HOME_HARD, 'Dif??cil')}
            {renderColumns(BETS_VALUES.HOME_EASY, 'F??cil')}
        </div >
    )
}

export default Bets;