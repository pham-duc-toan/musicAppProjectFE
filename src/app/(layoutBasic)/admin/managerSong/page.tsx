"use client";
import React, { useState, useEffect, useCallback } from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Avatar,
  Typography,
  IconButton,
  CircularProgress,
  Tooltip,
  Chip,
  Button,
} from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";

import { apiBasicClient, apiBasicClientPublic } from "@/app/utils/request";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { pause, play, setNewSong } from "@/store/playingMusicSlice";

import { useRouter } from "next/navigation";

import { revalidateByTag } from "@/app/action";
import { TSongDetail } from "@/dataType/song";
import Link from "next/link";

interface Topic {
  _id: string;
  title: string;
  avatar: string;
  description: string;
  status: string;
  slug: string;
  deleted: boolean;
}

interface Song {
  _id: string;
  title: string;
  avatar: string;
  singerId: {
    fullName: string;
  };
  topicId: Topic;
  like: number;
  listen: number;
  audio: string;
  status: string;
  deleted: boolean;
  createdAt: string;
  updatedAt: string;
  slug: string;
}

const ManagerSong: React.FC = () => {
  const dispatch = useDispatch();
  const { isPlaying, _id: playingSongId } = useSelector(
    (state: RootState) => state.playingMusic
  );

  const [songs, setSongs] = useState<Song[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [listSongForYou, setListSongForYou] = useState<string[]>([]);

  // Fetch danh sách bài hát "Đề cử"
  const fetchSongForYou = useCallback(async () => {
    try {
      const res = await apiBasicClientPublic("GET", "/song-for-you");
      if (res?.data) {
        setListSongForYou(
          res.data.listSong.map((song: { _id: string }) => song._id)
        ); // Extract the song IDs
      }
    } catch (error) {
      console.error("Error fetching songs for you", error);
    }
  }, []);

  // Fetch danh sách bài hát đầy đủ
  const fetchSongs = useCallback(async () => {
    setLoading(true);

    try {
      const response = await apiBasicClient("GET", "/songs/full");
      if (response?.data) {
        setSongs(response.data);
      }
    } catch (error) {
      console.error("Error fetching songs:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleClick = async (song: Song) => {
    setLoading(true);
    try {
      await apiBasicClient("PATCH", `/songs/changeStatus/${song._id}`);

      // Update UI after successful API call
      fetchSongs();
      revalidateByTag("revalidate-by-songs");
    } catch (error) {
      console.error("Failed to change status:", error);
      setLoading(false);
    }
  };

  const handlePlayPauseClick = (song: any) => {
    if (isPlaying && playingSongId === song._id) {
      dispatch(pause());
    } else {
      dispatch(setNewSong(song)); // Set a new song if it's different from the currently playing one
      dispatch(play());
    }
  };

  // Fetch song data và song-for-you data lần đầu
  const fetchFirst = async () => {
    await fetchSongs();
    await fetchSongForYou();
  };

  // Gọi API thêm/xóa bài hát khỏi "Đề cử"
  const handleStarClick = async (songId: string) => {
    if (listSongForYou.includes(songId)) {
      // Nếu bài hát đã có trong list, gọi API để xóa
      try {
        await apiBasicClient("DELETE", `/song-for-you/remove/${songId}`);
        setListSongForYou((prev) => prev.filter((id) => id !== songId)); // Cập nhật lại state listSongForYou
      } catch (error) {
        console.error("Failed to remove song from 'For You' list", error);
      }
    } else {
      // Nếu bài hát chưa có trong list, gọi API để thêm
      try {
        await apiBasicClient("POST", `/song-for-you/add/${songId}`);
        setListSongForYou((prev) => [...prev, songId]); // Cập nhật lại state listSongForYou
      } catch (error) {
        console.error("Failed to add song to 'For You' list", error);
      }
    }
  };

  useEffect(() => {
    fetchFirst();
  }, []);

  return (
    <Box sx={{ padding: 3 }}>
      <Box
        display={"flex"}
        justifyContent={"space-between"}
        marginBottom={"15px"}
      >
        <Typography variant="h4" gutterBottom>
          Quản lý bài hát
        </Typography>
        <Button variant="contained" color="primary">
          <Link href={"/admin/managerSong/songs-for-you"}>
            Quản lý bài hát đề cử
          </Link>
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>STT</TableCell>
              <TableCell>Hình ảnh</TableCell>
              <TableCell>Tiêu đề</TableCell>
              <TableCell>Chủ đề</TableCell>
              <TableCell>Ca sĩ</TableCell>
              <TableCell>Phát</TableCell>
              <TableCell>Trạng thái</TableCell>
              <TableCell>Đề cử</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={8} sx={{ textAlign: "center" }}>
                  <CircularProgress />
                </TableCell>
              </TableRow>
            ) : (
              songs.map((song, index) => (
                <TableRow key={song._id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>
                    <Avatar
                      src={song.avatar}
                      alt={song.title}
                      variant="rounded"
                    />
                  </TableCell>
                  <TableCell>{song.title}</TableCell>
                  <TableCell>{song.topicId.title}</TableCell>
                  <TableCell>{song.singerId.fullName}</TableCell>
                  <TableCell>
                    <IconButton
                      color="primary"
                      onClick={() => handlePlayPauseClick(song)}
                    >
                      {isPlaying && playingSongId === song._id ? (
                        <PauseIcon />
                      ) : (
                        <PlayArrowIcon />
                      )}
                    </IconButton>
                  </TableCell>
                  <TableCell>
                    <Tooltip title="Đổi trạng thái" arrow>
                      <Chip
                        label={
                          song.status === "active"
                            ? "Hoạt động"
                            : "Không hoạt động"
                        }
                        color={song.status === "active" ? "success" : "error"}
                        onClick={() => handleClick(song)}
                      />
                    </Tooltip>
                  </TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleStarClick(song._id)}>
                      {listSongForYou.includes(song._id) ? (
                        <StarIcon color="warning" />
                      ) : (
                        <StarBorderIcon />
                      )}
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default ManagerSong;
