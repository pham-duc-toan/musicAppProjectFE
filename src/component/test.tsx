"use client";

import React, { useState, DragEvent } from "react";
import { Box, Typography, Button } from "@mui/material";

// Khởi tạo các box với màu sắc khác nhau
const initialBoxes = [
  { id: "1", text: "Box 1", color: "#3f51b5" }, // Màu xanh
  { id: "2", text: "Box 2", color: "#f44336" }, // Màu đỏ
  { id: "3", text: "Box 3", color: "#4caf50" }, // Màu xanh lá
  { id: "4", text: "Box 4", color: "#ff9800" }, // Màu cam
];

const DragAndDrop: React.FC = () => {
  const [boxes, setBoxes] = useState(initialBoxes);

  // Hàm xử lý sự kiện kéo
  const handleDragStart = (event: DragEvent<HTMLDivElement>, index: number) => {
    event.dataTransfer.setData("text/plain", index.toString());
  };

  // Hàm xử lý sự kiện thả
  const handleDrop = (event: DragEvent<HTMLDivElement>, index: number) => {
    event.preventDefault();
    const fromIndex = Number(event.dataTransfer.getData("text/plain"));

    // Thay đổi vị trí của các box
    const updatedBoxes = [...boxes];
    const [movedBox] = updatedBoxes.splice(fromIndex, 1);
    updatedBoxes.splice(index, 0, movedBox);
    setBoxes(updatedBoxes);
  };

  // Hàm xử lý sự kiện click
  const handleClick = () => {
    console.log("toandeptrai");
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "20px",
      }}
    >
      {boxes.map((box, index) => (
        <Box
          key={box.id}
          draggable
          onDragStart={(event) => handleDragStart(event, index)}
          onDrop={(event) => handleDrop(event, index)}
          onDragOver={(event) => event.preventDefault()}
          sx={{
            width: "200px",
            height: "100px",
            marginBottom: "10px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: box.color, // Gán màu sắc cho từng box
            color: "white",
            borderRadius: "4px",
            cursor: "move",
            boxShadow: 2,
            transition: "background-color 0.3s",
            "&:hover": {
              filter: "brightness(0.9)", // Hiệu ứng khi hover
            },
          }}
        >
          <Typography variant="h6">{box.text}</Typography>
          <Button
            variant="contained"
            onClick={handleClick}
            sx={{
              marginTop: "10px",
              backgroundColor: "white",
              color: box.color,
            }}
          >
            Click Me
          </Button>
        </Box>
      ))}
    </Box>
  );
};

export default DragAndDrop;
