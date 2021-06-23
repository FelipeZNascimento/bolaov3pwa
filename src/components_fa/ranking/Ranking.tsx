import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import SimpleBar from 'simplebar-react';
import classNames from 'classnames';

import { Loading } from 'components_fa/index'
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

import {
    TRankingLine
} from 'store/app/types';

import styles from './Ranking.module.scss';
import 'simplebar/dist/simplebar.min.css';

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

    const renderRankingLine = (rankingLine: TRankingLine, index: number) => {
        const positionClass = classNames(styles.position, {
            'color-gold': index === 0,
            'color-grey1': index === 1,
            'color-grey2': index === 2
        });

        const onlineBadgeClass = classNames({
            [styles.badgeOnline]: rankingLine.isOnline,
            [styles.badgeOffline]: !rankingLine.isOnline
        });

        return (
            <div className={styles.rankingLine} key={rankingLine.name}>
                <div className={positionClass}>
                    {index + 1}
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

        return <Loading overlay size='small' />
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
                    <SimpleBar style={{ maxHeight: '100%' }}>
                        {activeRanking && activeRanking.map((rankingLine, index) => renderRankingLine(rankingLine, index))}
                    </SimpleBar>
                </div>
            </>
        )
    }
    if (full) {
        return (
            <div className={styles.containerFull}>
                {renderRanking()}
            </div >
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