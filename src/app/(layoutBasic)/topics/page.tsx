import { apiBasicServer } from "@/app/utils/request";
import { Grid } from "@mui/material";
import { Box } from "@mui/system";
import ItemControlCardTopic from "./components/ItemControlCardTopic ";

interface Topic {
  _id: string;
  title: string;
  avatar: string;
  description: string;
  status: string;
  slug: string;
  deleted: boolean;
  songsCount: number;
}
const AllTopics = async () => {
  // Gọi API để lấy danh sách tất cả các topic
  const datall: any = await apiBasicServer(
    "GET",
    "/topics/client", // Endpoint lấy danh sách topic
    undefined,
    undefined,
    undefined,
    ["revalidate-tag-topics", "revalidate-tag-songs"]
  );

  const datas = datall?.data || []; // Lấy dữ liệu topic từ API

  return (
    <>
      <h1>Tất cả Topics</h1>
      <Grid container>
        {datas.map((data: Topic, index: number) => (
          <Grid md={4} sm={6} xs={12} key={index}>
            <Box sx={{ padding: "10px" }}>
              {/* Hiển thị thông tin topic */}
              <ItemControlCardTopic data={data} />
            </Box>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default AllTopics;
