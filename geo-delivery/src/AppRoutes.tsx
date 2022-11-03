import { Route, Routes } from 'react-router-dom';
import { v4 as uuid} from 'uuid';
import { AuthPage, CreatePage, MainPage } from './UI';

const appRoutes = [
  { key: uuid(), path: '/auth', element: <AuthPage/> },
  { key: uuid(), path: '/create', element: <CreatePage/> },
  { key: uuid(), path: '/', element: <MainPage/> },
];

const AppRoutes = () => {
  return (
    <Routes>
      {appRoutes.map((route) => <Route {...route}/>)}
    </Routes>
  )
};

export { AppRoutes };
