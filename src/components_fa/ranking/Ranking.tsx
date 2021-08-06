import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { isMobile } from "react-device-detect";

import classNames from 'classnames';

import { Loading, WeekSelector } from 'components_fa/index'
import {
    Button,
    Icon,
    Tooltip
} from '@material-ui/core';

// Selectors
import {
    selectCurrentWeek,
    selectIsLoading,
    selectRanking,
    selectSeasonRanking
} from 'store/app/selector';

// Actions
import { setCurrentWeek } from 'store/app/actions';

import {
    TRankingLine
} from 'store/app/types';
import ROUTES from 'constants/routes';

import styles from './Ranking.module.scss';

type TProps = {
    full?: boolean
};

const Ranking = ({
    full = false
}: TProps) => {
    const [showSeasonRanking, setShowSeasonRanking] = useState<boolean>(false);

    const currentWeek = useSelector(selectCurrentWeek);
    const ranking = useSelector(selectRanking);
    const seasonRanking = useSelector(selectSeasonRanking);
    const isLoading = useSelector(selectIsLoading);
    const dispatch = useDispatch();

    const onWeekClick = (newWeek: number) => {
        dispatch(setCurrentWeek(newWeek));
    };

    const renderRankingLine = (rankingLine: TRankingLine, index: number) => {
        const rankingLineClass = classNames(styles.rankingLine, {
            [styles.rankingLineLoading]: isLoading,
        });

        const positionClass = classNames(styles.position, {
            'color-gold': index === 0,
            'color-grey1': index === 1,
            'color-grey2': index === 2
        });

        const onlineBadgeClass = classNames({
            [styles.badgeOnline]: rankingLine.isOnline,
            [styles.badgeOffline]: !rankingLine.isOnline
        });

        const position = index + 1;
        const normalizedPosition = position < 10 ? `0${position}` : position;

        return (
            <div className={rankingLineClass} key={rankingLine.name}>
                <div className={positionClass}>
                    {normalizedPosition}.
                </div>
                <Icon classes={{ root: styles.icon }} fontSize="small" className={rankingLine.icon} style={{ color: rankingLine.color }} />
                <div className={onlineBadgeClass} />
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

    const renderLoading = () => {
        if (activeRanking.length === 0) {
            return <Loading />;
        }

        return <Loading overlay />
    }

    const renderRanking = () => {
        return (
            <>
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
                    {isLoading && renderLoading()}
                    {activeRanking && activeRanking.map((rankingLine, index) => renderRankingLine(rankingLine, index))}
                </div>
            </>
        )
    }
    if (full) {
        const containerClass = classNames({
            [styles.containerFullMobile]: isMobile,
            [styles.containerFull]: !isMobile
        });

        return (
            <>
                <WeekSelector routeTo={ROUTES.RANKING.urlWithParams} onClick={onWeekClick} />
                <div className={containerClass}>
                    {renderRanking()}
                </div>
            </>
        )
    }

    return (
        <div className={styles.container}>
            <div className={styles.fixed}>
                {renderRanking()}
            </div>
        </div>
    );
};

export default Ranking;