import { Route, Routes } from 'react-router-dom';
import { v4 as uuid} from 'uuid';
import { AuthPage, CreatePage, MainPage, InfoPage } from './UI';

const appRoutes = [
  { key: uuid(), path: '/', element: <MainPage/> },
  { key: uuid(), path: '/auth', element: <AuthPage/> },
  { key: uuid(), path: '/create', element: <CreatePage/> },
  { key: uuid(), path: '/info/:type/:id', element: <InfoPage/> }
];

const AppRoutes = () => {
  return (
    <Routes>
      {appRoutes.map((route) => <Route {...route}/>)}
    </Routes>
  )
};

export { AppRoutes };
