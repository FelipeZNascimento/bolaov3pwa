import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { isMobile } from "react-device-detect";
import { useParams } from 'react-router';

import { Loading, Match } from 'components_fa/index'
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

    const weeksMock = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17];
    return (
        <div className={styles.container}>
            <div className={styles.matchesContainer}>
                {weeksMock.map((item) => (
                    <Link to={ROUTES.RESULTS.urlWithParams(item)}>Week {item}</Link>
                ))}
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
