import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "./store";

export interface userState {
  id: number;
  name: string;
  email: string;
}

const initialState: userState | null = null;

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    storeUser: (state, { payload }) => {
      state = payload;
      return state;
    },
    logout: (state) => {
      state = null;
      return state;
    },
  },
});

export const { storeUser, logout } = userSlice.actions;

export const selectUser = (state: RootState) => state.user;

export default userSlice.reducer;
