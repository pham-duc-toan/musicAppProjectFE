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
  Tooltip,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Chip,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { apiBasicClient } from "@/app/utils/request";
import ButtonRedirect from "@/component/buttonRedirect";
import EditTopicModal from "./component/EditTopicModal";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { revalidateByTag } from "@/app/action";
import ViewTopicModal from "./component/VIewTopicModal";
import { useAppContext } from "@/context-app";

interface Topic {
  _id: string;
  title: string;
  avatar: string;
  description: string;
  status: string;
  slug: string;
  deleted: boolean;
}

const ManagerTopic: React.FC = () => {
  const { showMessage } = useAppContext();
  const [topics, setTopics] = useState<Topic[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedTopicId, setSelectedTopicId] = useState<string | null>(null);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);
  const [openViewModal, setOpenViewModal] = useState(false);

  const fetchTopics = async () => {
    setLoading(true);
    try {
      const response = await apiBasicClient("GET", "/topics");
      if (response?.data) {
        setTopics(response.data);
      }
    } catch (error) {
      console.error("Error fetching topics:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTopics();
  }, []);
  const handleViewClick = (topic: Topic) => {
    setSelectedTopic(topic);
    setOpenViewModal(true);
  };
  const handleEditClick = (topic: Topic) => {
    setSelectedTopic(topic);
    setOpenEditModal(true);
  };

  const handleDeleteClick = (topicId: string) => {
    setSelectedTopicId(topicId);
    setOpenDialog(true);
  };

  const confirmDelete = async () => {
    if (selectedTopicId) {
      try {
        const response = await apiBasicClient(
          "DELETE",
          `/topics/${selectedTopicId}`
        );
        if (response.statusCode >= 300) {
          showMessage(response.message, "error");
        } else {
          setTopics((prevTopics) =>
            prevTopics.filter((topic) => topic._id !== selectedTopicId)
          );
        }

        await revalidateByTag("revalidate-tag-topics");
        setOpenDialog(false);
        setSelectedTopicId(null);
      } catch (error) {
        console.error("Error deleting topic:", error);
      }
    }
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedTopicId(null);
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Box
        display={"flex"}
        justifyContent={"space-between"}
        marginBottom={"15px"}
      >
        <Typography variant="h4" gutterBottom>
          Quản lý chủ đề
        </Typography>
        <ButtonRedirect
          link="/admin/managerTopic/createTopic"
          content="Thêm mới chủ đề"
        />
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>STT</TableCell>
              <TableCell>Hình ảnh</TableCell>
              <TableCell>Tên chủ đề</TableCell>
              <TableCell>Trạng thái</TableCell>
              <TableCell>Hành động</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={5} sx={{ textAlign: "center" }}>
                  <CircularProgress />
                </TableCell>
              </TableRow>
            ) : (
              topics.map((topic, index) => (
                <TableRow key={topic._id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>
                    <Avatar
                      src={topic.avatar}
                      alt={topic.title}
                      variant="rounded"
                    />
                  </TableCell>
                  <TableCell>{topic.title}</TableCell>
                  <TableCell>
                    <Chip
                      label={
                        topic.status === "active"
                          ? "Hoạt động"
                          : "Không hoạt động"
                      }
                      color={topic.status === "active" ? "success" : "error"}
                    />
                  </TableCell>
                  <TableCell>
                    <Tooltip title="Xem chi tiết" arrow>
                      <IconButton
                        color="primary"
                        onClick={() => handleViewClick(topic)}
                      >
                        <VisibilityIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Chỉnh sửa" arrow>
                      <IconButton
                        color="warning"
                        onClick={() => handleEditClick(topic)}
                      >
                        <EditIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Xóa chủ đề" arrow>
                      <IconButton
                        color="error"
                        onClick={() => handleDeleteClick(topic._id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {selectedTopic && (
        <>
          <EditTopicModal
            open={openEditModal}
            onClose={() => setOpenEditModal(false)}
            topic={selectedTopic}
            setTopics={setTopics}
          />
          <ViewTopicModal
            open={openViewModal}
            onClose={() => setOpenViewModal(false)}
            topic={selectedTopic}
          />
        </>
      )}

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Xác nhận xóa</DialogTitle>
        <DialogContent>
          <Typography>Bạn có chắc muốn xóa chủ đề này không?</Typography>
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

export default ManagerTopic;
