import { createSlice } from "@reduxjs/toolkit";

const initialStates = {
  realtimeData: [],
  isUpdated: false,
};

const realtimeDataSlice = createSlice({
  name: "realtime_Data",
  initialState: initialStates,
  reducers: {
    setData: (state, action) => {
      state.realtimeData = action.payload;
      if (state.realtimeData == action.payload) {
        state.isUpdated = true;
      } else {
        state.isUpdated = false;
      }
    },
    setIsUpdated: (state, action) => {
      state.isUpdated = true;
    },
  },
});

export const { setData } = realtimeDataSlice.actions;

export default realtimeDataSlice.reducer;
