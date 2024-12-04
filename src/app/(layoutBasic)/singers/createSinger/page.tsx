import { apiBasicServer } from "@/app/utils/request";
import SingerCreateComponent from "@/component/CreateComponent/SingerCreateComponent";
import { redirect } from "next/navigation";

const createPage = async ({ searchParams }: any) => {
  if (!searchParams?.orderId || searchParams?.resultCode != "0") {
    redirect(`/`);
  }

  return (
    <>
      <h1>Tạo ca sĩ</h1>
      <SingerCreateComponent orderId={searchParams.orderId} />
    </>
  );
};
export default createPage;
