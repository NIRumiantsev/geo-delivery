import { useState } from 'react';
import { AuthContainer, RoleSwitch } from 'UI';
import { serviceMap } from 'core';
import { USER_ROLE } from 'core/services';
import { UserRole } from 'types';
import { cn } from 'utils';

import './AuthPage.sass';

const cnAuthPage = cn('AuthPage');

const AuthPage = () => {
  const userRole = serviceMap.storage.getLocalItem(USER_ROLE) as UserRole | null;

  const [currentRole, setUserRole] = useState<UserRole | null>(userRole);

  const handleChangeRole = (role: UserRole) => {
    setUserRole(role);
  };

  return (
    <div className={cnAuthPage()}>
      <div className={cnAuthPage('container')}>
        {currentRole ? <AuthContainer/> : <RoleSwitch handleChangeRole={handleChangeRole}/>}
      </div>
    </div>
  )
};

export { AuthPage };