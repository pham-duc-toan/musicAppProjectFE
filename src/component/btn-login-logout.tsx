"use client";

import Link from "next/link";
import { Button } from "@mui/material";
import { deleteCookie, getCookie } from "@/app/helper/cookieClient";
import { postProtect } from "@/app/utils/request";

export default function BtnLoginLogout() {
  if (true) {
    return (
      <Button
        onClick={async () => {
          //check ko vao duoc token
          // signOut();
        }}
        variant="contained"
        sx={{
          marginRight: "5px",
        }}
      >
        Logout
      </Button>
    );
  }

  return (
    <Link href={"/login"}>
      <Button
        variant="contained"
        sx={{
          marginRight: "5px",
        }}
      >
        Login
      </Button>
    </Link>
    // <Button
    //   variant="contained"
    //   sx={{
    //     marginRight: "5px",
    //   }}
    //   onClick={() => {
    //     signIn();
    //   }}
    // >
    //   Login
    // </Button>
  );
}
