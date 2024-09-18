"use client";

import { getCookie } from "@/app/helper/cookieClient";
import { useAppContext } from "@/context-app";
import { Button } from "@mui/material";

const CheckVarAlert = () => {
  const { showMessage } = useAppContext();
  const abc = async () => {
    showMessage("check var!", "success");
    // showMessage("check var!", "error");
  };
  return (
    <>
      <Button onClick={abc}>check var Alert</Button>
    </>
  );
};
export default CheckVarAlert;
