import Counter from "@/component/Counter";
import LayOutClient from "./partial/layoutClient/LayoutClient";
const Dashboard = () => {
  return (
    <LayOutClient>
      <h1>Trang chu</h1>
      <h2>Toan dep trai</h2>
      <Counter />
    </LayOutClient>
  );
};
export default Dashboard;
