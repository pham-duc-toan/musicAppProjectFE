"use client";

import { getCookie } from "@/app/helper/cookieClient";
import { useAppContext } from "@/context-app";
import { Button } from "@mui/material";

const CheckvarCookie = () => {
  const abc = async () => {
    try {
      // Gọi API route set-cookie
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACK_END_URL}`, {
        method: "GET",
        credentials: "include", // Để đảm bảo cookie được gửi trong request
      });

      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  return (
    <>
      <Button onClick={abc}>check var Cookie</Button>
    </>
  );
};
export default CheckvarCookie;