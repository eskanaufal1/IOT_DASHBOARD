import { createSlice } from "@reduxjs/toolkit";

const initialStates = {
  isDarkMode: false,
  backgroundColor: "#fff",
  textColor: "#000",
};

const themeSlice = createSlice({
  name: "theme",
  initialState: initialStates,
  reducers: {
    toggleTheme: (state) => {
      state.isDarkMode = !state.isDarkMode;
      state.backgroundColor = state.isDarkMode ? "#000" : "#fff";
      state.textColor = state.isDarkMode ? "#fff" : "#000";
    },
  },
});

export const { toggleTheme } = themeSlice.actions;

export default themeSlice.reducer;
