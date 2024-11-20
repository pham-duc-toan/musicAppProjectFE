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
  Button,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import { apiBasicClient } from "@/app/utils/request";
import Link from "next/link";
import { useAppContext } from "@/context-app";

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

const ManageFeaturedSongs: React.FC = () => {
  const { showMessage } = useAppContext();
  const [featuredSongs, setFeaturedSongs] = useState<Song[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  // Fetch danh sách bài hát "Đề cử"
  const fetchFeaturedSongs = useCallback(async () => {
    setLoading(true);
    try {
      const response = await apiBasicClient("GET", "/song-for-you");
      if (response?.data) {
        setFeaturedSongs(response.data.listSong || []); // Lấy danh sách bài hát đề cử
      }
      if (response.statusCode >= 300) {
        showMessage(response.message, "error");
      }
    } catch (error) {
      console.error("Error fetching featured songs", error);
    } finally {
      setLoading(false);
    }
  }, []);

  // Xóa bài hát khỏi danh sách "Đề cử"
  const handleRemoveFromFeatured = async (songId: string) => {
    setLoading(true);
    try {
      const response = await apiBasicClient(
        "DELETE",
        `/song-for-you/remove/${songId}`
      );
      if (response.statusCode >= 300) {
        showMessage(response.message, "error");
      } else {
        // Cập nhật lại danh sách bài hát sau khi xóa
        setFeaturedSongs((prev) => prev.filter((song) => song._id !== songId));
      }
    } catch (error) {
      console.error("Error removing song from featured list", error);
    } finally {
      setLoading(false);
    }
  };

  // Cập nhật lại danh sách bài hát sau khi kéo thả
  const handleDragStart = (
    event: React.DragEvent<HTMLDivElement>,
    index: number
  ) => {
    event.dataTransfer.setData("text/plain", index.toString());
  };

  const handleDrop = async (
    event: React.DragEvent<HTMLDivElement>,
    index: number
  ) => {
    event.preventDefault();
    const fromIndex = Number(event.dataTransfer.getData("text/plain"));
    const updatedList = [...featuredSongs];
    const [movedSong] = updatedList.splice(fromIndex, 1);
    updatedList.splice(index, 0, movedSong);
    setFeaturedSongs(updatedList);
  };

  // Gửi yêu cầu cập nhật thứ tự bài hát
  const updateSongOrder = async () => {
    setLoading(true);

    try {
      const updatedIds = featuredSongs.map((song) => song._id);
      const response = await apiBasicClient(
        "PATCH",
        "/song-for-you/update-order",
        undefined,
        {
          listSong: updatedIds,
        }
      );
      if (response.statusCode >= 300) {
        showMessage(response.message, "error");
      } else {
        showMessage("Cập nhật thứ tự thành công!", "success");
      }
    } catch (error) {
      console.error("Error updating song order", error);
    } finally {
      setLoading(false);
    }
  };

  // Lấy danh sách bài hát đề cử khi component load
  useEffect(() => {
    fetchFeaturedSongs();
  }, [fetchFeaturedSongs]);

  // Hàm để xác định màu nền cho thứ tự ưu tiên
  const getPriorityBackgroundColor = (index: number) => {
    switch (index) {
      case 0:
        return "gold"; // Top 1
      case 1:
        return "silver"; // Top 2
      case 2:
        return "#cd7f32"; // Top 3 (Màu đồng)
      default:
        return "transparent"; // Không có màu nền cho các vị trí khác
    }
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Box
        display={"flex"}
        justifyContent={"space-between"}
        marginBottom={"15px"}
      >
        <Typography variant="h4" gutterBottom>
          Quản lý bài hát đề cử
        </Typography>
        <Button variant="contained" color="primary">
          <Link href={"/admin/managerSong"}>Quản lý bài hát</Link>
        </Button>
      </Box>

      <Button
        variant="contained"
        color="primary"
        onClick={updateSongOrder}
        sx={{ marginBottom: "20px" }}
      >
        Cập nhật thứ tự hiện tại
      </Button>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Thứ tự ưu tiên</TableCell>
              <TableCell>Hình ảnh</TableCell>
              <TableCell>Tiêu đề</TableCell>
              <TableCell>Chủ đề</TableCell>
              <TableCell>Ca sĩ</TableCell>
              <TableCell>Đề cử</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={6} sx={{ textAlign: "center" }}>
                  <CircularProgress />
                </TableCell>
              </TableRow>
            ) : featuredSongs && featuredSongs.length > 0 ? (
              featuredSongs.map((song, index) => (
                <TableRow
                  key={song._id}
                  draggable
                  onDragStart={(event) => handleDragStart(event, index)}
                  onDrop={(event) => handleDrop(event, index)}
                  onDragOver={(event) => event.preventDefault()}
                  sx={{
                    backgroundColor: getPriorityBackgroundColor(index), // Áp dụng màu nền cho dòng
                  }}
                >
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
                    {song.singerId?.fullName || "Không rõ ca sĩ"}
                  </TableCell>
                  <TableCell>
                    <Tooltip title="Xóa khỏi đề cử" arrow>
                      <IconButton
                        color="secondary"
                        onClick={() => handleRemoveFromFeatured(song._id)}
                      >
                        <StarIcon color="warning" />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={6}
                  sx={{ textAlign: "center", color: "gray" }}
                >
                  Hiện không có bài hát đề cử nào
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default ManageFeaturedSongs;
