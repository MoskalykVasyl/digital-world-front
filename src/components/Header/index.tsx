import { Link } from 'react-router-dom';
import { Button } from '../Button';

import styles from './Header.module.scss';
import { Path } from '../../types/enums';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { logout, selectIsAuth } from '../../redux/slices/auth';
import { FC } from 'react';
import { MenuBar } from '../Menu';


const signInBtnStyles = {
  color: 'rgb(25, 118, 210)',
  borderColor: 'rgb(25, 118, 210)',
};

const createBtnStyle = { backgroundColor: 'rgb(25, 118, 210)' };

const logOutBtnStyle = { backgroundColor: 'rgb(211, 47, 47)', borderWidth:'0px' };



export const Header: FC = () => {
  const isAuth = useAppSelector(selectIsAuth);
  const dispatch = useAppDispatch();

  const handleLogOut = () => {
    if (window.confirm('Are you sure you want to log out?')) {
      dispatch(logout());
      window.localStorage.removeItem('token');
    }
  };
  
  return (
    <div className={styles.header}>
      <Link to={Path.Home}>
        <div className={styles.logo}>digital world</div>
      </Link>
      
      <div className={styles.buttons}>

        {isAuth ? (
          <>
          <Link to={Path.AddPost}>
            <Button styles={signInBtnStyles}>New post</Button>
          </Link>
            <Button styles={logOutBtnStyle} onClick={handleLogOut}>
              Log out
            </Button>
          </>
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
    </div>
  );
};
