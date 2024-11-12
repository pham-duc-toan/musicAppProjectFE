// app/profile/page.tsx
import { Box, Typography, Avatar, Paper, Button, Stack } from "@mui/material";
import { getInfoUser } from "@/app/utils/request";
import Link from "next/link";
import { CheckTokenFromCookie } from "@/app/utils/checkRole";
import IUserInfo from "@/dataType/infoUser";

async function fetchProfileData(): Promise<IUserInfo | null> {
  const access_token = CheckTokenFromCookie();

  try {
    const data = await getInfoUser(access_token.value);

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

      {profileData.singerId && (
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
            src={`${profileData.singerId.avatar}`}
            alt={profileData.singerId.fullName}
            sx={{ width: 80, height: 80, marginBottom: "10px" }}
          />
          <Typography variant="h5">{profileData.singerId.fullName}</Typography>
          <Typography color="textSecondary" sx={{ marginBottom: "10px" }}>
            <strong>Trạng thái:</strong> {profileData.singerId.status}
          </Typography>

          <Stack direction="row" spacing={2} justifyContent="center">
            <Button
              variant="outlined"
              color="primary"
              component={Link}
              href={`/singers/detailSinger/${profileData.singerId._id}`}
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
