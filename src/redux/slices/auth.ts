import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../types/types';
import { Status } from '../../types/enums';
import axios from '../../axios';
import { AuthFormData, RegisterFormData } from '../../types/auth';
import { RootState } from '../store';
import { AxiosErrorWithMessage } from '../../types/error';

export const fetchAuth = createAsyncThunk<User, AuthFormData>(
  'auth/fetchAuth',
  async (params, { rejectWithValue }) => {
    try {
      const { data } = await axios.post<User>('/auth/login', params);
      return data;
    } catch (error: unknown) {
      const axiosError = error as AxiosErrorWithMessage;
      return rejectWithValue(
        axiosError.response?.data?.message || 'Unknown error occurred'
      );
    }
  }
);

export const fetchRegister = createAsyncThunk<User, RegisterFormData>(
  'auth/fetchRegister',
  async (params) => {
    console.log(params);
    const { data } = await axios.post<User>('/auth/register', params);
    return data;
  }
);

export const fetchAuthMe = createAsyncThunk('/auth/fetchAuthMe', async () => {
  const { data } = await axios.get<User>('/auth/me');
  return data;
});

interface InitialState {
  data: User | null;
  status: Status;
  errorMessage: string | null;
}

const initialState: InitialState = {
  data: null,
  status: Status.Loading,
  errorMessage: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.data = null;
    },
  },
  extraReducers(builder) {
    builder
      //Login
      .addCase(fetchAuth.pending, (state) => {
        state.data = null;
        state.status = Status.Loading;
      })
      .addCase(fetchAuth.fulfilled, (state, action: PayloadAction<User>) => {
        state.data = action.payload;
        state.status = Status.Success;
      })
      .addCase(fetchAuth.rejected, (state, action) => {
        state.data = null;
        state.status = Status.Error;
        state.errorMessage = (action.payload as string) || 'Error!';
      })
      //Register
      .addCase(fetchRegister.pending, (state) => {
        state.data = null;
        state.status = Status.Loading;
      })
      .addCase(
        fetchRegister.fulfilled,
        (state, action: PayloadAction<User>) => {
          state.data = action.payload;
          state.status = Status.Success;
        }
      )
      .addCase(fetchRegister.rejected, (state) => {
        state.data = null;
        state.status = Status.Error;
      })
      //check auth after page refresh
      .addCase(fetchAuthMe.pending, (state) => {
        state.data = null;
        state.status = Status.Loading;
      })
      .addCase(fetchAuthMe.fulfilled, (state, action: PayloadAction<User>) => {
        state.data = action.payload;
        state.status = Status.Success;
      })
      .addCase(fetchAuthMe.rejected, (state) => {
        state.data = null;
        state.status = Status.Error;
      });
  },
});

export const selectIsAuth = (state: RootState) =>
  Boolean(state.authReducer.data);

export const authReducer = authSlice.reducer;

export const { logout } = authSlice.actions;
