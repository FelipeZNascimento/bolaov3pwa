import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { isMobile } from "react-device-detect";

import classNames from 'classnames';

// Components
import Login from './components/Login';
import {
    Button,
    SwipeableDrawer as Drawer,
    TextField,
    Tooltip
} from '@material-ui/core';
import {
    Person as PersonIcon,
    Menu as MenuIcon,
    Settings as SettingsIcon,
} from '@material-ui/icons';

import ROUTES from 'constants/routes';
import styles from './Menu.module.scss';
import { withStyles } from '@material-ui/core/styles';
import { TMenuButton } from './types';

const CustomDrawer = withStyles({
    root: {
        '& .MuiDrawer-paper': {
            backgroundColor: '#1b2f42',
        }
    }
})(Drawer);

const Menu = () => {
    const [isLogged, setIsLogged] = useState<boolean>(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
    const [mobileLoginOpen, setMobileLoginOpen] = useState<boolean>(false);

    const { pathname } = useLocation();

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
            display: ROUTES.BET.display,
            route: ROUTES.BET.url
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
                    {menuOptions.map((item) => renderButton(item))}
                </div>
            </CustomDrawer>
        )
    };

    const renderMobileLogin = () => {
        return (
            <CustomDrawer
                anchor='right'
                open={mobileLoginOpen}
                onClose={() => setMobileLoginOpen(false)}
                onOpen={() => setMobileLoginOpen(true)}
            >
                <Login
                    isLogged={isLogged}
                    isMobile={isMobile}
                    onClose={() => setMobileLoginOpen(false)}
                    onLogin={setIsLogged}
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

        return (
            <div className={buttonClass} onClick={() => setMobileLoginOpen(true)}>
                <Button
                    classes={{ root: isLogged ? 'color-green' : 'color-grey2' }}
                    startIcon={<PersonIcon />}
                    variant={isLogged ? "contained" : "outlined"}
                >
                    {isLogged ? 'Felipe' : 'Login'}
                </Button>
            </div>
        )
    };

    const renderButton = (item: TMenuButton) => {
        const buttonClass = classNames(
            [styles.button], {
            [styles.buttonSelected]: pathname === item.route
        });

        return (
            <Link to={item.route}>
                <div className={buttonClass} onClick={() => setMobileMenuOpen(false)}>{item.display}</div>
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
                {/* {isMobile ? renderMobileLoginButton() : <Login onLogin={setIsLogged} isLogged={isLogged} />} */}
            </div>
            {renderMobileMenu()}
            {renderMobileLogin()}
        </div>
    );
};

export default Menu;
