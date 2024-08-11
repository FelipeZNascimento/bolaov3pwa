import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// Actions
import { onClearNotification } from 'store/app/actions';

// Selectors
import { selectNotifications } from 'store/app/selector';

import { TNotification } from 'store/app/types';

import Snackbar, { SnackbarCloseReason } from '@mui/material/Snackbar';
import MuiAlert from '@mui/lab/Alert';
import { SEVERITY, STATUS } from './status';

function Alert(props: any) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

type SnackbarMessage = {
  key: string;
  message: string;
  severity: string;
};

const Notification = () => {
  const [snackPack, setSnackPack] = useState<SnackbarMessage[]>([]);
  const [open, setOpen] = useState(false);
  const [messageInfo, setMessageInfo] = useState<SnackbarMessage | undefined>(
    undefined
  );

  const notificationTimeout = 3000;
  const dispatch = useDispatch();
  const notifications: TNotification[] = useSelector(selectNotifications);

  React.useEffect(() => {
    if (snackPack.length && !messageInfo) {
      // Set a new snack when we don't have an active one
      setMessageInfo({ ...snackPack[0] });
      setSnackPack((prev) => prev.slice(1));
      setOpen(true);
    } else if (snackPack.length && messageInfo && open) {
      // Close an active snack when a new one is added
      setOpen(false);
      dispatch(onClearNotification(messageInfo.key) as any);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [snackPack, messageInfo, open]);

  React.useEffect(() => {
    if (notifications.length > 0) {
      const notification = notifications[notifications.length - 1];
      const severity =
        notification.status !== null && notification.status !== undefined
          ? SEVERITY[notification.status]
          : SEVERITY[STATUS.SUCCESS];

      setSnackPack((prev) => [
        ...prev,
        {
          key: notification.id || new Date().toString(),
          message: notification.message || '',
          severity
        }
      ]);
    }
  }, [notifications]);

  const renderNotification = () => {
    const handleClose = (
      event?: React.SyntheticEvent | Event,
      reason?: SnackbarCloseReason
    ) => {
      if (!messageInfo || reason === 'clickaway') {
        return;
      }

      setOpen(false);
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
