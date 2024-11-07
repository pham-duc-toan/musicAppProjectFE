"use client";
import "./style.css";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Box, Typography, Avatar, CircularProgress } from "@mui/material";
import { apiBasicClient } from "@/app/utils/request";
import Lyric from "./lyric";

interface TSongDetail {
  listen: number;
  _id: string;
  title: string;
  avatar: string;
  description: string;
  singerId: {
    _id: string;
    fullName: string;
  };
  topicId: {
    _id: string;
    title: string;
  };
  like: number;
  lyrics: string;
}

const SongDetailPage = () => {
  const { id } = useParams();
  const [songDetail, setSongDetail] = useState<TSongDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSongDetail = async () => {
      try {
        const res = await apiBasicClient("GET", `/songs/detail/${id}`);
        setSongDetail(res.data);
      } catch (error) {
        console.error("Error fetching song detail:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSongDetail();
  }, [id]);

  if (loading) {
    return (
      <Box
        position={"fixed"}
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="80vh"
        width="80vw"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (!songDetail) {
    return <Typography>Không tìm thấy bài hát</Typography>;
  }

  return (
    <Box sx={{ p: 4, maxWidth: 800, mx: "auto" }}>
      {/* Ảnh và tiêu đề bài hát */}
      <Box display="flex" alignItems="center" mb={4}>
        <Avatar
          src={songDetail.avatar}
          alt={songDetail.title}
          sx={{ width: 100, height: 100, mr: 2 }}
        />
        <Box>
          <Typography variant="h4" fontWeight="bold">
            {songDetail.title}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            Ca sĩ: {songDetail.singerId.fullName}
          </Typography>
          <Typography variant="subtitle2" color="text.secondary">
            Chủ đề: {songDetail.topicId.title}
          </Typography>
        </Box>
      </Box>

      {/* Lượt nghe và lượt thích */}
      <Box display="flex" gap={4} mb={2}>
        <Typography variant="subtitle2">
          <strong>Lượt nghe:</strong> {songDetail.listen}
        </Typography>
        <Typography variant="subtitle2">
          <strong>Lượt thích:</strong> {songDetail.like}
        </Typography>
      </Box>

      {/* Lời bài hát */}
      <Typography variant="body1">
        <strong>Lời bài hát:</strong>
      </Typography>
      <Box
        className="lyrics-container"
        sx={{
          minHeight: songDetail.lyrics ? "auto" : "300px",
          maxHeight: "300px",
          overflowY: songDetail.lyrics ? "auto" : "hidden",
          display: "flex",
          justifyContent: songDetail.lyrics ? "flex-start" : "center", // Center when no lyrics
          alignItems: songDetail.lyrics ? "flex-start" : "center", // Center vertically when no lyrics
          textAlign: "center",
          color: "text.secondary",
        }}
      >
        {songDetail.lyrics ? (
          <Typography
            variant="body2"
            whiteSpace="pre-line"
            className="lyrics-content"
          >
            <Lyric songId={songDetail._id} lyrics={songDetail.lyrics} />
          </Typography>
        ) : (
          <Typography variant="body2" whiteSpace="pre-line" fontStyle="italic">
            Chưa cập nhật lời cho bài hát
          </Typography>
        )}
      </Box>

      <Box gap={4} mt={2}>
        <Typography variant="body1" mb={2}>
          <strong>Mô tả:</strong>
        </Typography>
        {songDetail.description ? (
          <Typography variant="body1" color="text.secondary">
            {songDetail.description}
          </Typography>
        ) : (
          <Typography variant="body2" color="text.secondary" fontStyle="italic">
            Chưa cập nhật mô tả cho bài hát
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default SongDetailPage;
