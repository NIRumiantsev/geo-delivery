import { useNavigate } from 'react-router-dom';
import { Card, CardContent, Typography, Avatar } from '@mui/material';
import { styled } from '@mui/material/styles';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import SouthOutlinedIcon from '@mui/icons-material/SouthOutlined';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import AirlineSeatReclineExtraOutlinedIcon from '@mui/icons-material/AirlineSeatReclineExtraOutlined';
import { cn } from 'utils';
import { DeliveryItem } from 'types';

import './ItemCard.sass';

const cnItemCard = cn('ItemCard');

export type ItemCardProps = {
  item: DeliveryItem,
};

const SmallAvatar = styled(Avatar)(({ theme }) => ({
  width: 22,
  height: 22,
  background: '#1976d2',
  border: `2px solid ${theme.palette.background.paper}`,
}));

const ItemCard = (props: ItemCardProps) => {
  const {
    item,
  } = props;

  const {
    id,
    type,
    passengers,
    cargo,
    departure,
    destination,
  } = item;

  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/info/${type}/${id}`);
  };

  return (
    <Card
      className={cnItemCard()}
      onClick={handleClick}
    >
      <CardContent className={cnItemCard('content')}>
        <div className={cnItemCard('column')}>
          <div className={cnItemCard('city')}>
            <LocationCityIcon/>
            <div className={cnItemCard('column')}>
              <Typography variant="body2">{departure.city}</Typography>
              <Typography variant="caption">{departure.departure}</Typography>
            </div>
          </div>
          <SouthOutlinedIcon fontSize="small"/>
          <div className={cnItemCard('city')}>
            <LocationCityIcon/>
            <div className={cnItemCard('column')}>
              <Typography variant="body2">{destination.city}</Typography>
              <Typography variant="caption">{destination.arrive}</Typography>
            </div>
          </div>
        </div>
        <div className={cnItemCard('container')}>
          <Avatar sx={{ bgcolor: passengers ? '#1976d2' : 'primary', height: 32, width: 32 }}>
            <AirlineSeatReclineExtraOutlinedIcon fontSize="small"/>
          </Avatar>
          <Typography variant="body2">{passengers ? `${passengers} чел.` : 'Без пассажиров'}</Typography>
        </div>
        <div className={cnItemCard('container')}>
          <Avatar sx={{ bgcolor: cargo ? '#1976d2' : 'primary', height: 32, width: 32 }}>
            <LocalShippingOutlinedIcon fontSize="small"/>
          </Avatar>
          <Typography variant="body2">{cargo ? `${cargo} кг.` : 'Без груза'}</Typography>
        </div>
      </CardContent>
    </Card>
  )
};

export { ItemCard };