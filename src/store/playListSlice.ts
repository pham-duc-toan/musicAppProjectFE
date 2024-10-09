import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// src/redux/slices/playlistSlice.ts

interface SongState {
  _id: string;
  title: string;
  avatar: string;
  audio: string;
  singerId: string;
  like: number;
}

interface PlayListState {
  _id: string;
  title: string;
  userId: string;
  listSong: SongState[];
}

// Khởi tạo trạng thái ban đầu cho playlist
const initialState: PlayListState[] = [];

export const playlistSlice = createSlice({
  name: "playlist",
  initialState,
  reducers: {
    // Action để thêm playlist
    addPlaylist: (state, action: PayloadAction<PlayListState>) => {
      state.push(action.payload);
    },
    // Action để cập nhật playlist
    updatePlaylist: (state, action: PayloadAction<PlayListState>) => {
      const index = state.findIndex(
        (playlist) => playlist._id === action.payload._id
      );
      if (index !== -1) {
        state[index] = action.payload;
      }
    },
    // Action để xóa playlist
    removePlaylist: (state, action: PayloadAction<string>) => {
      return state.filter((playlist) => playlist._id !== action.payload);
    },
  },
});

// Xuất ra các action
export const { addPlaylist, updatePlaylist, removePlaylist } =
  playlistSlice.actions;

export default playlistSlice.reducer;
