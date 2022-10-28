import { useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react';
import { Avatar, IconButton } from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { userStore } from 'core/stores';
import { cn } from 'utils';

import './HeaderLogin.sass';
import { AvatarMenu } from '../AvatarMenu';

const cnHeaderLogin = cn('HeaderLogin');

const HeaderLogin = observer(() => {
  const currentUser = userStore.user;

  const navigate = useNavigate();

  return (
    <div className={cnHeaderLogin()}>
      {currentUser ? <AvatarMenu/> : <AccountCircle onClick={() => navigate('/auth')}/>}
    </div>
  )
});

export { HeaderLogin };