import { configureStore } from "@reduxjs/toolkit";
import { authSlice, calendarSlice, uiSlice } from "./";
import { usersSlice } from "./user/userSlice";

export const store = configureStore({
  reducer:{
    auth: authSlice.reducer,
    calendar: calendarSlice.reducer,
    ui: uiSlice.reducer,
    users: usersSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false
  })
});