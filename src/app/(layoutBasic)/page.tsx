"use client";

import {
  Box,
  Grid,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Button,
  Tabs,
  Tab,
} from "@mui/material";
import { useState } from "react";

export default function Dashboard() {
  const [tabIndex, setTabIndex] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  const mockCards = [
    {
      title: "Những Bài Hát Hay Nhất Về Mưa",
      description: "Charmy Phạm, Trung Quân, JSOL...",
      image:
        "https://photo-resize-zmp3.zmdcdn.me/w320_r1x1_jpeg…over/6/2/a/1/62a18e8a05e3b9821050a672a00540b1.jpg",
    },
    {
      title: "Nghệ Sĩ Trẻ Hát Trịnh",
      description: "Mỹ Anh, Ngô Lan Hương, Hoàng Dũng...",
      image:
        "https://photo-resize-zmp3.zmdcdn.me/w320_r1x1_jpeg/cover/b/c/5/8/bc58f24cc102659381ab2f4638bb594d.jpg",
    },
    {
      title: "V-Pop Hay Nhất Thập Niên 2010s",
      description: "Noo Phước Thịnh, ERIK, Trung Quân...",
      image:
        "https://photo-resize-zmp3.zmdcdn.me/w320_r1x1_jpeg/cover/b/c/5/8/bc58f24cc102659381ab2f4638bb594d.jpg", // Thay bằng URL hình ảnh thật
    },
    {
      title: "California Sunset",
      description: "PREP, Mỹ Anh, Surfaces...",
      image:
        "https://photo-resize-zmp3.zmdcdn.me/w320_r1x1_jpeg/cover/5/5/b/7/55b70283079e6f000758602b737d3180.jpg", // Thay bằng URL hình ảnh thật
    },
  ];

  return (
    <Box
      sx={{
        padding: "20px",

        color: "#FFFFFF",
        minHeight: "100vh",
      }}
    >
      {/* Title */}
      <Typography variant="h4" sx={{ marginBottom: "20px" }}>
        Có Thể Bạn Muốn Nghe
      </Typography>

      {/* Cards */}
      <Grid container spacing={2} sx={{ marginBottom: "40px" }}>
        {mockCards.map((card, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card sx={{ backgroundColor: "#2A2A40", color: "#FFFFFF" }}>
              <CardMedia
                component="img"
                height="140"
                image={card.image}
                alt={card.title}
                sx={{ borderRadius: "4px" }}
              />
              <CardContent>
                <Typography variant="h6">{card.title}</Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ color: "#A0A0A0" }}
                >
                  {card.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Tabs for New Releases */}
      <Typography variant="h5" sx={{ marginBottom: "20px" }}>
        Mới Phát Hành
      </Typography>
      <Tabs
        value={tabIndex}
        onChange={handleTabChange}
        textColor="inherit"
        indicatorColor="primary"
        aria-label="new releases tabs"
        sx={{ marginBottom: "20px" }}
      >
        <Tab label="Tất Cả" />
        <Tab label="Việt Nam" />
        <Tab label="Quốc Tế" />
      </Tabs>

      {/* New Release Items */}
      <Grid container spacing={2}>
        {[...Array(6)].map((_, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card sx={{ backgroundColor: "#2A2A40", color: "#FFFFFF" }}>
              <CardContent>
                <Typography variant="h6">Bài hát {index + 1}</Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ color: "#A0A0A0" }}
                >
                  Mô tả ngắn gọn bài hát {index + 1}.
                </Typography>
                <Button
                  sx={{ marginTop: "10px" }}
                  variant="outlined"
                  color="primary"
                >
                  Nghe Ngay
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
