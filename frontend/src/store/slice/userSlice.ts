'use client'
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface User {
  token: string;
  expiresIn: string;
  user: UserDetail;
}

export interface UserDetail {
  [x: string]: any;
  role: string;
  isEmailVerified: boolean;
  country: string;
  email: string;
  name: string;
  id: string;
}

const initialState: User = {
  token: '',
  expiresIn: '',
  user: {} as UserDetail ,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.token = action.payload.token;
      state.expiresIn = action.payload.expiresIn;
      state.user = action.payload.user;
    },
    logout: (state) => {
      state.token = '';
      state.expiresIn = '';
      state.user = {} as UserDetail;
    }
  }
});

export const { setUser, logout } = userSlice.actions;
export default userSlice.reducer;
