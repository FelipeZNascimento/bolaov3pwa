import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SimpleBar from 'simplebar-react';
import classNames from 'classnames';

import { Loading } from 'components_fa/index'
import {
    Icon,
    Tooltip
} from '@material-ui/core';

// Actions
import { fetchRanking } from 'store/app/actions';

// Selectors
import {
    selectCurrentWeek,
    selectCurrentSeason,
    selectIsLoading,
    selectRanking
} from 'store/app/selector';

import {
    TRankingLine
} from 'store/app/types';

import styles from './Ranking.module.scss';
import 'simplebar/dist/simplebar.min.css';

const Ranking = () => {
    const dispatch = useDispatch();
    const currentWeek = useSelector(selectCurrentWeek);
    const currentSeason = useSelector(selectCurrentSeason);
    const ranking = useSelector(selectRanking);
    const isLoading = useSelector(selectIsLoading);

    useEffect(() => {
        if (currentSeason !== null && currentWeek !== null) {
            dispatch(fetchRanking(currentSeason, currentWeek));
        }
    }, [currentSeason, currentWeek, dispatch]);

    const renderRankingLine = (rankingLine: TRankingLine, index: number) => {
        const positionClass = classNames(styles.position, {
            'color-gold': index === 0,
            'color-grey1': index === 1,
            'color-grey2': index === 2
        });

        return (
            <div className={styles.rankingLine}>
                <div className={positionClass}>
                    {index + 1}
                </div>
                <Icon classes={{ root: styles.icon }} fontSize="small" className={rankingLine.icon} style={{ color: rankingLine.color }} />
                <div className={styles.name}>
                    {rankingLine.name}
                </div>
                <div className={styles.points}>
                    {rankingLine.totalPoints}
                </div>
                <div className={styles.points}>
                    {rankingLine.totalBullseye}
                </div>
                <div className={styles.points}>
                    {rankingLine.totalWinners}
                </div>
                <div className={styles.points}>
                    {rankingLine.totalPercentage}
                </div>
            </div>
        )
    }

    return (
        <div className={styles.container}>
            <div className={styles.fixed}>
                <div className={styles.title}>Semana {currentWeek}</div>
                <div className={styles.header}>
                    <div className={styles.position}>&nbsp;</div>
                    <div className={styles.icon}>&nbsp;</div>
                    <div className={styles.name}>&nbsp;</div>
                    <div className={styles.points}>
                        <Tooltip title="Pontos" arrow><span>Pts</span></Tooltip>
                    </div>
                    <div className={styles.points}>
                        <Tooltip title="Acertos na mosca" arrow><span className="color-mint">M</span></Tooltip>
                    </div>
                    <div className={styles.points}>
                        <Tooltip title="Vencedores corretos" arrow><span className="color-blue">V</span></Tooltip>
                    </div>
                    <div className={styles.points}>
                        <Tooltip title="Aproveitamento de pontos" arrow><span>%</span></Tooltip>
                    </div>
                </div>
                <div className={styles.lineContainer}>
                    {isLoading && <Loading />}
                    {!isLoading && <SimpleBar style={{ maxHeight: '100%' }}>
                        {ranking && ranking.map((rankingLine, index) => renderRankingLine(rankingLine, index))}
                    </SimpleBar>}
                </div>
            </div>
        </div>
    );
};

export default Ranking;