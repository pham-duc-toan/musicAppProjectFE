"use client";
import { useState, useEffect } from "react";
import { Navigation, Pagination, A11y } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { useTheme } from "@mui/material/styles"; // Thêm import này
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Image from "next/image";
import SlideNavButtons from "./SlideNavButtons";

// External Data import
const url = "https://fakestoreapi.com/products";

const CustomSlider1 = () => {
  const [products, setProducts] = useState([]);
  const theme = useTheme(); // Lấy theme từ MUI

  const getProductsFromBackend = async () => {
    const data = await fetch(url);
    const products = await data.json();
    setProducts(products);
  };

  useEffect(() => {
    getProductsFromBackend();
  }, []);

  console.log(products);

  return (
    <div>
      <h1>Custom Slider 1</h1>
      <br />
      <Swiper
        modules={[Navigation, Pagination, A11y]}
        slidesPerView={1}
        spaceBetween={15}
        breakpoints={{
          [theme.breakpoints.values.xs]: { slidesPerView: 1 }, // 0px (xs)
          [theme.breakpoints.values.sm]: { slidesPerView: 2 }, // 768px (sm)
          [theme.breakpoints.values.md]: { slidesPerView: 3 }, // 992px (md)
          [theme.breakpoints.values.lg]: { slidesPerView: 4 }, // 1200px (lg)
        }}
      >
        {products.map((item) => (
          <SwiperSlide
            key={item.id}
            style={{
              backgroundColor: "#fca5a5", // bg-red-200 equivalent
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div
              style={{
                border: "2px solid #3b82f6", // border-blue-500 equivalent
                borderRadius: "8px",
                overflow: "hidden",
                width: "200px",
                height: "300px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Image
                src={item.image}
                width={150}
                height={150}
                alt={item.title}
              />
            </div>
          </SwiperSlide>
        ))}

        <SlideNavButtons />
      </Swiper>
    </div>
  );
};

export default CustomSlider1;
