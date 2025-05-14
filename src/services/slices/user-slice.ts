import {
  getUserApi,
  loginUserApi,
  logoutApi,
  registerUserApi,
  TLoginData,
  TRegisterData,
  updateUserApi
} from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { deleteCookie, setCookie } from '@src/utils/cookie';
import { TUser } from '@utils-types';

export interface UserState {
  user?: TUser;
}

const initialState: UserState = {};

export const userLogin = createAsyncThunk(
  'user/login',
  async (loginData: TLoginData) => {
    const { accessToken, refreshToken, user } = await loginUserApi(loginData);

    setCookie('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);

    return user;
  }
);

export const userLogout = createAsyncThunk('user/logout', async () => {
  await logoutApi();

  deleteCookie('accessToken');
  localStorage.removeItem('refreshToken');
});

export const userRegister = createAsyncThunk(
  'user/register',
  async (registerData: TRegisterData) => {
    const { accessToken, refreshToken, user } =
      await registerUserApi(registerData);

    setCookie('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);

    return user;
  }
);

export const userUpdate = createAsyncThunk(
  'user/update',
  async (updateData: Partial<TRegisterData>) => {
    const { user } = await updateUserApi(updateData);

    return user;
  }
);

export const userRetrieve = createAsyncThunk('user/retrieve', async () => {
  const { user } = await getUserApi();

  return user;
});

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // userRegister
    builder.addCase(userRegister.fulfilled, (state, { payload }) => {
      state.user = payload;
    });

    // userLogin
    builder.addCase(userLogin.fulfilled, (state, { payload }) => {
      state.user = payload;
    });

    // userLogout
    builder.addCase(userLogout.fulfilled, (state) => {
      state.user = undefined;
    });

    // userUpdate
    builder.addCase(userUpdate.fulfilled, (state, { payload }) => {
      state.user = payload;
    });

    // userRetrieve
    builder.addCase(userRetrieve.fulfilled, (state, { payload }) => {
      state.user = payload;
    });
  }
});

export const userReducer = userSlice.reducer;
