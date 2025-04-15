import { FC, useState } from 'react';
import {
  BsFillBellFill,
  BsFillGearFill,
  BsFillPersonFill,
} from 'react-icons/bs';

import styles from './MenuBar.module.scss';

export const MenuBar: FC = () => {
    const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={styles.menuWrapper}>
      <button className={styles.menuButton} onClick={()=>setIsOpen(!isOpen)}></button>
      <nav className={`${styles.menu} ${isOpen ? styles.active : ''}`}>
        <ul className={styles.menuList}>
          <li className={styles.menuItem}>
            <BsFillPersonFill className={styles.icon} />
            <span>Profile</span>
          </li>
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
