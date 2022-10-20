import { ReactElement, useState } from 'react';
import { observer } from 'mobx-react';
import { UserRole } from 'types';
import { InfoForm, RegistrationForm, LoginForm } from 'UI';
import { cn } from 'utils';

import './AuthContainer.sass';

const cnAuthContainer = cn('AuthContainer');

type FormType = 'login' | 'register' | 'info';

const AuthContainer = observer(() => {

  const [currentForm, setCurrentForm] = useState<FormType>('login');

  const formsMap: Record<FormType, ReactElement> = {
    login: <LoginForm additionalButtonAction={() => setCurrentForm('register')}/>,
    register: (
      <RegistrationForm
        submitAction={() => setCurrentForm('info')}
        additionalButtonAction={() => setCurrentForm('login')}
      />
    ),
    info: <InfoForm/>
  }

  return (
    <div className={cnAuthContainer()}>
      {formsMap[currentForm]}
    </div>
  )
});

export { AuthContainer };