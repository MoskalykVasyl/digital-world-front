import styles from './login.module.scss';
import { useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { fetchAuth, selectIsAuth } from '../../redux/slices/auth';
import { AuthFormData } from '../../types/auth';
import { Navigate } from 'react-router-dom';
import { Path } from '../../types/enums';
import { FC } from 'react';
import { ErrorMessage } from '../../components/ErrorMessage';
import { AxiosErrorWithMessage } from '../../types/error';
import { TextInput } from '../../components/TextInput';

 const Login: FC = () => {
  const dispatch = useAppDispatch();
  const isAuth = useAppSelector(selectIsAuth);
  const errorMessage = useAppSelector((state)=> state.authReducer.errorMessage);
  const { register, handleSubmit } = useForm<AuthFormData>({
    defaultValues: {
      email: 'vasyl@gmail.com',
      password: '12345'
    }
  });
  

  const onSubmit = async (values: AuthFormData) => {
    try {
      const user = await dispatch(fetchAuth(values)).unwrap();
    if (!user) {
      return alert('Could not log in');
    }
    if('token' in user){
      window.localStorage.setItem('token', user.token);
    }

    } catch (error: unknown) {
      const axiosError = error as AxiosErrorWithMessage;
      console.error('Auth error:', axiosError.response?.data?.message || 'Unknown error occurred')
    }
  };

  if (isAuth) {
    return <Navigate to={Path.Home} />;
  }
  return (
    <div className={styles.wrapper}>
      <h3>authorization</h3>
      
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextInput 
          label='Email'
          placeholder='Enter your email'
          {...register('email', { required: 'Email is required'})}
        />
        <TextInput
          label='Password'
          type='password'
          placeholder='Enter your password'
          {...register('password', { required: 'Password is required' })}
         />
        {errorMessage && <ErrorMessage message={errorMessage} />}
        <input className={styles.submitBtn} type='submit' value="Sign up" />
      </form>
    </div>
  );
};

export default Login;