export interface User {
  _id: string;
  fullName: string;
  email: string;
  passwordHash: string;
  avatarUrl: string;
  createdAt: string;
  updatedAt: string;
  token: string;
  __v: number;
}

export interface Comment {
  text: string;
  user: Pick<User, 'fullName' | 'avatarUrl'>;
  createdAt: string;
  _id: string;
}

export interface Post {
  _id: string;
  title: string;
  text: string;
  tags: string[];
  commentsCount: number;
  viewsCount: number;
  user: Omit<User, 'email' | 'passwordHash' | 'createdAt' | 'updatedAt' | '__v' | 'token'>;
  imageUrl: string;
  comments?: Comment[];
  createdAt: string;
  updatedAt?: string;
  __v?: number;
}

export interface readLaterPost {
  _id: string;
  title: string;
}

export type AddPostFormData = Pick<Post, 'title' | 'text' | 'imageUrl'> & { tags: string };