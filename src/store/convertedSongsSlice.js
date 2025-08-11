import { createSlice } from "@reduxjs/toolkit";

const convertedSongsSlice = createSlice({
  name: "convertedSongs",
  initialState: [],
  reducers: {
    addConvertedSong: (state, action) => {
      // action.payload = { title, content }
      state.push(action.payload);
    }
  }
});

export const { addConvertedSong } = convertedSongsSlice.actions;
export default convertedSongsSlice.reducer;

