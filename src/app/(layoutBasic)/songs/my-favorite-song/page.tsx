import { getInfoUser } from "@/app/utils/request";
import ItemControlCard from "@/component/item-control-card-music";
import { Grid } from "@mui/material";
import { Box } from "@mui/system";

import { GetPublicAccessTokenFromCookie } from "@/app/utils/checkRole";

const MyFavoriteSong = async () => {
  let favoriteSongs = [];
  let fullInfoFavoriteSongs = [];
  const access_token = GetPublicAccessTokenFromCookie();

  if (access_token) {
    const dataFs = await getInfoUser(access_token.value);
    favoriteSongs =
      dataFs.data.listFavoriteSong.map((song: any) => song._id) || [];
    fullInfoFavoriteSongs = dataFs.data.listFavoriteSong || [];
  }

  return (
    <>
      <h1>Các bài hát đã thích</h1>
      <Grid container>
        {fullInfoFavoriteSongs.map((data: any, index: number) => {
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
export default MyFavoriteSong;
