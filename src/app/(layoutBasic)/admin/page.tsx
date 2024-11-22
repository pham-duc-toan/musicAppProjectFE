import React from "react";

import { Container, Typography } from "@mui/material";
import ChartComponent from "./ChartComponent";

const AdminPage = async () => {
  let data = undefined;
  try {
    data = await fetch("https://api.example.com/admin-data", {
      cache: "no-store", // Đảm bảo dữ liệu luôn được tải mới
    }).then((res) => res.json());
  } catch (error) {}

  return (
    <Container maxWidth="lg" sx={{ marginTop: 4 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Trang Chủ Admin
      </Typography>
      <ChartComponent data={data?.chartData} />
    </Container>
  );
};

export default AdminPage;
