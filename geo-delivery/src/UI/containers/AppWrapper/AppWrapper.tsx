import { ReactElement, useEffect } from 'react';
import { Container } from '@mui/material';
import { SnackbarLogger, Header } from 'UI';
import { container, identifiers } from 'core';
import { AuthService } from 'core/services';
import { cn } from 'utils';

import './AppWrapper.sass';


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
      <Header/>
      <SnackbarLogger/>
      <Container maxWidth="xl">
        {children}
      </Container>
    </div>
  )
};

export { AppWrapper };