import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { hideToast } from '../../redux/slices/toast';

import styles from './Toast.module.scss';

export const Toast = () => {
  const dispatch = useAppDispatch();
  const { message, isVisible } = useAppSelector((state) => state.toastReducer);

  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        dispatch(hideToast());
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [isVisible, dispatch]);

  if (!isVisible) return null;

  return (
    <div className={styles.toast}>
      {message}
    </div>
  );
};


