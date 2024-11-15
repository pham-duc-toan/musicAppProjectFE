"use client";
import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  CircularProgress, // Import CircularProgress
} from "@mui/material";
import { apiBasicClient } from "@/app/utils/request";

// Định nghĩa kiểu cho role
interface Role {
  roleName: string;
  permissions: string[]; // Mảng các permission IDs
  roleId: string;
}

// Định nghĩa kiểu cho permission
interface Permission {
  name: string;
  id: string;
}

export default function Permissions() {
  const [roles, setRoles] = useState<Role[]>([]); // Danh sách vai trò
  const [permissionsList, setPermissionsList] = useState<Permission[]>([]); // Danh sách quyền
  const [open, setOpen] = useState<boolean>(false); // Điều khiển trạng thái mở/đóng của modal
  const [loading, setLoading] = useState<boolean>(true); // Trạng thái loading

  const fetchRolesAndPermissions = async () => {
    setLoading(true); // Bắt đầu tải
    try {
      // Gọi API lấy danh sách vai trò
      const rolesRes = await apiBasicClient("GET", "/roles");
      const rolesData = rolesRes.data.map((role: any) => ({
        roleName: role.roleName,
        permissions: role.permissions, // Giả định mỗi vai trò có một mảng các permission IDs
        roleId: role._id, // Lưu lại id của vai trò để xử lý sau này nếu cần
      }));

      // Gọi API lấy danh sách quyền
      const permissionsRes = await apiBasicClient("GET", "/permissions");
      const permissionsData = permissionsRes.data.map((permission: any) => ({
        name: permission.name,
        id: permission._id, // Lưu lại id của quyền để đối chiếu
      }));

      setRoles(rolesData);
      setPermissionsList(permissionsData);
    } catch (error) {
      console.error("Không thể lấy dữ liệu từ API:", error);
    } finally {
      setLoading(false); // Kết thúc tải
    }
  };

  useEffect(() => {
    fetchRolesAndPermissions();
  }, []);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleAddPermission = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newPermission = {
      name: formData.get("name") as string,
      pathName: formData.get("pathName") as string,
      method: formData.get("method") as string,
    };
    await apiBasicClient("POST", "/permissions", undefined, newPermission);
    await fetchRolesAndPermissions();

    handleClose();
  };

  const handleSaveChanges = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const updatedRoles = [...roles];

    const formData = new FormData(e.currentTarget);
    permissionsList.forEach((permission) => {
      roles.forEach((role, roleIndex) => {
        const checkboxValue = formData.get(`${role.roleId}-${permission.id}`);
        if (checkboxValue) {
          if (!role.permissions.includes(permission.id)) {
            updatedRoles[roleIndex].permissions.push(permission.id);
          }
        } else {
          updatedRoles[roleIndex].permissions = updatedRoles[
            roleIndex
          ].permissions.filter((id) => id !== permission.id);
        }
      });
    });

    try {
      console.log(updatedRoles);
      await Promise.all(
        updatedRoles.map((role) =>
          apiBasicClient("PATCH", `/roles/${role.roleId}`, undefined, {
            permissions: role.permissions,
          })
        )
      );
      console.log("Permissions updated successfully for all roles.");
    } catch (error) {
      console.error("Failed to update permissions for roles:", error);
    }

    await fetchRolesAndPermissions();
  };

  return (
    <Box sx={{ p: 4 }}>
      <Box
        display={"flex"}
        justifyContent={"space-between"}
        alignContent={"center"}
      >
        <Typography variant="h4" gutterBottom>
          Phân quyền
        </Typography>
        <Button
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
          onClick={handleOpen}
        >
          Thêm quyền mới
        </Button>
      </Box>
      <form onSubmit={handleSaveChanges}>
        <TableContainer>
          {loading ? ( // Hiển thị loading nếu đang tải dữ liệu
            <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
              <CircularProgress />
            </Box>
          ) : (
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Tính năng</TableCell>
                  {roles.map((role, index) => (
                    <TableCell key={index}>{role.roleName}</TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {permissionsList.map((permission, permIndex) => (
                  <TableRow key={permIndex}>
                    <TableCell>{permission.name}</TableCell>
                    {roles.map((role, roleIndex) => (
                      <TableCell key={roleIndex}>
                        <Checkbox
                          name={`${role.roleId}-${permission.id}`}
                          defaultChecked={role.permissions.includes(
                            permission.id
                          )}
                        />
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </TableContainer>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
        >
          Lưu thay đổi
        </Button>
      </form>

      <Dialog open={open} onClose={handleClose}>
        <form onSubmit={handleAddPermission}>
          <DialogTitle>Thêm mới quyền</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              name="name"
              label="Tên quyền"
              fullWidth
            />
            <TextField
              margin="dense"
              name="pathName"
              label="Path Name"
              fullWidth
            />
            <TextField margin="dense" name="method" label="Method" fullWidth />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Hủy</Button>
            <Button type="submit" color="primary">
              Thêm
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Box>
  );
}
