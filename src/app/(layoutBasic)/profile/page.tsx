// app/profile/page.tsx
import { Box, Typography, Avatar, Paper, Button, Stack } from "@mui/material";
import { apiBasicServer } from "@/app/utils/request";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import { CheckTokenFromCookie } from "@/app/utils/checkRole";

interface UserProfile {
  fullName: string;
  username: string;
  role: {
    roleName: string;
    _id: string;
    permissions: string[];
  };
  avatar: string;
  type: string;
  singerId?: string;
  dataSinger?: {
    _id: string;
    fullName: string;
    avatar: string;
    status: string;
  };
}

async function fetchProfileData(): Promise<UserProfile | null> {
  const access_token = CheckTokenFromCookie();

  try {
    const data = await apiBasicServer(
      "GET",
      "/users/profile",
      undefined,
      undefined,
      access_token
    );

    if (data?.data && data.data.singerId) {
      const dataSinger = await apiBasicServer(
        "GET",
        `/singers/detail/${data.data.singerId}`
      );

      data.data.dataSinger = dataSinger.data;
    }

    return data?.data || null;
  } catch (error) {
    console.error("Failed to fetch profile data:", error);
    return null;
  }
}

export default async function ProfilePage() {
  const profileData = await fetchProfileData();

  if (!profileData) return <p>Error loading profile data.</p>;

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
          maxWidth: "400px",
          width: "100%",
          textAlign: "center",
          marginBottom: "20px",
        }}
      >
        <Box
          display={"flex"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Avatar
            src={`${profileData.avatar}`}
            alt={profileData.fullName}
            sx={{ width: 100, height: 100, marginBottom: "10px" }}
          />
          <Button variant="contained" color="secondary">
            Chỉnh sửa
          </Button>
        </Box>
        <Typography variant="h5">{profileData.fullName}</Typography>
        <Typography color="textSecondary" sx={{ marginBottom: "10px" }}>
          {profileData.username}
        </Typography>
        <Typography variant="body1">
          <strong>Vai trò:</strong> {profileData.role.roleName}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          <strong>Loại người dùng:</strong> {profileData.type}
        </Typography>
      </Paper>

      {profileData.dataSinger && (
        <Paper
          elevation={3}
          sx={{
            padding: "20px",
            maxWidth: "400px",
            width: "100%",
            textAlign: "center",
          }}
        >
          <Typography variant="h6" sx={{ marginBottom: "10px" }}>
            Thông tin ca sĩ quản lý
          </Typography>
          <Avatar
            src={`${profileData.dataSinger.avatar}`}
            alt={profileData.dataSinger.fullName}
            sx={{ width: 80, height: 80, marginBottom: "10px" }}
          />
          <Typography variant="h5">
            {profileData.dataSinger.fullName}
          </Typography>
          <Typography color="textSecondary" sx={{ marginBottom: "10px" }}>
            <strong>Trạng thái:</strong> {profileData.dataSinger.status}
          </Typography>

          <Stack direction="row" spacing={2} justifyContent="center">
            <Button
              variant="outlined"
              color="primary"
              component={Link}
              href={`/detailSinger/${profileData.dataSinger._id}`}
            >
              Xem chi tiết
            </Button>
            <Button variant="contained" color="secondary">
              Chỉnh sửa
            </Button>
          </Stack>
        </Paper>
      )}
    </Box>
  );
}
