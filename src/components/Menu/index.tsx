import { FC, useRef, useState } from 'react';
import {
  BsFillBellFill,
  BsFillGearFill,
  BsFillPersonFill,
} from 'react-icons/bs';

import styles from './MenuBar.module.scss';
import { Path, ToastMessage } from '../../types/enums';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../hooks/reduxHooks';
import { logout, selectIsAuth } from '../../redux/slices/auth';
import { useClickOutside } from '../../hooks/useClickOutside';
import { LuLogOut } from 'react-icons/lu';
import { useDispatch } from 'react-redux';
import { showToast } from '../../redux/slices/toast';

export const MenuBar: FC = () => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const isAuth = useAppSelector(selectIsAuth);
  const avatarUrl = useAppSelector(
    (state) => state.authReducer.data?.avatarUrl
  );
  const menuRef = useRef<HTMLDivElement>(null);

  useClickOutside(menuRef, () => setIsOpen(false));

   const handleLogOut = () => {
      if (window.confirm('Are you sure you want to log out?')) {
        dispatch(logout());
        window.localStorage.removeItem('token');
        dispatch(showToast(ToastMessage.Logout))
      }
    };

  return (
    <div className={styles.menuWrapper} ref={menuRef}>
      <button className={styles.menuButton} onClick={() => setIsOpen(!isOpen)}>
        {avatarUrl ? (
          <img
            src={`${import.meta.env.VITE_API_URL}${avatarUrl}`}
            alt="avatar"
          />
        ) : (
          <BsFillPersonFill />
        )}
      </button>
      <nav className={`${styles.menu} ${isOpen ? styles.active : ''}`}>
        <ul className={styles.menuList}>
          {isAuth && (
            <>
            <Link to={Path.Profile}>
              <li className={styles.menuItem}>
                <BsFillPersonFill className={styles.icon} />
                <span>Profile</span>
              </li>
            </Link>
            <li className={`${styles.menuItem} ${styles.menuItemLogout}`} onClick={handleLogOut}>
              <LuLogOut className={styles.logout} />
              <span>Log out</span>
            </li>
            </>
          )}
          <li className={styles.menuItem}>
            <BsFillGearFill className={styles.icon} />
            <span>Settings</span>
          </li>
          <li className={styles.menuItem}>
            <BsFillBellFill className={styles.icon} />
            <span>Notify</span>
          </li>
        </ul>
      </nav>
    </div>
  );
};
