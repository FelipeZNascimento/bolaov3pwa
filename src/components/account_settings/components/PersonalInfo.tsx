import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { validateEmail } from 'services/helpers';

// Actions
import {
    onClearErrors,
    onUpdateUser
} from 'store/user/actions';

// Selectors
import {
    selectErrorMessage,
    selectHasError,
    selectIsLoading,
} from 'store/user/selector';

import { CustomButton, CustomTextField } from 'components/index';
import { Loading } from 'components_fa/index';
import {
    History as HistoryIcon,
    Lock as LockIcon,
    Save as SaveIcon,
} from '@material-ui/icons';

import {
    TAccountForm
} from '../types';
import {
    TUser
} from 'store/user/types';

import styles from './styles.module.scss';

type TProps = {
    loggedUser: TUser | null
};

const PersonalInfo = ({
    loggedUser
}: TProps) => {
    const [passwordFormVisible, setPasswordFormVisible] = useState<boolean>(false);
    const [invalidInputs, setInvalidInputs] = useState<string[]>([]);
    const [accountForm, setAccountForm] = useState<TAccountForm>({
        email: '',
        newPassword: '',
        password: '',
        fullName: '',
        name: ''
    });

    const dispatch = useDispatch();
    const errorMessage = useSelector(selectErrorMessage);
    const hasError = useSelector(selectHasError);
    const isLoading = useSelector(selectIsLoading);

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

    useEffect(() => {
        return () => {
            dispatch(onClearErrors());
        }
    }, [dispatch])

    const onChange = (e: any) => {
        const { id, value } = e.target;

        setAccountForm({
            ...accountForm,
            [id]: value
        });

        // Remove invalid inputs from array
        if (inputHasError(id)) {
            setInvalidInputs(invalidInputs.filter((inputId) => inputId !== id));
        }
    };

    const onConfirm = () => {
        setInvalidInputs([]);
        dispatch(onClearErrors());
        dispatch(onUpdateUser(
            accountForm.email,
            accountForm.newPassword,
            accountForm.password,
            accountForm.fullName,
            accountForm.name
        ));
    };

    const inputHasError = (id: string) => {
        return (invalidInputs.find((inputId) => inputId === id) !== undefined);
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

    const onRevertChanges = () => {
        setInvalidInputs([]);
        setPasswordFormVisible(false);
        dispatch(onClearErrors());

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

    const renderPasswordForm = () => (
        <>
            <CustomTextField
                className={inputHasError('password') ? styles.invalidInput : ''}
                error={inputHasError('password')}
                id="password"
                type="password"
                label="Senha atual"
                variant="outlined"
                value={accountForm.password}
                onChange={onChange}
                onKeyPress={onKeyPress}
            />
            <CustomTextField
                className={inputHasError('newPassword') ? styles.invalidInput : ''}
                error={inputHasError('newPassword')}
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

    return (
        <div className={styles.container}>
            <CustomTextField
                autoComplete="new-fullname"
                className={inputHasError('fullName') ? styles.invalidInput : ''}
                error={inputHasError('fullName')}
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
                className={inputHasError('email') ? styles.invalidInput : ''}
                error={inputHasError('email')}
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
                className={inputHasError('name') ? styles.invalidInput : ''}
                error={inputHasError('name')}
                id="name"
                type="name"
                label="Usuário"
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
            {hasError && <p className="align-center">{errorMessage}</p>}
            {isLoading && <Loading size='small' />}
        </div >
    )
};

export default PersonalInfo;