"use client";
import * as React from "react";
import { styled, Theme, CSSObject, useTheme } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import AccessibilityIcon from "@mui/icons-material/Accessibility";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import LyricsIcon from "@mui/icons-material/Lyrics";
import InterpreterModeIcon from "@mui/icons-material/InterpreterMode";
import TopicIcon from "@mui/icons-material/Topic";
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
  "[data-mui-color-scheme='dark'] & .MuiPaper-root": {
    background: "#1b0c35",
  },
}));

const SideBarHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

export default function SiderAdminComponent({
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
            router: "/admin",
          }}
        >
          <HomeIcon />
        </ItemSider>

        <ItemSider
          theme={theme}
          open={open}
          data={{
            name: "Quản lý bài hát",
            router: "/admin/managerSong",
          }}
        >
          <LyricsIcon />
        </ItemSider>
        <ItemSider
          theme={theme}
          open={open}
          data={{
            name: "Quản lý chủ đề",
            router: "/admin/managerTopic",
          }}
        >
          <TopicIcon />
        </ItemSider>
        <ItemSider
          theme={theme}
          open={open}
          data={{
            name: "Quản lý ca sĩ",
            router: "/admin/managerSinger",
          }}
        >
          <InterpreterModeIcon />
        </ItemSider>
        <ItemSider
          theme={theme}
          open={open}
          data={{
            name: "Quản lý người dùng",
            router: "/admin/managerUser",
          }}
        >
          <ManageAccountsIcon />
        </ItemSider>
        <ItemSider
          theme={theme}
          open={open}
          data={{
            name: "Quản lý các quyền",
            router: "/admin/permission",
          }}
        >
          <AccessibilityIcon />
        </ItemSider>
      </List>
      <Divider />
      <List>
        <ItemSider
          theme={theme}
          open={open}
          data={{
            name: "Danh sách phát của tôi",
            router: "/playList",
          }}
        >
          <QueueMusicIcon />
        </ItemSider>
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
            name: "Tất cả bài hát",
            router: "/songs",
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
