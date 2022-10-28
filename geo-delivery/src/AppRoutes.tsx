import { Route, Routes } from 'react-router-dom';
import { v4 as uuid} from 'uuid';
import { AuthPage, MainPage } from './UI';

const appRoutes = [
  { key: uuid(), path: '/', element: <MainPage/> },
  { key: uuid(), path: '/auth', element: <AuthPage/> },
];

const AppRoutes = () => {
  return (
    <Routes>
      {appRoutes.map((route) => <Route {...route}/>)}
    </Routes>
  )
};

export { AppRoutes };
