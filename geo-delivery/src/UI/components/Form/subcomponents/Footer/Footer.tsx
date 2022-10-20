import { Button } from '@mui/material';
import { cnForm } from '../../helpers';
import { useFormContext } from '../../context';

import '../../Form.sass';

type FooterProps = {
  submitText: string,
  cancelShown?: boolean,
  cancelText?: string,
  leftButtonShown?: boolean,
  leftButtonText?: string,
  leftButtonHandler?: () => void,
  analyticsId?: string,
  analyticsData?: {[key: string]: string}[]
};

const Footer = (props: FooterProps) => {
  const {
    cancelShown,
    cancelText,
    submitText,
    leftButtonShown,
    leftButtonText,
    leftButtonHandler,
  } = props;

  const { formChanged, onFormSubmit, onFormCancel } = useFormContext();

  return (
    <div className={cnForm('footer')}>
      {leftButtonShown && (
        <Button
          variant="text"
          onClick={leftButtonHandler}
        >
          {leftButtonText}
        </Button>
      )}
      <div className={cnForm('container')}>
        {cancelShown && (
          <Button
            variant="outlined"
            onClick={onFormCancel}
          >
            {cancelText || 'Отмена'}
          </Button>
        )}
        <Button
          variant="contained"
          disabled={!formChanged}
          onClick={onFormSubmit}
        >
          {submitText}
        </Button>
      </div>
    </div>
  )
};

export { Footer };