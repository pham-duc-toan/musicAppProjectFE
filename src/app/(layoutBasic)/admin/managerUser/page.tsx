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
  Chip,
  CircularProgress,
} from "@mui/material";
import { apiBasicClient } from "@/app/utils/request";
import { revalidateByTag } from "@/app/action";
import { useAppContext } from "@/context-app";

interface User {
  _id: string;
  username: string;
  avatar: string;
  status: string;
}

const ManagerUser: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const { showMessage } = useAppContext();

  // Fetch the list of users
  const fetchUsers = useCallback(async () => {
    setLoading(true);
    try {
      const response = await apiBasicClient("GET", "/users");
      if (response?.data) {
        setUsers(response.data);
      }
      if (response.statusCode >= 300) {
        showMessage(response.message, "error");
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch user data when the page loads
  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  // Handle status change
  const handleClick = async (user: User) => {
    setLoading(true);
    try {
      const response = await apiBasicClient(
        "PATCH",
        `/users/change-status/${user._id}`
      );
      if (response.statusCode >= 300) {
        showMessage(response.message, "error");
      }
      fetchUsers();
      revalidateByTag("revalidate-by-users");
    } catch (error) {
      console.error("Failed to change user status:", error);
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
          Quản lý người dùng
        </Typography>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>STT</TableCell>
              <TableCell>Hình ảnh</TableCell>
              <TableCell>Tên người dùng</TableCell>
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
              users.map((user, index) => (
                <TableRow key={user._id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>
                    <Avatar
                      src={user.avatar}
                      alt={user.username}
                      variant="rounded"
                    />
                  </TableCell>
                  <TableCell>{user.username}</TableCell>
                  <TableCell>
                    <Chip
                      label={
                        user.status === "active"
                          ? "Hoạt động"
                          : "Không hoạt động"
                      }
                      color={user.status === "active" ? "success" : "error"}
                      onClick={() => handleClick(user)}
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

export default ManagerUser;
