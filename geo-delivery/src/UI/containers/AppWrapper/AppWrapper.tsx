import { ReactElement, useEffect } from 'react';
import { cn } from 'utils';

import './AppWrapper.sass';
import { SnackbarLogger } from '../SnackbarLogger';
import { container, identifiers } from '../../../core';
import { AuthService } from '../../../core/services';

const cnAppWrapper = cn('AppWrapper');

type AppWrapperProps = {
  children?: ReactElement | ReactElement[],

};

const authService = container.get<AuthService>(identifiers.AUTH_SERVICE);

const AppWrapper = (props: AppWrapperProps) => {
  const { children } = props;

  useEffect(() => {
    authService.checkLogin();
  }, []);

  return (
    <div className={cnAppWrapper()}>
      <SnackbarLogger/>
      {children}
    </div>
  )
};

export { AppWrapper };