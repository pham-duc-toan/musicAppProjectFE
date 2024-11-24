"use client";
import * as React from "react";
import { styled, Theme, CSSObject, useTheme } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import QueueMusicIcon from "@mui/icons-material/QueueMusic";
import ItemSider from "@/component/item-of-list-button-sider";
import HomeIcon from "@mui/icons-material/Home";
import Link from "next/link";
const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const Sider = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
  "& .MuiPaper-root": {
    boxShadow: "0 25px 50px -12px rgba(0,0,0,0.25)",
  },
}));

const SideBarHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

export default function SiderComponent({
  open,
  handleDrawerOpen,
  handleDrawerClose,
}: {
  open: boolean;
  handleDrawerOpen: () => void;
  handleDrawerClose: () => void;
}) {
  const theme: Theme = useTheme();
  return (
    <Sider variant="permanent" open={open}>
      <SideBarHeader>
        <IconButton onClick={open ? handleDrawerClose : handleDrawerOpen}>
          {open ? <ChevronLeftIcon /> : <ChevronRightIcon />}
        </IconButton>
      </SideBarHeader>
      <Divider />
      <List>
        <ItemSider
          theme={theme}
          open={open}
          data={{
            name: "Trang chủ",
            router: "/",
          }}
        >
          <HomeIcon />
        </ItemSider>

        <ItemSider
          theme={theme}
          open={open}
          data={{
            name: "Tất cả bài hát",
            router: "/songs",
          }}
        >
          <QueueMusicIcon />
        </ItemSider>
      </List>
      <Divider />
      <List>
        <Link href={"/playList"}>
          <ListItem key="a" disablePadding sx={{ display: "block" }}>
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <QueueMusicIcon />
              </ListItemIcon>
              <ListItemText primary="Playlist" sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </ListItem>
        </Link>
        <ItemSider
          theme={theme}
          open={open}
          data={{
            name: "Các bài hát đã thích",
            router: "/songs/my-favorite-song",
          }}
        >
          <QueueMusicIcon />
        </ItemSider>
        <ItemSider
          theme={theme}
          open={open}
          data={{
            name: "Tất cả ca sĩ",
            router: "/singers",
          }}
        >
          <QueueMusicIcon />
        </ItemSider>
        <ItemSider
          theme={theme}
          open={open}
          data={{
            name: "Tất cả chủ đề",
            router: "/topics",
          }}
        >
          <QueueMusicIcon />
        </ItemSider>
      </List>
    </Sider>
  );
}
