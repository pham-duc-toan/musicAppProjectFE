import { getServerSession } from "next-auth";
import LayOutClient from "../partial/layoutClient/LayoutClient";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
const Dashboard = async () => {
  const session = await getServerSession(authOptions);

  return (
    <>
      {/*  <LayOutClient> */}
      <h1>Trang chu</h1>
      <h2>Toan dep trai</h2>

      {/* </LayOutClient> */}
    </>
  );
};
export default Dashboard;
