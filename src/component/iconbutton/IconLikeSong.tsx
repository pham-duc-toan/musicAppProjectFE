"use client";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { apiBasicClient, apiBasicServer } from "@/app/utils/request"; // Thêm import apiBasicServer
import { getAccessTokenFromLocalStorage } from "@/app/helper/localStorageClient";
import { useEffect, useState } from "react";
import { revalidateByTag } from "@/app/action";
import { useAppContext } from "@/context-app";

export default function FavoriteButton({
  songId,
  fSongs,
}: {
  songId: string;
  fSongs: string[];
}) {
  // State to track if the song is in favorites
  const [isFavorite, setIsFavorite] = useState(fSongs.includes(songId));
  const { showMessage } = useAppContext();
  // useEffect to update the state when fSongs changes
  useEffect(() => {
    setIsFavorite(fSongs.includes(songId));
  }, [fSongs, songId]);

  const handleFavoriteToggle = async () => {
    const accessToken = getAccessTokenFromLocalStorage();
    if (accessToken) {
      try {
        if (isFavorite) {
          setIsFavorite(false);
          // Nếu bài hát đã yêu thích, gọi API xóa khỏi yêu thích
          await apiBasicClient(
            "DELETE",
            `/songs/favoriteSongs/remove/${songId}`
          );
          revalidateByTag("revalidate-tag-infoUser");
        } else {
          setIsFavorite(true);
          await apiBasicClient("POST", `/songs/favoriteSongs/add/${songId}`);
          revalidateByTag("revalidate-tag-infoUser");
        }
      } catch (error) {
        console.error("Lỗi khi cập nhật yêu thích:", error);
      }
    } else {
      showMessage(
        "Bạn cần đăng nhập mới có thể sử dụng chức năng này",
        "error"
      );
    }
  };

  return (
    <IconButton onClick={handleFavoriteToggle}>
      {isFavorite ? (
        <FavoriteIcon sx={{ fontSize: "20px", color: "red" }} />
      ) : (
        <FavoriteBorderIcon sx={{ fontSize: "20px" }} />
      )}
    </IconButton>
  );
}