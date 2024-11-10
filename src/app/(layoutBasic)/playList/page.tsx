import { CheckTokenFromCookie } from "@/app/utils/checkRole";
import { apiBasicServer } from "@/app/utils/request";
import CreatePlaylistButton from "@/component/createPlayListButton";
import PlaylistItem from "@/component/PlaylistItem";
import { Grid, Typography } from "@mui/material";
import { Container } from "@mui/system";

import { redirect } from "next/navigation";

const Playlists = async () => {
  const access_token = CheckTokenFromCookie();

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
