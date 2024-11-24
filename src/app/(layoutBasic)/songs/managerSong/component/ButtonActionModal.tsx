"use client";
import React, { useState } from "react";
import {
  Tooltip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import { apiBasicClient } from "@/app/utils/request";
import { revalidateByTag } from "@/app/action";
import { useAppContext } from "@/context-app";
import EditSongModal from "./EditSongModal";
import Link from "next/link";

interface Topic {
  _id: string;
  title: string;
}

interface Singer {
  fullName: string;
}

interface Song {
  _id: string;
  title: string;
  avatar: string;
  singerId: Singer;
  topicId: Topic;
  status: string;
}

interface ButtonActionModalProps {
  song: Song;
}

const ButtonActionModal: React.FC<ButtonActionModalProps> = ({ song }) => {
  const { showMessage } = useAppContext();
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  const handleDelete = async () => {
    try {
      const response = await apiBasicClient(
        "DELETE",
        `/songs/deleteSong/${song._id}`
      );
      if (response.statusCode >= 300) {
        showMessage(response.message, "error");
      } else {
        await revalidateByTag("revalidate-tag-songs");
        showMessage("Xóa chủ đề thành công!", "success");
        setOpenDialog(false);
      }
    } catch (error) {
      console.error("Error deleting song:", error);
    }
  };

  return (
    <>
      <Tooltip title="Xem chi tiết" arrow>
        <Link href={`/songs/detail/${song._id}`}>
          <IconButton color="primary">
            <VisibilityIcon />
          </IconButton>
        </Link>
      </Tooltip>
      <Tooltip title="Chỉnh sửa" arrow>
        <IconButton color="warning" onClick={() => setOpenEditModal(true)}>
          <EditIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title="Xóa bài hát" arrow>
        <IconButton color="error" onClick={() => setOpenDialog(true)}>
          <DeleteIcon />
        </IconButton>
      </Tooltip>

      <EditSongModal
        open={openEditModal}
        onClose={() => setOpenEditModal(false)}
        song={song}
      />
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Xác nhận xóa</DialogTitle>
        <DialogContent>
          <Typography>Bạn có chắc muốn xóa bài hát này không?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} color="primary">
            Hủy
          </Button>
          <Button onClick={handleDelete} color="error" autoFocus>
            Có
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ButtonActionModal;
