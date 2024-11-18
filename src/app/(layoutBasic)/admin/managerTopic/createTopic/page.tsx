import TopicCreateComponent from "@/component/CreateComponent/TopicCreateComponent";
import { Button } from "@mui/material";
import { Box } from "@mui/system";
import Link from "next/link";

const createPage = () => {
  return (
    <>
      <Box mb={"20px"} display={"flex"} justifyContent={"space-between"}>
        <h1>Tạo chủ đề mới</h1>
        <Button variant="contained">
          <Link href={"/admin/managerTopic"}>Quản lý chủ đề</Link>
        </Button>
      </Box>
      <TopicCreateComponent />
    </>
  );
};
export default createPage;
