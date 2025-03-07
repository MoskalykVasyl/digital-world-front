import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../../types/types';
import { Status } from '../../types/enums';
import axios from '../../axios';

interface InitialState {
  posts: {
    items: Post[];
    sortType: number;
    status: Status;
  };
}

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  const { data } = await axios.get<Post[]>('/posts');
  return data;
});

export const fetchPostByTag = createAsyncThunk(
  '/posts/fetchPostByTag',
  async (tagName:string) => {
    const { data } = await axios.get<Post[]>(`/tags/${tagName}`);
    return data;
  }
);

export const fetchDeletePost = createAsyncThunk('/posts/fetchDeletePost', async(id:string)=>{
  axios.delete(`/posts/${id}`)
})

const initialState: InitialState = {
  posts: {
    items: [],
    sortType: 0,
    status: Status.Loading,
  },
};

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.posts.status = Status.Loading;
        state.posts.items = [];
      })
      .addCase(fetchPosts.fulfilled, (state, action: PayloadAction<Post[]>) => {
        state.posts.items = action.payload;
        state.posts.status = Status.Success;
      })
      .addCase(fetchPosts.rejected, (state) => {
        state.posts.status = Status.Error;
        state.posts.items = [];
      })
      //fetchByTag
      .addCase(fetchPostByTag.pending, (state) => {
        state.posts.status = Status.Loading;
        state.posts.items = [];
      })
      .addCase(
        fetchPostByTag.fulfilled,
        (state, action: PayloadAction<Post[]>) => {
          state.posts.items = action.payload;
          state.posts.status = Status.Success;
        }
      )
      .addCase(fetchPostByTag.rejected, (state) => {
        state.posts.status = Status.Error;
        state.posts.items = [];
      })
      .addCase(fetchDeletePost.pending, (state, action)=>{
        state.posts.items = state.posts.items.filter(post => post._id !== action.meta.arg)
      })
  },
});

export const postsReducer = postsSlice.reducer;
