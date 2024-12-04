"use client";

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
    try {
      const res = await apiBasicClient("POST", "/payment");
      if (res?.statusCode == 201) {
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