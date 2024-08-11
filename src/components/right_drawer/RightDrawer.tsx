import React from 'react';
import { useSelector } from 'react-redux';

// Selectors
import { selectUser } from 'store/user/selector';

import { AccountSettings, Login } from 'components/index';
import { SwipeableDrawer as Drawer } from '@mui/material';
import { withStyles } from '@mui/styles';
import styles from './RightDrawer.module.scss';

const CustomDrawer = withStyles({
  root: {
    '& .MuiDrawer-paper': {
      backgroundColor: '#1b2f42'
    }
  }
})(Drawer);

type TProps = {
  isOpen: boolean;
  toggle: (flag: boolean) => void;
};

const RightDrawer = ({ isOpen, toggle }: TProps) => {
  const loggedUser = useSelector(selectUser);

  const renderContent = () => {
    if (loggedUser) {
      return <AccountSettings />;
    }

    return <Login onClose={() => toggle(false)} />;
  };

  return (
    <CustomDrawer
      anchor="right"
      open={isOpen}
      onClose={() => toggle(false)}
      onOpen={() => toggle(true)}
    >
      <div className={styles.container}>{renderContent()}</div>
    </CustomDrawer>
  );
};

export default RightDrawer;
