"use client";
import { useState, useEffect, MouseEvent } from "react";
import { useRouter } from "next/navigation";
import {
  Avatar,
  Button,
  Menu,
  MenuItem,
  Typography,
  Divider,
} from "@mui/material";
import {
  getAccessTokenFromLocalStorage,
  removeTokensFromLocalStorage,
} from "@/app/helper/localStorageClient";
import { logout } from "@/app/utils/request";
import { decodeToken } from "@/app/helper/jwt";
import { JwtPayload } from "jsonwebtoken";
import { Box } from "@mui/system";
import { Link } from "@/i18n/routing";
import { useAppContext } from "@/context-app";
import IUserInfo from "@/dataType/infoUser";
import { useLocale } from "next-intl";

export default function BtnLoginLogout() {
  const { showMessage } = useAppContext();
  const [isLogin, setIsLogin] = useState<
    string | JwtPayload | null | undefined
  >(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const router = useRouter();
  const locale = useLocale();
  const [infoUser, setInfoUser] = useState<IUserInfo | undefined>(undefined);

  useEffect(() => {
    const accessToken = getAccessTokenFromLocalStorage();
    if (!accessToken) {
      setIsLogin(null);
    } else {
      const info = decodeToken(accessToken);
      setInfoUser(info || undefined);
      setIsLogin(info);
    }
  }, []);

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    showMessage("Đang đăng xuất ...", "info");
    await logout();
    setIsLogin(null);
    removeTokensFromLocalStorage();
    router.push(`/${locale}/login`);
    handleClose();
    showMessage("Đã đăng xuất!", "success");
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
            {infoUser && [
              <MenuItem key="fullName" sx={{ pointerEvents: "none" }}>
                <Typography variant="body1" fontWeight="bold">
                  {infoUser.fullName || "Unknown Name"}
                </Typography>
              </MenuItem>,
              <MenuItem key="username" sx={{ pointerEvents: "none" }}>
                <Typography variant="body2">
                  {infoUser.username || "unknown_username"}
                </Typography>
              </MenuItem>,
              <Divider key="divider" />,
            ]}
            <Link href={"/profile"}>
              <MenuItem onClick={handleClose}>Thông tin cá nhân</MenuItem>
            </Link>
            <Link href={"/payment/history"}>
              <MenuItem onClick={handleClose}>Lịch sử giao dịch</MenuItem>
            </Link>
            {infoUser?.singerId && (
              <Link href={"/songs/managerSong"}>
                <MenuItem onClick={handleClose}>Quản lý bài hát</MenuItem>
              </Link>
            )}
            <Link href={"/profile/change-password"}>
              <MenuItem onClick={handleClose}>Đổi mật khẩu</MenuItem>
            </Link>

            <MenuItem onClick={handleLogout}>Đăng xuất</MenuItem>
          </Menu>
        </>
      ) : (
        <Button
          onClick={() => router.push(`/${locale}/login`)}
          variant="outlined"
          sx={{ marginRight: "5px" }}
        >
          Login
        </Button>
      )}
    </Box>
  );
}
