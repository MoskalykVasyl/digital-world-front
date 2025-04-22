import { FC, useEffect } from 'react';
import styles from './Profile.module.scss';
import { useAppSelector } from '../../hooks/reduxHooks';
import { selectIsAuth } from '../../redux/slices/auth';
import { useNavigate } from 'react-router-dom';
import { Path } from '../../types/enums';

const Profile: FC = () => {
  const user = useAppSelector((state) => state.authReducer.data);
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
    </div>
  );
};

export default Profile;
