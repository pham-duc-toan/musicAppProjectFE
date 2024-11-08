"use client";
import React, { useState, useEffect } from "react";
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
  Chip,
  Tooltip,
  CircularProgress,
  Backdrop,
} from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import InfoIcon from "@mui/icons-material/Info";
import { apiBasicClient } from "@/app/utils/request";

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
  const [songs, setSongs] = useState<Song[]>([]);
  const [loading, setLoading] = useState<boolean>(false); // Trạng thái loading

  useEffect(() => {
    const fetchSongs = async () => {
      setLoading(true); // Bắt đầu loading khi fetch API
      const response = await apiBasicClient(
        "GET",
        "/songs/managerSong",
        undefined,
        undefined,
        ["tag-list-playlist"]
      );
      if (response?.data) {
        setSongs(response.data);
      }
      setLoading(false); // Kết thúc loading khi đã nhận được dữ liệu
    };
    fetchSongs();
  }, []);

  const playAudio = (audioUrl: string) => {};

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        Quản lý bài hát
      </Typography>
      <Backdrop
        sx={{
          color: "#fff",
          position: "absolute",
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
        open={loading} // Hiển thị backdrop khi đang loading
      >
        <CircularProgress color="inherit" />
      </Backdrop>
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
              <TableCell>Hành động</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {songs.map((song, index) => (
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
                    onClick={() => playAudio(song.audio)}
                  >
                    <PlayArrowIcon />
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
                    />
                  </Tooltip>
                </TableCell>
                <TableCell>
                  <Tooltip title="Xem chi tiết" arrow>
                    <IconButton color="info">
                      <InfoIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Chỉnh sửa" arrow>
                    <IconButton color="warning">
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Xóa bài hát" arrow>
                    <IconButton color="error">
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default ManagerSong;
