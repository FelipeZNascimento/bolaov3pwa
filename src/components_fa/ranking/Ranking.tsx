import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SimpleBar from 'simplebar-react';
import classNames from 'classnames';

import { Loading } from 'components_fa/index'
import {
    Button,
    Icon,
    Tooltip
} from '@material-ui/core';

// Actions
import {
    fetchRanking,
    fetchSeasonRanking
} from 'store/app/actions';

// Selectors
import {
    selectCurrentWeek,
    selectCurrentSeason,
    selectIsLoading,
    selectRanking,
    selectSeasonRanking
} from 'store/app/selector';

import {
    TRankingLine
} from 'store/app/types';

import styles from './Ranking.module.scss';
import 'simplebar/dist/simplebar.min.css';

const Ranking = () => {
    const [showSeasonRanking, setShowSeasonRanking] = useState<boolean>(false);

    const dispatch = useDispatch();
    const currentWeek = useSelector(selectCurrentWeek);
    const currentSeason = useSelector(selectCurrentSeason);
    const ranking = useSelector(selectRanking);
    const seasonRanking = useSelector(selectSeasonRanking);
    const isLoading = useSelector(selectIsLoading);

    useEffect(() => {
        if (currentSeason !== null && currentWeek !== null) {
            dispatch(fetchRanking(currentSeason, currentWeek));
        }
    }, [currentSeason, currentWeek, dispatch]);

    useEffect(() => {
        if (currentSeason !== null) {
            dispatch(fetchSeasonRanking(currentSeason));
        }
    }, [currentSeason, dispatch]);

    const renderRankingLine = (rankingLine: TRankingLine, index: number) => {
        const positionClass = classNames(styles.position, {
            'color-gold': index === 0,
            'color-grey1': index === 1,
            'color-grey2': index === 2
        });

        return (
            <div className={styles.rankingLine} key={rankingLine.name}>
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
                {showSeasonRanking
                    && <div className={styles.points}>
                        {rankingLine.totalExtras}
                    </div>
                }
            </div>
        )
    }

    const activeRanking = showSeasonRanking ? seasonRanking : ranking;
    return (
        <div className={styles.container}>
            <div className={styles.fixed}>
                <div className={styles.title}>
                    <Button
                        classes={{ root: `${showSeasonRanking ? styles.buttonActive : styles.button}` }}
                        variant="outlined"
                        onClick={() => setShowSeasonRanking(true)}
                    >
                        Geral
                    </Button>
                    <Button
                        classes={{ root: `${!showSeasonRanking ? styles.buttonActive : styles.button}` }}
                        variant="outlined"
                        onClick={() => setShowSeasonRanking(false)}
                    >
                        Semana {currentWeek}
                    </Button>
                </div>
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
                    {showSeasonRanking
                        && <div className={styles.points}>
                        <Tooltip title="Pontos extras" arrow><span className="color-purple">PE</span></Tooltip>
                    </div>
                    }

                </div>
                <div className={styles.lineContainer}>
                    {isLoading && <Loading />}
                    {!isLoading && <SimpleBar style={{ maxHeight: '100%' }}>
                        {activeRanking && activeRanking.map((rankingLine, index) => renderRankingLine(rankingLine, index))}
                    </SimpleBar>}
                </div>
            </div>
        </div>
    );
};

export default Ranking;