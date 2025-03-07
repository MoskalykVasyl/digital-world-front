import { FC } from 'react';
import styles from './userInfo.module.scss';
import { formatTime } from '../../utils/fromatTime';

interface UserInfoProps {
 
    fullName: string;
    avatarUrl: string;

  createdAt?:string;
}

export const UserInfo: FC<UserInfoProps> = ({fullName, avatarUrl, createdAt}) => {
  return (
    <div className={styles.wrapper_author_data}>
      <img
        className={styles.img_author}
        src={`${import.meta.env.VITE_API_URL}${avatarUrl}`}
        alt=""
      />
      <div className={styles.data_author}>
        <div className={styles.name_author}>{fullName}</div>
        {createdAt && <div className={styles.create_date}>{formatTime(createdAt)}</div>}
      </div>
    </div>
  );
};
