import { createSlice } from "@reduxjs/toolkit";

const initialStates = {
  isLogged: false,
};

const isLoggedSlice = createSlice({
  name: "isLogged",
  initialState: initialStates,
  reducers: {
    signIn: (state) => {
      state.isLogged = true;
    },
    signOut: (state) => {
      state.isLogged = false;
    },
  },
});

export const { signIn, signOut } = isLoggedSlice.actions;

export default isLoggedSlice.reducer;
