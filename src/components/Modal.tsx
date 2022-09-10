import { PropsWithChildren, useEffect, useState } from 'react';

import withPortals from './withPortals';
import StringBuilder from '../models/StringBuilder';
import css from '../assets/stylesheets/modal.module.css';

type ModalProps = PropsWithChildren<{
  show: boolean;
  onClose?: () => void;
}>;

function Modal(props: ModalProps) {
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);

  const { children, show, onClose } = props;
  const className = new StringBuilder(' ').append(css.modal).appendIf(visible, css.show).toString();

  useEffect(() => {
    if (show && !mounted) setMounted(true);
    else if (show && !visible) setTimeout(setVisible, 500, true);
    else if (!show && visible) setVisible(false);
    else if (!show && mounted) setTimeout(setMounted, 500, false);
  }, [show, mounted, visible, setMounted, setVisible]);

  return mounted ? (
    <div className={className}>
      <div className={css.modal_dialog}>
        <button className={css.button_close} title="Close modal" onClick={onClose}>
          &times;
        </button>
        {children}
      </div>
    </div>
  ) : null;
}

export default withPortals(Modal);
