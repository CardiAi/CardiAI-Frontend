import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "./store";

// Define a type for the slice state
export interface userState {
  id: number;
  name: string;
  email: string;
}

// Define the initial state using that type
const initialState: userState | null = null;

export const userSlice = createSlice({
  name: "user",
  // `createSlice` will infer the state type from the `initialState` argument
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

// Other code such as selectors can use the imported `RootState` type
export const selectUser = (state: RootState) => state.user;

export default userSlice.reducer;
