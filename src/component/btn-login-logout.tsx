"use client";

import Link from "next/link";
import { Button } from "@mui/material";

import {
  getAccessTokenFromLocalStorage,
  removeTokensFromLocalStorage,
} from "@/app/helper/localStorageClient";
import { logout } from "@/app/utils/request";
import { useEffect, useState } from "react";
import { decodeToken } from "@/app/helper/jwt";
import { JwtPayload } from "jsonwebtoken";

export default function BtnLoginLogout() {
  const [isLogin, setIsLogin] = useState<string | JwtPayload | null>(null);
  useEffect(() => {
    const accessToken = getAccessTokenFromLocalStorage();
    if (!accessToken) {
      setIsLogin(null);
    } else {
      setIsLogin(decodeToken(accessToken));
    }
  }, []);
  return (
    <>
      {isLogin ? (
        <Button
          onClick={async () => {
            await logout();
            setIsLogin(null);
            removeTokensFromLocalStorage();
          }}
          variant="contained"
          sx={{
            marginRight: "5px",
          }}
        >
          Logout
        </Button>
      ) : (
        <Link href={"/login"}>
          <Button
            variant="contained"
            sx={{
              marginRight: "5px",
            }}
          >
            Login
          </Button>
        </Link>
      )}
    </>
  );
}
