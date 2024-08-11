import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { isMobile } from 'react-device-detect';

// Components
import { Match, Ranking, WeekSelector } from 'components_fa/index';
import { Loading } from '@omegafox/components';
import { Fab, Icon } from '@mui/material';

// Actions
import { setCurrentWeek } from 'store/app/actions';

// Selectors
import { selectIsLoading, selectMatches } from 'store/matches/selector';
import { selectCurrentWeek } from 'store/app/selector';

import styles from './Results.module.scss';
import ROUTES from 'constants/routes';
import logo from 'img/favicon.png';

const Results = () => {
  const [blockLoading, setBlockLoading] = useState<boolean>(false);
  const [expandedMatches, setExpandedMatches] = useState<number[]>([]);

  const dispatch = useDispatch();
  const currentWeek = useSelector(selectCurrentWeek);
  const isLoading = useSelector(selectIsLoading);
  const matches = useSelector(selectMatches);
  const { week } = useParams<{ week: string }>();

  useEffect(() => {
    if (week) {
      dispatch(setCurrentWeek(parseInt(week)) as any);
    }
  }, [dispatch, week]);

  useEffect(() => {
    setExpandedMatches([]);
  }, [currentWeek]);

  useEffect(() => {
    if (blockLoading && !isLoading) {
      setBlockLoading(false);
    }
  }, [isLoading]);

  const onWeekClick = (newWeek: number) => {
    dispatch(setCurrentWeek(newWeek) as any);
    setBlockLoading(true);
  };

  const onExpandAll = () => {
    if (expandedMatches.length > 0) {
      setExpandedMatches([]);
    } else {
      const allMatchIds = matches.map((match) => match.id);
      setExpandedMatches([...allMatchIds]);
    }
  };

  const onExpandClick = (matchId: number) => {
    let updatedExpandedMatches = [...expandedMatches];
    if (updatedExpandedMatches.includes(matchId)) {
      updatedExpandedMatches = updatedExpandedMatches.filter(
        (expandedMatchId) => expandedMatchId !== matchId
      );
    } else {
      updatedExpandedMatches.push(matchId);
    }

    setExpandedMatches(updatedExpandedMatches);
  };

  const renderRanking = () => {
    if (isMobile) {
      return null;
    }

    return <Ranking />;
  };

  const renderMatches = () => {
    return matches.map((match) => (
      <Match
        {...match}
        key={match.id}
        isLoading={blockLoading}
        isExpanded={expandedMatches.includes(match.id)}
        onExpandClick={onExpandClick}
      />
    ));
  };
  return (
    <div className={styles.container}>
      <div className={styles.leftContainer}>
        <div className={styles.floatingButtonContainer}>
          <div className={styles.floatingButton}>
            <Fab
              aria-label="expand or collapse matches"
              variant="extended"
              onClick={onExpandAll}
            >
              <Icon classes={{ root: 'fas fa-arrows-alt-v' }} />
              {expandedMatches.length > 0 ? 'Esconder' : 'Expandir'}
            </Fab>
          </div>
        </div>
        <WeekSelector
          routeTo={ROUTES.RESULTS.urlWithParams}
          onClick={onWeekClick}
        />
        <div className={styles.matchesContainer}>
          {blockLoading && <Loading isOverlay image={logo} style="headbutt" />}
          {renderMatches()}
        </div>
      </div>
      {renderRanking()}
    </div>
  );
};

export default Results;
