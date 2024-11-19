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
  Chip,
  Button,
} from "@mui/material";
import { apiBasicClient } from "@/app/utils/request";
import { revalidateByTag } from "@/app/action";
import { useAppContext } from "@/context-app";

interface Singer {
  _id: string;
  fullName: string;
  avatar: string;
  status: string;
}

const ManagerSinger: React.FC = () => {
  const [singers, setSingers] = useState<Singer[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const { showMessage } = useAppContext();
  // Fetch danh sách ca sĩ
  const fetchSingers = useCallback(async () => {
    setLoading(true);
    try {
      const response = await apiBasicClient("GET", "/singers");
      if (response?.data) {
        setSingers(response.data);
      }
      if (response.statusCode >= 300) {
        showMessage(response.message, "error");
      }
    } catch (error) {
      console.error("Error fetching singers:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch dữ liệu ca sĩ khi trang được tải
  useEffect(() => {
    fetchSingers();
  }, [fetchSingers]);

  // Hàm thay đổi trạng thái ca sĩ
  const handleClick = async (singer: Singer) => {
    setLoading(true);
    try {
      const response = await apiBasicClient(
        "PATCH",
        `/singers/changeStatus/${singer._id}`
      );
      if (response.statusCode >= 300) {
        showMessage(response.message, "error");
      }
      fetchSingers();
      revalidateByTag("revalidate-by-singers");
    } catch (error) {
      console.error("Failed to change status:", error);
      setLoading(false);
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
          Quản lý ca sĩ
        </Typography>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>STT</TableCell>
              <TableCell>Hình ảnh</TableCell>
              <TableCell>Tên ca sĩ</TableCell>
              <TableCell>Trạng thái</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={4} sx={{ textAlign: "center" }}>
                  <CircularProgress />
                </TableCell>
              </TableRow>
            ) : (
              singers.map((singer, index) => (
                <TableRow key={singer._id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>
                    <Avatar
                      src={singer.avatar}
                      alt={singer.fullName}
                      variant="rounded"
                    />
                  </TableCell>
                  <TableCell>{singer.fullName}</TableCell>
                  <TableCell>
                    <Chip
                      label={
                        singer.status === "active"
                          ? "Hoạt động"
                          : "Không hoạt động"
                      }
                      color={singer.status === "active" ? "success" : "error"}
                      onClick={() => handleClick(singer)}
                    />
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

export default ManagerSinger;
