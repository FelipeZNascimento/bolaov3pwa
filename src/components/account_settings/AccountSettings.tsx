import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import validateEmail from 'services/helpers';

// Actions
import {
    onLogout,
    onUpdateUser
} from 'store/user/actions';

// Selectors
import { selectUser } from 'store/user/selector';

import {
    History as HistoryIcon,
    Lock as LockIcon,
    Save as SaveIcon,
    ExitToApp as ExitToAppIcon,
    Settings as SettingsIcon,
} from '@material-ui/icons';
import {
    Icon,
} from '@material-ui/core';
import { CustomButton, CustomTextField } from 'components/index';
import {
    TAccountForm
} from './types';
import styles from './AccountSettings.module.scss';

const AccountSettings = () => {
    const [passwordFormVisible, setPasswordFormVisible] = useState<boolean>(false);
    const [invalidInputs, setInvalidInputs] = useState<string[]>([]);
    const [loginMenu, setLoginMenu] = useState<string>('');
    const [accountForm, setAccountForm] = useState<TAccountForm>({
        email: '',
        newPassword: '',
        password: '',
        fullName: '',
        name: ''
    });

    const dispatch = useDispatch();
    const loggedUser = useSelector(selectUser);

    useEffect(() => {
        if (loggedUser) {
            setAccountForm({
                ...accountForm,
                email: loggedUser.email,
                fullName: loggedUser.fullName,
                name: loggedUser.name
            })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loggedUser]);

    const onChange = (e: any) => {
        const { id, value } = e.target;

        setAccountForm({
            ...accountForm,
            [id]: value
        });

        // Remove invalid inputs from array
        if (hasError(id)) {
            setInvalidInputs(invalidInputs.filter((inputId) => inputId !== id));
        }
    };

    const onConfirm = () => {
        setInvalidInputs([]);
        dispatch(onUpdateUser(
            accountForm.email,
            accountForm.newPassword,
            accountForm.password,
            accountForm.fullName,
            accountForm.name
        ));
    };

    const isFormValid = () => {
        const invalid: string[] = [];
        const formKeys = Object.keys(accountForm) as (keyof TAccountForm)[];
        formKeys.forEach((key) => {
            if (key === 'email' && !validateEmail(accountForm[key])) {
                invalid.push(key as string);
                return;
            }

            if (passwordFormVisible && (key === 'password' || key === 'newPassword')) {
                if (accountForm[key].length < 6) {
                    invalid.push(key as string);
                } else if (accountForm[key] === '') {
                    invalid.push(key as string);
                }
            }

            if (!passwordFormVisible && key !== 'password' && key !== 'newPassword' && accountForm[key] === '') {
                invalid.push(key as string);
            }
        });

        setInvalidInputs(invalid);

        if (invalid.length > 0) {
            return false;
        }

        return true;
    };

    const onFormCheck = () => {
        if (isFormValid()) {
            onConfirm();
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

    const onRevertChanges = () => {
        setInvalidInputs([]);
        setPasswordFormVisible(false);
        if (loggedUser) {
            setAccountForm({
                ...accountForm,
                email: loggedUser.email,
                fullName: loggedUser.fullName,
                name: loggedUser.name,
                password: '',
                newPassword: ''
            })
        }
    };

    const renderPersonalInfo = () => (
        <div className={styles.accountContainer}>
            <CustomTextField
                autoComplete="new-fullname"
                className={hasError('fullName') ? styles.invalidInput : ''}
                error={hasError('fullName')}
                id="fullName"
                type="fullName"
                label="Nome completo"
                variant="outlined"
                value={accountForm.fullName}
                onChange={onChange}
                onKeyPress={onKeyPress}
            />
            <CustomTextField
                autoComplete="new-email"
                className={hasError('email') ? styles.invalidInput : ''}
                error={hasError('email')}
                id="email"
                type="email"
                label="Email"
                variant="outlined"
                value={accountForm.email}
                onChange={onChange}
                onKeyPress={onKeyPress}
            />
            <CustomTextField
                autoComplete="new-name"
                className={hasError('name') ? styles.invalidInput : ''}
                error={hasError('name')}
                id="name"
                type="name"
                label="Nome"
                variant="outlined"
                value={accountForm.name}
                onChange={onChange}
                onKeyPress={onKeyPress}
            />
            <CustomButton
                color='blue'
                startIcon={<LockIcon />}
                text='Alterar senha'
                onClick={() => setPasswordFormVisible(!passwordFormVisible)}
            />
            {passwordFormVisible && renderPasswordForm()}
            <div className={styles.buttonContainer}>
                <div className={styles.button}>
                    <CustomButton
                        color='orange'
                        startIcon={<HistoryIcon />}
                        tooltip='Reverter mudanças'
                        onClick={onRevertChanges}
                    />
                </div>
                <div className={styles.button}>
                    <CustomButton
                        color='green'
                        disabled={invalidInputs.length > 0}
                        startIcon={<SaveIcon />}
                        tooltip='Salvar'
                        onClick={onFormCheck}
                    />
                </div>
            </div>
        </div >
    );

    const renderPasswordForm = () => (
        <>
            <CustomTextField
                className={hasError('password') ? styles.invalidInput : ''}
                error={hasError('password')}
                id="password"
                type="password"
                label="Senha atual"
                variant="outlined"
                value={accountForm.password}
                onChange={onChange}
                onKeyPress={onKeyPress}
            />
            <CustomTextField
                className={hasError('newPassword') ? styles.invalidInput : ''}
                error={hasError('newPassword')}
                id="newPassword"
                type="password"
                label="Nova senha"
                variant="outlined"
                placeholder="6 ou mais caracteres"
                value={accountForm.newPassword}
                onChange={onChange}
                onKeyPress={onKeyPress}
            />
        </>
    );
    const renderPreferences = () => <p>b</p>;

    return (
        <>
            <CustomButton
                startIcon={<Icon className={`${loggedUser?.icon}`} style={{ color: loggedUser?.color }} />}
                text={loggedUser ? loggedUser.name : ''}
                onClick={() => setLoginMenu('personal')}
            />
            <div className={loginMenu === 'personal' ? styles.accountOptionOpen : styles.accountOption}>
                {renderPersonalInfo()}
            </div>
            <CustomButton
                color='blue'
                startIcon={<SettingsIcon />}
                text='Preferências'
                onClick={() => setLoginMenu('preferences')}
            />
            <div className={loginMenu === 'preferences' ? styles.accountOptionOpen : styles.accountOption}>
                {renderPreferences()}
            </div>
            <CustomButton
                color='red'
                startIcon={<ExitToAppIcon />}
                text='Logout'
                onClick={() => dispatch(onLogout())}
            />
        </>
    )
};

export default AccountSettings;
