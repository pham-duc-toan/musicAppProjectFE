// store/store.ts
import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./counterSlice";
import playingMusicReducer from "./playingMusicSlice";
export const store = configureStore({
  reducer: {
    counter: counterReducer,
    playingMusic: playingMusicReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
