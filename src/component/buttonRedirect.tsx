"use client";

import { Button } from "@mui/material";
import { useRouter } from "next/navigation";

const ButtonRedirect = (props: { link: string; content: string }) => {
  const { link, content } = props;
  const router = useRouter();
  const handleRedirect = () => {
    if (link == "back") router.back();
    else router.push(`${link}`);
  };
  return (
    <>
      <Button variant="contained" color="primary" onClick={handleRedirect}>
        {content}
      </Button>
    </>
  );
};
export default ButtonRedirect;
