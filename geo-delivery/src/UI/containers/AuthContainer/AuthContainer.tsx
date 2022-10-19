import { observer } from 'mobx-react';
import { container, identifiers } from 'core';
import { UserStore, userStore } from 'core/stores';
import { useEffect } from 'react';
import { AuthService, UserService } from 'core/services';

const AuthContainer = observer(() => {
  const authService = container.get<AuthService>(identifiers.AUTH_SERVICE);

  useEffect(() => {
    const login = async () => {
      await authService.login({
        "login": "228228182212",
        "password": "123"
      });
      await container.get<UserService>(identifiers.USER_SERVICE).getUser('634bd5184faf7699999d4931');
    };
    login();
  }, []);

  return (
    <div>
      LOGIN { userStore.user?.login }
    </div>
  )
});

export { AuthContainer };