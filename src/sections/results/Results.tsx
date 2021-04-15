import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { isMobile } from "react-device-detect";
import { useParams } from 'react-router';

import { Loading, Match, WeekPagination } from 'components_fa/index'
import styles from './Results.module.scss';
import ROUTES from 'constants/routes';

// Actions
import { fetchMatches } from 'store/matches/actions';
import { setCurrentWeek } from 'store/app/actions';

// Selectors
import { selectIsLoading, selectMatches } from 'store/matches/selector';
import { selectCurrentWeek, selectCurrentSeason } from 'store/app/selector';

const Results = () => {
    const dispatch = useDispatch();
    const { week } = useParams<{ week: string }>();

    const currentWeek = useSelector(selectCurrentWeek);
    const currentSeason = useSelector(selectCurrentSeason);
    const matches = useSelector(selectMatches);
    const isLoading = useSelector(selectIsLoading);

    useEffect(() => {
        if (currentSeason) {
            if (week) {
                dispatch(fetchMatches(currentSeason, parseInt(week)));
                dispatch(setCurrentWeek(parseInt(week)));
            } else if (currentWeek) {
                dispatch(fetchMatches(currentSeason, currentWeek));
            }
        }
    }, [currentSeason, currentWeek, dispatch, week]);

    const onWeekClick = (newWeek: number) => {
        dispatch(setCurrentWeek(newWeek));
    };

    return (
        <div className={styles.container}>
            <div className={styles.matchesContainer}>
                <WeekPagination routeTo={ROUTES.RESULTS.urlWithParams} onClick={onWeekClick} />
                {isLoading && <Loading />}
                {!isLoading && matches.map((match) => <Match {...match} />)}
            </div>
            {!isMobile
                && <div className={styles.rankingContainer}>
                    Ranking
            </div>}
        </div>
    );
};

export default Results;
