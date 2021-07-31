import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { loadCSS } from "fg-loadcss";

// Components
import { LinearProgress } from 'components/index';

// Actions
import { fetchMatches } from 'store/matches/actions';
import {
    fetchDefaultConfig,
    fetchRanking,
    fetchSeasonRanking
} from 'store/app/actions';

// Selectors
import { selectIsLoading, selectUser } from 'store/user/selector';
import {
    selectCurrentWeek,
    selectCurrentSeason
} from 'store/app/selector';

import { ROUTES } from 'constants/routes';
import { TMenuOption } from 'components/commonTypes';

const Startup = (props: any) => {
    const [progress, setProgress] = useState<number>(0);
    const [isOnResultsOrBets, setIsOnResultsOrBets] = useState<boolean>(false);

    const dispatch = useDispatch();
    const isLoadingUser = useSelector(selectIsLoading);
    const loggedUser = useSelector(selectUser);
    const currentWeek = useSelector(selectCurrentWeek);
    const currentSeason = useSelector(selectCurrentSeason);
    const progressBarTimer = useRef<ReturnType<typeof setInterval> | null>(null);

    const { pathname } = useLocation();
    const history = useHistory();

    const menuOptions: TMenuOption[] = [
        {
            display: ROUTES.HOME.display,
            route: ROUTES.HOME.url
        },
        {
            display: ROUTES.RESULTS.display,
            route: ROUTES.RESULTS.url
        },
        {
            display: ROUTES.BETS.display,
            route: ROUTES.BETS.url,
            disabled: loggedUser ? false : true
        },
        {
            display: ROUTES.EXTRAS.display,
            route: ROUTES.EXTRAS.url,
            disabled: loggedUser ? false : true
        },
        {
            display: ROUTES.RECORDS.display,
            route: ROUTES.RECORDS.url
        },
        {
            display: ROUTES.RULES.display,
            route: ROUTES.RULES.url
        },
    ];

    useEffect(() => {
        dispatch(fetchDefaultConfig());
        loadCSS("https://use.fontawesome.com/releases/v5.15.0/css/all.css");
    }, [dispatch]);

    useEffect(() => {
        if (!isLoadingUser && !loggedUser) {
            const currentPath = menuOptions.find((option) => pathname.includes(option.route));

            if (currentPath !== undefined && currentPath.disabled) {
                history.push(ROUTES.HOME.url);
            }
        }
    }, [history, isLoadingUser, loggedUser, pathname]);

    const fetchRankings = () => {
        if (currentSeason !== null && currentWeek !== null && isOnResultsOrBets) {
            dispatch(fetchSeasonRanking(currentSeason as number));
            dispatch(fetchRanking(currentSeason as number, currentWeek as number));
            dispatch(fetchMatches(currentSeason as number, currentWeek as number));
        }
    };

    useEffect(() => {
        if (progressBarTimer.current !== null) {
            fetchRankings();
            setProgress(0);
            clearInterval(progressBarTimer.current);
            progressBarTimer.current = setInterval(timerFunction, 333); // From 0 to 100 -> every 30 seconds
        }
    }, [currentSeason, currentWeek, pathname]);

    useEffect(() => {
        if (pathname.includes(ROUTES.RESULTS.url)
            || pathname.includes(ROUTES.BETS.url)
            || pathname.includes(ROUTES.RANKING.url)
        ) {
            setIsOnResultsOrBets(true);
        } else {
            setIsOnResultsOrBets(false);
        }
    }, [pathname]);

    useEffect(() => {
        if (progressBarTimer.current === null && isOnResultsOrBets) {
            progressBarTimer.current = setInterval(timerFunction, 333); // From 0 to 100 -> every 30 seconds
        }

        if (progressBarTimer.current !== null && !isOnResultsOrBets) {
            setProgress(0);
            clearInterval(progressBarTimer.current);
            progressBarTimer.current = null;
        }
    }, [isOnResultsOrBets]);

    const timerFunction = () => {
        setProgress((oldProgress) => {
            if (oldProgress >= 100) {
                fetchRankings();
                return 0;
            }
            return oldProgress + 1.1111;
        });
    };

    return (
        <>
            {isOnResultsOrBets && <LinearProgress progress={progress} />}
            {props.children}
        </>
    )
};

export default Startup;