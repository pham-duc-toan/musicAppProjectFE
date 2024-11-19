"use client";
import { revalidateByTag } from "@/app/action";
import { apiBasicClient } from "@/app/utils/request";
import { useAppContext } from "@/context-app";
import { TableCell, Tooltip, Chip } from "@mui/material";
import { useState } from "react";

const ChangeStatus = ({ song }: any) => {
  const [status, setStatus] = useState(song.status);
  const { showMessage } = useAppContext();
  const handleClick = async () => {
    const newStatus = status === "active" ? "inactive" : "active";
    try {
      setStatus(newStatus);
      const response = await apiBasicClient(
        "PATCH",
        `/songs/editSong/${song._id}`,
        undefined,
        {
          status: newStatus,
        }
      );
      if (response.statusCode >= 300) {
        showMessage(response.message, "error");
      }
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
