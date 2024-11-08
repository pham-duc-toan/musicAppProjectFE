import ButtonRedirect from "@/component/buttonRedirect";
import SongCreateComponent from "@/component/CreateComponent/SongCreateComponent";
import { Button } from "@mui/material";
import { Box } from "@mui/system";

const createPage = () => {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <h1>tao bai hat moi</h1>
        <ButtonRedirect link="/" />
      </Box>
      <SongCreateComponent />
    </>
  );
};
export default createPage;
