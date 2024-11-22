"use client";
import { useEffect, useState } from "react";
import { decodeToken } from "@/app/helper/jwt";
import { getAccessTokenFromLocalStorage } from "@/app/helper/localStorageClient";
import { Button } from "@mui/material";

interface UserInfo {
  singerId?: string; // Định nghĩa kiểu cho infoUser, với singerId là tùy chọn
  // Thêm các trường khác nếu có
}

const ButtonUpdateSingerHeader = () => {
  const [infoUser, setInfoUser] = useState<UserInfo | null>(null);

  useEffect(() => {
    const accessToken = getAccessTokenFromLocalStorage();
    if (accessToken) {
      const decodedInfo = decodeToken(accessToken);
      setInfoUser(decodedInfo as UserInfo | null);
    }
  }, []);

  return (
    <>
      {!infoUser?.singerId && (
        <Button variant="contained" color="primary" sx={{ marginRight: 2 }}>
          Đăng ký ca sĩ
        </Button>
      )}
    </>
  );
};

export default ButtonUpdateSingerHeader;
