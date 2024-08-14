import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// Actions
import { onClearNotification } from 'store/app/actions';

// Selectors
import { selectNotifications } from 'store/app/selector';

import { TNotification } from 'store/app/types';

import Snackbar, { SnackbarCloseReason } from '@mui/material/Snackbar';
import { Alert as MUIAlert } from '@mui/material/';
import { SEVERITY, STATUS } from './status';

function Alert(props: any) {
  return <MUIAlert elevation={6} variant="filled" {...props} />;
}

type SnackbarMessage = {
  key: string;
  message: string;
  severity: string;
};

const Notification = () => {
  const [snackPack, setSnackPack] = useState<SnackbarMessage[]>([]);
  const [open, setOpen] = useState(false);
  const [messageInfo, setMessageInfo] = useState<SnackbarMessage | null>(null);

  const notificationTimeout = 2000;
  const dispatch = useDispatch();
  const notifications: TNotification[] = useSelector(selectNotifications);

  React.useEffect(() => {
    if (snackPack.length > 0 && !messageInfo) {
      setMessageInfo({ ...snackPack[0] });
      setSnackPack(snackPack.slice(1));
      setOpen(true);
    }
  }, [snackPack, messageInfo]);

  React.useEffect(() => {
    if (notifications.length > 0) {
      const notification = notifications[notifications.length - 1];
      const severity =
        notification.status !== null && notification.status !== undefined
          ? SEVERITY[notification.status]
          : SEVERITY[STATUS.SUCCESS];

      const newSnackbar = {
        key: notification.id || new Date().toString(),
        message: notification.message || '',
        severity
      };

      if (!snackPack.some((item) => item.key === newSnackbar.key)) {
        setSnackPack((prev) => [...prev, newSnackbar]);
      }
    }
  }, [notifications]);

  const clearNotification = () => {
    setMessageInfo(null);
    setOpen(false);
  };

  const renderNotification = () => {
    const handleClose = (
      event?: React.SyntheticEvent | Event,
      reason?: SnackbarCloseReason
    ) => {
      if (!messageInfo || reason === 'clickaway') {
        return;
      }
      clearNotification();
      dispatch(onClearNotification(messageInfo.key) as any);
    };

    return (
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        autoHideDuration={notificationTimeout}
        key={messageInfo ? messageInfo.key : undefined}
        open={open}
        onClose={handleClose}
      >
        <div>
          <Alert
            severity={messageInfo ? messageInfo.severity : undefined}
            onClose={handleClose}
          >
            {messageInfo ? messageInfo.message : undefined}
          </Alert>
        </div>
      </Snackbar>
    );
  };

  return renderNotification();
};

export default Notification;
