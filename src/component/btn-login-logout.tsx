"use client";
import { useSession, signIn, signOut } from "next-auth/react";
import { Session } from "next-auth";
import Link from "next/link";
import { Button } from "@mui/material";

export default function BtnLoginLogout() {
  const { data: session } = useSession();
  console.log(session);

  if (session) {
    return (
      <Button
        onClick={() => signOut()}
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
