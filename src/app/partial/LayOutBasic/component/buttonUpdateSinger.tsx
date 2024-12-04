"use client";
import { useEffect, useState } from "react";
import { decodeToken } from "@/app/helper/jwt";
import { getAccessTokenFromLocalStorage } from "@/app/helper/localStorageClient";
import { Button } from "@mui/material";
import IUserInfo from "@/dataType/infoUser";
import Link from "next/link";

interface UserInfo {
  singerId?: string; // Định nghĩa kiểu cho infoUser, với singerId là tùy chọn
  // Thêm các trường khác nếu có
}

const ButtonUpdateSingerHeader = () => {
  const [infoUser, setInfoUser] = useState<IUserInfo | null>(null);

  useEffect(() => {
    const accessToken = getAccessTokenFromLocalStorage();
    if (accessToken) {
      const decodedInfo = decodeToken(accessToken);
      setInfoUser(decodedInfo || null);
    }
  }, []);

  return (
    <>
      {!infoUser?.singerId && (
        <Link href={"/upgrade"}>
          <Button variant="contained" color="primary" sx={{ marginRight: 2 }}>
            Đăng ký ca sĩ
          </Button>
        </Link>
      )}
    </>
  );
};

export default ButtonUpdateSingerHeader;
