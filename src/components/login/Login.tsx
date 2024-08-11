import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { validateEmail } from 'services/helpers';

// Actions
import { onClearErrors, onLogin, onRegister } from 'store/user/actions';

// Selectors
import {
  selectErrorMessage,
  selectHasError,
  selectIsLoading
} from 'store/user/selector';

// Components
import { CustomButton, CustomTextField } from 'components/index';
import { Loading } from '@omegafox/components';

// Material UI
import {
  Close as CloseIcon,
  Check as CheckIcon,
  Person as PersonIcon
} from '@mui/icons-material';

import { TLoginForm } from './types';
import styles from './Login.module.scss';
import logo from 'img/favicon.png';

type TProps = {
  onClose: (flag: boolean) => void;
};

const Login = ({ onClose }: TProps) => {
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
      dispatch(onClearErrors() as any);
    };
  }, [dispatch]);

  const onChange = (e: any) => {
    const { id, value } = e.target;
    setLoginForm({ ...loginForm, [id]: value });

    // Remove invalid inputs from array when user types anything
    if (isInputInvalid(id)) {
      setInvalidInputs(invalidInputs.filter((inputId) => inputId !== id));
    }
  };

  const onConfirm = () => {
    setInvalidInputs([]);
    if (isRegister) {
      dispatch(
        onRegister(
          loginForm.email,
          loginForm.password,
          loginForm.fullname,
          loginForm.name
        ) as any
      );
    } else {
      dispatch(onLogin(loginForm.email, loginForm.password) as any);
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

  const onKeyDown = ({ key }: any) => {
    if (key === 'Enter' && !isFormEmpty()) {
      isFormValid() && onConfirm();
    }
  };

  const isInputInvalid = (id: string) => {
    return invalidInputs.find((inputId) => inputId === id) !== undefined;
  };

  const isFormEmpty = () => {
    if (isRegister) {
      return (
        loginForm.email === '' ||
        loginForm.password === '' ||
        loginForm.fullname === '' ||
        loginForm.name === ''
      );
    } else {
      return loginForm.email === '' || loginForm.password === '';
    }
  };

  return (
    <>
      <div className={styles.formContainer}>
        <CustomTextField
          autoFocus
          id="email"
          type="text"
          label="Email"
          variant="outlined"
          error={isInputInvalid('email')}
          className={isInputInvalid('email') ? styles.invalidInput : ''}
          onChange={onChange}
          onKeyDown={onKeyDown}
        />
        <CustomTextField
          id="password"
          type="password"
          label="Senha"
          variant="outlined"
          error={isInputInvalid('password')}
          className={isInputInvalid('password') ? styles.invalidInput : ''}
          onChange={onChange}
          onKeyDown={onKeyDown}
        />
        {isRegister && (
          <CustomTextField
            id="fullname"
            type="text"
            label="Nome completo"
            variant="outlined"
            error={isInputInvalid('fullname')}
            className={isInputInvalid('fullname') ? styles.invalidInput : ''}
            onChange={onChange}
            onKeyDown={onKeyDown}
          />
        )}
        {isRegister && (
          <CustomTextField
            id="name"
            type="text"
            label="Usuário"
            variant="outlined"
            error={isInputInvalid('name')}
            className={isInputInvalid('name') ? styles.invalidInput : ''}
            inputProps={{ maxLength: 12 }}
            onChange={onChange}
            onKeyDown={onKeyDown}
          />
        )}
        {isLoading && <Loading size="small" image={logo} style="headbutt" />}
        {hasError && <p className="align-center">{errorMessage}</p>}
      </div>
      <div className={styles.buttonContainer}>
        <div className={styles.button}>
          <CustomButton
            color="red"
            startIcon={<CloseIcon />}
            onClick={() => onClose(true)}
          />
        </div>
        <div className={styles.button}>
          <CustomButton
            color="green"
            disabled={isFormEmpty()}
            startIcon={<CheckIcon />}
            onClick={onFormCheck}
          />
        </div>
      </div>
      {isRegister && (
        <CustomButton
          color="blue"
          startIcon={<PersonIcon />}
          text="Já tem registro? Faça login"
          onClick={() => {
            setIsRegister(false);
            dispatch(onClearErrors() as any);
          }}
        />
      )}
      {!isRegister && (
        <CustomButton
          color="blue"
          startIcon={<PersonIcon />}
          text="Registre-se"
          onClick={() => {
            setIsRegister(true);
            dispatch(onClearErrors() as any);
          }}
        />
      )}
    </>
  );
};

export default Login;
