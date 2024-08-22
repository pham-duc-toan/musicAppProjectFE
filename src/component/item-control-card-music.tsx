"use client";
import * as React from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import Link from "next/link";
interface TSongDetail {
  listen: number;
  _id: string;
  title: string;
  avatar: string;
  description: string;
  singerId: string;
  topicId: string;
  like: number;
  lyrics: string;
  audio: string;
  status: string;
  slug: string;
  singerInfo: {
    fullName: string;
    [key: string]: any;
  };
  deleted: boolean;
}

export default function ItemControlCard({ data }: { data: TSongDetail }) {
  const theme = useTheme();

  return (
    <Card sx={{ display: "flex" }}>
      <Box sx={{ display: "flex", flexDirection: "column", width: "50%" }}>
        <CardContent sx={{ flex: "1 0 auto" }}>
          <Typography
            component="div"
            variant="h5"
            height={"100px"}
            sx={{
              fontSize: "20px",
              lineHeight: "1.3",
              height: "53px",
              overflow: "hidden",
              textOverflow: "ellipsis",
              display: "-webkit-box",
              WebkitBoxOrient: "vertical",
              WebkitLineClamp: 2,
              wordWrap: "break-word",
            }}
          >
            <Link href={`/songDetail/${data.slug}`}>{data.title}</Link>
          </Typography>
          <Typography
            variant="subtitle1"
            color="text.secondary"
            component="div"
            height={"50%"}
            noWrap
          >
            {data.singerInfo.fullName}
          </Typography>
        </CardContent>
        <Box sx={{ display: "flex", alignItems: "center", pl: 1, pb: 1 }}>
          <IconButton aria-label="previous">
            {theme.direction === "rtl" ? (
              <SkipNextIcon />
            ) : (
              <SkipPreviousIcon />
            )}
          </IconButton>
          <IconButton aria-label="play/pause">
            <PlayArrowIcon sx={{ height: 38, width: 38 }} />
          </IconButton>
          <IconButton aria-label="next">
            {theme.direction === "rtl" ? (
              <SkipPreviousIcon />
            ) : (
              <SkipNextIcon />
            )}
          </IconButton>
        </Box>
      </Box>
      <CardMedia
        component="img"
        sx={{ width: 151 }}
        image={data.avatar}
        alt={data.title}
      />
    </Card>
  );
}
