import { useEffect } from 'react';
import { useParams } from 'react-router';
import { serviceMap } from 'core';
import { ListType } from 'types';
import { DeliveryInfo, OrderInfo } from 'UI';

type InfoParams = { type: ListType | 'user', id: string };

const dataLoadingMap = {
  delivery: (id: string) => serviceMap.delivery.loadDeliveryById(id),
  order: (id: string) => serviceMap.order.loadOrderById(id),
  user: () => {},
};

const contentMap = {
  delivery: <DeliveryInfo/>,
  order: <OrderInfo/>,
  user: <div/>,
};

const InfoPage = () => {
  const { type, id } = useParams<InfoParams>();

  useEffect(() => {
    const loadData = async () => {
      if (!type || !id) return;
      await dataLoadingMap[type](id);
    };
    loadData();
  }, []);

  if (!type || !id) return null;

  return (
    <div>
      {contentMap[type]}
    </div>
  )
};

export { InfoPage };