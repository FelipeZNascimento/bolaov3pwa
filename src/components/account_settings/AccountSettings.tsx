import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

// Actions
import {
    onLogout
} from 'store/user/actions';

// Selectors
import {
    selectUser
} from 'store/user/selector';

import {
    ExitToApp as ExitToAppIcon,
    Settings as SettingsIcon,
} from '@material-ui/icons';
import {
    Icon,
} from '@material-ui/core';
import { CustomButton } from 'components/index';
import PersonalInfo from './components/PersonalInfo';
import Preferences from './components/Preferences';
import styles from './AccountSettings.module.scss';

const AccountSettings = () => {
    const [loginMenu, setLoginMenu] = useState<string>('');

    const dispatch = useDispatch();
    const loggedUser = useSelector(selectUser);

    return (
        <>
            <CustomButton
                color='grey'
                startIcon={<Icon className={`${loggedUser?.icon}`} style={{ color: loggedUser?.color }} />}
                text={loggedUser ? loggedUser.name : ''}
                onClick={() => setLoginMenu('personal')}
            />
            <div className={loginMenu === 'personal' ? styles.accountOptionOpen : styles.accountOption}>
                <PersonalInfo loggedUser={loggedUser} />
            </div>
            <CustomButton
                color='blue'
                startIcon={<SettingsIcon />}
                text='Preferências'
                onClick={() => setLoginMenu('preferences')}
            />
            <div className={loginMenu === 'preferences' ? styles.accountOptionOpen : styles.accountOption}>
                <Preferences loggedUser={loggedUser} />
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
