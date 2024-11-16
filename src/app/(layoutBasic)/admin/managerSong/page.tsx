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
} from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";

import { apiBasicClient } from "@/app/utils/request";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { pause, play, setNewSong } from "@/store/playingMusicSlice";

import { useRouter } from "next/navigation";

import { revalidateByTag } from "@/app/action";
import { TSongDetail } from "@/dataType/song";

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
  singerId: string;
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
  const router = useRouter();
  const { isPlaying, _id: playingSongId } = useSelector(
    (state: RootState) => state.playingMusic
  );

  const [songs, setSongs] = useState<Song[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchSongs = useCallback(async () => {
    setLoading(true);
    try {
      const response = await apiBasicClient("GET", "/songs/managerSong");
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
    const newStatus = song.status === "active" ? "inactive" : "active";
    try {
      await apiBasicClient("PATCH", `/songs/editSong/${song._id}`, undefined, {
        status: newStatus,
      });
      revalidateByTag("revalidate-by-songs");
      // Update UI after successful API call
      setSongs((prevSongs) =>
        prevSongs.map((s) =>
          s._id === song._id ? { ...s, status: newStatus } : s
        )
      );
    } catch (error) {
      console.error("Failed to change status:", error);
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

  useEffect(() => {
    fetchSongs();
  }, [fetchSongs]);

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
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>STT</TableCell>
              <TableCell>Hình ảnh</TableCell>
              <TableCell>Tiêu đề</TableCell>
              <TableCell>Chủ đề</TableCell>
              <TableCell>Phát</TableCell>
              <TableCell>Trạng thái</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={7} sx={{ textAlign: "center" }}>
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
