"use client";

import { getCookie } from "@/app/helper/cookieClient";
import { Button } from "@mui/material";

const Checkvar = () => {
  const abc = async () => {
    try {
      // Gọi API route set-cookie
      const response = await fetch("/api/set-cookie", {
        method: "GET",
        credentials: "include", // Để đảm bảo cookie được gửi trong request
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Response:", data);
        // Bạn có thể xử lý phản hồi ở đây nếu cần
      } else {
        console.error("Failed to set cookie");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  return <Button onClick={abc}>check var</Button>;
};
export default Checkvar;
