import { ReactElement } from 'react';
import { cn } from 'utils';

import './AppWrapper.sass';
import { SnackbarLogger } from '../SnackbarLogger';

const cnAppWrapper = cn('AppWrapper');

type AppWrapperProps = {
  children?: ReactElement | ReactElement[],

};

const AppWrapper = (props: AppWrapperProps) => {
  const { children } = props;

  return (
    <div className={cnAppWrapper()}>
      <SnackbarLogger/>
      {children}
    </div>
  )
};

export { AppWrapper };