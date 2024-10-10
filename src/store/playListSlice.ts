import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Định nghĩa kiểu cho trạng thái của bài hát
interface SongState {
  _id: string;
  title: string;
  avatar: string;
  audio: string;
  singerId: {
    _id: string;
    fullName: string;
    [key: string]: any;
  };
  like: number;
}

// Định nghĩa kiểu cho trạng thái của playlist
interface PlayListState {
  _id: string;
  title: string;
  userId: string;
  listSong: SongState[];
  isLooping: boolean;
}

// Khởi tạo trạng thái ban đầu cho playlist
const initialState: PlayListState = {
  _id: "",
  title: "",
  userId: "",
  listSong: [],
  isLooping: false,
};

// Tạo slice cho playlist
export const playlistSlice = createSlice({
  name: "playlist", // Tên slice
  initialState, // Trạng thái ban đầu
  reducers: {
    // Reducer để cập nhật toàn bộ trạng thái playlist
    updatePlaylist: (state, action: PayloadAction<PlayListState>) => {
      return { ...state, ...action.payload }; // Cập nhật trạng thái bằng cách kết hợp với payload mới
    },

    // Reducer để toggle giá trị isLooping
    toggleLooping: (state) => {
      state.isLooping = !state.isLooping; // Phủ định giá trị isLooping
    },
  },
});

// Export action để sử dụng trong component
export const { updatePlaylist, toggleLooping } = playlistSlice.actions;

// Export reducer để thêm vào store
export default playlistSlice.reducer;
