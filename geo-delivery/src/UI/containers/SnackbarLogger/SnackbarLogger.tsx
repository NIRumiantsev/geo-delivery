import { observer } from 'mobx-react';
import { Alert, Snackbar } from '@mui/material';
import { container, identifiers } from 'core';
import { LoggerService } from 'core/services';
import { loggerStore } from 'core/stores';
import { cn } from 'utils';

import './SnackbarLogger.sass';

const cnSnackbarLogger = cn('SnackbarLogger');

const SnackbarLogger = observer(() => {
  const loggerService = container.get<LoggerService>(identifiers.LOGGER_SERVICE);

  return (
    <div className={cnSnackbarLogger()}>
      {loggerStore.loggerQueue.map((item) => (
        <Snackbar
          key={item.id}
          open
          autoHideDuration={3000}
          onClose={() => {loggerService.removeLoggerItem(item.id)}}
        >
          <Alert
            severity={item.status}
            onClose={() => {loggerService.removeLoggerItem(item.id)}}
          >
            {item.text}
          </Alert>
        </Snackbar>
      ))}
    </div>
  )
});

export { SnackbarLogger };