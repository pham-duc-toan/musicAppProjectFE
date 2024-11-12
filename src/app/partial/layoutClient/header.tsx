"use client";
import { styled, useTheme } from "@mui/material/styles";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import { Box, Container, Button, InputBase, IconButton } from "@mui/material";
import { SwitchThemeButton } from "@/component/button-dark-mode";

import BtnLoginLogout from "@/component/btn-login-logout";
import SearchIcon from "@mui/icons-material/Search";
import SettingsIcon from "@mui/icons-material/Settings";
import ButtonUpdateSingerHeader from "./component/buttonUpdateSinger";

const drawerWidth = 240;

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const Header = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
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
}));

const SearchBox = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",

  borderRadius: theme.shape.borderRadius,
  padding: "4px 8px",
  marginRight: theme.spacing(2),
  color: "white",
}));

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
        <Toolbar sx={{ flex: "1" }} disableGutters>
          <SearchBox
            sx={{ flexGrow: 1, display: "flex", alignItems: "center" }}
          >
            <SearchIcon />
            <InputBase
              placeholder="Tìm kiếm bài hát, nghệ sĩ, lời bài hát..."
              inputProps={{ "aria-label": "search" }}
              sx={{ color: "inherit", ml: 1, maxWidth: "400px", flexGrow: "1" }}
            />
          </SearchBox>

          <ButtonUpdateSingerHeader />
        </Toolbar>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <BtnLoginLogout />
          <SwitchThemeButton />
        </Box>
      </Container>
    </Header>
  );
}
