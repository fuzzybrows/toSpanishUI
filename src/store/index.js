import { configureStore } from "@reduxjs/toolkit";
import convertedSongsReducer from "./convertedSongsSlice";

export const store = configureStore({
  reducer: {
    convertedSongs: convertedSongsReducer,
  }
});

