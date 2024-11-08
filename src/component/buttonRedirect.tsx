"use client";

import { Button } from "@mui/material";
import { useRouter } from "next/navigation";

const ButtonRedirect = (props: { link: string }) => {
  const { link } = props;
  const router = useRouter();
  const handleRedirect = () => {
    if (link == "back") router.back();
    else router.push(`${link}`);
  };
  return (
    <>
      <Button variant="contained" color="primary" onClick={handleRedirect}>
        Quản lý bài hát
      </Button>
    </>
  );
};
export default ButtonRedirect;
