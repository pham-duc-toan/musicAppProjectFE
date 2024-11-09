"use client";
import { SyntheticEvent, useState, DragEvent } from "react"; // Thêm DragEvent
import {
  Drawer,
  Button,
  IconButton,
  useMediaQuery,
  List,
  Box,
} from "@mui/material";
import NotInterestedOutlinedIcon from "@mui/icons-material/NotInterestedOutlined";
import MultipleStopOutlinedIcon from "@mui/icons-material/MultipleStopOutlined";
import RepeatOutlinedIcon from "@mui/icons-material/RepeatOutlined";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import { useTheme } from "@emotion/react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import ItemSongInSlider from "./ItemSongInSlider";
import { toggleLooping, updatePlaylist } from "@/store/playListSlice";
import { exitPlaylist } from "@/app/utils/updateCurrentPLayList";
import { apiBasicClient } from "@/app/utils/request";
import { revalidateByTag } from "@/app/action";

// Định nghĩa kiểu cho bài hát
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

const RightSlider = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const currentPlaylist = useSelector((state: RootState) => state.playlist);
  //@ts-ignore
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

  // Hàm để toggle trạng thái của slider
  const toggleDrawer =
    (open: boolean) => (event: SyntheticEvent | KeyboardEvent) => {
      setIsOpen(open);
    };

  const handleExitPlayList = () => {
    exitPlaylist(dispatch);
  };

  // Hàm xử lý sự kiện kéo
  const handleDragStart = (event: DragEvent<HTMLDivElement>, index: number) => {
    event.dataTransfer.setData("text/plain", index.toString());
  };

  // Hàm xử lý sự kiện thả
  const handleDrop = async (
    event: DragEvent<HTMLDivElement>,
    index: number
  ) => {
    event.preventDefault();
    const fromIndex = Number(event.dataTransfer.getData("text/plain"));

    // Cập nhật danh sách bài hát
    const updatedList = [...currentPlaylist.listSong];
    const [movedSong] = updatedList.splice(fromIndex, 1);
    updatedList.splice(index, 0, movedSong);

    // Cập nhật Redux
    dispatch(updatePlaylist({ ...currentPlaylist, listSong: updatedList }));

    // Lấy danh sách _id của các bài hát trong updatedList
    const updatedIds = updatedList.map((song) => song._id);

    // Cập nhật dữ liệu lên server
    await apiBasicClient(
      "PATCH",
      `/playlists/${currentPlaylist._id}`,
      undefined,
      { listSong: updatedIds } // Gửi mảng _id của updatedList
    );
    revalidateByTag("tag-list-playlist");
  };

  return (
    <>
      {/* Button nằm ở góc trên bên phải */}
      <Button
        onClick={toggleDrawer(true)}
        style={{ position: "absolute", top: "-43px", right: "3px" }}
        variant="contained"
        color="primary"
        sx={{ display: isOpen ? "none" : "flex" }}
      >
        <MenuOpenIcon
          sx={{
            marginRight: {
              xs: 0, // Không có margin trên các màn hình nhỏ
              md: "8px", // Có margin 8px trên màn hình md trở lên
            },
          }}
        />
        {!isSmallScreen && "Playlist"}
      </Button>

      {/* Slider nằm bên phải */}
      <Drawer
        sx={{ zIndex: 1001 }}
        anchor="right"
        open={isOpen}
        onClose={toggleDrawer(false)} // Đóng drawer khi nhấn bên ngoài
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: 300,
            height: "calc(100vh - 88px)",
            overflowY: "auto",
          }}
          role="presentation"
          onClick={(e) => e.stopPropagation()} // Ngăn chặn sự kiện click từ việc đóng drawer
        >
          <Box sx={{ margin: "10px" }}>
            <h2>Danh sách phát</h2>
          </Box>
          <Box
            sx={{
              padding: "10px",
              flex: 1,
              //@ts-ignore
              bgcolor: theme.palette.secondary.A100,
            }}
          >
            {currentPlaylist._id ? (
              <>
                <Box sx={{ display: "flex" }}>
                  <Box
                    component={"h3"}
                    sx={{
                      flex: "1",
                    }}
                  >
                    {currentPlaylist.title}
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <IconButton
                      onClick={() => {
                        dispatch(toggleLooping());
                      }}
                    >
                      {currentPlaylist.isLooping ? (
                        <RepeatOutlinedIcon
                          sx={{ fontSize: 24, color: "primary.main" }}
                        />
                      ) : (
                        <MultipleStopOutlinedIcon
                          sx={{ fontSize: 24, color: "primary.main" }}
                        />
                      )}
                    </IconButton>
                    <IconButton onClick={handleExitPlayList}>
                      <NotInterestedOutlinedIcon
                        sx={{ fontSize: 24, color: "primary.main" }}
                      />
                    </IconButton>
                  </Box>
                </Box>

                <List>
                  {currentPlaylist.listSong.length == 0 ? (
                    <p>Danh sách nhạc này đang rỗng.</p>
                  ) : (
                    currentPlaylist.listSong.map(
                      (song: Song, index: number) => (
                        <Box
                          key={song._id}
                          draggable
                          onDragStart={(event) => handleDragStart(event, index)}
                          onDrop={(event) => handleDrop(event, index)}
                          onDragOver={(event) => event.preventDefault()}
                        >
                          <ItemSongInSlider song={song} />
                        </Box>
                      )
                    )
                  )}
                </List>
              </>
            ) : (
              <p>Hiện đang không có danh sách nhạc nào được phát.</p>
            )}
          </Box>
        </Box>
      </Drawer>
    </>
  );
};

export default RightSlider;