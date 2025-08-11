import { createSlice } from "@reduxjs/toolkit";

const convertedSongsSlice = createSlice({
  name: "convertedSongs",
  initialState: [],
  reducers: {
    addConvertedSong: (state, action) => {
      state.push(action.payload);
    },
    removeConvertedSong: (state, action) => {
      return state.filter((_, index) => index !== action.payload);
    },
  },
});

export const { addConvertedSong, removeConvertedSong } = convertedSongsSlice.actions;
export default convertedSongsSlice.reducer;
