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
import Link from "next/link";

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
            disablePortal
            disableEnforceFocus
          >
            <Link href={"/profile"}>
              <MenuItem
                onClick={() => {
                  handleClose();
                }}
              >
                Thông tin cá nhân
              </MenuItem>
            </Link>

            {
              //@ts-ignore
              isLogin.singerId ? (
                <Link href={"/songs/managerSong"}>
                  <MenuItem
                    onClick={() => {
                      handleClose();
                    }}
                  >
                    Quản lý bài hát
                  </MenuItem>
                </Link>
              ) : null
            }
            <Link href={"/profile/change-password"}>
              <MenuItem
                onClick={() => {
                  handleClose();
                }}
              >
                Đổi mật khẩu
              </MenuItem>
            </Link>

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
