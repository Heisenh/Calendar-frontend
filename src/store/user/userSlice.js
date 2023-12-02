import { createSlice } from '@reduxjs/toolkit';

export const usersSlice = createSlice({
  name: 'users',
  initialState: {
    users: []
  },
  reducers: {
    onLoadingUsers: (state, {payload}) => {
      state.users = payload.users;
    },
  }
});


// Action creators are generated for each case reducer function
export const {
  onLoadingUsers,
} = usersSlice.actions;
