import { ReactElement, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react';
import { CreateDeliveryForm, CreateOrderForm } from 'UI';
import { serviceMap } from 'core';
import { userStore } from 'core/stores';
import { UserRole } from 'types';
import { cn } from 'utils';

import './CreatePage.sass';

const cnCreatePage = cn('CreatePage');

const CreatePage = observer(() => {
  const navigate = useNavigate();

  const user = userStore.user;
  const role = serviceMap.storage.getLocalItem<UserRole>('userRole');

  if (!user) {
    navigate('/auth');
    return null;
  }

  useEffect(() => {
    if (role === 'mover') {
      serviceMap.auto.getUserAutoList(user._id);
    }
  }, []);

  const roleFormMap: Record<UserRole, ReactElement> = {
    mover: <CreateDeliveryForm/>,
    customer: <CreateOrderForm/>
  };

  return (
    <div className={cnCreatePage()}>
      <div className={cnCreatePage('container')}>
        {roleFormMap[role]}
      </div>
    </div>
  )
});

export { CreatePage };