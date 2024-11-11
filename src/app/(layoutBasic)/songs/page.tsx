import { apiBasicServer } from "@/app/utils/request";
import ItemControlCard from "@/component/item-control-card-music";
import { Grid } from "@mui/material";
import { Box } from "@mui/system";

import { redirect } from "next/navigation";
import TestRevalidate from "./managerSong/component/TestRevalidate";

const Songs = async () => {
  const datall: any = await apiBasicServer(
    "GET",
    "/songs/full",
    undefined,
    undefined,
    undefined,
    ["revalidate-tag-songs"]
  );
  const datas = datall?.data || undefined;
  if (!datas && datall.redirect) {
    redirect("/login");
  }
  return (
    <>
      <h1>Tat ca cac bai hat</h1>
      <TestRevalidate />
      <Grid container>
        {datas.map((data: any, index: number) => {
          return (
            <Grid md={4} sm={6} xs={12} key={index}>
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
