"use client";
import { revalidateByTag } from "@/app/action";
import { useAppContext } from "@/context-app";
import { Button } from "@mui/material";

const TestRevalidate = () => {
  const { showMessage } = useAppContext();
  const handleClick = async () => {
    await revalidateByTag("revalidate-tag-songs");
    showMessage("thanh cong", "success");
  };
  return (
    <>
      <Button onClick={handleClick}>Test revalidate by tag</Button>
    </>
  );
};
export default TestRevalidate;
