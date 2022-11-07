import { observer } from 'mobx-react';
import { Alert, Snackbar } from '@mui/material';
import { serviceMap } from 'core';
import { loggerStore } from 'core/stores';
import { cn } from 'utils';

import './SnackbarLogger.sass';

const cnSnackbarLogger = cn('SnackbarLogger');

const SnackbarLogger = observer(() => {
  return (
    <div className={cnSnackbarLogger()}>
      {loggerStore.loggerQueue.map((item) => (
        <Snackbar
          key={item.id}
          open
          autoHideDuration={3000}
          onClose={() => {serviceMap.logger.removeLoggerItem(item.id)}}
        >
          <Alert
            severity={item.status}
            onClose={() => {serviceMap.logger.removeLoggerItem(item.id)}}
          >
            {item.text}
          </Alert>
        </Snackbar>
      ))}
    </div>
  )
});

export { SnackbarLogger };