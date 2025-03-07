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
  createdAt: string;
  user: {
    fullName: string;
    avatarUrl: string;
  }
  _id: string;
}

export interface Post {
  _id: string;
  title: string;
  text: string;
  tags: string[];
  commentsCount: number;
  viewsCount: number;
  user: User;
  imageUrl: string;
  comments?: Comment[];
  createdAt: string;
  updatedAt?: string;
  __v?: number;
}

export type AddPostFormData = {
  title: string;
  text: string;
  imageUrl?: string;
  tags: string;
}