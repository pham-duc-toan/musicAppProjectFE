"use client";

import { revalidateByTag } from "@/app/action";
import { decodeToken } from "@/app/helper/jwt";
import { getAccessTokenFromLocalStorage } from "@/app/helper/localStorageClient";
import { apiBasicClient } from "@/app/utils/request";
import { useAppContext } from "@/context-app";
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";
import { useState } from "react";

const RegisterNow = () => {
  const [loading, setLoading] = useState(false);
  const { showMessage } = useAppContext();
  const router = useRouter();
  const handleRegisterNow = async () => {
    setLoading(true);
    const accessToken = getAccessTokenFromLocalStorage();
    const info = decodeToken(accessToken || undefined);
    if (info?.singerId) {
      router.push("/");
      return;
    }

    try {
      const res = await apiBasicClient("GET", "/orders/checkUser/payment");
      if (res.data) {
        router.push("/singers/createSinger");
        return;
      }
    } catch (error) {
      showMessage("Không thể thực hiện!", "error");
    }
    try {
      const res = await apiBasicClient("POST", "/payment");
      if (res?.statusCode == 201) {
        try {
          //tao order
          const response = await apiBasicClient(
            "POST",
            "/orders/create",
            undefined,
            {
              orderId: res.data.orderId,
              shortLink: res.data.shortLink,
            }
          );
          if (response?.data?.orderId) {
            await apiBasicClient(
              "POST",
              "/payment/transaction-status",
              undefined,
              { orderId: response.data.orderId }
            );
          }
          await revalidateByTag("revalidate-tag-orders");
        } catch (error) {
          showMessage("Lỗi kết nối với server", "error");
          return;
        }

        router.push(res.data.shortLink);
      } else {
        showMessage("Không thể thực hiện !", "error");
      }
    } catch (error) {
      showMessage("Không thể thực hiện !", "error");
    }
    setLoading(false);
  };

  return (
    <Button
      variant="contained"
      fullWidth
      onClick={handleRegisterNow}
      disabled={loading}
      sx={{
        backgroundColor: "#9457ff",
        ":hover": { backgroundColor: "#9457ff" },
      }}
    >
      Đăng ký ngay
    </Button>
  );
};

export default RegisterNow;
