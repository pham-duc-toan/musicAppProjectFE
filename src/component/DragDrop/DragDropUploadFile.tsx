"use client";
import React, { useState, useCallback } from "react";
import { useDropzone, FileWithPath } from "react-dropzone";
import {
  TextField,
  Button,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  CircularProgress,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import "./style.css";

function DragDropUploadFile() {
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [audioPreview, setAudioPreview] = useState<string | null>(null);

  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<string>("active");
  // Hàm để xử lý file upload và xem trước avatar/audio
  const onDrop = useCallback((acceptedFiles: FileWithPath[]) => {
    acceptedFiles.forEach((file) => {
      if (file.type.startsWith("image/")) {
        setAvatarPreview(URL.createObjectURL(file));
        setAvatarFile(file);
      }
      if (file.type.startsWith("audio/")) {
        setAudioPreview(URL.createObjectURL(file));
        setAudioFile(file);
      }
    });
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: { "image/*": [], "audio/*": [] },
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const form = e.currentTarget;
    //@ts-ignore
    const title = form.title.value || "";
    const description = form.description.value || "";
    const singerId = form.singerId.value || "";
    const topicId = form.topicId.value || "";

    // Tạo một đối tượng FormData
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("singerId", singerId);
    formData.append("topicId", topicId);
    formData.append("status", status);

    // Thêm file vào formData nếu có
    if (avatarFile) {
      formData.append("avatar", avatarFile);
    }
    if (audioFile) {
      formData.append("audio", audioFile);
    }

    // Gửi formData lên server
    try {
      const response = await fetch(
        process.env.NEXT_PUBLIC_BACK_END_URL + "/songs/create",
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();
      console.log(result); // Xử lý kết quả từ server
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false); // Dừng trạng thái loading sau khi nhận được phản hồi
    }
  };

  const handleRemoveAvatar = () => {
    setAvatarPreview(null);
    setAvatarFile(null);
  };

  const handleRemoveAudio = () => {
    setAudioPreview(null);
    setAudioFile(null);
  };
  const handleStatusChange = (event: any) => {
    setStatus(event.target.value as string);
  };
  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField size="small" label="Title" name="title" required />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            size="small"
            label="Description"
            name="description"
            multiline
            rows={4}
            required
          />
        </Grid>
        <Grid item xs={6}>
          <TextField label="Singer ID" size="small" name="singerId" required />
        </Grid>
        <Grid item xs={6}>
          <TextField label="Topic ID" size="small" name="topicId" required />
        </Grid>

        <Grid item xs={3}>
          <FormControl fullWidth size="small">
            <InputLabel>Status</InputLabel>
            <Select
              label="Status"
              name="status"
              value={status}
              onChange={handleStatusChange}
            >
              <MenuItem value="active">Active</MenuItem>
              <MenuItem value="inactive">Inactive</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        {/* Avatar Upload */}
        {avatarPreview && (
          <Grid item>
            <Card
              sx={{
                display: "flex",
                alignItems: "center",
                position: "relative",
              }}
            >
              <CardMedia
                component="img"
                image={avatarPreview}
                alt="Avatar Preview"
                style={{ width: "200px", height: "200px", objectFit: "cover" }} // Kích thước cố định
              />
              <CardContent>
                <Typography>Avatar Preview</Typography>
              </CardContent>
              <IconButton
                onClick={handleRemoveAvatar}
                sx={{
                  position: "absolute",
                  top: 8,
                  right: 8,
                  color: "red",
                }}
              >
                <CloseIcon />
              </IconButton>
            </Card>
          </Grid>
        )}

        {/* Audio Upload */}
        {audioPreview && (
          <Grid item>
            <Card sx={{ minWidth: "460px", position: "relative" }}>
              <CardContent
                sx={{
                  display: { xs: "block", sm: "flex" },
                  alignItems: { sm: "center" },
                }}
              >
                <audio controls style={{ marginRight: "16px" }}>
                  <source src={audioPreview} type="audio/mpeg" />
                  Your browser does not support the audio tag.
                </audio>
                <Typography>Audio Preview</Typography>
                <IconButton
                  onClick={handleRemoveAudio}
                  sx={{
                    position: "absolute",
                    top: 8,
                    right: 8,
                    color: "red",
                  }}
                >
                  <CloseIcon />
                </IconButton>
              </CardContent>
            </Card>
          </Grid>
        )}
        <Grid
          item
          xs={12}
          sx={{ display: !(audioPreview && avatarPreview) ? "block" : "none" }}
        >
          <div {...getRootProps({ className: "dropzone" })}>
            <input {...getInputProps()} />
            <Button variant="outlined" fullWidth sx={{ padding: "50px" }}>
              Drag 'n' drop an avatar image or click to select one
            </Button>
          </div>
        </Grid>
        <Grid
          item
          xs={12}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={loading}
            endIcon={loading ? <CircularProgress size={24} /> : null}
          >
            {loading ? "Submitting..." : "Submit"}
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}

export default DragDropUploadFile;
