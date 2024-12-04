import SingerCreateComponent from "@/component/CreateComponent/SingerCreateComponent";
import { Box } from "@mui/system";

//kiem tra xem co quan ly singer chua, va trong local storage co chua ma giao dich ton tai trong database ko
const createPage = () => {
  return (
    <>
      <Box mb={"20px"} display={"flex"} justifyContent={"space-between"}>
        <h1>Tạo ca sĩ mới</h1>
      </Box>
      <SingerCreateComponent />
    </>
  );
};
export default createPage;
