"use client";
import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import { useMediaQuery } from "@mui/system";
import HeaderComponent from "./header";
import SiderComponent from "./slider";
import FooterComponent from "./footer";

export default function LayOutClient({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [open, setOpen] = React.useState(true);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

  React.useEffect(() => {
    if (isSmallScreen) {
      setOpen(false);
    }
  }, [isSmallScreen]);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <>
      <CssBaseline />
      <Box sx={{ display: "flex" }}>
        <HeaderComponent open={open} />

        <SiderComponent
          open={open}
          handleDrawerOpen={handleDrawerOpen}
          handleDrawerClose={handleDrawerClose}
        />

        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Container>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: theme.spacing(0, 1),
                ...theme.mixins.toolbar,
              }}
            />
            {children}
          </Container>
        </Box>
      </Box>
      <FooterComponent />
    </>
  );
}
