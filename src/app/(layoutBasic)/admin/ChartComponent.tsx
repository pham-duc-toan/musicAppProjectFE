"use client";

import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Box } from "@mui/material";

// Đăng ký các module của Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const ChartComponent = ({ data }: { data: any }) => {
  // Dữ liệu mặc định nếu không có dữ liệu từ server
  const defaultData = {
    labels: ["Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4", "Tháng 5", "Tháng 6"],
    datasets: [
      {
        label: "Doanh thu (Triệu VND)",
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };

  const chartData = data || defaultData;

  // Tùy chọn hiển thị biểu đồ
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Biểu đồ doanh thu theo tháng",
      },
    },
  };

  return (
    <Box sx={{ height: 400 }}>
      <Bar data={chartData} options={options} />
    </Box>
  );
};

export default ChartComponent;
