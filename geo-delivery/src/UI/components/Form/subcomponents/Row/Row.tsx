import { ReactElement } from 'react';
import { cnForm } from '../../helpers'

import '../../Form.sass';

type RowProps = {
  children?: ReactElement | ReactElement[],
};

const Row = (props: RowProps) => {
  const { children } = props;

  return (
    <div className={cnForm('row')}>
      {children}
    </div>
  )
};

export { Row };