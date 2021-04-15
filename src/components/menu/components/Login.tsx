import React from 'react';

import { withStyles, makeStyles } from '@material-ui/core/styles';

import {
    Close as CloseIcon,
    Check as CheckIcon,
    Person as PersonIcon,
    ExitToApp as ExitToAppIcon,
    Settings as SettingsIcon,
} from '@material-ui/icons';

import {
    Button,
    TextField,
} from '@material-ui/core';

import styles from './Login.module.scss';

const useStyles = makeStyles(() => ({
    root: {
        flex: 1,
        margin: '4px',
        opacity: 0.8,
        transition: '0.4s',
        '&:hover': {
            opacity: 1,
        },
    },
    default: {
        color: '#cfd8dc',
        backgroundColor: '#545859',
        cursor: 'pointer',
        '&:hover': {
            backgroundColor: '#545859',
        },
    },
    red: {
        backgroundColor: '#be2a2a',
        color: '#cfd8dc',
        cursor: 'pointer',
        '&:hover': {
            backgroundColor: '#be2a2a',
        },
    },
    green: {
        color: '#cfd8dc',
        backgroundColor: '#197b30',
        cursor: 'pointer',
        '&:hover': {
            backgroundColor: '#197b30',
        },
    },
    blue: {
        color: '#cfd8dc',
        backgroundColor: '#1565c0',
        cursor: 'pointer',
        '&:hover': {
            backgroundColor: '#1565c0',
        },
    },
    logged: {
        color: '#cfd8dc',
        backgroundColor: '#197b30',
        '&:hover': {
            backgroundColor: '#197b30',
        },
    }
}));

const CustomTextField = withStyles({
    root: {
        '& label': {
            color: 'lightgrey',
        },
        '& label.Mui-focused': {
            color: 'grey',
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

type TProps = {
    isLogged: boolean;
    isMobile?: boolean;
    onClose: (flag: boolean) => void;
    onLogin: (flag: boolean) => void;
}

const Login = ({
    isLogged = false,
    isMobile = false,
    onClose,
    onLogin
}: TProps) => {
    const iconClasses = useStyles();

    const renderUserOptions = () => (
        <div className={styles.form}>
            <Button className={`${iconClasses.root} ${iconClasses.green}`} variant="contained">
                <PersonIcon /> Felipe
            </Button>
            <Button className={`${iconClasses.root} ${iconClasses.blue}`} variant="contained">
                <SettingsIcon /> Preferências
                </Button>
            <Button className={`${iconClasses.root} ${iconClasses.red}`} variant="contained" onClick={() => onLogin(false)}>
                <ExitToAppIcon /> Logout
            </Button>
        </div>
    );

    const renderForm = () => (
        <div className={styles.form}>
            <CustomTextField id="outlined-basic" type="email" label="email" variant="outlined" />
            <CustomTextField id="outlined-basic" type="password" label="password" variant="outlined" />
            <div className={styles.buttonContainer}>
                {/* <Avatar className={`${iconClasses.root} ${iconClasses.blue}`} variant="rounded">
                    <Tooltip title="Registrar"><PersonIcon /></Tooltip>
                </Avatar> */}
                <Button className={`${iconClasses.root} ${iconClasses.green}`} variant="contained" onClick={() => {onLogin(true); onClose(true)}}>
                    <CheckIcon />
                </Button>
                <Button className={`${iconClasses.root} ${iconClasses.red}`} variant="contained" onClick={() => onClose(true)}>
                    <CloseIcon />
                </Button>
            </div>
            <Button className={`${iconClasses.root} ${iconClasses.blue}`} variant="contained">
                <PersonIcon /> Registre-se
            </Button>
        </div>
    );

    if (isLogged) {
        return renderUserOptions();
    }

    return renderForm();
    // }

    // return (
    //     <>
    //         <Avatar className={iconClasses.default} variant="rounded" onClick={() => setLoginFieldOpen(true)}>
    //             <PersonIcon />
    //         </Avatar>
    //         <div className={styles.button} onClick={() => setLoginFieldOpen(true)}>
    //             Login
    //         </div>
    //     </>
    // );
};

export default Login;
