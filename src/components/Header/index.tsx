import { Link } from 'react-router-dom';
import { Button } from '../Button';

import styles from './Header.module.scss';
import { Path } from '../../types/enums';
import { useAppSelector } from '../../hooks/reduxHooks';
import { selectIsAuth } from '../../redux/slices/auth';
import { FC } from 'react';
import { MenuBar } from '../Menu';

import { Toast } from '../Toast';

const signInBtnStyles = {
  color: 'rgb(25, 118, 210)',
  borderColor: 'rgb(25, 118, 210)',
};

const createBtnStyle = { backgroundColor: 'rgb(25, 118, 210)' };


export const Header: FC = () => {
  const isAuth = useAppSelector(selectIsAuth);

  return (
    <div className={styles.header}>
      <Link to={Path.Home}>
        <div className={styles.logo}>digital world</div>
      </Link>

      <div className={styles.buttons}>
        {isAuth ? (
          <Link to={Path.AddPost}>
            <Button styles={signInBtnStyles}>New post</Button>
          </Link>
        ) : (
          <>
            <Link to={Path.Login}>
              <Button styles={signInBtnStyles}>Sign in</Button>
            </Link>
            <Link to={Path.Register}>
              <Button styles={createBtnStyle}>Create an account</Button>
            </Link>
          </>
        )}
        <MenuBar />
      </div>
      <Toast />
    </div>
  );
};
