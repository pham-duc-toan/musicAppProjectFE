import { GetAccessTokenFromCookie } from "@/app/utils/checkRole";
import { apiBasicServer } from "@/app/utils/request";
import CreatePlaylistButton from "@/app/(layoutBasic)/playList/components/createPlayListButton";
import PlaylistItem from "@/app/(layoutBasic)/playList/components/PlaylistItem";
import { Grid, Typography } from "@mui/material";
import { Container } from "@mui/system";

import { redirect } from "next/navigation";

const Playlists = async () => {
  const access_token = GetAccessTokenFromCookie();

  const datall: any = await apiBasicServer(
    "GET",
    "/playlists/detail",
    undefined,
    undefined,
    access_token,
    ["revalidate-tag-list-playlist"]
  );
  const datas = datall?.data || undefined;

  if (!datas && datall.redirect) {
    redirect("/login");
  }
  interface SongState {
    _id: string;
    title: string;
    avatar: string;
    audio: string;
    singerId: {
      _id: string;
      fullName: string;
      [key: string]: any;
    };
    like: number;
  }
  interface Playlist {
    _id: string;
    title: string;
    listSong: Array<SongState>;
    [key: string]: any;
  }
  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Playlists
      </Typography>
      <CreatePlaylistButton />
      {datas.length === 0 ? (
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          style={{ height: "50vh" }} // Đặt chiều cao để căn giữa theo chiều dọc
        >
          <Typography
            variant="h6"
            style={{ fontStyle: "italic", color: "text.primary" }}
          >
            Hiện không có danh sách phát nào
          </Typography>
        </Grid>
      ) : (
        <Grid container spacing={2}>
          {datas.map((playlist: Playlist, index: any) => (
            <Grid item md={4} sm={6} xs={12} key={index}>
              <PlaylistItem playlist={playlist} />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};
export default Playlists;
