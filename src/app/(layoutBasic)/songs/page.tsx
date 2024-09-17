import { get } from "@/app/utils/request";
import ItemControlCard from "@/component/item-control-card-music";
import { Grid } from "@mui/material";
import { Box } from "@mui/system";

const Songs = async () => {
  const datall = await get("/songs/full");
  const datas = datall.data;

  return (
    <>
      <h1>Tat ca cac bai hat</h1>
      <Grid container columns={{ xs: 4, sm: 8, md: 12 }}>
        {datas.map((data: any, index: number) => {
          return (
            <Grid xs={2} sm={4} md={4} key={index}>
              <Box sx={{ padding: "10px" }}>
                <ItemControlCard data={data} />
              </Box>
            </Grid>
          );
        })}
      </Grid>
    </>
  );
};
export default Songs;
