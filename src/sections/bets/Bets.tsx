import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { isMobile } from "react-device-detect";

// Actions
import { setCurrentWeek } from 'store/app/actions';

// Selectors
import { selectIsLoading, selectUserBets } from 'store/bets/selector';

import {
    Tooltip
} from '@material-ui/core';

import { Loading, BettableMatch, Ranking, WeekSelector } from 'components_fa/index'
import styles from './Bets.module.scss';
import ROUTES from 'constants/routes';

const Bets = () => {
    const dispatch = useDispatch();
    const matchesWithBets = useSelector(selectUserBets);
    const isLoading = useSelector(selectIsLoading);
    const { week } = useParams<{ week: string }>();

    useEffect(() => {
        if (week) {
            dispatch(setCurrentWeek(parseInt(week)))
        }
    }, [dispatch, week]);

    const onWeekClick = (newWeek: number) => {
        dispatch(setCurrentWeek(newWeek));
    };

    const renderRanking = () => {
        if (isMobile) {
            return null
        };

        return <Ranking />;
    };

    const renderMatches = () => {
        return matchesWithBets.map((match) => <BettableMatch {...match} key={match.id} />);
    }

    return (
        <div className={styles.container}>
            <div className={styles.leftContainer}>
                <WeekSelector routeTo={ROUTES.BETS.urlWithParams} onClick={onWeekClick} />
                <div className={styles.matchesContainer}>
                    {!isMobile && <div className={styles.header}>
                        <div style={{ flex: 2 }}>Visitante</div>
                        <div><Tooltip title="Mais de 7 pontos" placement="top" arrow><span>Fácil</span></Tooltip></div>
                        <div><Tooltip title="7 pontos ou menos" placement="top" arrow><span>Difícil</span></Tooltip></div>
                        <div><Tooltip title="7 pontos ou menos" placement="top" arrow><span>Difícil</span></Tooltip></div>
                        <div><Tooltip title="Mais de 7 pontos" placement="top" arrow><span>Fácil</span></Tooltip></div>
                        <div style={{ flex: 2 }}>Casa</div>
                    </div>}
                    {isLoading && <Loading overlay />}
                    {renderMatches()}
                </div>
            </div>
            {renderRanking()}
        </div>
    );
};

export default Bets;
