"use client";
import { styled, useTheme } from "@mui/material/styles";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Box, Container, Button } from "@mui/material";
import { SwitchThemeButton } from "@/component/button-dark-mode";
import Link from "next/link";

const drawerWidth = 240;

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const Header = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => {
  return {
    zIndex: theme.zIndex.drawer - 1,

    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
      width: `calc(100% - ${drawerWidth}px) !important`,
      transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    }),
    ...(!open && {
      width: `calc(100% - calc(${theme.spacing(7)} + 1px))`,
      [theme.breakpoints.up("sm")]: {
        width: `calc(100% - calc(${theme.spacing(8)} + 1px))`,
      },
    }),
  };
});

export default function HeaderComponent({ open }: { open: boolean }) {
  return (
    <Header position="fixed" open={open} color="secondary">
      <Container
        sx={{
          display: "flex",
          alignItems: "center",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            Header
          </Typography>
        </Toolbar>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
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
          <SwitchThemeButton />
        </Box>
      </Container>
    </Header>
  );
}
