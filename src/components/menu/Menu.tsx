import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import classNames from 'classnames';

// Components
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { Avatar, TextField, Tooltip } from '@material-ui/core';
import {
    Close as CloseIcon,
    Check as CheckIcon,
    Person as PersonIcon,
    ExitToApp as ExitToAppIcon,
    Settings as SettingsIcon,
} from '@material-ui/icons';

import ROUTES from 'constants/routes';
import styles from './Menu.module.scss';
// import variables from 'styles/variables.scss';
import { TMenuButton } from './types';

const useStyles = makeStyles(() => ({
    default: {
        color: '#cfd8dc',
        backgroundColor: '#545859',
        cursor: 'pointer',
    },
    red: {
        color: '#cfd8dc',
        backgroundColor: '#be2a2a',
        cursor: 'pointer',
    },
    confirm: {
        color: '#cfd8dc',
        backgroundColor: '#197b30',
        cursor: 'pointer',
    },
    blue: {
        color: '#cfd8dc',
        backgroundColor: '#1565c0',
        cursor: 'pointer'
    },
    logged: {
        color: '#cfd8dc',
        backgroundColor: '#197b30',
    }
}));

const CustomTextField = withStyles({
    root: {
        '& label.Mui-focused': {
            color: 'black',
        },
        '& .MuiOutlinedInput-root': {
            '& input': {
                color: 'white'
            },
            '& fieldset': {
                borderColor: 'grey',
            },
            '&:hover fieldset': {
                borderColor: 'white',
            },
            '&.Mui-focused fieldset': {
                borderColor: 'white',
            },
        },
    },
})(TextField);

const Menu = () => {
    const [loginFieldOpen, setLoginFieldOpen] = useState<boolean>(false);
    const [isLogged, setIsLogged] = useState<boolean>(false);

    const { pathname } = useLocation();
    const iconClasses = useStyles();

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

    const renderButton = (item: TMenuButton) => {
        const buttonClass = classNames(
            [styles.button], {
            [styles.buttonSelected]: pathname === item.route
        });

        return (
            <Link to={item.route}>
                <div className={buttonClass}>{item.display}</div>
            </Link>
        );
    };

    const renderLogin = () => {
        if (isLogged) {
            return (
                <div className={styles.loginSection}>
                    <Avatar className={iconClasses.blue} variant="rounded">
                        <Tooltip title="Configurações"><SettingsIcon /></Tooltip>
                    </Avatar>
                    <Avatar className={iconClasses.red} variant="rounded" onClick={() => setIsLogged(false)}>
                        <Tooltip title="Desconectar"><ExitToAppIcon /></Tooltip>
                    </Avatar>
                </div>
            );
        }

        if (loginFieldOpen) {
            return (
                <div className={styles.loginSection}>
                    <Avatar className={iconClasses.blue} variant="rounded" onClick={() => setLoginFieldOpen(false)}>
                        <Tooltip title="Registrar"><PersonIcon /></Tooltip>
                    </Avatar>
                    <div className={styles.form}>
                        <CustomTextField id="outlined-basic" type="email" label="email" variant="outlined" />
                        <CustomTextField id="outlined-basic" type="password" label="password" variant="outlined" />
                    </div>
                    <Avatar className={iconClasses.confirm} variant="rounded" onClick={() => setIsLogged(true)}>
                        <Tooltip title="Confirmar"><CheckIcon /></Tooltip>
                    </Avatar>
                    <Avatar className={iconClasses.red} variant="rounded" onClick={() => setLoginFieldOpen(false)}>
                        <Tooltip title="Fechar"><CloseIcon /></Tooltip>
                    </Avatar>
                </div>
            )
        }

        return (
            <div className={styles.loginSection} onClick={() => setLoginFieldOpen(true)}>
                <Avatar className={iconClasses.default} variant="rounded">
                    <PersonIcon />
                </Avatar>
                <div className={styles.button}>
                    Login
                </div>
            </div>
        );
    };

    return (
        <div className={styles.container}>
            <div className={styles.buttonSection}>
                {menuOptions.map((item) => renderButton(item))}
            </div>
            {renderLogin()}
        </div>
    );
};

export default Menu;
