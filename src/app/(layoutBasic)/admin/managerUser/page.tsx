import React from "react";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Avatar,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { apiBasicServer } from "@/app/utils/request";

import { GetAccessTokenFromCookie } from "@/app/utils/checkRole";
import StatusChip from "./component/StatusChip";
import DeleteUserButton from "./component/DeleteUserButton";

interface User {
  _id: string;
  username: string;
  avatar: string;
  status: string;
}

const fetchUsers = async () => {
  const access_token = GetAccessTokenFromCookie();
  try {
    const response = await apiBasicServer(
      "GET",
      "/users",
      undefined,
      undefined,
      access_token,
      ["revalidate-tag-users"]
    );
    return response?.data || [];
  } catch (error) {
    console.error("Error fetching users:", error);
    return [];
  }
};

const ManagerUserPage = async () => {
  const users = await fetchUsers();

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
              <TableCell>Hành động</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {users.map((user: User, index: number) => (
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
                  <StatusChip id={user._id} status={user.status} />
                </TableCell>
                <TableCell>
                  <DeleteUserButton id={user._id} username={user.username} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default ManagerUserPage;
