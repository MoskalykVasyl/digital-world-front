import { FC, useEffect } from 'react';
import styles from './Profile.module.scss';
import { useAppSelector } from '../../hooks/reduxHooks';
import { selectIsAuth } from '../../redux/slices/auth';
import { Link, useNavigate } from 'react-router-dom';
import { Path } from '../../types/enums';
import { MdOutlineWatchLater } from 'react-icons/md';

const Profile: FC = () => {
  const user = useAppSelector((state) => state.authReducer.data);
  const lengthReadLater = useAppSelector((state)=> state.collectionsReducer.readLater.length)
  const isAuth = useAppSelector(selectIsAuth);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuth) {
      navigate(Path.Home);
    }
  }, [isAuth, navigate]);
  return (
    <div className={styles.profile}>
      <div className={styles.profile__avatar}>
        <img src={`${import.meta.env.VITE_API_URL}${user?.avatarUrl}`} />
      </div>
      <h2 className={styles.profile__name}>{user?.fullName}</h2>
      <div className={styles.collections}>
        <Link to={Path.ReadLater}>
        <div className={styles.item}>
        <MdOutlineWatchLater className={styles.icon} />
        <h5>Read Later</h5>
        <p>{lengthReadLater}</p>
        </div>
        </Link>
      </div>
    </div>
  );
};

export default Profile;
