import {
  Box,
  Grid,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Button,
} from "@mui/material";
import { apiBasicServer } from "../utils/request";
import { TSongDetail } from "@/dataType/song";
import Link from "next/link";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
export default async function Dashboard() {
  const resSFY = await apiBasicServer(
    "GET",
    "/song-for-you/client",
    { limit: 6 },
    undefined,
    undefined,
    ["revalidate-tag-song-for-you"]
  );
  const resNs = await apiBasicServer(
    "GET",
    "/songs",
    { limit: 6 },
    undefined,
    undefined,
    ["revalidate-tag-songs"]
  );
  const resTop = await apiBasicServer(
    "GET",
    "/songs",
    {
      limit: 6,
      sort: "-listen",
    },
    undefined,
    undefined,
    ["revalidate-tag-songs"]
  );
  const topSong = resTop?.data?.data || [];

  const newSong = resNs?.data?.data || [];
  const songsForYou = resSFY?.data?.listSong || [];

  return (
    <Box
      sx={{
        padding: "20px",
        minHeight: "100vh",
      }}
    >
      {/* "Có Thể Bạn Muốn Nghe" Section */}
      <Box
        sx={{
          marginBottom: "20px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography sx={{ fontWeight: 700 }} variant="h4">
          BẢNG XẾP HẠNG
        </Typography>
        <Link href={"/songs/bxh"}>
          <Button variant="outlined">Xem Top 100 bài hát</Button>
        </Link>
      </Box>

      <Grid container spacing={2} sx={{ marginBottom: "40px" }}>
        {topSong.map((song: TSongDetail, index: number) => (
          <Grid item xs={12} md={6} key={index}>
            <Link href={`songs/detail/${song._id}`}>
              <Card
                sx={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                {/* Avatar on the left */}
                <CardMedia
                  component="img"
                  image={song.avatar}
                  alt={song.title}
                  sx={{
                    margin: "10px",
                    width: "120px",
                    height: "120px",
                    borderRadius: "8px",
                    marginRight: "20px",
                  }}
                />

                {/* Text content on the right */}
                <Box
                  sx={{
                    height: "120px",
                    padding: "5px",
                    flexGrow: 1,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  <Box>
                    <Typography variant="h6" sx={{ fontWeight: 500 }}>
                      {song.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Ca sĩ: {song.singerId?.fullName || "Không rõ"}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Typography variant="h4">#{index + 1}</Typography>
                    <Typography variant="body2" sx={{ marginTop: "10px" }}>
                      {new Date(song.createdAt).toLocaleDateString()}
                    </Typography>
                  </Box>
                </Box>
              </Card>
            </Link>
          </Grid>
        ))}
      </Grid>

      {/* "Mới Phát Hành" Section */}
      <Box
        sx={{
          marginBottom: "20px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography sx={{ fontWeight: 600 }} variant="h5">
          Có thể bạn muốn nghe
        </Typography>
        <Link href="/songs">
          <Typography
            display="flex"
            alignItems="center"
            variant="body1"
            color="GrayText"
            fontWeight={"700"}
            sx={{
              "&:hover": {
                color: "primary.main", // Màu khi hover
                cursor: "pointer", // Thêm hiệu ứng con trỏ tay khi hover
              },
            }}
          >
            <KeyboardArrowLeftIcon />
            Xem thêm
          </Typography>
        </Link>
      </Box>

      <Grid container spacing={2} sx={{ marginBottom: "40px" }}>
        {songsForYou.map((song: TSongDetail, index: number) => (
          <Grid item xs={6} sm={4} md={3} lg={2} key={index}>
            <Link href={`songs/detail/${song._id}`}>
              <Card sx={{ height: "400px" }}>
                <CardMedia
                  component="img"
                  image={song.avatar}
                  alt={song.title}
                  sx={{
                    borderRadius: "4px",
                    objectFit: "cover",
                    // width: "200px",
                    height: "200px",
                  }}
                />
                <Box height={"200px"} padding={"20px"}>
                  <Box
                    display={"flex"}
                    sx={{
                      height: "100%",
                      justifyContent: "space-between",
                      flexDirection: "column",
                    }}
                  >
                    <Box>
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: 500,
                          //combo hien thi 3 cham
                          display: "-webkit-box",
                          WebkitBoxOrient: "vertical",
                          WebkitLineClamp: 2,
                          overflow: "hidden",
                          wordWrap: "break-word",
                        }}
                      >
                        {song.title}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{
                          //combo hien thi 3 cham
                          display: "-webkit-box",
                          WebkitBoxOrient: "vertical",
                          WebkitLineClamp: 1,
                          overflow: "hidden",
                          wordWrap: "break-word",
                        }}
                      >
                        Ca sĩ: {song.singerId?.fullName || "Không rõ"}
                      </Typography>
                    </Box>

                    <Button
                      sx={{ marginTop: "10px" }}
                      variant="outlined"
                      color="primary"
                    >
                      Nghe Ngay
                    </Button>
                  </Box>
                </Box>
              </Card>
            </Link>
          </Grid>
        ))}
      </Grid>
      <Box
        sx={{
          marginBottom: "20px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography sx={{ fontWeight: 600 }} variant="h5">
          Mới phát hành
        </Typography>
        <Link href="/songs">
          <Typography
            display="flex"
            alignItems="center"
            variant="body1"
            color="GrayText"
            fontWeight={"700"}
            sx={{
              "&:hover": {
                color: "primary.main", // Màu khi hover
                cursor: "pointer", // Thêm hiệu ứng con trỏ tay khi hover
              },
            }}
          >
            <KeyboardArrowLeftIcon />
            Xem thêm
          </Typography>
        </Link>
      </Box>

      <Grid container spacing={2}>
        {newSong.map((song: TSongDetail, index: number) => (
          <Grid item xs={6} sm={4} md={3} lg={2} key={index}>
            <Link href={`songs/detail/${song._id}`}>
              <Card sx={{ height: "400px" }}>
                <CardMedia
                  component="img"
                  image={song.avatar}
                  alt={song.title}
                  sx={{
                    borderRadius: "4px",
                    objectFit: "cover",
                    // width: "200px",
                    height: "200px",
                  }}
                />
                <Box height={"200px"} padding={"20px"}>
                  <Box
                    display={"flex"}
                    sx={{
                      height: "100%",
                      justifyContent: "space-between",
                      flexDirection: "column",
                    }}
                  >
                    <Box>
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: 500,
                          //combo hien thi 3 cham
                          display: "-webkit-box",
                          WebkitBoxOrient: "vertical",
                          WebkitLineClamp: 2,
                          overflow: "hidden",
                          wordWrap: "break-word",
                        }}
                      >
                        {song.title}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{
                          //combo hien thi 3 cham
                          display: "-webkit-box",
                          WebkitBoxOrient: "vertical",
                          WebkitLineClamp: 1,
                          overflow: "hidden",
                          wordWrap: "break-word",
                        }}
                      >
                        Ca sĩ: {song.singerId?.fullName || "Không rõ"}
                      </Typography>
                    </Box>
                    <Button
                      sx={{ marginTop: "10px" }}
                      variant="outlined"
                      color="primary"
                    >
                      Nghe Ngay
                    </Button>
                  </Box>
                </Box>
              </Card>
            </Link>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
