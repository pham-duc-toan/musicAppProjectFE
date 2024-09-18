import CheckvarCookie from "@/component/checkVarCookie";
import LayOutClient from "../partial/layoutClient/LayoutClient";
import CheckVarAlert from "@/component/checkAlert";

const Dashboard = async () => {
  return (
    <>
      {/*  <LayOutClient> */}
      <h1>Trang chu</h1>
      <h2>Toan dep trai</h2>
      <CheckvarCookie />
      <CheckVarAlert />
      {/* </LayOutClient> */}
    </>
  );
};
export default Dashboard;
