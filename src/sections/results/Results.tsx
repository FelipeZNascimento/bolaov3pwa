import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { isMobile } from "react-device-detect";
import { useParams } from 'react-router';

import { Loading, Match, WeekPagination } from 'components_fa/index'
import styles from './Results.module.scss';
import ROUTES from 'constants/routes';

// Actions
import { fetchMatches } from 'store/matches/actions';

// Selectors
import { selectIsLoading, selectMatches } from 'store/matches/selector';
import { selectConfig } from 'store/app/selector';

const Results = () => {
    const dispatch = useDispatch();
    const { week } = useParams<{ week: string }>();

    const config = useSelector(selectConfig);
    const matches = useSelector(selectMatches);
    const isLoading = useSelector(selectIsLoading);

    useEffect(() => {
        if (config) {
            if (week) {
                dispatch(fetchMatches(config.currentSeason, parseInt(week)));
            } else {
                dispatch(fetchMatches(config.currentSeason, config.currentWeek));
            }
        }
    }, [config, dispatch, week]);

    if (isLoading) {
        return (
            <div className={styles.container}>
                {isLoading && <Loading />}
            </div>
        )
    }

    return (
        <div className={styles.container}>
            <div className={styles.matchesContainer}>
                <WeekPagination routeTo={ROUTES.RESULTS.urlWithParams} />
                {matches.map((match) => <Match {...match} />)}
            </div>
            {!isMobile
                && <div className={styles.rankingContainer}>
                    Ranking
            </div>}
        </div>
    );
};

export default Results;
