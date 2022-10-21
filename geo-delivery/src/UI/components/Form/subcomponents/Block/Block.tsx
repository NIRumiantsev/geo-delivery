import { ReactElement } from 'react';
import { cnForm } from '../../helpers';

import '../../Form.sass';

type RowProps = {
  title?: string,
  children?: ReactElement | (ReactElement | null)[] | null,
};

const Block = (props: RowProps) => {
  const { title, children } = props;

  return (
    <div className={cnForm('block')}>
      {!!title && (
        <div className={cnForm('title')}>
          {title}
        </div>
      )}
      {children}
    </div>
  )
};

export { Block };