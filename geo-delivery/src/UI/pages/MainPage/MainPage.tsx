import { SyntheticEvent, useEffect, useState } from 'react';
import { Tabs, Tab } from '@mui/material';
import { UserRole } from 'types';
import { ActionsContainer, SearchMenu, ITEMS_PER_PAGE_OPEN, ITEMS_PER_PAGE_CLOSE } from 'UI';
import { serviceMap } from 'core';
import { cn } from 'utils';

import './MainPage.sass';
import { deliveryStore, orderStore } from '../../../core/stores';

type LoadDataParams = { pageNumber: number, perPage: number };

const cnManePage = cn('MainPage');

const roles: UserRole[] = ['mover', 'customer'];

const MainPage = () => {
  const [searchMenuOpen, setSearchMenuOpen] = useState<boolean>(false);
  const [selectedRole, setSelectedRole] = useState<UserRole>(serviceMap.storage.getLocalItem<UserRole>('userRole') || roles[0]);
  const [itemPage, setItemPage] = useState<number>(0);

  useEffect(() => {
    if (!deliveryStore.totalDeliveries) serviceMap.delivery.getTotalDeliveries();
    if (!orderStore.totalOrders) serviceMap.order.getTotalOrders();
    loadData({ pageNumber: itemPage, perPage: ITEMS_PER_PAGE_CLOSE });
  }, []);

  const loadData = async (params: LoadDataParams) => {
    await serviceMap.order.searchOrders(params);
    await serviceMap.delivery.searchDeliveries(params);
  };

  const handleSelectRole = (e: SyntheticEvent, index: number) => {
    const role = roles[index];
    serviceMap.storage.setLocalItem('userRole', role);
    setSelectedRole(role);
  };

  const handleOpenMenu = () => {
    loadData({ pageNumber: itemPage, perPage: ITEMS_PER_PAGE_OPEN })
    setSearchMenuOpen(true)
  };

  const handleCloseMenu = () => {
    loadData({ pageNumber: itemPage, perPage: ITEMS_PER_PAGE_CLOSE })
    setSearchMenuOpen(false)
  };

  const handleChangeItemsPage = (page: number) => {
    loadData({ pageNumber: page, perPage: searchMenuOpen ? ITEMS_PER_PAGE_OPEN : ITEMS_PER_PAGE_CLOSE });
    setItemPage(page);
  };

  return (
    <div className={cnManePage()}>
      <Tabs
        value={roles.findIndex((role) => role === selectedRole)}
        onChange={handleSelectRole}
        className={cnManePage('tabs')}
      >
        <Tab label="Я перевозчик"/>
        <Tab label="Я хочу доставить посылку"/>
      </Tabs>
      <ActionsContainer
        role={selectedRole}
        handleOpenMenu={handleOpenMenu}
      />
      <SearchMenu
        open={searchMenuOpen}
        role={selectedRole}
        handleClose={handleCloseMenu}
        handleChangeItemsPage={handleChangeItemsPage}
      />
    </div>
  )
};

export { MainPage };