import { Box, Typography, Avatar, Paper, Button } from "@mui/material";
import { apiBasicClient, apiBasicServer } from "@/app/utils/request";

// Định nghĩa kiểu dữ liệu của ca sĩ
interface ISingerDetail {
  _id: string;
  fullName: string;
  avatar: string;
  status: string;
  slug: string;
  deleted: boolean;
  updatedAt: string;
  createdAt: string;
}

// Hàm server-side để lấy dữ liệu
async function getSingerDetail(id: string): Promise<ISingerDetail | null> {
  try {
    const response = await apiBasicServer("GET", `/singers/detailClient/${id}`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch singer details:", error);
    return null;
  }
}

// Component trang chi tiết ca sĩ
export default async function SingerDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const singerDetail = await getSingerDetail(params.id);

  if (!singerDetail) {
    return (
      <Typography color="error" sx={{ textAlign: "center", marginTop: "20px" }}>
        Không thể tải thông tin ca sĩ.
      </Typography>
    );
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: "20px",
      }}
    >
      <Paper
        elevation={3}
        sx={{
          padding: "20px",
          maxWidth: "600px",
          width: "100%",
          textAlign: "center",
        }}
      >
        <Avatar
          src={singerDetail.avatar}
          alt={singerDetail.fullName}
          sx={{ width: 120, height: 120, marginBottom: "10px" }}
        />
        <Typography variant="h4" sx={{ marginBottom: "10px" }}>
          {singerDetail.fullName}
        </Typography>
        <Typography variant="body1" sx={{ marginBottom: "10px" }}>
          <strong>Trạng thái:</strong> {singerDetail.status}
        </Typography>

        <Typography variant="body2" sx={{ marginBottom: "10px" }}>
          <strong>Tham gia vào:</strong>{" "}
          {new Date(singerDetail.createdAt).toLocaleString("vi-VN")}
        </Typography>
      </Paper>
    </Box>
  );
}
