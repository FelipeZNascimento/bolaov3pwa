import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { validateEmail } from 'services/helpers';

// Actions
import {
    onClearErrors,
    onLogin,
    onRegister,
} from 'store/user/actions';

// Selectors
import {
    selectErrorMessage,
    selectHasError,
    selectIsLoading,
} from 'store/user/selector';

// Components
import { CustomButton, CustomTextField } from 'components/index';
import { Loading } from 'components_fa/index';

// Material UI
import {
    Close as CloseIcon,
    Check as CheckIcon,
    Person as PersonIcon,
} from '@material-ui/icons';

import {
    TLoginForm
} from './types';
import styles from './Login.module.scss';

type TProps = {
    onClose: (flag: boolean) => void;
};

const Login = ({
    onClose
}: TProps) => {
    const [loginForm, setLoginForm] = useState<TLoginForm>({
        email: '',
        password: '',
        fullname: '',
        name: ''
    });
    const [invalidInputs, setInvalidInputs] = useState<string[]>([]);
    const [isRegister, setIsRegister] = useState<boolean>(false);

    const dispatch = useDispatch();
    const errorMessage = useSelector(selectErrorMessage);
    const hasError = useSelector(selectHasError);
    const isLoading = useSelector(selectIsLoading);

    useEffect(() => {
        return () => {
            dispatch(onClearErrors());
        }
    }, [dispatch])

    const onChange = (e: any) => {
        const { id, value } = e.target;

        setLoginForm({
            ...loginForm,
            [id]: value
        });

        // Remove invalid inputs from array
        if (isInputInvalid(id)) {
            setInvalidInputs(invalidInputs.filter((inputId) => inputId !== id));
        }
    };

    const onConfirm = () => {
        setInvalidInputs([]);
        if (isRegister) {
            dispatch(onRegister(
                loginForm.email,
                loginForm.password,
                loginForm.fullname,
                loginForm.name,
            ))
        } else {
            dispatch(onLogin(loginForm.email, loginForm.password))
        }
    };

    const isFormValid = () => {
        const invalid: string[] = [];
        const formKeys = Object.keys(loginForm) as (keyof TLoginForm)[];
        formKeys.forEach((key) => {
            if (key === 'email' && !validateEmail(loginForm[key])) {
                invalid.push(key as string);
            } else if (loginForm[key] === '') {
                if (!isRegister && (key === 'fullname' || key === 'name')) {
                    return;
                }

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

    const isInputInvalid = (id: string) => {
        return (invalidInputs.find((inputId) => inputId === id) !== undefined);
    };

    return (
        <>
            <div className={styles.formContainer}>
                <CustomTextField
                    autoFocus
                    className={isInputInvalid('email') ? styles.invalidInput : ''}
                    error={isInputInvalid('email')}
                    id="email"
                    type="text"
                    label="Email"
                    variant="outlined"
                    onChange={onChange}
                    onKeyPress={onKeyPress}
                />
                <CustomTextField
                    className={isInputInvalid('password') ? styles.invalidInput : ''}
                    error={isInputInvalid('password')}
                    id="password"
                    type="password"
                    label="Senha"
                    variant="outlined"
                    onChange={onChange}
                    onKeyPress={onKeyPress}
                />
                {isRegister && <CustomTextField
                    className={isInputInvalid('fullname') ? styles.invalidInput : ''}
                    error={isInputInvalid('fullname')}
                    id="fullname"
                    type="text"
                    label="Nome completo"
                    variant="outlined"
                    onChange={onChange}
                    onKeyPress={onKeyPress}
                />}
                {isRegister && <CustomTextField
                    className={isInputInvalid('name') ? styles.invalidInput : ''}
                    error={isInputInvalid('name')}
                    id="name"
                    type="text"
                    label="Usuário"
                    variant="outlined"
                    onChange={onChange}
                    onKeyPress={onKeyPress}
                />}
                {isLoading && <Loading size='small' />}
                {hasError && <p className="align-center">{errorMessage}</p>}
            </div>
            <div className={styles.buttonContainer}>
                <div className={styles.button}>
                    <CustomButton
                        color='red'
                        startIcon={<CloseIcon />}
                        onClick={() => onClose(true)}
                    />
                </div>
                <div className={styles.button}>
                    <CustomButton
                        color='green'
                        startIcon={<CheckIcon />}
                        onClick={() => onFormCheck()}
                    />
                </div>
            </div>
            {!isRegister && <CustomButton
                color='blue'
                startIcon={<PersonIcon />}
                text='Registre-se'
                onClick={() => { setIsRegister(true); dispatch(onClearErrors()); }}
            />}
        </>
    );
};

export default Login;
