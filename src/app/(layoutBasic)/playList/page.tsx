import { apiBasicClient, apiBasicServer } from "@/app/utils/request";
import CreatePlaylistButton from "@/component/createPlayListButton";
import PlaylistItem from "@/component/PlaylistItem";
import { Grid, Typography } from "@mui/material";
import { Box, Container } from "@mui/system";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const Playlists = async () => {
  const cookieStore = cookies();

  const refresh_token = cookieStore.get("refresh_token");
  const access_token = cookieStore.get("access_token");

  if (!access_token) {
    redirect(`/`);
  }
  if (!refresh_token) {
    redirect(`/login`);
  }

  const datall: any = await apiBasicServer(
    "GET",
    "/playlists/detail",
    undefined,
    undefined,
    access_token,
    ["tag-list-playlist"]
  );
  const datas = datall?.data || undefined;
  if (!datas && datall.redirect) {
    redirect("/login");
  }

  interface Playlist {
    _id: string;
    title: string;
    listSong: Array<string>;
    [key: string]: any;
  }
  return (
    <>
      <Container>
        <Typography variant="h4" gutterBottom>
          Playlists
        </Typography>
        <CreatePlaylistButton />
        <Grid container spacing={2}>
          {datas.map((playlist: Playlist, index: any) => (
            <Grid item md={4} sm={6} xs={12} key={index}>
              <PlaylistItem playlist={playlist} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
};
export default Playlists;
