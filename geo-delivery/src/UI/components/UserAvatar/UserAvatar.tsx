import { RefObject } from 'react';
import { Avatar } from '@mui/material';
import { UserDto } from 'types';

export type UserAvatarProps = {
  user: UserDto,
  ref?: RefObject<HTMLDivElement>,
  onClick?: () => void,
};

const UserAvatar = (props: UserAvatarProps) => {
  const {
    user,
    ref,
    onClick = () => {},
  } = props;

  return (
    <Avatar
      ref={ref}
      alt={user?.info?.name}
      src={user?.info?.avatar}
      sx={{ bgcolor: '#bada55' }}
      onClick={onClick}
    >
      {user?.info?.name?.split(' ').map((word) => word[0]).join('')}
    </Avatar>
  )
};

export { UserAvatar };