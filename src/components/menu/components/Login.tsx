import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// Actions
import { onLogin, onLogout } from 'store/user/actions';

// Selectors
import { selectIsLoading, selectUser } from 'store/user/selector';

// Components
import { Loading } from 'components_fa/index'

// Material UI
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
    Icon,
    TextField,
} from '@material-ui/core';

import { TLoginForm } from '../types';
import { TUser } from 'store/user/types';
import styles from './Login.module.scss';

const useStyles = makeStyles(() => ({
    root: {
        margin: '4px',
        opacity: 0.8,
        transition: '0.4s',
        width: '100%',
        '&:hover': {
            opacity: 1,
        },
    },
    default: {
        color: '#545859',
        backgroundColor: '#eceff1',
        cursor: 'pointer',
        '&:hover': {
            backgroundColor: '#9da4a7',
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
    isMobile?: boolean;
    onClose: (flag: boolean) => void;
    // onLogin: (form: TLoginForm) => void;
}

const Login = ({
    isMobile = false,
    onClose,
    // onLogin,
}: TProps) => {
    const [form, setForm] = useState<TLoginForm>({ email: '', password: '' });
    const [invalidInputs, setInvalidInputs] = useState<string[]>([]);
    const [loginMenu, setLoginMenu] = useState<string>('personal');

    const dispatch = useDispatch();
    const iconClasses = useStyles();

    const loggedUser = useSelector(selectUser);
    const isLoading = useSelector(selectIsLoading);

    const onChange = (e: any) => {
        const { id, value } = e.target;

        setForm({
            ...form,
            [id]: value
        });

        if (hasError(id)) {
            setInvalidInputs(invalidInputs.filter((inputId) => inputId !== id));
        }
    };

    const onConfirm = () => {
        setInvalidInputs([]);
        dispatch(onLogin(form.email, form.password))
    };

    const onFormError = () => {
        let invalidated = [];
        if (form.email === '') {
            invalidated.push('email');
        }

        if (form.password === '') {
            invalidated.push('password');
        }

        setInvalidInputs(invalidated);
    };

    const onFormCheck = () => {
        if (form.email !== '' && form.password !== '') {
            onConfirm();
        } else {
            onFormError();
        }
    };

    const onKeyPress = ({ key }: any) => {
        if (key === 'Enter') {
            onFormCheck();
        }
    };

    const hasError = (id: string) => {
        return (invalidInputs.find((inputId) => inputId === id) !== undefined);
    };

    const renderForm = () => (
        <>
            <CustomTextField
                autoFocus
                error={hasError('email')}
                id="email"
                type="email"
                label="email"
                variant="outlined"
                onChange={onChange}
                onKeyPress={onKeyPress}
            />
            <CustomTextField
                error={hasError('password')}
                id="password"
                type="password"
                label="password"
                variant="outlined"
                onChange={onChange}
                onKeyPress={onKeyPress}
            />
            <div className={styles.buttonContainer}>
                {/* <Avatar className={`${iconClasses.root} ${iconClasses.blue}`} variant="rounded">
                    <Tooltip title="Registrar"><PersonIcon /></Tooltip>
                </Avatar> */}
                <Button className={`${iconClasses.root} ${iconClasses.red}`} variant="contained" onClick={() => onClose(true)}>
                    <CloseIcon />
                </Button>
                <Button
                    className={`${iconClasses.root} ${iconClasses.green}`}
                    variant="contained"
                    onClick={() => onFormCheck()}
                >
                    <CheckIcon />
                </Button>
            </div>
            <Button className={`${iconClasses.root} ${iconClasses.blue}`} variant="contained">
                <PersonIcon /> Registre-se
            </Button>
        </>
    );

    const renderPersonalInfo = (user: TUser) => (
        <>
            <p>{user.fullName}</p>
            <p>{user.email}</p>
        </>
    );
    const renderPreferences = () => <p>b</p>;

    if (loggedUser) {
        return (
            <div className={styles.container}>
                <Button id="personal" className={`${iconClasses.root} ${iconClasses.default}`} variant="contained" onClick={() => setLoginMenu('personal')}>
                    <Icon className={`${loggedUser.icon} ${styles.icon}`} style={{ color: loggedUser.color }} /><b>{loggedUser.name}</b>
                </Button>
                <div className={loginMenu === 'personal' ? styles.accountOptionOpen : styles.accountOption}>
                    {renderPersonalInfo(loggedUser)}
                </div>
                <Button className={`${iconClasses.root} ${iconClasses.blue}`} variant="contained" onClick={() => setLoginMenu('preferences')}>
                    <SettingsIcon /> Preferências
                </Button>
                <div className={loginMenu === 'preferences' ? styles.accountOptionOpen : styles.accountOption}>
                    {renderPreferences()}
                </div>
                <Button className={`${iconClasses.root} ${iconClasses.red}`} variant="contained" onClick={() => dispatch(onLogout())}>
                    <ExitToAppIcon /> Logout
                </Button>
            </div>
        )
    }

    return (
        <div className={styles.container}>
            {isLoading && <Loading />}
            {!isLoading && renderForm()}
        </div>
    );
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
