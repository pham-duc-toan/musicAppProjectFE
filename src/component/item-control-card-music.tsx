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
import PauseIcon from "@mui/icons-material/Pause";
import Link from "next/link";
import { TSongDetail } from "@/dataType/song";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { pause, play, setNewSong } from "@/store/playingMusicSlice";
import Image from "next/image";

export default function ItemControlCard({ data }: { data: TSongDetail }) {
  const theme = useTheme();
  const songCurrent = useSelector((state: RootState) => state.playingMusic);
  const dispatch: AppDispatch = useDispatch();
  const handleChangeNewSongPlaying = () => {
    dispatch(setNewSong(data));
  };
  const handleChangeIsPlaying = () => {
    if (songCurrent.isPlaying) {
      dispatch(pause());
    } else {
      dispatch(play());
    }
  };
  return (
    <Card sx={{ display: "flex" }}>
      <Box sx={{ display: "flex", flexDirection: "column", width: "50%" }}>
        <CardContent sx={{ flex: "1 0 auto", padding: "32px 24px 0 24px" }}>
          <Typography
            component="div"
            variant="h5"
            height={"100px"}
            sx={{
              fontSize: "20px",
              lineHeight: "1.3",
              height: "78px",
              overflow: "hidden",
              textOverflow: "ellipsis",
              display: "-webkit-box",
              WebkitBoxOrient: "vertical",
              WebkitLineClamp: 3,
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

          {songCurrent._id != data._id ? (
            <IconButton
              aria-label="playing"
              onClick={handleChangeNewSongPlaying}
            >
              <PlayArrowIcon sx={{ height: 38, width: 38 }} />
            </IconButton>
          ) : (
            <IconButton aria-label="play/pause" onClick={handleChangeIsPlaying}>
              {!songCurrent.isPlaying && songCurrent._id == data._id ? (
                <PlayArrowIcon sx={{ height: 38, width: 38 }} />
              ) : (
                <PauseIcon sx={{ height: 38, width: 38 }} />
              )}
            </IconButton>
          )}
          <IconButton aria-label="next">
            {theme.direction === "rtl" ? (
              <SkipPreviousIcon />
            ) : (
              <SkipNextIcon />
            )}
          </IconButton>
        </Box>
      </Box>

      <Image
        src={data.avatar}
        alt={data.title}
        width={207}
        height={207}
        style={{ objectFit: "cover" }}
        priority
      />
    </Card>
  );
}
