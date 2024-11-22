import CheckvarCookie from "@/component/checkVarCookie";

import CheckVarAlert from "@/component/checkAlert";
import DragAndDrop from "@/component/test";

const Dashboard = async () => {
  return (
    <>
      <h1>Trang chu</h1>
      <h2>Toan dep trai</h2>
      <CheckvarCookie />
      <CheckVarAlert />
      <h1>Drag and Drop Example</h1>
      <DragAndDrop />
    </>
  );
};
export default Dashboard;
