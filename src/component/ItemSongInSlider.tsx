"use client";
import React, { useState, MouseEvent } from "react";
import {
  Avatar,
  CircularProgress,
  IconButton,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Menu,
  MenuItem,
} from "@mui/material";
import { Box } from "@mui/system";

import MoreVertIcon from "@mui/icons-material/MoreVert";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { pause, play, setNewSong } from "@/store/playingMusicSlice";
import { TSongDetail } from "@/dataType/song";
import theme from "@/app/theme-provider";
import { useTheme } from "@emotion/react";
import { revalidateByTag } from "@/app/action";
import { apiBasicClient } from "@/app/utils/request";
import { updateNewPlaylist } from "@/app/utils/updateCurrentPLayList";

// Định nghĩa kiểu cho props của component
interface Song {
  _id: string;
  title: string;
  avatar: string;
  singerId: {
    _id: string;
    fullName: string;
    [key: string]: any;
  };
  audio: string;
}

interface ItemSongInSliderProps {
  song: Song; // Đối số song
}

const ItemSongInSlider: React.FC<ItemSongInSliderProps> = ({ song }) => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const songCurrent = useSelector((state: RootState) => state.playingMusic);
  const currentPlaylist = useSelector((state: RootState) => state.playlist);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [loading, setLoading] = useState(false);
  // Hàm mở menu
  const handleMenuClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  // Hàm đóng menu
  const handleClose = () => {
    setAnchorEl(null);
  };

  // Hàm xử lý sự kiện xóa
  const handleDelete = async () => {
    setLoading(true);

    handleClose();
    const res1 = await apiBasicClient(
      "DELETE",
      `/playlists/removeSong/${currentPlaylist._id}`,
      undefined,
      { idSong: song._id }
    );
    console.log(res1);

    revalidateByTag("tag-list-playlist");
    //CALL API
    const res = await apiBasicClient(
      "GET",
      `/playlists/findOne/${currentPlaylist._id}`
    );
    updateNewPlaylist(res.data, dispatch);
    // console.log(res.data);

    setLoading(false); // Kết thúc loading sau khi hoàn tất gọi API
    // Đóng modal sau khi lưu
  };
  //xu ly su kien song
  const handleChangeNewSongPlaying = () => {
    dispatch(setNewSong(song as TSongDetail));
  };
  const handleChangeIsPlaying = () => {
    if (songCurrent.isPlaying) {
      dispatch(pause());
    } else {
      dispatch(play());
    }
  };
  return (
    <ListItem
      key={song._id}
      sx={{
        bgcolor:
          song._id === songCurrent._id
            ? //@ts-ignore
              theme.palette.secondary.A200
            : "inherit", // So sánh điều kiện đúng
        boxShadow: 2, // Thêm box shadow cho mỗi ListItem
        marginBottom: "10px", // Khoảng cách giữa các ListItem
        borderRadius: "4px", // Bo góc cho ListItem
      }}
    >
      <ListItemAvatar>
        <Avatar src={song.avatar} alt={song.title} />
      </ListItemAvatar>
      <ListItemText
        primary={song.title}
        secondary={`Ca sĩ: ${song.singerId.fullName}`}
      />

      {/* Box để sắp xếp các nút theo hàng dọc */}
      <Box display="flex" flexDirection="column" alignItems="center">
        {/* Nút menu */}
        <IconButton onClick={handleMenuClick}>
          {loading ? <CircularProgress size={24} /> : <MoreVertIcon />}
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem
            sx={{
              padding: "4px 8px", // Giảm padding
              minHeight: "30px", // Thiết lập chiều cao tối thiểu
              fontSize: "14px", // Giảm kích thước font
            }}
            onClick={handleDelete}
          >
            Xóa
          </MenuItem>
        </Menu>
        {/* Nút phát nhạc */}
        <IconButton
          onClick={
            song._id == songCurrent._id
              ? handleChangeIsPlaying
              : handleChangeNewSongPlaying
          }
        >
          {song._id == songCurrent._id && songCurrent.isPlaying ? (
            <PauseIcon />
          ) : (
            <PlayArrowIcon />
          )}
        </IconButton>
      </Box>
    </ListItem>
  );
};

export default ItemSongInSlider;
