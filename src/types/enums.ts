export enum Status {
  Loading = 'loading',
  Success = 'success',
  Error = 'error',
}

export enum Path {
  Home = '/',
  Login = '/login',
  Register = '/register',
  AddPost = '/add-post',
  FullPost = '/posts/:id',
  PostByTag = '/tags/:name',
  EditPost = '/post/:id/edit',
  Profile = '/profile',
  ReadLater = '/profile/read-later'
}
