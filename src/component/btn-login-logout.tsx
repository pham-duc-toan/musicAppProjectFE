"use client";
import { useState, useEffect, MouseEvent } from "react";
import { useRouter } from "next/navigation";
import { Avatar, Button, Menu, MenuItem } from "@mui/material";
import {
  getAccessTokenFromLocalStorage,
  removeTokensFromLocalStorage,
} from "@/app/helper/localStorageClient";
import { logout } from "@/app/utils/request";
import { decodeToken } from "@/app/helper/jwt";
import { JwtPayload } from "jsonwebtoken";
import { Box } from "@mui/system";

export default function BtnLoginLogout() {
  const [isLogin, setIsLogin] = useState<
    string | JwtPayload | null | undefined
  >(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const router = useRouter();

  useEffect(() => {
    const accessToken = getAccessTokenFromLocalStorage();
    if (!accessToken) {
      setIsLogin(null);
    } else {
      setIsLogin(decodeToken(accessToken));
    }
  }, []);

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    await logout();
    setIsLogin(null);
    removeTokensFromLocalStorage();
    router.push("/login");
    handleClose();
  };

  return (
    <Box
      sx={{
        marginRight: "10px",
      }}
    >
      {isLogin ? (
        <>
          <Avatar
            //@ts-ignore
            src={isLogin.avatar} // Thay đổi đường dẫn này đến ảnh avatar của người dùng
            onClick={handleClick}
            sx={{ cursor: "pointer", marginRight: "5px" }}
          />
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
          >
            <MenuItem
              onClick={() => {
                handleClose();
                router.push("/profile");
              }}
            >
              Thông tin cá nhân
            </MenuItem>

            {
              //@ts-ignore
              isLogin.singerId ? (
                <MenuItem
                  onClick={() => {
                    handleClose();
                    router.push("/managerSong");
                  }}
                >
                  Quản lý bài hát
                </MenuItem>
              ) : null
            }

            <MenuItem onClick={handleLogout}>Đăng xuất</MenuItem>
          </Menu>
        </>
      ) : (
        <Button
          onClick={() => router.push("/login")}
          variant="contained"
          sx={{ marginRight: "5px" }}
        >
          Login
        </Button>
      )}
    </Box>
  );
}
