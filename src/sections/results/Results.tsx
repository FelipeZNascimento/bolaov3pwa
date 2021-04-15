import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { isMobile } from "react-device-detect";
import { useParams } from 'react-router';

import { Match } from 'components_fa/index'
import styles from './Results.module.scss';
// import ROUTES from 'constants/routes';

// Actions
import { fetchMatches } from 'store/matches/actions';

// Selectors
import { selectMatches } from 'store/matches/selector';

const Results = () => {
    const dispatch = useDispatch();
    const { season, week } = useParams<{ season: string, week: string }>();

    const matches = useSelector(selectMatches);

    useEffect(() => {
        dispatch(fetchMatches());
    }, [dispatch]);

    useEffect(() => {
        console.log(season);
        console.log(week);
    }, [season, week]);

    return (
        <div className={styles.container}>
            <div className={styles.matchesContainer}>
                {/* <Link to={ROUTES.RESULTS.urlWithParams(8, 8)}>Season 8</Link> */}
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
