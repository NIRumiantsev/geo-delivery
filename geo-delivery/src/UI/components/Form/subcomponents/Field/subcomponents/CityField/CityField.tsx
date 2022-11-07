import { useMemo, useRef, useState } from 'react';
import { observer } from 'mobx-react';
import { TextField as Input, Popper, Popover, Card , ClickAwayListener, MenuList, MenuItem } from '@mui/material';
import { BasicOption } from 'types';
import { serviceMap } from 'core';
import { searchStore } from 'core/stores';
import { FieldInputProps } from '../../types';
import { cnForm } from '../../../../helpers';

const CityField = observer((props: FieldInputProps) => {
  const { value, password,  onChange } = props;

  const [citiesOpen, setCitiesOpen] = useState<boolean>(false);

  const anchorRef = useRef(null);

  const cities = searchStore.citiesSearchList;

  const citiesOptions: BasicOption[] = useMemo(() => cities.map((city) => (
    { label: city.structured_formatting.main_text, value: city.description }
  )), [cities]);

  const handleCloseCities = () => {
    setCitiesOpen(false);
  };

  const handleChange = (input: string) => {
    serviceMap.search.searchCities(input);
    setCitiesOpen(true);
    onChange(input);
  };

  const handleSelectCity = (input: string) => {
    onChange(input);
    handleCloseCities();
  };

  return (
    <div className={cnForm('city')}>
      <Input
        {...props}
        ref={anchorRef}
        type={password ? 'password' : 'text'}
        value={value?.toString() || ''}
        onChange={(event) => handleChange(event.target.value)}
      />
      <Popper
        open={citiesOpen}
        anchorEl={anchorRef.current}
        placement="bottom-start"
      >
        <Card style={{ opacity: 1 }}>
          <ClickAwayListener onClickAway={handleCloseCities}>
            <MenuList>
              {citiesOptions.map(({ value, label }) => (
                <MenuItem
                  key={value}
                  onClick={() => handleSelectCity(label)}
                >
                  {value}
                </MenuItem>
              ))}
            </MenuList>
          </ClickAwayListener>
        </Card>
      </Popper>
    </div>
  )
});

export { CityField };