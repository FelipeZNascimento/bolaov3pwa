import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

// Actions
import { onLogout } from 'store/user/actions';

// Selectors
import { selectUser } from 'store/user/selector';

import {
  ExitToApp as ExitToAppIcon,
  Settings as SettingsIcon
} from '@mui/icons-material';
import { Icon, Tooltip } from '@mui/material';
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
        color="grey"
        startIcon={
          <Icon
            className={`${loggedUser?.icon}`}
            style={{ color: loggedUser?.color }}
          />
        }
        text={loggedUser ? loggedUser.name : ''}
        onClick={() => setLoginMenu('personal')}
      />
      <div
        className={
          loginMenu === 'personal'
            ? styles.accountOptionOpen
            : styles.accountOption
        }
      >
        <PersonalInfo loggedUser={loggedUser} />
      </div>
      <CustomButton
        color="blue"
        startIcon={<SettingsIcon />}
        text="Preferências"
        onClick={() => setLoginMenu('preferences')}
      />
      <div
        className={
          loginMenu === 'preferences'
            ? styles.accountOptionOpen
            : styles.accountOption
        }
      >
        <Preferences loggedUser={loggedUser} />
      </div>
      <CustomButton
        color="red"
        startIcon={<ExitToAppIcon />}
        text="Logout"
        onClick={() => dispatch(onLogout() as any)}
      />
      <Tooltip title="Entre no nosso grupo do Telegram" arrow>
        <a href="https://t.me/joinchat/SvMGiAUj4m2FZge4" target="blank">
          <Icon
            className="fab fa-telegram"
            style={{ color: 'color-white', fontSize: 48 }}
          />
        </a>
      </Tooltip>
    </>
  );
};

export default AccountSettings;
