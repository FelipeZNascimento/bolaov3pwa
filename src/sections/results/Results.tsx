import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { isMobile } from "react-device-detect";

import { Loading, Match, Ranking, WeekPagination } from 'components_fa/index';
import styles from './Results.module.scss';
import ROUTES from 'constants/routes';

// Actions
import { setCurrentWeek } from 'store/app/actions';

// Selectors
import { selectIsLoading, selectMatches } from 'store/matches/selector';

const Results = () => {
    const [expandedMatches, setExpandedMatches] = useState<number[]>([]);

    const dispatch = useDispatch();
    const matches = useSelector(selectMatches);
    const isLoading = useSelector(selectIsLoading);

    const onWeekClick = (newWeek: number) => {
        dispatch(setCurrentWeek(newWeek));
    };

    const onExpandClick = (matchId: number) => {
        let updatedExpandedMatches = [...expandedMatches];
        if (updatedExpandedMatches.includes(matchId)) {
            updatedExpandedMatches = updatedExpandedMatches.filter((expandedMatchId) => expandedMatchId !== matchId);
        } else {
            updatedExpandedMatches.push(matchId);
        }

        setExpandedMatches(updatedExpandedMatches);
    };

    const renderRanking = () => {
        if (isMobile) {
            return null
        };

        return <Ranking />;
    };

    const renderMatches = () => {
        return matches.map((match) => (
            <Match
                key={match.id}
                isExpanded={expandedMatches.includes(match.id)}
                onExpandClick={onExpandClick}
                {...match}
            />
        ));
    }
    return (
        <div className={styles.container}>
            <div className={styles.leftContainer}>
                <WeekPagination routeTo={ROUTES.RESULTS.urlWithParams} onClick={onWeekClick} />
                <div className={styles.matchesContainer}>
                    {isLoading && <Loading overlay />}
                    {renderMatches()}
                </div>
            </div>
            {renderRanking()}
        </div>
    );
};

export default Results;
