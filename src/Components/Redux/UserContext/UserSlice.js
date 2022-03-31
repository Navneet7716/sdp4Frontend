import {  createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  isAuth: false
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    InitializeUser: (state, action) => {
      state.user = action.payload;
      state.isAuth = true
    },
    UpdateUser: (state, action) => {
      state.user.user = action.payload;
      state.isAuth = true
    },
    RemoveUser: (state) => {
      state.user = {};
      state.isAuth = false
    },
    updateImage: (state, action) => {
      state.image = action.payload
    },
    removeImage : (state) => {
      state.image = "/static/images/avatar/2.jpg"
    }
  },
});

export const { InitializeUser, RemoveUser, updateImage,removeImage, UpdateUser} = userSlice.actions;

export const selectUser = (state) => state.user ? state.user.user : null;
export const selectIsAuth = (state) => state.isAuth;
export const selectIsToken = (state) => state.user ? state.user.token  : null;
export const selectImage = (state) => state.image;

export default userSlice.reducer;
