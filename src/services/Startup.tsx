import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { loadCSS } from "fg-loadcss";

// Actions
import { fetchDefaultConfig } from 'store/app/actions';

// Selectors
import { selectIsLoading, selectUser } from 'store/user/selector';

import { ROUTES } from 'constants/routes';
import { TMenuOption } from 'components/commonTypes';

const Startup = (props: any) => {
    const dispatch = useDispatch();
    const isLoadingUser = useSelector(selectIsLoading);
    const loggedUser = useSelector(selectUser);
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
            display: ROUTES.REGRAS.display,
            route: ROUTES.REGRAS.url
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

    return props.children;
};

export default Startup;