"use client";
import { revalidateByTag } from "@/app/action";
import { apiBasicClient } from "@/app/utils/request";
import { TableCell, Tooltip, Chip } from "@mui/material";
import { useState } from "react";

const ChangeStatus = ({ song }: any) => {
  const [status, setStatus] = useState(song.status);

  const handleClick = async () => {
    const newStatus = status === "active" ? "inactive" : "active";
    try {
      setStatus(newStatus);
      await apiBasicClient("PATCH", `/songs/editSong/${song._id}`, undefined, {
        status: newStatus,
      });
      revalidateByTag("revalidate-by-songs");
      // Cập nhật lại trạng thái nếu API gọi thành công
    } catch (error) {
      console.error("Failed to change status:", error);
    }
  };

  return (
    <TableCell onClick={handleClick}>
      <Tooltip title="Đổi trạng thái" arrow>
        <Chip
          label={status === "active" ? "Hoạt động" : "Không hoạt động"}
          color={status === "active" ? "success" : "error"}
        />
      </Tooltip>
    </TableCell>
  );
};

export default ChangeStatus;
