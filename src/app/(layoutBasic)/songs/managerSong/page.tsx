"use client";
import React, { useState, useEffect } from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Avatar,
  Typography,
  IconButton,
  Chip,
  Tooltip,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import PauseIcon from "@mui/icons-material/Pause";
import InfoIcon from "@mui/icons-material/Info";
import { apiBasicClient } from "@/app/utils/request";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { pause, play, setNewSong } from "@/store/playingMusicSlice";
import { TSongDetail } from "@/dataType/song";
import ButtonRedirect from "@/component/buttonRedirect";
import { useRouter } from "next/navigation";
import ChangeStatus from "./component/ChangStatus";
import EditSongModal from "./component/EditSongModal";
import { revalidateByTag } from "@/app/action";

interface Topic {
  _id: string;
  title: string;
  avatar: string;
  description: string;
  status: string;
  slug: string;
  deleted: boolean;
}

interface Song {
  _id: string;
  title: string;
  avatar: string;
  singerId: string;
  topicId: Topic;
  like: number;
  listen: number;
  audio: string;
  status: string;
  deleted: boolean;
  createdAt: string;
  updatedAt: string;
  slug: string;
}

const ManagerSong: React.FC = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { isPlaying, _id: playingSongId } = useSelector(
    (state: RootState) => state.playingMusic
  );
  const [songs, setSongs] = useState<Song[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedSongId, setSelectedSongId] = useState<string | null>(null);

  const handlePlayPauseClick = (song: any) => {
    if (isPlaying && playingSongId === song._id) {
      dispatch(pause());
    } else {
      dispatch(setNewSong(song)); // Cập nhật bài hát mới nếu bài hát khác đang phát
      dispatch(play());
    }
  };

  const handleDeleteClick = (songId: string) => {
    setSelectedSongId(songId);
    setOpenDialog(true);
  };

  const confirmDelete = async () => {
    if (selectedSongId) {
      await apiBasicClient("DELETE", `/songs/deleteSong/${selectedSongId}`);
      setSongs((prevSongs) =>
        prevSongs.filter((song) => song._id !== selectedSongId)
      );
      await revalidateByTag("revalidate-tag-songs");
      setOpenDialog(false);
      setSelectedSongId(null);
    }
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedSongId(null);
  };
  const [openEditModal, setOpenEditModal] = useState(false);
  const [selectedSong, setSelectedSong] = useState<Song | null>(null);

  const handleEditClick = (song: Song) => {
    setSelectedSong(song);
    setOpenEditModal(true);
  };

  useEffect(() => {
    const fetchSongs = async () => {
      setLoading(true);
      const response = await apiBasicClient("GET", "/songs/managerSong");
      if (response?.data) {
        setSongs(response.data);
      }
      setLoading(false);
    };
    fetchSongs();
  }, []);

  return (
    <Box sx={{ padding: 3 }}>
      <Box
        display={"flex"}
        justifyContent={"space-between"}
        marginBottom={"15px"}
      >
        <Typography variant="h4" gutterBottom>
          Quản lý bài hát
        </Typography>
        <ButtonRedirect link="/songs/createSong" content="Thêm mới bài hát" />
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>STT</TableCell>
              <TableCell>Hình ảnh</TableCell>
              <TableCell>Tiêu đề</TableCell>
              <TableCell>Chủ đề</TableCell>
              <TableCell>Phát</TableCell>
              <TableCell>Trạng thái</TableCell>
              <TableCell>Hành động</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={7} sx={{ textAlign: "center" }}>
                  <CircularProgress />
                </TableCell>
              </TableRow>
            ) : (
              songs.map((song, index) => (
                <TableRow key={song._id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>
                    <Avatar
                      src={song.avatar}
                      alt={song.title}
                      variant="rounded"
                    />
                  </TableCell>
                  <TableCell>{song.title}</TableCell>
                  <TableCell>{song.topicId.title}</TableCell>
                  <TableCell>
                    <IconButton
                      color="primary"
                      onClick={() => handlePlayPauseClick(song)}
                    >
                      {isPlaying && playingSongId === song._id ? (
                        <PauseIcon />
                      ) : (
                        <PlayArrowIcon />
                      )}
                    </IconButton>
                  </TableCell>
                  <ChangeStatus song={song} />
                  <TableCell>
                    <Tooltip title="Xem chi tiết" arrow>
                      <IconButton
                        onClick={() => {
                          router.push(`/songs/detail/${song._id}`);
                        }}
                        color="info"
                      >
                        <InfoIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Chỉnh sửa" arrow>
                      <IconButton
                        color="warning"
                        onClick={() => handleEditClick(song)}
                      >
                        <EditIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Xóa bài hát" arrow>
                      <IconButton
                        color="error"
                        onClick={() => handleDeleteClick(song._id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
          {songs && songs.length > 0 && (
            <EditSongModal
              open={openEditModal}
              onClose={() => setOpenEditModal(false)}
              song={selectedSong}
              setSongs={setSongs}
            />
          )}
        </Table>
      </TableContainer>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Xác nhận xóa</DialogTitle>
        <DialogContent>
          <Typography>Bạn có chắc muốn xóa bài hát này không?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Hủy
          </Button>
          <Button onClick={confirmDelete} color="error" autoFocus>
            Có
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ManagerSong;
