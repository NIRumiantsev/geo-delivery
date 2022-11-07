import { ReactElement, useEffect } from 'react';
import { Container } from '@mui/material';
import { SnackbarLogger, Header } from 'UI';
import { serviceMap } from 'core';
import { cn } from 'utils';

import './AppWrapper.sass';

const cnAppWrapper = cn('AppWrapper');

type AppWrapperProps = {
  children?: ReactElement | ReactElement[],
};

const AppWrapper = (props: AppWrapperProps) => {
  const { children } = props;

  useEffect(() => {
    serviceMap.auth.checkLogin();
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