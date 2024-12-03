import { decodeToken } from "@/app/helper/jwt";
import { GetAccessTokenFromCookie } from "@/app/utils/checkRole";
import ButtonRedirect from "@/component/buttonRedirect";
import SongCreateComponent from "@/component/CreateComponent/SongCreateComponent";
import { Button } from "@mui/material";
import { Box } from "@mui/system";
interface UserInfo {
  singerId?: string;
}
const createPage = () => {
  const access_token: any = GetAccessTokenFromCookie();
  const userInfo = decodeToken(access_token.value) as UserInfo | undefined;
  return (
    <>
      {userInfo?.singerId ? (
        <>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
            }}
            marginBottom={"15px"}
          >
            <h1>Tạo bài hát mới</h1>
            <ButtonRedirect
              content="Quản lý bài hát"
              link="/songs/managerSong"
              variant="outlined"
            />
          </Box>
          <SongCreateComponent />
        </>
      ) : (
        <Box
          marginTop={"200px"}
          display={"flex"}
          justifyContent={"center"}
          alignContent={"center"}
        >
          <h3>Bạn không phải ca sĩ !</h3>
        </Box>
      )}
    </>
  );
};
export default createPage;
