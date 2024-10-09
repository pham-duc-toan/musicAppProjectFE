import { apiBasicClient, apiBasicServer } from "@/app/utils/request";
import PlaylistItem from "@/component/PlaylistItem";
import { Grid, Typography } from "@mui/material";
import { Box, Container } from "@mui/system";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const Songs = async () => {
  const cookieStore = cookies();

  const refresh_token = cookieStore.get("refresh_token");
  const access_token = cookieStore.get("access_token");

  if (!access_token) {
    redirect(`/`);
  }
  if (!refresh_token) {
    redirect(`/login`);
  }
  console.log("access_token", access_token);

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
  console.log("datall", datall);
  interface Playlist {
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
        <Grid container spacing={2}>
          {datas.map((playlist: Playlist, index: any) => (
            <Grid item xs={12} md={4} key={index}>
              <PlaylistItem playlist={playlist} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
};
export default Songs;
