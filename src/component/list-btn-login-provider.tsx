"use client";
import { Box, Button } from "@mui/material";
import { signIn } from "next-auth/react";
import GitHubIcon from "@mui/icons-material/GitHub";
import GoogleIcon from "@mui/icons-material/Google";
const ListProvider = () => {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Button
          onClick={() => {
            signIn("github");
          }}
        >
          <GitHubIcon />
        </Button>
        <Button>
          <GoogleIcon />
        </Button>
      </Box>
    </>
  );
};
export default ListProvider;
