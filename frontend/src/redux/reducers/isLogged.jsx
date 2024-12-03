import { createSlice } from "@reduxjs/toolkit";

const initialStates = {
  isLogged: false,
  email: "",
  _id: "",
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
    setUser: (state, action) => {
      state.email = action.payload.email;
      state._id = action.payload._id;
    },
    removeUser: (state) => {
      state.email = "";
      state._id = "";
    },
  },
});

export const { signIn, signOut, setUser, removeUser } = isLoggedSlice.actions;

export default isLoggedSlice.reducer;
