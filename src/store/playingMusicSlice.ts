import { TSongDetail, TSongFooter } from "@/dataType/song";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: TSongFooter = {
  _id: "",
  title: "",
  singerFullName: "",
  audio: "",
  slug: "",
  isPlaying: false,
};

const playingMusicSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    pause: (state) => {
      state.isPlaying = false;
    },
    play: (state) => {
      state.isPlaying = true;
    },
    setNewSong: (state, action: PayloadAction<TSongDetail>) => {
      (state._id = action.payload._id),
        (state.title = action.payload.title),
        (state.singerFullName = action.payload.singerInfo.fullName),
        (state.audio = action.payload.audio),
        (state.slug = action.payload.slug),
        (state.isPlaying = true);
    },
  },
});

export const { pause, play, setNewSong } = playingMusicSlice.actions;
export default playingMusicSlice.reducer;
