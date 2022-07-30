import { createAction, createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentUser: null,
};

const userSLice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    signInSuccess: (state, action) => {
      state.currentUser = action.payload;
    },
    signOutSuccess: state => {
      state.currentUser = null;
    },
  },
});

export const emailSignInStart = payload => ({
  type: 'user/emailSignInStart',
  payload,
});

export const signUpStart = payload => ({
  type: 'user/signUpStart',
  payload,
});

export const signUpSuccess = payload => ({
  type: 'user/signUpSuccess',
  payload,
});

export const signInWithGoogleStart = payload => ({
  type: 'user/signInWithGoogleStart',
  payload,
});

export const { signInSuccess, signOutSuccess } = userSLice.actions;

export default userSLice.reducer;
