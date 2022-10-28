import { ReactElement, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react';
import { InfoForm, RegistrationForm, LoginForm } from 'UI';
import { cn } from 'utils';

import './AuthContainer.sass';

const cnAuthContainer = cn('AuthContainer');

type FormType = 'login' | 'register' | 'info';

const AuthContainer = observer(() => {

  const [currentForm, setCurrentForm] = useState<FormType>('register');

  const navigate = useNavigate();

  const formsMap: Record<FormType, ReactElement> = {
    login: (
      <LoginForm
        submitAction={() => navigate('/')}
        additionalButtonAction={() => setCurrentForm('register')}
      />
    ),
    register: (
      <RegistrationForm
        submitAction={() => setCurrentForm('info')}
        additionalButtonAction={() => setCurrentForm('login')}
      />
    ),
    info: <InfoForm submitAction={() => navigate('/')}/>
  }

  return (
    <div className={cnAuthContainer()}>
      {formsMap[currentForm]}
    </div>
  )
});

export { AuthContainer };