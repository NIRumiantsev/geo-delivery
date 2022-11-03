import { Container, Drawer, IconButton, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { ItemList, SearchForm, ListType, ITEMS_PER_PAGE_OPEN, ITEMS_PER_PAGE_CLOSE } from 'UI';
import { cn } from 'utils';
import { UserRole } from 'types';

import './SearchMenu.sass';

const cnSearchMenu = cn('SearchMenu');

export type FilterMenuProps = {
  open: boolean,
  role: UserRole,
  handleClose: () => void,
  handleChangeItemsPage: (page: number) => void,
};

const roleListTypeMap: Record<UserRole, ListType> = {
  mover: 'order',
  customer: 'delivery',
};

const listTitleMap: Record<UserRole, string> = {
  mover: 'Размещенные заказы',
  customer: 'Предложения о перевозке'
};

const SearchMenu = (props: FilterMenuProps) => {
  const {
    open,
    role,
    handleClose,
    handleChangeItemsPage,
  } = props;

  return (
    <Drawer
      variant="permanent"
      open={open}
      anchor="bottom"
    >
      <Container maxWidth="xl">
        <div className={cnSearchMenu('content', { open })}>
          {open && (
            <IconButton
              className={cnSearchMenu('close')}
              onClick={handleClose}
            >
              <CloseIcon/>
            </IconButton>
          )}
          {open && <SearchForm listType={roleListTypeMap[role]}/>}
          {open ? <Typography variant="h6">Результаты поиска</Typography> : <Typography variant="h6">{listTitleMap[role]}</Typography>}
          <ItemList
            itemsNumber={open ? ITEMS_PER_PAGE_OPEN : ITEMS_PER_PAGE_CLOSE}
            listType={roleListTypeMap[role]}
            handleChangeItemsPage={handleChangeItemsPage}
          />
        </div>
      </Container>
    </Drawer>
  )
};

export { SearchMenu };