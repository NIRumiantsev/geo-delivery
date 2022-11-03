import { useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react';
import { Button, Typography } from '@mui/material';
import { cn } from 'utils';
import { UserRole } from 'types';

import './ActionsContainer.sass';
import { userStore } from '../../../core/stores';

const cnActionsContainer = cn('ActionsContainer');

export type ActionsContainerProps = {
  role: UserRole,
  handleOpenMenu: () => void,
};

type ActionContent = {
  title: string,
  button: string,
};

const roleContentMap: Record<UserRole, ActionContent> = {
  customer: {
    title: 'Разместите заказ на перевозку груза или воспользуйтесь поиском готовых предложений',
    button: 'Разместить заказ'
  },
  mover: {
    title: 'Разместите предложение о перевозке груза или воспользуйтесь поиском заказов',
    button: 'Разместить предложение'
  }
};

const ActionsContainer = observer((props: ActionsContainerProps) => {
  const {
    role,
    handleOpenMenu,
  } = props;

  const user = userStore.user;

  const navigate = useNavigate();

  const handleCreate = () => {
    if (user) {
      navigate('/create');
    } else {
      navigate('/auth');
    }
  };

  return (
    <div className={cnActionsContainer()}>
      <Typography
        variant="h5"
        color="inherit"
      >
        {roleContentMap[role].title}
      </Typography>
      <div className={cnActionsContainer('container')}>
        <Button
          variant="outlined"
          onClick={handleOpenMenu}
        >
          Поиск
        </Button>
        <Button
          variant="contained"
          onClick={handleCreate}
        >
          {roleContentMap[role].button}
        </Button>
      </div>
    </div>
  )
});

export { ActionsContainer };