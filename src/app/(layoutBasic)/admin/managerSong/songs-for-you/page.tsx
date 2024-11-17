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
import { apiBasicClient, apiBasicClientPublic } from "@/app/utils/request";
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

const ManageFeaturedSongs: React.FC = () => {
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
      await apiBasicClientPublic("DELETE", `/song-for-you/remove/${songId}`);
      // Cập nhật lại danh sách bài hát sau khi xóa
      setFeaturedSongs((prev) => prev.filter((song) => song._id !== songId));
    } catch (error) {
      console.error("Error removing song from featured list", error);
    } finally {
      setLoading(false);
    }
  };

  // Lấy danh sách bài hát đề cử khi component load
  useEffect(() => {
    fetchFeaturedSongs();
  }, [fetchFeaturedSongs]);

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
        <Button>
          <Link href={"/admin/managerSong"}>Quản lý bài hát</Link>
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
              // Hiển thị thông báo khi không có bài hát nào trong danh sách đề cử
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
