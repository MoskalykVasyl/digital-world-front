import React, { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Header } from './components/Header';
import { Path } from './types/enums';
import { useEffect } from 'react';
import { useAppDispatch } from './hooks/reduxHooks';
import { fetchAuthMe } from './redux/slices/auth';

import './App.css';
import { BeatLoader } from 'react-spinners';
import { CssLoadingPage } from './assets/cssObj/cssObj';

const Home = React.lazy(()=> import('./pages/Home'))
const Login = React.lazy(() => import('./pages/Login'));
const Register = React.lazy(() => import('./pages/Register'));
const AddPost = React.lazy(() => import('./pages/AddPost'));
const FullPost = React.lazy(() => import('./pages/FullPost'));
const PostByTag = React.lazy(() => import('./pages/PostByTag'));


function App() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchAuthMe());
  }, [dispatch]);
  return (
    <>
      <Header />
      <Suspense fallback={<BeatLoader cssOverride={CssLoadingPage} />}>
        <Routes>
          <Route path={Path.Home} element={<Home />} />
          <Route path={Path.Login} element={<Login />} />
          <Route path={Path.Register} element={<Register />} />
          <Route path={Path.AddPost} element={<AddPost />} />
          <Route path={Path.EditPost} element={<AddPost />} />
          <Route path={Path.FullPost} element={<FullPost />} />
          <Route path={Path.PostByTag} element={<PostByTag />} />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
