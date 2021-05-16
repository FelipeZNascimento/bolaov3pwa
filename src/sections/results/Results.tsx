import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { isMobile } from "react-device-detect";
import { useParams } from 'react-router';

import { Loading, Match, Ranking, WeekPagination } from 'components_fa/index'
import styles from './Results.module.scss';
import ROUTES from 'constants/routes';

// Actions
import { fetchMatches } from 'store/matches/actions';
import { setCurrentWeek } from 'store/app/actions';

// Selectors
import { selectIsLoading, selectMatches } from 'store/matches/selector';
import { selectCurrentWeek, selectCurrentSeason } from 'store/app/selector';
import { selectUser } from 'store/user/selector';

const Results = () => {
    const dispatch = useDispatch();
    const { week } = useParams<{ week: string }>();

    const currentWeek = useSelector(selectCurrentWeek);
    const currentSeason = useSelector(selectCurrentSeason);
    const matches = useSelector(selectMatches);
    const isLoading = useSelector(selectIsLoading);
    const loggedUser = useSelector(selectUser);

    useEffect(() => {
        if (currentSeason) {
            if (week && parseInt(week) !== currentWeek) {
                dispatch(fetchMatches(currentSeason, parseInt(week)));
                dispatch(setCurrentWeek(parseInt(week)))
            } else if (currentWeek) {
                dispatch(fetchMatches(currentSeason, currentWeek));
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

    return (
        <div className={styles.container}>
            <div className={styles.matchesContainer}>
                <WeekPagination routeTo={ROUTES.RESULTS.urlWithParams} onClick={onWeekClick} />
                {isLoading && <Loading />}
                {!isLoading && matches.map((match) => <Match key={match.id} {...match} />)}
            </div>
            {renderRanking()}
        </div>
    );
};

export default Results;
