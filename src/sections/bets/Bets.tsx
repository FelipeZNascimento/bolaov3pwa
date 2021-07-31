import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { isMobile } from "react-device-detect";
import { useParams } from 'react-router';

// Actions
import { fetchUserBets } from 'store/bets/actions';
import { setCurrentWeek } from 'store/app/actions';

// Selectors
import { selectIsLoading, selectUserBets } from 'store/bets/selector';
import { selectCurrentWeek, selectCurrentSeason } from 'store/app/selector';
import { selectUser } from 'store/user/selector';

import {
    Tooltip
} from '@material-ui/core';

import { Loading, BettableMatch, Ranking, WeekPagination } from 'components_fa/index'
import styles from './Bets.module.scss';
import ROUTES from 'constants/routes';

const Bets = () => {
    const dispatch = useDispatch();
    const { week } = useParams<{ week: string }>();

    const currentWeek = useSelector(selectCurrentWeek);
    const currentSeason = useSelector(selectCurrentSeason);
    const matchesWithBets = useSelector(selectUserBets);
    const isLoading = useSelector(selectIsLoading);
    const loggedUser = useSelector(selectUser);

    useEffect(() => {
        if (currentSeason) {
            if (week && parseInt(week) !== currentWeek) {
                // When there's week param on URL and it's different from current
                dispatch(fetchUserBets(currentSeason, parseInt(week)));
                dispatch(setCurrentWeek(parseInt(week)))
            } else if (currentWeek !== null && currentWeek !== undefined) {
                dispatch(fetchUserBets(currentSeason, currentWeek));
            }
        }
    }, [currentSeason, currentWeek, loggedUser, dispatch, week]);

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
                <WeekPagination routeTo={ROUTES.BETS.urlWithParams} onClick={onWeekClick} />
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
