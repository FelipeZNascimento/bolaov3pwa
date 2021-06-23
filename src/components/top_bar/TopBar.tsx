import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { isMobile } from "react-device-detect";

import classNames from 'classnames';

// Selectors
import {
    selectIsLoading,
    selectUser,
} from 'store/user/selector';

// Components
import { CustomButton, LeftDrawer, RightDrawer } from 'components/index';
import { Loading } from 'components_fa/index';
import {
    Icon,
} from '@material-ui/core';
import {
    Person as PersonIcon,
    Menu as MenuIcon,
} from '@material-ui/icons';

import ROUTES from 'constants/routes';
import styles from './TopBar.module.scss';
import { TMenuOption } from 'components/commonTypes';
import logo from 'img/favicon.png';

const TopBar = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
    const [loginMenuOpen, setLoginMenuOpen] = useState<boolean>(false);

    const { pathname } = useLocation();

    const isLoading = useSelector(selectIsLoading);
    const loggedUser = useSelector(selectUser);

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
            display: ROUTES.RANKING.display,
            route: ROUTES.RANKING.url
        },
        {
            display: ROUTES.REGRAS.display,
            route: ROUTES.REGRAS.url
        },
    ];

    const renderMobileMenuButton = () => (
        <div className={styles.menuIcon}>
            <CustomButton
                startIcon={<MenuIcon />}
                text='Menu'
                onClick={() => setMobileMenuOpen(true)}
            />
        </div>
    );

    const renderLoginButton = () => {
        const buttonIcon = loggedUser
            ? <Icon className={loggedUser.icon} style={{ color: loggedUser.color }} />
            : <PersonIcon />;

        return (
            <div className={styles.menuIcon}>
                <CustomButton
                    color='grey'
                    startIcon={buttonIcon}
                    text={loggedUser ? loggedUser.name : 'Login'}
                    onClick={() => setLoginMenuOpen(true)}
                />
            </div>
        )
    };

    const renderButton = (item: TMenuOption) => {
        const buttonClass = classNames(
            [styles.button], {
            [styles.buttonSelected]: pathname !== '/' ? pathname.includes(item.route) : pathname === item.route,
            [styles.buttonDisabled]: item.disabled,
        });

        const textClass = classNames({
            [styles.textAnimation]: item.display === ROUTES.HOME.display
        });

        const renderButtonContent = () => (
            <div className={buttonClass} onClick={() => setMobileMenuOpen(false)}>
                {item.display === ROUTES.HOME.display && <img className={styles.image} alt="logo" src={logo} />}
                <span className={textClass}>{item.display}</span>
            </div>
        );

        if (item.disabled) {
            return renderButtonContent();
        }

        return (
            <Link to={item.route}>
                {renderButtonContent()}
            </Link>
        );
    };

    return (
        <div className={styles.container}>
            <div className={styles.buttonSection}>
                {isMobile ? renderMobileMenuButton() : menuOptions.map((item) => renderButton(item))}
            </div>
            <div className={styles.loginSection}>
                {isLoading && <Loading size='small' />}
                {!isLoading && renderLoginButton()}
            </div>
            <LeftDrawer
                isOpen={mobileMenuOpen}
                options={menuOptions}
                toggle={setMobileMenuOpen}
            />
            <RightDrawer
                isOpen={loginMenuOpen}
                toggle={setLoginMenuOpen}
            />
        </div>
    );
};

export default TopBar;
