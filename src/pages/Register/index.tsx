import { useForm } from 'react-hook-form';

import styles from './register.module.scss';
import { FC, useRef, useState } from 'react';
import axios from 'axios';
import { RegisterFormData } from '../../types/auth';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { fetchRegister, selectIsAuth } from '../../redux/slices/auth';
import { Navigate } from 'react-router-dom';
import { Path } from '../../types/enums';

import DefaultAvatar from '../../assets/defaultAvatar.jpg';
import { ErrorMessage } from '../../components/ErrorMessage';

 const Register: FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>();
  const [avatarUrl, setAvatarUrl] = useState('');
  const isAuth = useAppSelector(selectIsAuth);
  const inputFileRef = useRef<HTMLInputElement | null>(null);
  const dispatch = useAppDispatch();

  const onSubmit = async (values: RegisterFormData) => {
    const fullData = { ...values, avatarUrl };
    console.log('Creating');
    const user = await dispatch(fetchRegister(fullData)).unwrap();
    console.log('Created');

    if (!user) {
      return alert('Could not register');
    }

    if ('token' in user) {
      window.localStorage.setItem('token', user.token);
    }
  };
  if (isAuth) {
    return <Navigate to={Path.Home} />;
  }
  const handleChangeFile = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    try {
      const formData = new FormData();
      const file = event.target.files?.[0];
      if (!file) return;
      formData.append('image', file);
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/uploadAvatar`,
        formData
      );
      setAvatarUrl(data.url);
    } catch (err) {
      console.warn(err);
      alert('Error while uploading a file');
    }
  };

  const daleteImg = () => {
    setAvatarUrl('');
  };

  return (
    <div className={styles.wrapper}>
      <h3>authorization</h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          ref={inputFileRef}
          onChange={handleChangeFile}
          type="file"
          hidden
        />
        {avatarUrl ? (
          <>
            <img
              className={styles.image}
              src={`${import.meta.env.VITE_API_URL}${avatarUrl}`}
              alt="Uploaded"
            />
            <button className={styles.deleteBtn} onClick={daleteImg}>
              Delete
            </button>
          </>
        ) : (
          <>
            <img
              className={styles.image}
              src={DefaultAvatar}
              alt="defaultAvatar"
            />
          </>
        )}
        <button
          className={styles.uploadBtn}
          onClick={() => inputFileRef.current?.click()}
        >
          Upload a photo
        </button>
        <input
          {...register('email', {
            required: 'Email is required',
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: 'Invalid email address',
            },
          })}
          placeholder="Email"
          type="email"
        />
        <ErrorMessage message={errors.email?.message} />
        <input
          {...register('fullName', {
            required: 'Full Name is required',
            maxLength: {
              value: 30,
              message: 'Full Name cannot exceed 30 characters',
            },
          })}
          placeholder="Name"
        />
        <ErrorMessage message={errors.fullName?.message} />
        <input
          {...register('password', {
            required: 'Password is required',
            minLength: {
              value: 5,
              message: 'Password must be at least 5 characters',
            },
            maxLength: {
              value: 20,
              message: 'Password cannot exceed 20 characters',
            },
          })}
          placeholder="Password"
          type="text"
        />
        <ErrorMessage message={errors.password?.message} />
        <input
          className={styles.submitBtn}
          type="submit"
          value="Create an account"
        />
      </form>
    </div>
  );
};

export default Register;