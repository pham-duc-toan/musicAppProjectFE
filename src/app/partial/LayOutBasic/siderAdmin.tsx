"use client";
import * as React from "react";
import { styled, Theme, CSSObject, useTheme } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import AccessibilityIcon from "@mui/icons-material/Accessibility";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import LyricsIcon from "@mui/icons-material/Lyrics";
import InterpreterModeIcon from "@mui/icons-material/InterpreterMode";
import TopicIcon from "@mui/icons-material/Topic";
import QueueMusicIcon from "@mui/icons-material/QueueMusic";
import ItemSider from "@/app/partial/LayOutBasic/component/item-of-list-button-sider";
import HomeIcon from "@mui/icons-material/Home";
import Link from "next/link";
import Image from "next/image";
import { Skeleton } from "@mui/material";
import PlaylistPlayIcon from "@mui/icons-material/PlaylistPlay";
import FavoriteIcon from "@mui/icons-material/Favorite";
import MicIcon from "@mui/icons-material/Mic";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
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
  "[data-mui-color-scheme='light'] & .MuiPaper-root": {
    background: "#f2f2f2",
  },
}));

const SideBarHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",

  ...theme.mixins.toolbar,
}));

export default function SiderAdminComponent({ open }: { open: boolean }) {
  const theme: Theme = useTheme();
  const [linkImg, setLinkImg] = React.useState("");
  React.useEffect(() => {
    const logoSrc = open
      ? theme.palette.mode === "dark"
        ? "https://res.cloudinary.com/dsi9ercdo/image/upload/v1733298068/pyokmt6ltmcq3w97dihh.png" // Hình ảnh cho dark mode khi mở
        : "https://res.cloudinary.com/dsi9ercdo/image/upload/v1733298357/nfzbp6jdilxcnivcphoh.png" // Hình ảnh cho light mode khi mở
      : "https://res.cloudinary.com/dsi9ercdo/image/upload/v1733296299/xnwsxfhvkgsy3njpsyat.png"; // Hình ảnh khi không mở
    setLinkImg(logoSrc);
  }, [open, theme]);
  return (
    <Sider variant="permanent" open={open}>
      <SideBarHeader>
        <Link href={"/"}>
          {linkImg !== "" ? (
            <Image
              src={linkImg || ""}
              width={open ? 100 : 56}
              height={56}
              alt="SideBar Header"
              objectFit="cover" // Đảm bảo ảnh phủ toàn bộ diện tích của vùng chứa
              objectPosition="center"
              loading="lazy" // Lazy load ảnh
            />
          ) : (
            // Skeleton là hiệu ứng loading thay thế cho ảnh đang tải
            <Skeleton
              variant="rectangular"
              width={open ? 100 : 56}
              height={56}
            />
          )}
        </Link>
      </SideBarHeader>
      <Divider />
      <List sx={{ padding: 0 }}>
        <ItemSider
          open={open}
          data={{
            name: "Trang chủ",
            router: "/admin",
          }}
        >
          <HomeIcon />
        </ItemSider>

        <ItemSider
          open={open}
          data={{
            name: "Quản lý bài hát",
            router: "/admin/managerSong",
          }}
        >
          <LyricsIcon />
        </ItemSider>
        <ItemSider
          open={open}
          data={{
            name: "Quản lý chủ đề",
            router: "/admin/managerTopic",
          }}
        >
          <LibraryBooksIcon />
        </ItemSider>
        <ItemSider
          open={open}
          data={{
            name: "Quản lý ca sĩ",
            router: "/admin/managerSinger",
          }}
        >
          <InterpreterModeIcon />
        </ItemSider>
        <ItemSider
          open={open}
          data={{
            name: "Quản lý người dùng",
            router: "/admin/managerUser",
          }}
        >
          <ManageAccountsIcon />
        </ItemSider>
        <ItemSider
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
      <List sx={{ padding: 0 }}>
        <ItemSider
          open={open}
          data={{
            name: "Danh sách phát của tôi",
            router: "/playList",
          }}
        >
          <PlaylistPlayIcon />
        </ItemSider>
        <ItemSider
          open={open}
          data={{
            name: "Các bài hát đã thích",
            router: "/songs/my-favorite-song",
          }}
        >
          <FavoriteIcon />
        </ItemSider>
        <ItemSider
          open={open}
          data={{
            name: "Bài hát",
            router: "/songs",
          }}
        >
          <QueueMusicIcon />
        </ItemSider>
        <ItemSider
          open={open}
          data={{
            name: "Ca sĩ",
            router: "/singers",
          }}
        >
          <MicIcon />
        </ItemSider>
        <ItemSider
          open={open}
          data={{
            name: "Chủ đề",
            router: "/topics",
          }}
        >
          <TopicIcon />
        </ItemSider>
      </List>
    </Sider>
  );
}
