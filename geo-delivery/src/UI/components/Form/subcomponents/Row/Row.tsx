import { ReactElement } from 'react';
import { IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { cnForm } from '../../helpers'

import '../../Form.sass';

type RowProps = {
  showAdd?: boolean,
  showRemove?: boolean,
  title?: string,
  children?: ReactElement | (ReactElement | null)[] | null,
  handleAdd?: () => void,
  handleRemove?: () => void,
};

const Row = (props: RowProps) => {
  const {
    showAdd,
    showRemove,
    title,
    children,
    handleAdd = () => {},
    handleRemove = () => {},
  } = props;

  return (
    <div>
      {title}
      <div className={cnForm('row')}>
        {children}
        <div className={cnForm('controllers')}>
          {showAdd && <IconButton onClick={handleAdd}><AddIcon/></IconButton>}
          {showRemove && <IconButton onClick={handleRemove}><DeleteOutlineIcon/></IconButton>}
        </div>
      </div>
    </div>
  )
};

export { Row };