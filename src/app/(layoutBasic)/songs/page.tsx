import { apiBasicServer, getInfoUser } from "@/app/utils/request";
import ItemControlCard from "@/component/item-control-card-music";
import { Grid } from "@mui/material";
import { Box } from "@mui/system";
import TestRevalidate from "./managerSong/component/TestRevalidate";
import { GetPublicAccessTokenFromCookie } from "@/app/utils/checkRole";

const Songs = async () => {
  const datall: any = await apiBasicServer(
    "GET",
    "/songs/",
    undefined,
    undefined,
    undefined,
    ["revalidate-tag-songs"]
  );

  const datas = datall?.data.data || undefined;

  let favoriteSongs = [];
  const access_token = GetPublicAccessTokenFromCookie();

  if (access_token) {
    const dataFs = await getInfoUser(access_token.value);
    favoriteSongs =
      dataFs.data.listFavoriteSong.map((song: any) => song._id) || [];
  }

  return (
    <>
      <h1>Tất cả bài hát</h1>
      <TestRevalidate />
      <Grid container>
        {datas.map((data: any, index: number) => {
          return (
            <Grid md={4} sm={6} xs={12} key={index}>
              <Box sx={{ padding: "10px" }}>
                <ItemControlCard fSongs={favoriteSongs} data={data} />
              </Box>
            </Grid>
          );
        })}
      </Grid>
    </>
  );
};
export default Songs;
