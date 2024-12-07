"use client";
import React from "react";
import { Box, Typography, CardMedia } from "@mui/material";
import Link from "next/link";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

interface Topic {
  _id: string;
  title: string;
  avatar: string;
  description?: string;
  slug: string;
}

interface TopicSwiperProps {
  topics: Topic[];
}

const TopicSwiper: React.FC<TopicSwiperProps> = ({ topics }) => {
  return (
    <Swiper
      modules={[Navigation, Pagination]}
      spaceBetween={16}
      slidesPerView={2}
      navigation
      pagination={{ clickable: true }}
      breakpoints={{
        640: {
          slidesPerView: 2,
          spaceBetween: 16,
        },
        960: {
          slidesPerView: 3,
          spaceBetween: 24,
        },
        1280: {
          slidesPerView: 4,
          spaceBetween: 32,
        },
      }}
    >
      {topics.map((topic: Topic) => (
        <SwiperSlide key={topic._id}>
          <Link href={`topics/detail/${topic.slug}`} passHref>
            <Box
              sx={{
                position: "relative",
                overflow: "hidden",
                borderRadius: "8px",
                boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
                cursor: "pointer",
              }}
            >
              {/* Hình ảnh full chiều rộng và chiều cao */}
              <CardMedia
                component="img"
                image={topic.avatar}
                alt={topic.title}
                sx={{
                  width: "100%",
                  height: "220px",
                  objectFit: "cover",
                }}
              />

              {/* Nội dung tiêu đề và mô tả */}
              <Box
                sx={{
                  padding: "10px",
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 600,
                    display: "-webkit-box",
                    WebkitBoxOrient: "vertical",
                    WebkitLineClamp: 1,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {topic.title}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    marginTop: "5px",
                    display: "-webkit-box",
                    WebkitBoxOrient: "vertical",
                    WebkitLineClamp: 1,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {topic.description || "Mô tả đang được cập nhật"}
                </Typography>
              </Box>
            </Box>
          </Link>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default TopicSwiper;
