import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router';
import { AppBar, Typography, Container } from '@mui/material';
import { cn } from 'utils';
import { HeaderLogin } from './subcomponents';

import './Header.sass';

const cnHeader = cn('Header');

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const onAuthPage = useMemo(() => location.pathname === '/auth', [location]);

  return (
    <AppBar
      className={cnHeader()}
      position="fixed"
    >
      <Container maxWidth="xl">
        <div className={cnHeader('container')}>
          <Typography
            variant="h6"
            color="inherit"
            component="a"
            href="/"
            className={cnHeader('logo')}
            onClick={() => navigate('/')}
          >
            GeoDelivery
          </Typography>
          {!onAuthPage && <HeaderLogin/>}
        </div>
      </Container>
    </AppBar>
  )
};

export { Header };