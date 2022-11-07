import { ButtonGroup, Button } from '@mui/material';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import { serviceMap } from 'core';
import { USER_ROLE } from 'core/services';
import { UserRole } from 'types';

export type RoleSwitchProps = {
  handleChangeRole: (role: UserRole) => void;
}

const RoleSwitch = (props: RoleSwitchProps) => {
  const { handleChangeRole } = props;

  const handleSelectRole = (role: UserRole) => {
    serviceMap.storage.setLocalItem(USER_ROLE, role);
    handleChangeRole(role);
  };

  return (
    <ButtonGroup
      variant="outlined"
      aria-label="outlined button group"
    >
      <Button onClick={() => handleSelectRole('mover')}>
        <LocalShippingOutlinedIcon/>
        Я перевозчик
      </Button>
      <Button onClick={() => handleSelectRole('customer')}>
        <PersonOutlineOutlinedIcon/>
        Я хочу отправить посылку
      </Button>
    </ButtonGroup>
  )
}

export { RoleSwitch };