import { useRef, useState } from 'react';
import { observer } from 'mobx-react';
import { Avatar, Button, Menu, Typography } from '@mui/material';
import { serviceMap } from 'core';
import { userStore } from 'core/stores';
import { UserAvatar } from 'UI';
import { cn } from 'utils';

import './AvatarMenu.sass';

const cnAvatarMenu = cn('AvatarMenu');

const AvatarMenu = observer(() => {
  const [menuOpened, setMenuOpened] = useState<boolean>(false);

  const currentUser = userStore.user;

  const avatarRef = useRef(null);

  const handleExit = () => {
    serviceMap.auth.logout();
  };

  return (
    <div className={cnAvatarMenu()}>
      {currentUser && (
        <UserAvatar
          user={currentUser}
          ref={avatarRef}
          onClick={() => setMenuOpened(true)}
        />
      )}
      <Menu
        className={cnAvatarMenu('menu')}
        open={menuOpened}
        onClose={() => setMenuOpened(false)}
        anchorEl={avatarRef.current}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        anchorPosition={{
          top: 100,
          left: 0
        }}
      >
        <div className={cnAvatarMenu('item')}>
          <Avatar
            alt={currentUser?.info?.name}
            src={currentUser?.info?.avatar}
            sx={{ bgcolor: '#bada55' }}
            onClick={() => setMenuOpened(!menuOpened)}
          >
            {currentUser?.info?.name?.split(' ').map((word) => word[0]).join('')}
          </Avatar>
          <Typography>{currentUser?.info?.name}</Typography>
        </div>
        <div className={cnAvatarMenu('item')}>
          <Button onClick={handleExit}>
            Выход
          </Button>
        </div>
      </Menu>
    </div>
  )
});

export { AvatarMenu };