import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { isMobile } from "react-device-detect";

import classNames from 'classnames';

// Selectors
import { selectIsLoading as selectIsLoadingLogin, selectUser } from 'store/user/selector';

// Components
import Login from './components/Login';
import { Loading } from 'components_fa/index';
import {
    Button,
    Icon,
    SwipeableDrawer as Drawer,
} from '@material-ui/core';
import {
    Person as PersonIcon,
    Menu as MenuIcon,
} from '@material-ui/icons';

import ROUTES from 'constants/routes';
import styles from './Menu.module.scss';
import { withStyles } from '@material-ui/core/styles';
import { TMenuButton } from './types';
import logo from 'img/favicon.png';

const CustomDrawer = withStyles({
    root: {
        '& .MuiDrawer-paper': {
            backgroundColor: '#1b2f42',
        }
    }
})(Drawer);

const Menu = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
    const [loginMenuOpen, setLoginMenuOpen] = useState<boolean>(false);

    const { pathname } = useLocation();

    const loggedUser = useSelector(selectUser);
    const isLoadingLogin = useSelector(selectIsLoadingLogin);

    const menuOptions: TMenuButton[] = [
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
            route: ROUTES.BETS.url
        },
        {
            display: ROUTES.EXTRAS.display,
            route: ROUTES.EXTRAS.url
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

    const renderMobileMenu = () => {
        return (
            <CustomDrawer
                anchor='left'
                open={mobileMenuOpen}
                onClose={() => setMobileMenuOpen(false)}
                onOpen={() => setMobileMenuOpen(true)}
            >
                <div className={styles.buttonSectionMobile}>
                    <div className={styles.logoMobile}><img className={styles.image} alt="logo" src={logo} /></div>

                    {menuOptions.map((item) => renderButton(item))}
                </div>
            </CustomDrawer>
        )
    };

    const renderMobileLogin = () => {
        return (
            <CustomDrawer
                anchor='right'
                open={loginMenuOpen}
                onClose={() => setLoginMenuOpen(false)}
                onOpen={() => setLoginMenuOpen(true)}
            >
                <Login
                    isMobile={isMobile}
                    onClose={() => setLoginMenuOpen(false)}
                />
            </CustomDrawer>
        )
    };

    const renderMobileMenuButton = () => (
        <div className={styles.menuIcon} onClick={() => setMobileMenuOpen(true)}>
            <Button
                classes={{ root: 'color-grey3' }}
                startIcon={<MenuIcon />}
            >
                Menu
            </Button>
        </div>
    );

    const renderLoginButton = () => {
        const buttonClass = classNames(
            [styles.menuIcon], {
            [styles.button]: !isMobile
        });


        const buttonIcon = loggedUser
            ? <Icon className={loggedUser.icon} style={{ color: loggedUser.color }} />
            : <PersonIcon />;

        return (
            <div className={buttonClass} onClick={() => setLoginMenuOpen(true)}>
                {isLoadingLogin && <Loading />}
                {!isLoadingLogin && <Button
                    classes={{ root: loggedUser ? 'color-grey4' : 'color-grey2' }}
                    startIcon={buttonIcon}
                    variant={loggedUser ? "contained" : "outlined"}
                >
                    <b>{loggedUser ? loggedUser.name : 'Login'}</b>
                </Button>}
            </div>
        )
    };

    const renderButton = (item: TMenuButton) => {
        const buttonClass = classNames(
            [styles.button], {
            [styles.buttonSelected]: pathname !== '/' ? pathname.includes(item.route) : pathname === item.route
        });

        const textClass = classNames({
            [styles.textAnimation]: item.display === ROUTES.HOME.display && !isMobile
        });

        return (
            <Link to={item.route}>
                <div className={buttonClass} onClick={() => setMobileMenuOpen(false)}>
                    {item.display === ROUTES.HOME.display && !isMobile && <img className={styles.image} alt="logo" src={logo} />}
                    <span className={textClass}>{item.display}</span>
                </div>
            </Link>
        );
    };

    return (
        <div className={styles.container}>
            <div className={styles.buttonSection}>
                {isMobile ? renderMobileMenuButton() : menuOptions.map((item) => renderButton(item))}
            </div>
            <div className={styles.loginSection}>
                {renderLoginButton()}
            </div>
            {renderMobileMenu()}
            {renderMobileLogin()}
        </div>
    );
};

export default Menu;
