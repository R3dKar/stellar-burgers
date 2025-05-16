import {
  getOrdersApi,
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
import { TOrder, TUser } from '@utils-types';

export interface UserState {
  isAuthorizing: boolean;
  user?: TUser;
  orders?: TOrder[];
}

const initialState: UserState = {
  isAuthorizing: false
};

export const userLogin = createAsyncThunk(
  'user/login',
  async (loginData: TLoginData, { dispatch }) => {
    const { accessToken, refreshToken, user } = await loginUserApi(loginData);

    setCookie('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);

    dispatch(userOrdersRetrieve());

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
  async (registerData: TRegisterData, { dispatch }) => {
    const { accessToken, refreshToken, user } =
      await registerUserApi(registerData);

    setCookie('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);

    dispatch(userOrdersRetrieve());

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

export const userRetrieve = createAsyncThunk<TUser, void>(
  'user/retrieve',
  async (_, { dispatch }) => {
    const { user } = await getUserApi();

    dispatch(userOrdersRetrieve());

    return user;
  }
);

export const userOrdersRetrieve = createAsyncThunk(
  'user/ordersRetrieve',
  async () => getOrdersApi()
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // userRegister
    builder.addCase(userRegister.pending, (state) => {
      state.isAuthorizing = true;
    });
    builder.addCase(userRegister.fulfilled, (state, { payload }) => {
      state.user = payload;
      state.isAuthorizing = false;
    });
    builder.addCase(userRegister.rejected, (state) => {
      state.isAuthorizing = false;
    });

    // userLogin
    builder.addCase(userLogin.pending, (state) => {
      state.isAuthorizing = true;
    });
    builder.addCase(userLogin.fulfilled, (state, { payload }) => {
      state.user = payload;
      state.isAuthorizing = false;
    });
    builder.addCase(userLogin.rejected, (state) => {
      state.isAuthorizing = false;
    });

    // userLogout
    builder.addCase(userLogout.fulfilled, (state) => {
      state.user = undefined;
      state.orders = undefined;
      state.isAuthorizing = false;
    });

    // userUpdate
    builder.addCase(userUpdate.fulfilled, (state, { payload }) => {
      state.user = payload;
    });

    // userRetrieve
    builder.addCase(userRetrieve.pending, (state) => {
      state.isAuthorizing = true;
    });
    builder.addCase(userRetrieve.fulfilled, (state, { payload }) => {
      state.user = payload;
      state.isAuthorizing = false;
    });
    builder.addCase(userRetrieve.rejected, (state) => {
      state.isAuthorizing = false;
    });

    // userOrdersRetrieve
    builder.addCase(userOrdersRetrieve.fulfilled, (state, { payload }) => {
      state.orders = payload;
    });
  }
});

export const userReducer = userSlice.reducer;
